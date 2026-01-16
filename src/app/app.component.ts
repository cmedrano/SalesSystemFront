import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIcon } from "@angular/material/icon";
import { MatDivider } from "@angular/material/divider";
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
    MatIcon,
    MatDivider,
    MatMenuModule,
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Sales System';
  isDarkMode = true
  
  constructor(private router: Router) {
    // Verificar si ya hay una preferencia guardada
    const saved = localStorage.getItem('darkMode');
    this.isDarkMode = saved === 'true';
    this.updateThemeClass();
  }

  hideMenu(): boolean {
    return this.router.url === '/login';
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.updateThemeClass();
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }

  private updateThemeClass(): void {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }

  // changeMode(): void{
  //   if (this.isDarkMode) {
  //     this.isDarkMode = false 
  //   } else {
  //     this.isDarkMode = true
  //   }
  // }

  
}
