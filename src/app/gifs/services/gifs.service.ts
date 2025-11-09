import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  private http = inject(HttpClient);

  env = environment;

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  constructor(){
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${this.env.giphyUrl}/gifs/trending`, {
      params : {
        api_key: this.env.giphyApiKey,
        limit: 20
      }
    }).subscribe( (resp) => {
      const gifs = GifMapper.mapGifyItemsToGifArray(resp.data);

      this.trendingGifs.set( gifs );
      this.trendingGifsLoading.set(false);
    });
  }
}
