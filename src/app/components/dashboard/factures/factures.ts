import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import QRCode from 'qrcode';

interface Pointage {
  jour: number;
  date: string;
  statut: 'effectue' | 'non_effectue';
}

interface Retrait {
  statut: 'effectue' | 'en_attente';
  date?: string;
  montantBrut: number;
  tauxCommission: number;
  commission: number;
  montantNet: number;
  mode?: string;
  reference?: string;
}

interface Carte {
  numero: string;
  type: string;
  montant: number;
  frequence: string;
  cycle: string;
  statut: 'Active' | 'Terminée' | 'Inactive';
}

interface Client {
  nom: string;
  matricule: string;
  telephone: string;
  agence: string;
}

interface Facture {
  id: number;
  numero: string;
  dateEmission: string;
  client: Client;
  carte: Carte;
  pointages: Pointage[];
  totalCotise: number;
  solde: number;
  retrait: Retrait;
}

@Component({
  selector: 'app-factures',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './factures.html',
  styleUrl: './factures.css'
})
export class Factures {

  recherche = '';
  filtreStatut = 'Tous';
  filtreType = 'Tous';

  showDetailsModal = false;
  selectedFacture: Facture | null = null;

  factures: Facture[] = [
    {
      id: 1,
      numero: 'FAC-2026-000125',
      dateEmission: '18/09/2026',

      client: {
        nom: 'Jean Kouassi',
        matricule: 'CL-00045',
        telephone: '97 00 00 01',
        agence: 'Agence Centrale'
      },

      carte: {
        numero: 'CAR-00125',
        type: 'Journalière',
        montant: 500,
        frequence: 'Chaque jour',
        cycle: '18/09/2026 - 18/10/2026',
        statut: 'Terminée'
      },

      pointages: this.genererPointages(
        '18/09/2026',
        31,
        31
      ),

      totalCotise: 15500,
      solde: 15500,

      retrait: {
        statut: 'effectue',
        date: '18/10/2026',
        montantBrut: 15500,
        tauxCommission: 10,
        commission: 1550,
        montantNet: 13950,
        mode: 'Mobile Money',
        reference: 'RET-2026-000125'
      }
    },

    {
      id: 2,
      numero: 'FAC-2026-000124',
      dateEmission: '18/09/2026',

      client: {
        nom: 'Marie Adé',
        matricule: 'CL-00046',
        telephone: '97 00 00 02',
        agence: 'Agence Porto-Novo'
      },

      carte: {
        numero: 'CAR-00126',
        type: 'Journalière',
        montant: 500,
        frequence: 'Chaque jour',
        cycle: '10/09/2026 - 10/10/2026',
        statut: 'Active'
      },

      pointages: this.genererPointages(
        '10/09/2026',
        30,
        28
      ),

      totalCotise: 14000,
      solde: 14000,

      retrait: {
        statut: 'en_attente',
        montantBrut: 14000,
        tauxCommission: 10,
        commission: 1400,
        montantNet: 12600
      }
    },

    {
      id: 3,
      numero: 'FAC-2026-000123',
      dateEmission: '18/09/2026',

      client: {
        nom: 'Paul Sossa',
        matricule: 'CL-00047',
        telephone: '97 00 00 03',
        agence: 'Agence Abomey'
      },

      carte: {
        numero: 'CAR-00127',
        type: 'Mensuelle',
        montant: 5000,
        frequence: 'Chaque mois',
        cycle: '01/09/2026 - 01/12/2026',
        statut: 'Active'
      },

      pointages: this.genererPointages(
        '01/09/2026',
        3,
        1
      ),

      totalCotise: 5000,
      solde: 5000,

      retrait: {
        statut: 'en_attente',
        montantBrut: 5000,
        tauxCommission: 10,
        commission: 500,
        montantNet: 4500
      }
    }
  ];

  // =========================================================
  // POINTAGES
  // =========================================================

  genererPointages(
    dateDebut: string,
    nombre: number,
    effectues: number
  ): Pointage[] {

    const pointages: Pointage[] = [];

    const [jour, mois, annee] =
      dateDebut.split('/').map(Number);

    const date = new Date(
      annee,
      mois - 1,
      jour
    );

    for (let i = 0; i < nombre; i++) {

      const currentDate = new Date(date);

      currentDate.setDate(
        date.getDate() + i
      );

      const jourFormate =
        String(currentDate.getDate()).padStart(2, '0');

      const moisFormate =
        String(currentDate.getMonth() + 1).padStart(2, '0');

      pointages.push({
        jour: i + 1,

        date:
          `${jourFormate}/${moisFormate}/${currentDate.getFullYear()}`,

        statut:
          i < effectues
            ? 'effectue'
            : 'non_effectue'
      });
    }

    return pointages;
  }

  // =========================================================
  // FILTRES
  // =========================================================

  get facturesFiltrees(): Facture[] {

    return this.factures.filter(facture => {

      const recherche =
        this.recherche
          .toLowerCase()
          .trim();

      const rechercheOk =
        !recherche ||
        facture.numero
          .toLowerCase()
          .includes(recherche) ||
        facture.client.nom
          .toLowerCase()
          .includes(recherche) ||
        facture.client.matricule
          .toLowerCase()
          .includes(recherche) ||
        facture.carte.numero
          .toLowerCase()
          .includes(recherche);

      const statutOk =
        this.filtreStatut === 'Tous' ||
        (
          this.filtreStatut === 'Retiré' &&
          facture.retrait.statut === 'effectue'
        ) ||
        (
          this.filtreStatut === 'En attente' &&
          facture.retrait.statut === 'en_attente'
        );

      const typeOk =
        this.filtreType === 'Tous' ||
        facture.carte.type === this.filtreType;

      return rechercheOk && statutOk && typeOk;
    });
  }

  // =========================================================
  // STATISTIQUES
  // =========================================================

  get totalFactures(): number {
    return this.factures.length;
  }

  get facturesRetirees(): number {
    return this.factures.filter(
      f => f.retrait.statut === 'effectue'
    ).length;
  }

  get facturesEnAttente(): number {
    return this.factures.filter(
      f => f.retrait.statut === 'en_attente'
    ).length;
  }

  get montantTotal(): number {
    return this.factures.reduce(
      (total, facture) =>
        total + facture.totalCotise,
      0
    );
  }

  // =========================================================
  // MODAL
  // =========================================================

  openDetails(facture: Facture): void {

    this.selectedFacture = facture;
    this.showDetailsModal = true;

    setTimeout(() => {
      this.genererQrCode(facture);
    }, 200);
  }

  closeDetails(): void {

    this.showDetailsModal = false;
    this.selectedFacture = null;
  }

  // =========================================================
  // QR CODE
  // =========================================================

  getQrData(facture: Facture): string {

    return [
      'UNACREP',
      `FACTURE:${facture.numero}`,
      `CLIENT:${facture.client.matricule}`,
      `CARTE:${facture.carte.numero}`,
      `CYCLE:${facture.carte.cycle}`
    ].join('|');
  }

  async genererQrCode(
    facture: Facture
  ): Promise<void> {

    const canvas =
      document.getElementById(
        `qr-${facture.numero}`
      ) as HTMLCanvasElement | null;

    if (!canvas) {
      return;
    }

    try {

      await QRCode.toCanvas(
        canvas,
        this.getQrData(facture),
        {
          width: 120,
          margin: 1,
          errorCorrectionLevel: 'M'
        }
      );

    } catch (error) {

      console.error(
        'Erreur QR Code :',
        error
      );
    }
  }

  // =========================================================
  // CALCULS
  // =========================================================

  getNombrePointagesEffectues(
    facture: Facture
  ): number {

    return facture.pointages.filter(
      p => p.statut === 'effectue'
    ).length;
  }

  getNombrePointagesPrevus(
    facture: Facture
  ): number {

    return facture.pointages.length;
  }

  getPourcentagePointage(
    facture: Facture
  ): number {

    if (!facture.pointages.length) {
      return 0;
    }

    return Math.round(
      (
        this.getNombrePointagesEffectues(facture) /
        facture.pointages.length
      ) * 100
    );
  }

  // =========================================================
  // FORMATAGE
  // =========================================================

  formatMontant(
    montant: number
  ): string {

    return (
      new Intl.NumberFormat('fr-FR')
        .format(montant) +
      ' FCFA'
    );
  }

  formatNombre(
    montant: number
  ): string {

    return new Intl.NumberFormat('fr-FR')
      .format(montant);
  }

  getRetraitLabel(
    retrait: Retrait
  ): string {

    return retrait.statut === 'effectue'
      ? 'Retrait effectué'
      : 'Retrait en attente';
  }

  // =========================================================
  // ACTIONS
  // =========================================================

  imprimerFacture(): void {
    window.print();
  }

  telechargerPDF(): void {

    alert(
      'La génération PDF sera connectée au service Laravel.'
    );
  }

  reinitialiserFiltres(): void {

    this.recherche = '';
    this.filtreStatut = 'Tous';
    this.filtreType = 'Tous';
  }
}