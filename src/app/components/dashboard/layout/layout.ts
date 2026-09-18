import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

  menuMobileOuvert = false;

  menuProfilOuvert = false;

  utilisateur = {
    nom: 'John Doe',
    role: 'Administrateur',
    initiales: 'JD'
  };

  toggleMenuMobile(): void {
    this.menuMobileOuvert = !this.menuMobileOuvert;
  }

  fermerMenuMobile(): void {
    this.menuMobileOuvert = false;
  }

  toggleMenuProfil(): void {
    this.menuProfilOuvert = !this.menuProfilOuvert;
  }
}