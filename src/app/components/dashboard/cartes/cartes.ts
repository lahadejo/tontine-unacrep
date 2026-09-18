import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type StatutCarte = 'Active' | 'Désactivée';

interface JourPointage {
  jour: number;
  date: string;
  paye: boolean;
  montant: number;
}

interface ClientCarte {
  id: number;
  nom: string;
  prenoms: string;
  matricule: string;
  npi: string;
  localite: string;
  agence: string;
  telephone: string;
  photo?: string;
}

interface CarteTontine {
  id: number;
  numeroCarte: string;
  clientId: number;
  typeCarte: string;
  montantCotisation: number;
  frequence: string;
  statut: StatutCarte;
  dateActivation: string;
  debutCycle: string;
  finCycle: string;
  dateRetrait: string;
  pointage: JourPointage[];
}

@Component({
  selector: 'app-cartes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './cartes.html',
  styleUrl: './cartes.css',
})
export class Cartes {

  // =====================================================
  // MODALES
  // =====================================================

  modalNouvelleCarte = false;

  modalPointage = false;

  modalDetails = false;


  // =====================================================
  // MODE FORMULAIRE
  // =====================================================

  modeModification = false;

  carteEnModification: CarteTontine | null = null;


  // =====================================================
  // CLIENT CONNECTÉ
  // =====================================================

  /*
   * En production, cette valeur viendra de l'utilisateur
   * connecté via le système d'authentification.
   *
   * Pour le moment, le client 1 représente le client connecté.
   */
  clientConnecteId = 1;


  // =====================================================
  // CLIENTS
  // =====================================================

  clients: ClientCarte[] = [
    {
      id: 1,
      nom: 'Kossi',
      prenoms: 'Jean',
      matricule: 'UNACREP-2026-000001',
      npi: '123456789012',
      localite: 'Pobè',
      agence: 'Agence UNACREP Pobè',
      telephone: '97000000',
      photo: ''
    },
    {
      id: 2,
      nom: 'Adjovi',
      prenoms: 'Marie',
      matricule: 'UNACREP-2026-000002',
      npi: '234567890123',
      localite: 'Porto-Novo',
      agence: 'Agence UNACREP Porto-Novo',
      telephone: '96000000',
      photo: ''
    },
    {
      id: 3,
      nom: 'Dossou',
      prenoms: 'Paul',
      matricule: 'UNACREP-2026-000003',
      npi: '345678901234',
      localite: 'Cotonou',
      agence: 'Agence UNACREP Cotonou',
      telephone: '95000000',
      photo: ''
    }
  ];


  // =====================================================
  // CARTES
  // =====================================================

  cartes: CarteTontine[] = [

    {
      id: 1,
      numeroCarte: 'TNT-2026-000124',
      clientId: 1,
      typeCarte: 'Tontine Standard',
      montantCotisation: 500,
      frequence: 'Journalière',
      statut: 'Active',
      dateActivation: '2026-08-11',
      debutCycle: '2026-08-11',
      finCycle: '2026-09-10',
      dateRetrait: '2026-09-11',
      pointage: this.genererPointage(
        '2026-08-11',
        '2026-09-10',
        500,
        [11, 12, 13, 14, 17, 18, 19, 20]
      )
    },

    {
      id: 2,
      numeroCarte: 'TNT-2026-000125',
      clientId: 1,
      typeCarte: 'Tontine Épargne',
      montantCotisation: 1000,
      frequence: 'Journalière',
      statut: 'Active',
      dateActivation: '2026-08-20',
      debutCycle: '2026-08-20',
      finCycle: '2026-09-19',
      dateRetrait: '2026-09-20',
      pointage: this.genererPointage(
        '2026-08-20',
        '2026-09-19',
        1000,
        [20, 21, 22, 23, 24]
      )
    },

    {
      id: 3,
      numeroCarte: 'TNT-2026-000126',
      clientId: 2,
      typeCarte: 'Tontine Standard',
      montantCotisation: 500,
      frequence: 'Journalière',
      statut: 'Active',
      dateActivation: '2026-08-15',
      debutCycle: '2026-08-15',
      finCycle: '2026-09-14',
      dateRetrait: '2026-09-15',
      pointage: this.genererPointage(
        '2026-08-15',
        '2026-09-14',
        500,
        [15, 16, 17, 18, 19, 20]
      )
    },

    {
      id: 4,
      numeroCarte: 'TNT-2026-000127',
      clientId: 3,
      typeCarte: 'Tontine Premium',
      montantCotisation: 2000,
      frequence: 'Journalière',
      statut: 'Désactivée',
      dateActivation: '2026-08-05',
      debutCycle: '2026-08-05',
      finCycle: '2026-09-04',
      dateRetrait: '2026-09-05',
      pointage: this.genererPointage(
        '2026-08-05',
        '2026-09-04',
        2000,
        [5, 6, 7, 8, 9]
      )
    }

  ];


  // =====================================================
  // CARTE SÉLECTIONNÉE
  // =====================================================

  carteSelectionnee: CarteTontine | null = null;


  // =====================================================
  // FORMULAIRE CARTE
  // =====================================================

  nouvelleCarte = {
    clientId: null as number | null,
    typeCarte: '',
    montantCotisation: null as number | null,
    frequence: 'Journalière',
    dateActivation: '',
    photo: ''
  };


  // =====================================================
  // STATISTIQUES
  // =====================================================

  get totalCartes(): number {
    return this.cartes.length;
  }


  get cartesActives(): number {
    return this.cartes.filter(
      carte => carte.statut === 'Active'
    ).length;
  }


  get cartesDesactivees(): number {
    return this.cartes.filter(
      carte => carte.statut === 'Désactivée'
    ).length;
  }


  get cyclesEnCours(): number {
    return this.cartes.filter(
      carte =>
        carte.statut === 'Active' &&
        new Date(carte.finCycle) >= new Date(this.dateAujourdHui())
    ).length;
  }


  // =====================================================
  // CLIENT CONNECTÉ
  // =====================================================

  get clientConnecte(): ClientCarte | undefined {
    return this.getClient(this.clientConnecteId);
  }


  // =====================================================
  // NOUVELLE CARTE
  // =====================================================

  ouvrirNouvelleCarte(): void {

    this.modeModification = false;

    this.carteEnModification = null;

    this.nouvelleCarte = {
      clientId: this.clientConnecteId,
      typeCarte: '',
      montantCotisation: null,
      frequence: 'Journalière',
      dateActivation: '',
      photo: this.clientConnecte?.photo || ''
    };

    this.modalNouvelleCarte = true;
  }


  fermerNouvelleCarte(): void {

    this.modalNouvelleCarte = false;

    this.modeModification = false;

    this.carteEnModification = null;
  }


  // =====================================================
  // MODIFIER UNE CARTE
  // =====================================================

  modifierCarte(
    carte: CarteTontine
  ): void {

    this.modeModification = true;

    this.carteEnModification = carte;

    this.nouvelleCarte = {
      clientId: carte.clientId,
      typeCarte: carte.typeCarte,
      montantCotisation: carte.montantCotisation,
      frequence: carte.frequence,
      dateActivation: carte.dateActivation,
      photo: this.getClient(carte.clientId)?.photo || ''
    };

    this.modalNouvelleCarte = true;
  }


  // =====================================================
  // PHOTO
  // =====================================================

  onPhotoSelectionnee(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;

    if (
      !input.files ||
      input.files.length === 0
    ) {
      return;
    }

    const fichier =
      input.files[0];

    const reader =
      new FileReader();

    reader.onload = () => {

      this.nouvelleCarte.photo =
        reader.result as string;
    };

    reader.readAsDataURL(fichier);
  }


  // =====================================================
  // ENREGISTRER / MODIFIER
  // =====================================================

  enregistrerCarte(): void {

    if (
      !this.nouvelleCarte.typeCarte ||
      !this.nouvelleCarte.montantCotisation ||
      !this.nouvelleCarte.frequence ||
      !this.nouvelleCarte.dateActivation
    ) {

      alert(
        'Veuillez remplir tous les champs obligatoires.'
      );

      return;
    }


    // ===================================================
    // MODIFICATION
    // ===================================================

    if (
      this.modeModification &&
      this.carteEnModification
    ) {

      const carte =
        this.carteEnModification;

      const ancienClientId =
        carte.clientId;

      carte.typeCarte =
        this.nouvelleCarte.typeCarte;

      carte.montantCotisation =
        Number(
          this.nouvelleCarte.montantCotisation
        );

      carte.frequence =
        this.nouvelleCarte.frequence;

      carte.dateActivation =
        this.nouvelleCarte.dateActivation;

      carte.debutCycle =
        this.nouvelleCarte.dateActivation;

      carte.finCycle =
        this.calculerFinCycle(
          carte.debutCycle
        );

      carte.dateRetrait =
        this.ajouterUnJour(
          carte.finCycle
        );

      carte.pointage =
        this.genererPointage(
          carte.debutCycle,
          carte.finCycle,
          carte.montantCotisation,
          []
        );

      const client =
        this.getClient(ancienClientId);

      if (client) {
        client.photo =
          this.nouvelleCarte.photo;
      }

      this.fermerNouvelleCarte();

      alert(
        `Carte ${carte.numeroCarte} modifiée avec succès.`
      );

      return;
    }


    // ===================================================
    // CRÉATION
    // ===================================================

    const clientId =
      this.clientConnecteId;


    const debutCycle =
      this.nouvelleCarte.dateActivation;


    const finCycle =
      this.calculerFinCycle(
        debutCycle
      );


    const dateRetrait =
      this.ajouterUnJour(
        finCycle
      );


    const nouvelId =
      this.cartes.length > 0
        ? Math.max(
            ...this.cartes.map(
              carte => carte.id
            )
          ) + 1
        : 1;


    const nouvelleCarte: CarteTontine = {

      id: nouvelId,

      numeroCarte:
        this.genererNumeroCarte(),

      clientId:
        clientId,

      typeCarte:
        this.nouvelleCarte.typeCarte,

      montantCotisation:
        Number(
          this.nouvelleCarte.montantCotisation
        ),

      frequence:
        this.nouvelleCarte.frequence,

      statut:
        'Active',

      dateActivation:
        debutCycle,

      debutCycle:
        debutCycle,

      finCycle:
        finCycle,

      dateRetrait:
        dateRetrait,

      pointage:
        this.genererPointage(
          debutCycle,
          finCycle,
          Number(
            this.nouvelleCarte.montantCotisation
          ),
          []
        )
    };


    this.cartes.push(
      nouvelleCarte
    );


    const client =
      this.getClient(clientId);

    if (client) {

      client.photo =
        this.nouvelleCarte.photo;
    }


    this.fermerNouvelleCarte();


    alert(
      `Carte créée avec succès.\nNuméro : ${nouvelleCarte.numeroCarte}`
    );
  }


  // =====================================================
  // GÉNÉRATION NUMÉRO CARTE
  // =====================================================

  private genererNumeroCarte(): string {

    const prochainNumero =
      this.cartes.length > 0
        ? Math.max(
            ...this.cartes.map(
              carte => {
                const partie =
                  carte.numeroCarte.split('-').pop();

                return Number(partie) || 0;
              }
            )
          ) + 1
        : 1;

    return `TNT-${new Date().getFullYear()}-${String(
      prochainNumero
    ).padStart(6, '0')}`;
  }


  // =====================================================
  // CALCUL DU CYCLE
  // =====================================================

  calculerFinCycle(
    dateDebut: string
  ): string {

    const date =
      new Date(dateDebut);

    date.setDate(
      date.getDate() + 30
    );

    date.setDate(
      date.getDate() - 1
    );

    return this.formatDateISO(
      date
    );
  }


  ajouterUnJour(
    dateString: string
  ): string {

    const date =
      new Date(dateString);

    date.setDate(
      date.getDate() + 1
    );

    return this.formatDateISO(
      date
    );
  }


  // =====================================================
  // GÉNÉRATION DU POINTAGE
  // =====================================================

  private genererPointage(
    debut: string,
    fin: string,
    montant: number,
    joursPayes: number[]
  ): JourPointage[] {

    const resultat: JourPointage[] = [];

    const dateDebut =
      new Date(debut);

    const dateFin =
      new Date(fin);


    let dateActuelle =
      new Date(dateDebut);


    while (
      dateActuelle <= dateFin
    ) {

      const jour =
        dateActuelle.getDate();


      resultat.push({

        jour,

        date:
          this.formatDateISO(
            dateActuelle
          ),

        paye:
          joursPayes.includes(
            jour
          ),

        montant:
          joursPayes.includes(
            jour
          )
            ? montant
            : 0

      });


      dateActuelle.setDate(
        dateActuelle.getDate() + 1
      );
    }


    return resultat;
  }


  // =====================================================
  // VOIR LE POINTAGE
  // =====================================================

  voirPointage(
    carte: CarteTontine
  ): void {

    this.carteSelectionnee =
      carte;

    this.modalPointage =
      true;
  }


  fermerPointage(): void {

    this.modalPointage =
      false;

    this.carteSelectionnee =
      null;
  }


  // =====================================================
  // VOIR LES DÉTAILS
  // =====================================================

  voirDetails(
    carte: CarteTontine
  ): void {

    this.carteSelectionnee =
      carte;

    this.modalDetails =
      true;
  }


  fermerDetails(): void {

    this.modalDetails =
      false;

    this.carteSelectionnee =
      null;
  }


  // =====================================================
  // CLIENT
  // =====================================================

  getClient(
    clientId: number
  ): ClientCarte | undefined {

    return this.clients.find(
      client =>
        client.id === clientId
    );
  }


  nomComplet(
    clientId: number
  ): string {

    const client =
      this.getClient(clientId);

    if (!client) {
      return '-';
    }

    return `${client.nom} ${client.prenoms}`;
  }


  // =====================================================
  // POINTAGE
  // =====================================================

  nombreCotisationsEffectuees(
    carte: CarteTontine
  ): number {

    return carte.pointage.filter(
      jour => jour.paye
    ).length;
  }


  nombreCotisationsRestantes(
    carte: CarteTontine
  ): number {

    return carte.pointage.filter(
      jour => !jour.paye
    ).length;
  }


  togglePointage(
    jour: JourPointage
  ): void {

    if (!this.carteSelectionnee) {
      return;
    }


    jour.paye =
      !jour.paye;


    jour.montant =
      jour.paye
        ? this.carteSelectionnee.montantCotisation
        : 0;
  }


  // =====================================================
  // DÉSACTIVER / RÉACTIVER
  // =====================================================

  changerStatut(
    carte: CarteTontine
  ): void {

    carte.statut =
      carte.statut === 'Active'
        ? 'Désactivée'
        : 'Active';
  }


  // =====================================================
  // FORMATAGE
  // =====================================================

  formatMontant(
    montant: number
  ): string {

    return new Intl.NumberFormat(
      'fr-FR'
    ).format(montant);
  }


  formatDate(
    date: string
  ): string {

    if (!date) {
      return '-';
    }

    return new Intl.DateTimeFormat(
      'fr-FR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }
    ).format(
      new Date(date)
    );
  }


  private formatDateISO(
    date: Date
  ): string {

    const annee =
      date.getFullYear();

    const mois =
      String(
        date.getMonth() + 1
      ).padStart(2, '0');

    const jour =
      String(
        date.getDate()
      ).padStart(2, '0');

    return `${annee}-${mois}-${jour}`;
  }


  private dateAujourdHui(): string {

    return this.formatDateISO(
      new Date()
    );
  }


  // =====================================================
  // CLASSE STATUT
  // =====================================================

  classeStatut(
    statut: StatutCarte
  ): string {

    return statut === 'Active'
      ? 'bg-green-50 text-green-700 ring-green-200'
      : 'bg-gray-100 text-gray-600 ring-gray-200';
  }

}