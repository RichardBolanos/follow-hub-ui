import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { routeAnimations } from '../animations/route-animations';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [routeAnimations]
})
export class MainLayoutComponent {
  public auth   = inject(AuthService);
  public router = inject(Router);
}
