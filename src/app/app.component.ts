import { Component }       from '@angular/core';
import { RouterOutlet }    from '@angular/router';
import { routeAnimations } from './core/animations/route-animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent {

}
