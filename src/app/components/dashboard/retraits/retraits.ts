import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface CarteRetrait {
  id: number;
  numero: string;
  type: string;
  cycle: string;
  dateFinCycle: string;
  solde: number;
  tauxCommission: number;
  statut: 'Éligible' | 'Non éligible';
}

interface Retrait {
  id: number;
  numero: string;
  client: string;
  matricule: string;
  carte: string;
  typeCarte: string;
  cycle: string;
  dateFinCycle: string;
  soldeDisponible: number;
  tauxCommission: number;
  commission: number;
  montantNet: number;
  operateur: 'MTN' | 'MOOV' | 'CELTIS';
  numeroMobileMoney: string;
  dateDemande: string;
  datePaiement: string | null;
  statut: 'En attente' | 'Approuvé' | 'Payé' | 'Rejeté';
}

@Component({
  selector: 'app-retraits',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './retraits.html',
  styleUrl: './retraits.css',
})
export class Retraits {

  // ============================================================
  // CLIENT CONNECTÉ
  // ============================================================

  clientConnecte = {
    id: 1,
    nom: 'Jean Kouassi',
    matricule: 'CLI-00001'
  };

  // ============================================================
  // CARTES DU CLIENT
  // ============================================================

  cartes: CarteRetrait[] = [
    {
      id: 1,
      numero: 'CAR-00125',
      type: 'Journalière',
      cycle: 'CYC-00001',
      dateFinCycle: '2026-09-11',
      solde: 12000,
      tauxCommission: 5,
      statut: 'Éligible'
    },
    {
      id: 2,
      numero: 'CAR-00126',
      type: 'Mensuelle',
      cycle: 'CYC-00002',
      dateFinCycle: '2026-09-01',
      solde: 5000,
      tauxCommission: 5,
      statut: 'Éligible'
    }
  ];

  // ============================================================
  // ÉTAT DE LA MODAL
  // ============================================================

  afficherModalRetrait = false;

  // ============================================================
  // FORMULAIRE DE RETRAIT
  // ============================================================

  carteSelectionnee: CarteRetrait | null = null;

  operateurSelectionne:
    'MTN' | 'MOOV' | 'CELTIS' | null = null;

  numeroMobileMoney = '';

  retraitEnCours = false;

  messageErreur = '';

  messageSucces = '';

  // ============================================================
  // FILTRES HISTORIQUE
  // ============================================================

  recherche = '';

  filtreStatut = 'Tous';

  filtreType = 'Tous';

  // ============================================================
  // DÉTAILS
  // ============================================================

  retraitSelectionne: Retrait | null = null;

  afficherDetails = false;

  // ============================================================
  // HISTORIQUE DES RETRAITS
  // ============================================================

  retraits: Retrait[] = [
    {
      id: 1,
      numero: 'RET-00001',
      client: 'Jean Kouassi',
      matricule: 'CLI-00001',
      carte: 'CAR-00125',
      typeCarte: 'Journalière',
      cycle: 'CYC-00001',
      dateFinCycle: '2026-09-11',
      soldeDisponible: 12000,
      tauxCommission: 5,
      commission: 600,
      montantNet: 11400,
      operateur: 'MTN',
      numeroMobileMoney: '0197000000',
      dateDemande: '2026-09-11',
      datePaiement: null,
      statut: 'En attente'
    },
    {
      id: 2,
      numero: 'RET-00002',
      client: 'Marie Adjovi',
      matricule: 'CLI-00002',
      carte: 'CAR-00130',
      typeCarte: 'Journalière',
      cycle: 'CYC-00003',
      dateFinCycle: '2026-09-20',
      soldeDisponible: 18500,
      tauxCommission: 5,
      commission: 925,
      montantNet: 17575,
      operateur: 'MOOV',
      numeroMobileMoney: '0169000000',
      dateDemande: '2026-09-20',
      datePaiement: null,
      statut: 'Approuvé'
    },
    {
      id: 3,
      numero: 'RET-00003',
      client: 'Paul Hounkpe',
      matricule: 'CLI-00003',
      carte: 'CAR-00131',
      typeCarte: 'Mensuelle',
      cycle: 'CYC-00004',
      dateFinCycle: '2026-09-15',
      soldeDisponible: 10000,
      tauxCommission: 5,
      commission: 500,
      montantNet: 9500,
      operateur: 'CELTIS',
      numeroMobileMoney: '0158000000',
      dateDemande: '2026-09-15',
      datePaiement: '2026-09-16',
      statut: 'Payé'
    }
  ];

  // ============================================================
  // OUVRIR LA MODAL
  // ============================================================

  ouvrirModalRetrait(): void {
    this.afficherModalRetrait = true;

    this.carteSelectionnee = null;
    this.operateurSelectionne = null;
    this.numeroMobileMoney = '';

    this.retraitEnCours = false;

    this.messageErreur = '';
    this.messageSucces = '';
  }

  // ============================================================
  // FERMER LA MODAL
  // ============================================================

  fermerModalRetrait(): void {
    this.afficherModalRetrait = false;

    this.carteSelectionnee = null;
    this.operateurSelectionne = null;
    this.numeroMobileMoney = '';

    this.retraitEnCours = false;

    this.messageErreur = '';
    this.messageSucces = '';
  }

  // ============================================================
  // SÉLECTIONNER UNE CARTE
  // ============================================================

  selectionnerCarte(carte: CarteRetrait): void {

    if (carte.statut !== 'Éligible') {
      return;
    }

    this.carteSelectionnee = carte;

    this.operateurSelectionne = null;

    this.numeroMobileMoney = '';

    this.messageErreur = '';
    this.messageSucces = '';
  }

  // ============================================================
  // SÉLECTIONNER UN OPÉRATEUR
  // ============================================================

  selectionnerOperateur(
    operateur: 'MTN' | 'MOOV' | 'CELTIS'
  ): void {

    this.operateurSelectionne = operateur;

    this.messageErreur = '';
    this.messageSucces = '';
  }

  // ============================================================
  // SOLDE DISPONIBLE
  // ============================================================

  get soldeDisponible(): number {

    return this.carteSelectionnee?.solde ?? 0;
  }

  // ============================================================
  // COMMISSION
  // IMPORTANT :
  // CE CALCUL RESTE INTERNE ET N'EST PAS AFFICHÉ AU CLIENT.
  // ============================================================

  get commissionRetrait(): number {

    if (!this.carteSelectionnee) {
      return 0;
    }

    return Math.round(
      this.soldeDisponible *
      this.carteSelectionnee.tauxCommission /
      100
    );
  }

  // ============================================================
  // MONTANT NET À RECEVOIR
  // ============================================================

  get montantNetRetrait(): number {

    return Math.max(
      this.soldeDisponible - this.commissionRetrait,
      0
    );
  }

  // ============================================================
  // VALIDATION NUMÉRO MOBILE MONEY
  // ============================================================

  numeroValide(): boolean {

    const numero =
      this.numeroMobileMoney.replace(/\s/g, '');

    return /^01\d{8}$/.test(numero);
  }

  // ============================================================
  // VALIDATION DU FORMULAIRE
  // ============================================================

  formulaireRetraitValide(): boolean {

    return !!(
      this.carteSelectionnee &&
      this.operateurSelectionne &&
      this.numeroValide() &&
      this.soldeDisponible > 0 &&
      !this.retraitEnCours
    );
  }

  // ============================================================
  // DEMANDER UN RETRAIT
  // ============================================================

  demanderRetrait(): void {

    this.messageErreur = '';
    this.messageSucces = '';

    // Carte obligatoire
    if (!this.carteSelectionnee) {

      this.messageErreur =
        'Veuillez sélectionner une carte.';

      return;
    }

    // Opérateur obligatoire
    if (!this.operateurSelectionne) {

      this.messageErreur =
        'Veuillez sélectionner un opérateur Mobile Money.';

      return;
    }

    // Numéro obligatoire
    if (!this.numeroValide()) {

      this.messageErreur =
        'Veuillez renseigner un numéro Mobile Money valide.';

      return;
    }

    // Solde
    if (this.soldeDisponible <= 0) {

      this.messageErreur =
        'Le solde disponible sur cette carte est insuffisant.';

      return;
    }

    this.retraitEnCours = true;

    // ==========================================================
    // DONNÉES QUI SERONT ENVOYÉES PLUS TARD À L'API LARAVEL
    // ==========================================================

    const demande = {

      client_id: this.clientConnecte.id,

      carte_id: this.carteSelectionnee.id,

      carte: this.carteSelectionnee.numero,

      cycle: this.carteSelectionnee.cycle,

      solde_disponible: this.soldeDisponible,

      taux_commission:
        this.carteSelectionnee.tauxCommission,

      commission:
        this.commissionRetrait,

      montant_net:
        this.montantNetRetrait,

      operateur:
        this.operateurSelectionne,

      numero_mobile_money:
        this.numeroMobileMoney
    };

    console.log(
      'Demande de retrait :',
      demande
    );

    // ==========================================================
    // SIMULATION
    // ==========================================================

    setTimeout(() => {

      const nouveauRetrait: Retrait = {

        id: this.retraits.length + 1,

        numero:
          `RET-${String(this.retraits.length + 1).padStart(5, '0')}`,

        client:
          this.clientConnecte.nom,

        matricule:
          this.clientConnecte.matricule,

        carte:
          this.carteSelectionnee!.numero,

        typeCarte:
          this.carteSelectionnee!.type,

        cycle:
          this.carteSelectionnee!.cycle,

        dateFinCycle:
          this.carteSelectionnee!.dateFinCycle,

        soldeDisponible:
          this.soldeDisponible,

        tauxCommission:
          this.carteSelectionnee!.tauxCommission,

        commission:
          this.commissionRetrait,

        montantNet:
          this.montantNetRetrait,

        operateur:
          this.operateurSelectionne!,

        numeroMobileMoney:
          this.numeroMobileMoney,

        dateDemande:
          new Date()
            .toISOString()
            .split('T')[0],

        datePaiement:
          null,

        statut:
          'En attente'
      };

      this.retraits.unshift(
        nouveauRetrait
      );

      this.retraitEnCours = false;

      this.messageSucces =
        `Votre demande de retrait de ${this.formaterMontant(this.montantNetRetrait)} FCFA a été enregistrée avec succès. Elle est en attente de validation.`;

      // Fermeture automatique de la modal
      setTimeout(() => {

        this.fermerModalRetrait();

      }, 1800);

    }, 1500);
  }

  // ============================================================
  // RETRAITS FILTRÉS
  // ============================================================

  get retraitsFiltres(): Retrait[] {

    const recherche =
      this.recherche
        .toLowerCase()
        .trim();

    return this.retraits.filter(
      (retrait) => {

        const correspondRecherche =
          !recherche ||
          retrait.numero
            .toLowerCase()
            .includes(recherche) ||
          retrait.client
            .toLowerCase()
            .includes(recherche) ||
          retrait.matricule
            .toLowerCase()
            .includes(recherche) ||
          retrait.carte
            .toLowerCase()
            .includes(recherche) ||
          retrait.cycle
            .toLowerCase()
            .includes(recherche);

        const correspondStatut =
          this.filtreStatut === 'Tous' ||
          retrait.statut === this.filtreStatut;

        const correspondType =
          this.filtreType === 'Tous' ||
          retrait.typeCarte === this.filtreType;

        return (
          correspondRecherche &&
          correspondStatut &&
          correspondType
        );
      }
    );
  }

  // ============================================================
  // STATISTIQUES
  // ============================================================

  get totalRetraits(): number {

    return this.retraits.length;
  }

  get retraitsEnAttente(): number {

    return this.retraits.filter(
      retrait =>
        retrait.statut === 'En attente'
    ).length;
  }

  get retraitsApprouves(): number {

    return this.retraits.filter(
      retrait =>
        retrait.statut === 'Approuvé'
    ).length;
  }

  get retraitsPayes(): number {

    return this.retraits.filter(
      retrait =>
        retrait.statut === 'Payé'
    ).length;
  }

  get montantTotalRetire(): number {

    return this.retraits
      .filter(
        retrait =>
          retrait.statut === 'Payé'
      )
      .reduce(
        (total, retrait) =>
          total + retrait.montantNet,
        0
      );
  }

  get totalCommissions(): number {

    return this.retraits
      .filter(
        retrait =>
          retrait.statut === 'Payé'
      )
      .reduce(
        (total, retrait) =>
          total + retrait.commission,
        0
      );
  }

  // ============================================================
  // FORMATAGE
  // ============================================================

  formaterMontant(
    montant: number
  ): string {

    return montant.toLocaleString(
      'fr-FR'
    );
  }

  formaterDate(
    date: string
  ): string {

    return new Date(date)
      .toLocaleDateString(
        'fr-FR',
        {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }
      );
  }

  // ============================================================
  // CLASSE STATUT
  // ============================================================

  getClasseStatut(
    statut: Retrait['statut']
  ): string {

    switch (statut) {

      case 'En attente':
        return 'bg-orange-100 text-orange-700';

      case 'Approuvé':
        return 'bg-blue-100 text-blue-700';

      case 'Payé':
        return 'bg-green-100 text-green-700';

      case 'Rejeté':
        return 'bg-red-100 text-red-700';

      default:
        return 'bg-gray-100 text-gray-600';
    }
  }

  // ============================================================
  // LABEL OPÉRATEUR
  // ============================================================

  getLabelOperateur(
    operateur: Retrait['operateur']
  ): string {

    switch (operateur) {

      case 'MTN':
        return 'MTN Mobile Money';

      case 'MOOV':
        return 'Moov Money';

      case 'CELTIS':
        return 'Celtiis Cash';

      default:
        return operateur;
    }
  }

  // ============================================================
  // DÉTAILS
  // ============================================================

  voirDetails(
    retrait: Retrait
  ): void {

    this.retraitSelectionne =
      retrait;

    this.afficherDetails = true;
  }

  fermerDetails(): void {

    this.retraitSelectionne =
      null;

    this.afficherDetails = false;
  }

  // ============================================================
  // FILTRES
  // ============================================================

  reinitialiserFiltres(): void {

    this.recherche = '';

    this.filtreStatut = 'Tous';

    this.filtreType = 'Tous';
  }
}