import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Agence {
  id: number;
  nom: string;
  localiteId: number;
}

interface Localite {
  id: number;
  nom: string;
}

interface Client {
  id: number;
  matricule: string;
  nom: string;
  prenoms: string;
  dateNaissance: string;
  telephone: string;
  npi: string;
  localiteId: number;
  agenceId: number;
  statut: 'Actif' | 'Inactif';
}

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clients.html',
  styleUrl: './clients.css'
})
export class Clients {

  // =========================================================
  // MODALS
  // =========================================================

  showModal = false;
  showDetailsModal = false;

  // =========================================================
  // RECHERCHE / FILTRES
  // =========================================================

  searchTerm = '';

  filterLocaliteId: number | null = null;

  filterAgenceId: number | null = null;

  // =========================================================
  // LOCALITÉS
  // TEMPORAIRE — À REMPLACER PLUS TARD PAR L'API
  // =========================================================

  localites: Localite[] = [
    {
      id: 1,
      nom: 'Pobè'
    },
    {
      id: 2,
      nom: 'Porto-Novo'
    },
    {
      id: 3,
      nom: 'Cotonou'
    },
    {
      id: 4,
      nom: 'Abomey-Calavi'
    }
  ];

  // =========================================================
  // AGENCES
  // TEMPORAIRE — À REMPLACER PLUS TARD PAR L'API
  // =========================================================

  agences: Agence[] = [
    {
      id: 1,
      nom: 'Agence UNACREP Pobè',
      localiteId: 1
    },
    {
      id: 2,
      nom: 'Agence UNACREP Pobè Centre',
      localiteId: 1
    },
    {
      id: 3,
      nom: 'Agence UNACREP Porto-Novo',
      localiteId: 2
    },
    {
      id: 4,
      nom: 'Agence UNACREP Ouando',
      localiteId: 2
    },
    {
      id: 5,
      nom: 'Agence UNACREP Cotonou',
      localiteId: 3
    },
    {
      id: 6,
      nom: 'Agence UNACREP Calavi',
      localiteId: 4
    }
  ];

  // =========================================================
  // CLIENTS
  // TEMPORAIRE — À REMPLACER PLUS TARD PAR L'API
  // =========================================================

  clients: Client[] = [];

  // =========================================================
  // FORMULAIRE DE CRÉATION
  // =========================================================

  form = {
    nom: '',
    prenoms: '',
    dateNaissance: '',
    telephone: '',
    npi: '',
    localiteId: null as number | null,
    agenceId: null as number | null,
    password: '',
    confirmationPassword: ''
  };

  // =========================================================
  // CLIENT SÉLECTIONNÉ
  // =========================================================

  selectedClient: Client | null = null;

  // =========================================================
  // AGENCES DISPONIBLES SELON LA LOCALITÉ
  // =========================================================

  get agencesDisponibles(): Agence[] {

    if (!this.form.localiteId) {
      return [];
    }

    return this.agences.filter(
      agence =>
        agence.localiteId === Number(this.form.localiteId)
    );
  }

  // =========================================================
  // AGENCES POUR LE FILTRE
  // =========================================================

  get agencesFiltrees(): Agence[] {

    if (!this.filterLocaliteId) {
      return this.agences;
    }

    return this.agences.filter(
      agence =>
        agence.localiteId === Number(this.filterLocaliteId)
    );
  }

  // =========================================================
  // CLIENTS FILTRÉS
  // =========================================================

  get clientsFiltres(): Client[] {

    const recherche = this.searchTerm
      .trim()
      .toLowerCase();

    return this.clients.filter(client => {

      const nomComplet =
        `${client.nom} ${client.prenoms}`.toLowerCase();

      const correspondRecherche =
        !recherche ||
        nomComplet.includes(recherche) ||
        client.nom.toLowerCase().includes(recherche) ||
        client.prenoms.toLowerCase().includes(recherche) ||
        client.matricule.toLowerCase().includes(recherche) ||
        client.npi.toLowerCase().includes(recherche) ||
        client.telephone.toLowerCase().includes(recherche);

      const correspondLocalite =
        !this.filterLocaliteId ||
        client.localiteId === Number(this.filterLocaliteId);

      const correspondAgence =
        !this.filterAgenceId ||
        client.agenceId === Number(this.filterAgenceId);

      return (
        correspondRecherche &&
        correspondLocalite &&
        correspondAgence
      );
    });
  }

  // =========================================================
  // STATISTIQUES
  // =========================================================

  get totalClients(): number {

    return this.clients.length;
  }

  get clientsActifs(): number {

    return this.clients.filter(
      client => client.statut === 'Actif'
    ).length;
  }

  get nouveauxClients(): number {

    /*
     * TEMPORAIRE :
     * Pour le moment, tous les clients sont considérés
     * comme nouveaux.
     *
     * Plus tard, cette statistique sera calculée
     * avec la date de création du compte.
     */

    return this.clients.length;
  }

  get totalAgences(): number {

    return this.agences.length;
  }

  // =========================================================
  // OUVRIR LE MODAL
  // =========================================================

  ouvrirModal(): void {

    this.resetForm();

    this.showModal = true;
  }

  // =========================================================
  // FERMER LE MODAL
  // =========================================================

  fermerModal(): void {

    this.showModal = false;
  }

  // =========================================================
  // CHANGEMENT DE LOCALITÉ
  // FORMULAIRE
  // =========================================================

  onLocaliteChange(): void {

    /*
     * Lorsqu'une localité change,
     * l'agence précédemment sélectionnée
     * doit être réinitialisée.
     */

    this.form.agenceId = null;
  }

  // =========================================================
  // CHANGEMENT DE LOCALITÉ
  // FILTRE
  // =========================================================

  onFilterLocaliteChange(): void {

    /*
     * Lorsqu'on change la localité du filtre,
     * l'agence sélectionnée précédemment
     * n'est plus forcément valide.
     */

    this.filterAgenceId = null;
  }

  // =========================================================
  // CRÉER UN CLIENT
  // =========================================================

  enregistrerClient(): void {

    // -------------------------------------------------------
    // VÉRIFICATION DES CHAMPS
    // -------------------------------------------------------

    if (
      !this.form.nom ||
      !this.form.prenoms ||
      !this.form.dateNaissance ||
      !this.form.telephone ||
      !this.form.npi ||
      !this.form.localiteId ||
      !this.form.agenceId ||
      !this.form.password ||
      !this.form.confirmationPassword
    ) {

      alert(
        'Veuillez remplir tous les champs obligatoires.'
      );

      return;
    }

    // -------------------------------------------------------
    // VÉRIFICATION MOT DE PASSE
    // -------------------------------------------------------

    if (
      this.form.password !==
      this.form.confirmationPassword
    ) {

      alert(
        'Les mots de passe ne correspondent pas.'
      );

      return;
    }

    // -------------------------------------------------------
    // VÉRIFICATION DU NPI
    // -------------------------------------------------------

    const npiExiste = this.clients.some(
      client =>
        client.npi.toLowerCase() ===
        this.form.npi.trim().toLowerCase()
    );

    if (npiExiste) {

      alert(
        'Ce NPI est déjà utilisé par un autre client.'
      );

      return;
    }

    // -------------------------------------------------------
    // CRÉATION DU CLIENT
    // -------------------------------------------------------

    const nouveauClient: Client = {

      id: this.clients.length + 1,

      /*
       * TEMPORAIRE :
       * Le matricule sera généré par le backend
       * lorsque Laravel sera connecté.
       */

      matricule: this.genererMatricule(),

      nom: this.form.nom.trim(),

      prenoms: this.form.prenoms.trim(),

      dateNaissance:
        this.form.dateNaissance,

      telephone:
        this.form.telephone.trim(),

      npi:
        this.form.npi.trim(),

      localiteId:
        Number(this.form.localiteId),

      agenceId:
        Number(this.form.agenceId),

      statut: 'Actif'
    };

    // -------------------------------------------------------
    // AJOUT À LA LISTE
    // -------------------------------------------------------

    this.clients.push(nouveauClient);

    // -------------------------------------------------------
    // FERMETURE DU MODAL
    // -------------------------------------------------------

    this.fermerModal();

    // -------------------------------------------------------
    // MESSAGE DE CONFIRMATION
    // -------------------------------------------------------

    alert(
      `Client enregistré avec succès.\n\nMatricule : ${nouveauClient.matricule}`
    );
  }

  // =========================================================
  // GÉNÉRATION TEMPORAIRE DU MATRICULE
  // =========================================================

  private genererMatricule(): string {

    const numero =
      String(this.clients.length + 1)
        .padStart(6, '0');

    return `UNACREP-${new Date().getFullYear()}-${numero}`;
  }

  // =========================================================
  // VOIR LES DÉTAILS DU CLIENT
  // =========================================================

  voirClient(client: Client): void {

    this.selectedClient = client;

    this.showDetailsModal = true;
  }

  // =========================================================
  // FERMER LES DÉTAILS
  // =========================================================

  fermerDetails(): void {

    this.showDetailsModal = false;

    this.selectedClient = null;
  }

  // =========================================================
  // MODIFIER CLIENT
  // =========================================================

  modifierClient(client: Client): void {

    alert(
      `Modification du client ${client.nom} ${client.prenoms} — à connecter à l'API.`
    );
  }

  // =========================================================
  // CHANGER LE STATUT
  // =========================================================

  changerStatut(client: Client): void {

    client.statut =
      client.statut === 'Actif'
        ? 'Inactif'
        : 'Actif';
  }

  // =========================================================
  // EXPORT PDF
  // =========================================================

  exporterPDF(): void {

    /*
     * Pour le moment, on prépare une version imprimable.
     *
     * Plus tard, nous pourrons intégrer jsPDF
     * pour générer un véritable fichier PDF professionnel.
     */

    if (this.clientsFiltres.length === 0) {

      alert(
        'Aucun client à exporter.'
      );

      return;
    }

    const lignes = this.clientsFiltres
      .map(client => `
        <tr>
          <td>${client.matricule}</td>
          <td>${client.nom} ${client.prenoms}</td>
          <td>${client.npi}</td>
          <td>${client.telephone}</td>
          <td>${this.getNomLocalite(client.localiteId)}</td>
          <td>${this.getNomAgence(client.agenceId)}</td>
          <td>${client.statut}</td>
        </tr>
      `)
      .join('');

    const contenu = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">

        <title>Liste des clients UNACREP</title>

        <style>

          body {
            font-family: Arial, sans-serif;
            padding: 30px;
            color: #222;
          }

          h1 {
            margin-bottom: 5px;
          }

          p {
            color: #666;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 25px;
          }

          th,
          td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
            font-size: 12px;
          }

          th {
            background: #f3f4f6;
          }

        </style>

      </head>

      <body>

        <h1>UNACREP</h1>

        <p>
          Liste des clients
        </p>

        <table>

          <thead>

            <tr>
              <th>Matricule</th>
              <th>Client</th>
              <th>NPI</th>
              <th>Téléphone</th>
              <th>Localité</th>
              <th>Agence</th>
              <th>Statut</th>
            </tr>

          </thead>

          <tbody>

            ${lignes}

          </tbody>

        </table>

      </body>
      </html>
    `;

    const fenetre =
      window.open('', '_blank');

    if (!fenetre) {

      alert(
        'Impossible d’ouvrir la fenêtre d’impression. Vérifiez les paramètres du navigateur.'
      );

      return;
    }

    fenetre.document.open();

    fenetre.document.write(contenu);

    fenetre.document.close();

    fenetre.onload = () => {

      fenetre.print();
    };
  }

  // =========================================================
  // EXPORT EXCEL
  // =========================================================

  exporterExcel(): void {

    /*
     * Pour le prototype frontend,
     * nous générons un fichier CSV compatible
     * avec Microsoft Excel.
     *
     * Plus tard, nous pourrons utiliser la bibliothèque
     * XLSX pour produire un véritable fichier .xlsx.
     */

    if (this.clientsFiltres.length === 0) {

      alert(
        'Aucun client à exporter.'
      );

      return;
    }

    const entete = [
      'Matricule',
      'Nom',
      'Prénoms',
      'Date de naissance',
      'NPI',
      'Téléphone',
      'Localité',
      'Agence',
      'Statut'
    ];

    const lignes = this.clientsFiltres.map(
      client => [
        client.matricule,
        client.nom,
        client.prenoms,
        client.dateNaissance,
        client.npi,
        client.telephone,
        this.getNomLocalite(client.localiteId),
        this.getNomAgence(client.agenceId),
        client.statut
      ]
    );

    const csv = [
      entete,
      ...lignes
    ]
      .map(
        ligne =>
          ligne
            .map(
              valeur =>
                `"${String(valeur).replace(/"/g, '""')}"`
            )
            .join(';')
      )
      .join('\n');

    /*
     * BOM UTF-8 pour que les accents
     * soient correctement reconnus par Excel.
     */

    const blob = new Blob(
      ['\ufeff' + csv],
      {
        type: 'text/csv;charset=utf-8;'
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const lien =
      document.createElement('a');

    lien.href = url;

    lien.download =
      `clients-unacrep-${new Date().getTime()}.csv`;

    document.body.appendChild(lien);

    lien.click();

    document.body.removeChild(lien);

    window.URL.revokeObjectURL(url);
  }

  // =========================================================
  // RÉINITIALISER LE FORMULAIRE
  // =========================================================

  private resetForm(): void {

    this.form = {

      nom: '',

      prenoms: '',

      dateNaissance: '',

      telephone: '',

      npi: '',

      localiteId: null,

      agenceId: null,

      password: '',

      confirmationPassword: ''
    };
  }

  // =========================================================
  // OBTENIR LE NOM DE LA LOCALITÉ
  // =========================================================

  getNomLocalite(id: number): string {

    return (
      this.localites.find(
        localite =>
          localite.id === id
      )?.nom ?? '-'
    );
  }

  // =========================================================
  // OBTENIR LE NOM DE L'AGENCE
  // =========================================================

  getNomAgence(id: number): string {

    return (
      this.agences.find(
        agence =>
          agence.id === id
      )?.nom ?? '-'
    );
  }
}