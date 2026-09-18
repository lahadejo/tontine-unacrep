import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Cycle {
  id: number;
  numero: string;
  carte: string;
  client: string;
  typeCarte: string;
  montantCotisation: number;
  dateDebut: string;
  dateFin: string;
  montantAttendu: number;
  montantCotise: number;
  statut: 'En cours' | 'Terminé' | 'Annulé';
}

@Component({
  selector: 'app-cycles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cycles.html',
  styleUrl: './cycles.css',
})
export class Cycles {

  recherche = '';
  filtreStatut = 'Tous';
  filtreType = 'Tous';

  cycles: Cycle[] = [
    {
      id: 1,
      numero: 'CYC-00001',
      carte: 'CAR-00125',
      client: 'Jean Kouassi',
      typeCarte: 'Journalière',
      montantCotisation: 500,
      dateDebut: '2026-08-11',
      dateFin: '2026-09-11',
      montantAttendu: 15500,
      montantCotise: 12000,
      statut: 'En cours'
    },
    {
      id: 2,
      numero: 'CYC-00002',
      carte: 'CAR-00126',
      client: 'Marie Adjovi',
      typeCarte: 'Mensuelle',
      montantCotisation: 5000,
      dateDebut: '2026-08-01',
      dateFin: '2026-09-01',
      montantAttendu: 5000,
      montantCotise: 5000,
      statut: 'Terminé'
    },
    {
      id: 3,
      numero: 'CYC-00003',
      carte: 'CAR-00130',
      client: 'Paul Hounkpe',
      typeCarte: 'Journalière',
      montantCotisation: 1000,
      dateDebut: '2026-08-20',
      dateFin: '2026-09-20',
      montantAttendu: 32000,
      montantCotise: 18000,
      statut: 'En cours'
    },
    {
      id: 4,
      numero: 'CYC-00004',
      carte: 'CAR-00131',
      client: 'Aminata Soglo',
      typeCarte: 'Mensuelle',
      montantCotisation: 10000,
      dateDebut: '2026-07-15',
      dateFin: '2026-08-15',
      montantAttendu: 10000,
      montantCotise: 7000,
      statut: 'Annulé'
    }
  ];


  // =====================================================
  // CYCLES FILTRÉS
  // =====================================================

  get cyclesFiltres(): Cycle[] {

    return this.cycles.filter((cycle) => {

      const recherche = this.recherche.toLowerCase().trim();

      const correspondRecherche =
        !recherche ||
        cycle.numero.toLowerCase().includes(recherche) ||
        cycle.carte.toLowerCase().includes(recherche) ||
        cycle.client.toLowerCase().includes(recherche);

      const correspondStatut =
        this.filtreStatut === 'Tous' ||
        cycle.statut === this.filtreStatut;

      const correspondType =
        this.filtreType === 'Tous' ||
        cycle.typeCarte === this.filtreType;

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

  get totalCycles(): number {
    return this.cycles.length;
  }

  get cyclesEnCours(): number {
    return this.cycles.filter(
      cycle => cycle.statut === 'En cours'
    ).length;
  }

  get cyclesTermines(): number {
    return this.cycles.filter(
      cycle => cycle.statut === 'Terminé'
    ).length;
  }

  get cyclesAnnules(): number {
    return this.cycles.filter(
      cycle => cycle.statut === 'Annulé'
    ).length;
  }


  // =====================================================
  // PROGRESSION
  // =====================================================

  calculerProgression(cycle: Cycle): number {

    if (cycle.montantAttendu <= 0) {
      return 0;
    }

    const progression =
      (cycle.montantCotise / cycle.montantAttendu) * 100;

    return Math.min(Math.round(progression), 100);
  }


  // =====================================================
  // RESTE À COTISER
  // =====================================================

  montantRestant(cycle: Cycle): number {

    return Math.max(
      cycle.montantAttendu - cycle.montantCotise,
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
  // STATUT
  // =====================================================

  getClasseStatut(statut: Cycle['statut']): string {

    switch (statut) {

      case 'En cours':
        return 'bg-green-100 text-green-700';

      case 'Terminé':
        return 'bg-blue-100 text-blue-700';

      case 'Annulé':
        return 'bg-red-100 text-red-700';

      default:
        return 'bg-gray-100 text-gray-600';
    }
  }


  // =====================================================
  // RÉINITIALISER FILTRES
  // =====================================================

  reinitialiserFiltres(): void {

    this.recherche = '';
    this.filtreStatut = 'Tous';
    this.filtreType = 'Tous';
  }

}