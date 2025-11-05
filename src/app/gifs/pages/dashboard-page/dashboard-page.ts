import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GifsSideMenu } from '../../components/gifs-side-menu/gifs-side-menu';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterOutlet, GifsSideMenu],
  templateUrl: './dashboard-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage { }
