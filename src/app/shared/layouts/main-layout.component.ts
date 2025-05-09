import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem, NavigationService } from '../../core/services/navigation.service';


@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  menuItems: MenuItem[] = [];

  constructor(private readonly nav: NavigationService) {}

  ngOnInit(): void {
    this.menuItems = this.nav.getMenuItems();
  }
}
