import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { map, Observable, tap } from 'rxjs';
import { GifMapper } from '../mapper/gif.mapper';
import { Gif } from '../interfaces/gif.interface';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';

const GIF_KEY = 'gifs'

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
  const gifs = JSON.parse(gifsFromLocalStorage);

  return gifs;
}

@Injectable({
  providedIn: 'root'
})
export class GifService {

  private http = inject(HttpClient);

  env = environment;

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(false);
  private trendingPage = signal(0);

  trendingGifGroup = computed<Gif[][]>( () => {
    const gropus = [];

    for( let i = 0; i < this.trendingGifs().length; i += 3){
      gropus.push(this.trendingGifs().slice(i, i+3));
    }

    return gropus;
  });

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed( () => Object.keys(this.searchHistory()));

  constructor(){
    this.loadTrendingGifs();
  }

  saveGifsToLocalStorage = effect( () => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEY, historyString);
  });

  loadTrendingGifs() {

    if(this.trendingGifsLoading() )
      return;

    this.trendingGifsLoading.set(true);

    this.http.get<GiphyResponse>(`${this.env.giphyUrl}/gifs/trending`, {
      params : {
        api_key: this.env.giphyApiKey,
        limit: 20,
        offset: this.trendingPage() * 20
      }
    }).subscribe( (resp) => {
      const gifs = GifMapper.mapGifyItemsToGifArray(resp.data);

      this.trendingGifs.update( curretGifs => [...curretGifs, ...gifs] );
      this.trendingPage.update( (curretPage) => curretPage + 1);
      this.trendingGifsLoading.set(false);
    });
  }

  searchGifs( query : string ) : Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${this.env.giphyUrl}/gifs/search`, {
      params: {
        api_key: this.env.giphyApiKey,
        limit: 20,
        q: query
      }
    }).pipe(
      map( ({ data }) => GifMapper.mapGifyItemsToGifArray( data )),

      // Historial
      tap( data => {
        this.searchHistory.update( history => ({
          ...history,
          [query.toLowerCase()] : data
        }));
      })
    );
  }

  getHistoryGifs( query : string) : Gif[] {
    return this.searchHistory()[query] ?? [];
  }
}
