import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeAnimations } from './animations/route-animations';
import { MainLayoutComponent } from '../shared/layouts/main-layout.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, MainLayoutComponent],
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.css'],
  animations: [routeAnimations],
})
export class AppShellComponent {}
