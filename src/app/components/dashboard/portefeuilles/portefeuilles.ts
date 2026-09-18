import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Portefeuille {
  id: number;
  numero: string;
  client: string;
  matricule: string;
  carte: string;
  typeCarte: string;
  solde: number;
  totalCotise: number;
  nombreCotisations: number;
  derniereCotisation: string;
  statut: 'Actif' | 'Bloqué' | 'Fermé';
}

@Component({
  selector: 'app-portefeuilles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './portefeuilles.html',
  styleUrl: './portefeuilles.css',
})
export class Portefeuilles {

  // =====================================================
  // FILTRES
  // =====================================================

  recherche = '';
  filtreStatut = 'Tous';
  filtreType = 'Tous';


  // =====================================================
  // DONNÉES DES PORTEFEUILLES
  // =====================================================

  portefeuilles: Portefeuille[] = [

    {
      id: 1,
      numero: 'WAL-00001',
      client: 'Jean Kouassi',
      matricule: 'CLI-00001',
      carte: 'CAR-00125',
      typeCarte: 'Journalière',
      solde: 12000,
      totalCotise: 12000,
      nombreCotisations: 24,
      derniereCotisation: '2026-09-16',
      statut: 'Actif'
    },

    {
      id: 2,
      numero: 'WAL-00002',
      client: 'Jean Kouassi',
      matricule: 'CLI-00001',
      carte: 'CAR-00126',
      typeCarte: 'Mensuelle',
      solde: 5000,
      totalCotise: 5000,
      nombreCotisations: 1,
      derniereCotisation: '2026-09-01',
      statut: 'Actif'
    },

    {
      id: 3,
      numero: 'WAL-00003',
      client: 'Marie Adjovi',
      matricule: 'CLI-00002',
      carte: 'CAR-00130',
      typeCarte: 'Journalière',
      solde: 18500,
      totalCotise: 18500,
      nombreCotisations: 18,
      derniereCotisation: '2026-09-16',
      statut: 'Actif'
    },

    {
      id: 4,
      numero: 'WAL-00004',
      client: 'Paul Hounkpe',
      matricule: 'CLI-00003',
      carte: 'CAR-00131',
      typeCarte: 'Mensuelle',
      solde: 10000,
      totalCotise: 10000,
      nombreCotisations: 1,
      derniereCotisation: '2026-09-05',
      statut: 'Actif'
    },

    {
      id: 5,
      numero: 'WAL-00005',
      client: 'Aminata Soglo',
      matricule: 'CLI-00004',
      carte: 'CAR-00132',
      typeCarte: 'Journalière',
      solde: 7500,
      totalCotise: 7500,
      nombreCotisations: 15,
      derniereCotisation: '2026-09-14',
      statut: 'Bloqué'
    },

    {
      id: 6,
      numero: 'WAL-00006',
      client: 'David Ahouansou',
      matricule: 'CLI-00005',
      carte: 'CAR-00135',
      typeCarte: 'Mensuelle',
      solde: 0,
      totalCotise: 5000,
      nombreCotisations: 1,
      derniereCotisation: '2026-08-10',
      statut: 'Fermé'
    }

  ];


  // =====================================================
  // PORTEFEUILLES FILTRÉS
  // =====================================================

  get portefeuillesFiltres(): Portefeuille[] {

    const recherche = this.recherche.toLowerCase().trim();

    return this.portefeuilles.filter((portefeuille) => {

      const correspondRecherche =
        !recherche ||
        portefeuille.numero.toLowerCase().includes(recherche) ||
        portefeuille.client.toLowerCase().includes(recherche) ||
        portefeuille.matricule.toLowerCase().includes(recherche) ||
        portefeuille.carte.toLowerCase().includes(recherche);

      const correspondStatut =
        this.filtreStatut === 'Tous' ||
        portefeuille.statut === this.filtreStatut;

      const correspondType =
        this.filtreType === 'Tous' ||
        portefeuille.typeCarte === this.filtreType;

      return (
        correspondRecherche &&
        correspondStatut &&
        correspondType
      );

    });

  }


  // =====================================================
  // STATISTIQUES
  // =====================================================

  get totalPortefeuilles(): number {
    return this.portefeuilles.length;
  }


  get portefeuillesActifs(): number {
    return this.portefeuilles.filter(
      portefeuille => portefeuille.statut === 'Actif'
    ).length;
  }


  get portefeuillesBloques(): number {
    return this.portefeuilles.filter(
      portefeuille => portefeuille.statut === 'Bloqué'
    ).length;
  }


  get portefeuillesFermes(): number {
    return this.portefeuilles.filter(
      portefeuille => portefeuille.statut === 'Fermé'
    ).length;
  }


  // =====================================================
  // SOLDE TOTAL
  // =====================================================

  get soldeTotal(): number {

    return this.portefeuilles.reduce(
      (total, portefeuille) =>
        total + portefeuille.solde,
      0
    );

  }


  // =====================================================
  // TOTAL COTISÉ
  // =====================================================

  get totalCotise(): number {

    return this.portefeuilles.reduce(
      (total, portefeuille) =>
        total + portefeuille.totalCotise,
      0
    );

  }


  // =====================================================
  // NOMBRE TOTAL DE COTISATIONS
  // =====================================================

  get nombreTotalCotisations(): number {

    return this.portefeuilles.reduce(
      (total, portefeuille) =>
        total + portefeuille.nombreCotisations,
      0
    );

  }


  // =====================================================
  // FORMATAGE MONTANT
  // =====================================================

  formaterMontant(montant: number): string {

    return montant.toLocaleString('fr-FR');

  }


  // =====================================================
  // FORMATAGE DATE
  // =====================================================

  formaterDate(date: string): string {

    const valeur = new Date(date);

    return valeur.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

  }


  // =====================================================
  // CLASSE DU STATUT
  // =====================================================

  getClasseStatut(
    statut: Portefeuille['statut']
  ): string {

    switch (statut) {

      case 'Actif':
        return 'bg-green-100 text-green-700';

      case 'Bloqué':
        return 'bg-orange-100 text-orange-700';

      case 'Fermé':
        return 'bg-gray-100 text-gray-600';

      default:
        return 'bg-gray-100 text-gray-600';

    }

  }


  // =====================================================
  // RÉINITIALISER LES FILTRES
  // =====================================================

  reinitialiserFiltres(): void {

    this.recherche = '';
    this.filtreStatut = 'Tous';
    this.filtreType = 'Tous';

  }

}