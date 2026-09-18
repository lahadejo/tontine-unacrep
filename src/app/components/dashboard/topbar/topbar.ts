import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './topbar.html'
})
export class Topbar {

  menuProfilOuvert = false;

  utilisateur = {
    nom: 'John Doe',
    role: 'Administrateur',
    initiales: 'JD'
  };

  /**
   * Ouvre ou ferme le menu utilisateur
   */
  toggleMenuProfil(): void {
    this.menuProfilOuvert = !this.menuProfilOuvert;
  }

  /**
   * Ferme le menu lorsqu'on clique en dehors
   */
  @HostListener('document:click', ['$event'])
  fermerMenuAuClicExterieur(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (!target.closest('[data-profile-menu]')) {
      this.menuProfilOuvert = false;
    }
  }
}