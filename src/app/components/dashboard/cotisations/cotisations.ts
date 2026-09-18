import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface CarteCotisation {
  id: number;
  numero: string;
  type: 'Journalière' | 'Mensuelle';
  montant: number;
  cycle: string;
  statut: 'Active' | 'Inactive';
  prochaineCotisation: string;
}

interface Cotisation {
  id: number;
  reference: string;
  carte: string;
  typeCarte: string;
  cycle: string;
  montant: number;
  operateur: 'MTN' | 'MOOV' | 'CELTIS';
  numeroMobileMoney: string;
  date: string;
  statut: 'Confirmée' | 'En attente' | 'Échouée';
}

@Component({
  selector: 'app-cotisations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cotisations.html',
  styleUrl: './cotisations.css',
})
export class Cotisations {

  // =========================================================
  // CLIENT CONNECTÉ
  // =========================================================

  clientConnecte = {
    id: 1,
    nom: 'Jean Kouassi',
    matricule: 'CLI-00001'
  };

  // =========================================================
  // CARTES DU CLIENT CONNECTÉ
  // =========================================================

  cartes: CarteCotisation[] = [
    {
      id: 1,
      numero: 'CAR-00125',
      type: 'Journalière',
      montant: 500,
      cycle: '11 août 2026 → 11 septembre 2026',
      statut: 'Active',
      prochaineCotisation: '18 septembre 2026'
    },
    {
      id: 2,
      numero: 'CAR-00126',
      type: 'Mensuelle',
      montant: 5000,
      cycle: '01 septembre 2026 → 01 octobre 2026',
      statut: 'Active',
      prochaineCotisation: '01 octobre 2026'
    }
  ];

  // =========================================================
  // MODAL COTISATION
  // =========================================================

  afficherModalCotisation = false;

  carteSelectionnee: CarteCotisation | null = null;

  operateurSelectionne:
    | 'MTN'
    | 'MOOV'
    | 'CELTIS'
    | null = null;

  numeroMobileMoney = '';

  cotisationEnCours = false;

  messageErreur = '';

  messageSucces = '';

  // =========================================================
  // FILTRES
  // =========================================================

  recherche = '';

  filtreStatut = 'Tous';

  filtreType = 'Tous';

  // =========================================================
  // DETAILS
  // =========================================================

  cotisationSelectionnee: Cotisation | null = null;

  afficherDetails = false;

  // =========================================================
  // HISTORIQUE DES COTISATIONS
  // =========================================================

  cotisations: Cotisation[] = [
    {
      id: 1,
      reference: 'COT-00001',
      carte: 'CAR-00125',
      typeCarte: 'Journalière',
      cycle: 'CYC-00001',
      montant: 500,
      operateur: 'MTN',
      numeroMobileMoney: '0197000000',
      date: '2026-09-17',
      statut: 'Confirmée'
    },
    {
      id: 2,
      reference: 'COT-00002',
      carte: 'CAR-00125',
      typeCarte: 'Journalière',
      cycle: 'CYC-00001',
      montant: 500,
      operateur: 'MOOV',
      numeroMobileMoney: '0169000000',
      date: '2026-09-16',
      statut: 'Confirmée'
    },
    {
      id: 3,
      reference: 'COT-00003',
      carte: 'CAR-00126',
      typeCarte: 'Mensuelle',
      cycle: 'CYC-00002',
      montant: 5000,
      operateur: 'MTN',
      numeroMobileMoney: '0197000000',
      date: '2026-09-01',
      statut: 'Confirmée'
    },
    {
      id: 4,
      reference: 'COT-00004',
      carte: 'CAR-00125',
      typeCarte: 'Journalière',
      cycle: 'CYC-00001',
      montant: 500,
      operateur: 'CELTIS',
      numeroMobileMoney: '0158000000',
      date: '2026-09-15',
      statut: 'En attente'
    }
  ];

  // =========================================================
  // OUVRIR LA MODAL
  // =========================================================

  ouvrirModalCotisation(): void {
    this.carteSelectionnee = null;
    this.operateurSelectionne = null;
    this.numeroMobileMoney = '';

    this.cotisationEnCours = false;

    this.messageErreur = '';
    this.messageSucces = '';

    this.afficherModalCotisation = true;
  }

  // =========================================================
  // FERMER LA MODAL
  // =========================================================

  fermerModalCotisation(): void {
    if (this.cotisationEnCours) {
      return;
    }

    this.afficherModalCotisation = false;

    this.carteSelectionnee = null;
    this.operateurSelectionne = null;
    this.numeroMobileMoney = '';

    this.messageErreur = '';
    this.messageSucces = '';
  }

  // =========================================================
  // SÉLECTIONNER UNE CARTE
  // =========================================================

  selectionnerCarte(carte: CarteCotisation): void {

    if (carte.statut !== 'Active') {
      return;
    }

    this.carteSelectionnee = carte;

    this.operateurSelectionne = null;

    this.numeroMobileMoney = '';

    this.messageErreur = '';
    this.messageSucces = '';
  }

  // =========================================================
  // SÉLECTIONNER UN OPÉRATEUR
  // =========================================================

  selectionnerOperateur(
    operateur: 'MTN' | 'MOOV' | 'CELTIS'
  ): void {

    this.operateurSelectionne = operateur;

    this.messageErreur = '';
  }

  // =========================================================
  // MONTANT AUTOMATIQUE
  // =========================================================

  get montantCotisation(): number {
    return this.carteSelectionnee?.montant ?? 0;
  }

  // =========================================================
  // VALIDATION DU NUMÉRO MOBILE MONEY
  // =========================================================

  numeroValide(): boolean {
    return /^01\d{8}$/.test(this.numeroMobileMoney.trim());
  }

  // =========================================================
  // VALIDATION DU FORMULAIRE
  // =========================================================

  formulaireCotisationValide(): boolean {

    return !!(
      this.carteSelectionnee &&
      this.operateurSelectionne &&
      this.numeroValide() &&
      this.montantCotisation > 0 &&
      !this.cotisationEnCours
    );
  }

  // =========================================================
  // EFFECTUER LA COTISATION
  // =========================================================

  effectuerCotisation(): void {

    this.messageErreur = '';
    this.messageSucces = '';

    if (!this.carteSelectionnee) {
      this.messageErreur = 'Veuillez sélectionner une carte.';
      return;
    }

    if (!this.operateurSelectionne) {
      this.messageErreur = 'Veuillez sélectionner un opérateur Mobile Money.';
      return;
    }

    if (!this.numeroMobileMoney.trim()) {
      this.messageErreur = 'Veuillez saisir votre numéro Mobile Money.';
      return;
    }

    if (!this.numeroValide()) {
      this.messageErreur =
        'Le numéro Mobile Money doit contenir 10 chiffres et commencer par 01.';
      return;
    }

    if (this.montantCotisation <= 0) {
      this.messageErreur =
        'Le montant de la cotisation est invalide.';
      return;
    }

    // =======================================================
    // SIMULATION DU PAIEMENT
    // Plus tard :
    // Angular → Laravel → API opérateur → confirmation
    // =======================================================

    this.cotisationEnCours = true;

    const payload = {
      client_id: this.clientConnecte.id,
      carte_id: this.carteSelectionnee.id,
      carte: this.carteSelectionnee.numero,
      montant: this.montantCotisation,
      operateur: this.operateurSelectionne,
      numero_mobile_money: this.numeroMobileMoney.trim()
    };

    console.log('Payload cotisation :', payload);

    setTimeout(() => {

      const nouvelleCotisation: Cotisation = {
        id: this.cotisations.length + 1,

        reference:
          `COT-${String(this.cotisations.length + 1).padStart(5, '0')}`,

        carte: this.carteSelectionnee!.numero,

        typeCarte: this.carteSelectionnee!.type,

        cycle: this.carteSelectionnee!.cycle,

        montant: this.montantCotisation,

        operateur: this.operateurSelectionne!,

        numeroMobileMoney: this.numeroMobileMoney.trim(),

        date: new Date().toISOString().split('T')[0],

        statut: 'Confirmée'
      };

      this.cotisations.unshift(nouvelleCotisation);

      this.cotisationEnCours = false;

      this.messageSucces =
        `Cotisation de ${this.formaterMontant(
          nouvelleCotisation.montant
        )} FCFA effectuée avec succès.`;

      // Plus tard :
      // 1. Enregistrer la cotisation
      // 2. Mettre à jour le pointage
      // 3. Mettre à jour le portefeuille de la carte

      setTimeout(() => {

        this.afficherModalCotisation = false;

        this.messageSucces = '';

        this.carteSelectionnee = null;

        this.operateurSelectionne = null;

        this.numeroMobileMoney = '';

      }, 1800);

    }, 1500);
  }

  // =========================================================
  // COTISATIONS FILTRÉES
  // =========================================================

  get cotisationsFiltrees(): Cotisation[] {

    const recherche = this.recherche
      .toLowerCase()
      .trim();

    return this.cotisations.filter(cotisation => {

      const correspondRecherche =
        !recherche ||
        cotisation.reference.toLowerCase().includes(recherche) ||
        cotisation.carte.toLowerCase().includes(recherche) ||
        cotisation.operateur.toLowerCase().includes(recherche);

      const correspondStatut =
        this.filtreStatut === 'Tous' ||
        cotisation.statut === this.filtreStatut;

      const correspondType =
        this.filtreType === 'Tous' ||
        cotisation.typeCarte === this.filtreType;

      return (
        correspondRecherche &&
        correspondStatut &&
        correspondType
      );
    });
  }

  // =========================================================
  // STATISTIQUES
  // =========================================================

  get totalCotisations(): number {
    return this.cotisations.length;
  }

  get cotisationsConfirmees(): number {
    return this.cotisations.filter(
      c => c.statut === 'Confirmée'
    ).length;
  }

  get cotisationsEnAttente(): number {
    return this.cotisations.filter(
      c => c.statut === 'En attente'
    ).length;
  }

  get montantTotalCotise(): number {
    return this.cotisations
      .filter(c => c.statut === 'Confirmée')
      .reduce((total, c) => total + c.montant, 0);
  }

  // =========================================================
  // DETAILS
  // =========================================================

  voirDetails(cotisation: Cotisation): void {

    this.cotisationSelectionnee = cotisation;

    this.afficherDetails = true;
  }

  fermerDetails(): void {

    this.afficherDetails = false;

    this.cotisationSelectionnee = null;
  }

  // =========================================================
  // STATUT
  // =========================================================

  getClasseStatut(statut: Cotisation['statut']): string {

    switch (statut) {

      case 'Confirmée':
        return 'bg-green-100 text-green-700';

      case 'En attente':
        return 'bg-yellow-100 text-yellow-700';

      case 'Échouée':
        return 'bg-red-100 text-red-700';

      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  // =========================================================
  // OPÉRATEUR
  // =========================================================

  getLabelOperateur(
    operateur: Cotisation['operateur']
  ): string {

    switch (operateur) {

      case 'MTN':
        return 'MTN MoMo';

      case 'MOOV':
        return 'Moov Money';

      case 'CELTIS':
        return 'Celtiis Cash';

      default:
        return operateur;
    }
  }

  // =========================================================
  // FORMAT MONTANT
  // =========================================================

  formaterMontant(montant: number): string {

    return new Intl.NumberFormat('fr-FR').format(montant);
  }

  // =========================================================
  // FORMAT DATE
  // =========================================================

  formaterDate(date: string): string {

    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(date));
  }

  // =========================================================
  // RÉINITIALISER LES FILTRES
  // =========================================================

  reinitialiserFiltres(): void {

    this.recherche = '';

    this.filtreStatut = 'Tous';

    this.filtreType = 'Tous';
  }
}