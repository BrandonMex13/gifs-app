import { Component, computed, inject, signal } from '@angular/core';
import { GifService } from '../../services/gifs.service';
import { ActivatedRoute } from '@angular/router';
import { Gif } from '../../interfaces/gif.interface';
import { GifList } from "../../components/gif-list/gif-list";
import { toSignal } from '@angular/core/rxjs-interop'
import { map } from 'rxjs';

@Component({
  selector: 'app-gif-history-page',
  imports: [GifList],
  templateUrl: './gif-history-page.html',
})
export default class GifHistoryPage {
  gifs = signal<Gif[]>([]);

  // Inyectamos servicio
  gifService = inject(GifService);

  // Obtenemos los datos de la URL
  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map( (params) => params['query'] ?? 'No Query')
    )
  );

  // Señal computada para traernos su historial
  gifsByKey = computed( () => {
    return this.gifService.getHistoryGifs(this.query());
  })
}
