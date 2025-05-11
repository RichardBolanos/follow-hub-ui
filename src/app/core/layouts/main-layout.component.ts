// src/app/shared/layouts/main-layout.component.ts
import { Component, inject }             from '@angular/core';
import { CommonModule }                  from '@angular/common';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { AuthService }                   from '../../core/services/auth.service';
import { NavigationService, MenuItem }   from '../../core/services/navigation.service';
import { routeAnimations }               from '../../core/animations/route-animations';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [routeAnimations]
})
export class MainLayoutComponent {
  private readonly nav    = inject(NavigationService);
  public auth    = inject(AuthService);
  public router  = inject(Router);
  public menuItems: MenuItem[] = this.nav.getMenuItems();
}
