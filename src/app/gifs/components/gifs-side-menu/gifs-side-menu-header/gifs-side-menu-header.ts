import { Component } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'gifs-side-menu-header',
  imports: [],
  templateUrl: './gifs-side-menu-header.html',
  styleUrl: './gifs-side-menu-header.css',
})
export class GifsSideMenuHeader {
  envs = environment;
}
