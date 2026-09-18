import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type StatutTache = 'À faire' | 'En cours' | 'Terminée' | 'Annulée';
type PrioriteTache = 'Basse' | 'Normale' | 'Haute' | 'Urgente';

interface Tache {
  id: number;
  titre: string;
  description: string;
  agence: string;
  assigneA: string;
  priorite: PrioriteTache;
  statut: StatutTache;
  dateEcheance: string;
  dateCreation: string;
}

@Component({
  selector: 'app-taches',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './taches.html',
  styleUrl: './taches.css'
})
export class Taches {

  recherche = '';

  filtreStatut: 'Tous' | StatutTache = 'Tous';
  filtrePriorite: 'Toutes' | PrioriteTache = 'Toutes';
  filtreAgence = 'Toutes';

  modalTache = false;
  modalDetails = false;
  modeEdition = false;

  tacheSelectionnee: Tache | null = null;

  nouvelleTache: Tache = this.tacheVide();

  agences: string[] = [
    'Agence Centrale',
    'Agence Porto-Novo',
    'Agence Abomey',
    'Agence Parakou',
    'Agence Pobè'
  ];

  utilisateurs: string[] = [
    'Jean Kossi',
    'Marie Adjovi',
    'Paul Dossou',
    'Thomas Ahouansou',
    'David Soglo'
  ];

  taches: Tache[] = [
    {
      id: 1,
      titre: 'Vérifier les cotisations du cycle en cours',
      description:
        'Contrôler les cotisations enregistrées pour le cycle actuel et identifier les éventuels écarts.',
      agence: 'Agence Centrale',
      assigneA: 'Jean Kossi',
      priorite: 'Haute',
      statut: 'En cours',
      dateEcheance: '2026-09-04',
      dateCreation: '2026-09-01'
    },
    {
      id: 2,
      titre: 'Mettre à jour les dossiers clients',
      description:
        'Vérifier les informations des clients et compléter les dossiers incomplets.',
      agence: 'Agence Porto-Novo',
      assigneA: 'Marie Adjovi',
      priorite: 'Normale',
      statut: 'À faire',
      dateEcheance: '2026-09-06',
      dateCreation: '2026-09-01'
    },
    {
      id: 3,
      titre: 'Contrôler les recouvrements en retard',
      description:
        'Analyser les échéances impayées et préparer la liste des clients à relancer.',
      agence: 'Agence Abomey',
      assigneA: 'Paul Dossou',
      priorite: 'Urgente',
      statut: 'En cours',
      dateEcheance: '2026-09-03',
      dateCreation: '2026-08-31'
    },
    {
      id: 4,
      titre: 'Préparer le rapport mensuel',
      description:
        'Préparer le rapport des activités de l’agence pour la période en cours.',
      agence: 'Agence Parakou',
      assigneA: 'Thomas Ahouansou',
      priorite: 'Normale',
      statut: 'Terminée',
      dateEcheance: '2026-09-02',
      dateCreation: '2026-08-28'
    },
    {
      id: 5,
      titre: 'Vérifier les nouveaux adhérents',
      description:
        'Contrôler les informations et les pièces des nouveaux adhérents.',
      agence: 'Agence Pobè',
      assigneA: 'David Soglo',
      priorite: 'Basse',
      statut: 'À faire',
      dateEcheance: '2026-09-08',
      dateCreation: '2026-09-02'
    },
    {
      id: 6,
      titre: 'Contrôle des opérations de caisse',
      description:
        'Effectuer le contrôle des opérations enregistrées par l’agence.',
      agence: 'Agence Centrale',
      assigneA: 'Jean Kossi',
      priorite: 'Haute',
      statut: 'Terminée',
      dateEcheance: '2026-09-01',
      dateCreation: '2026-08-29'
    }
  ];

  private tacheVide(): Tache {
    return {
      id: 0,
      titre: '',
      description: '',
      agence: '',
      assigneA: '',
      priorite: 'Normale',
      statut: 'À faire',
      dateEcheance: '',
      dateCreation: this.dateAujourdHui()
    };
  }

  private dateAujourdHui(): string {
    return new Date().toISOString().split('T')[0];
  }

  // =====================================================
  // STATISTIQUES
  // =====================================================

  get totalTaches(): number {
    return this.taches.length;
  }

  get tachesEnAttente(): number {
    return this.taches.filter(
      tache => tache.statut === 'À faire'
    ).length;
  }

  get tachesEnCours(): number {
    return this.taches.filter(
      tache => tache.statut === 'En cours'
    ).length;
  }

  get tachesTerminees(): number {
    return this.taches.filter(
      tache => tache.statut === 'Terminée'
    ).length;
  }

  // =====================================================
  // FILTRAGE
  // =====================================================

  get tachesFiltrees(): Tache[] {
    const recherche = this.recherche
      .trim()
      .toLowerCase();

    return this.taches.filter(tache => {

      const correspondRecherche =
        !recherche ||
        tache.titre
          .toLowerCase()
          .includes(recherche) ||
        tache.description
          .toLowerCase()
          .includes(recherche) ||
        tache.assigneA
          .toLowerCase()
          .includes(recherche) ||
        tache.agence
          .toLowerCase()
          .includes(recherche);

      const correspondStatut =
        this.filtreStatut === 'Tous' ||
        tache.statut === this.filtreStatut;

      const correspondPriorite =
        this.filtrePriorite === 'Toutes' ||
        tache.priorite === this.filtrePriorite;

      const correspondAgence =
        this.filtreAgence === 'Toutes' ||
        tache.agence === this.filtreAgence;

      return (
        correspondRecherche &&
        correspondStatut &&
        correspondPriorite &&
        correspondAgence
      );
    });
  }

  // =====================================================
  // MODALES
  // =====================================================

  ouvrirAjout(): void {
    this.modeEdition = false;
    this.nouvelleTache = this.tacheVide();
    this.modalTache = true;
  }

  ouvrirModification(tache: Tache): void {
    this.modeEdition = true;

    this.nouvelleTache = {
      ...tache
    };

    this.modalTache = true;
  }

  voirTache(tache: Tache): void {
    this.tacheSelectionnee = tache;
    this.modalDetails = true;
  }

  fermerModalTache(): void {
    this.modalTache = false;
  }

  fermerModalDetails(): void {
    this.modalDetails = false;
    this.tacheSelectionnee = null;
  }

  // =====================================================
  // ENREGISTREMENT
  // =====================================================

  enregistrerTache(): void {

    if (
      !this.nouvelleTache.titre ||
      !this.nouvelleTache.agence ||
      !this.nouvelleTache.assigneA ||
      !this.nouvelleTache.dateEcheance
    ) {
      return;
    }

    if (this.modeEdition) {

      const index = this.taches.findIndex(
        tache =>
          tache.id === this.nouvelleTache.id
      );

      if (index !== -1) {
        this.taches[index] = {
          ...this.nouvelleTache
        };
      }

    } else {

      const nouvelId =
        this.taches.length > 0
          ? Math.max(
              ...this.taches.map(
                tache => tache.id
              )
            ) + 1
          : 1;

      this.taches.push({
        ...this.nouvelleTache,
        id: nouvelId,
        dateCreation: this.dateAujourdHui()
      });
    }

    this.fermerModalTache();
  }

  // =====================================================
  // SUPPRESSION
  // =====================================================

  supprimerTache(tache: Tache): void {

    const confirmation = window.confirm(
      `Voulez-vous vraiment supprimer la tâche « ${tache.titre} » ?`
    );

    if (!confirmation) {
      return;
    }

    this.taches = this.taches.filter(
      item => item.id !== tache.id
    );
  }

  // =====================================================
  // CHANGEMENT RAPIDE DU STATUT
  // =====================================================

  changerStatut(tache: Tache): void {

    if (tache.statut === 'À faire') {
      tache.statut = 'En cours';
      return;
    }

    if (tache.statut === 'En cours') {
      tache.statut = 'Terminée';
      return;
    }

    if (tache.statut === 'Terminée') {
      tache.statut = 'À faire';
    }
  }

  // =====================================================
  // EXPORT PDF
  // =====================================================

  exporterPDF(): void {

    const taches = this.tachesFiltrees;

    if (taches.length === 0) {
      alert('Aucune tâche à exporter.');
      return;
    }

    const lignes = taches.map(tache => `
      <tr>
        <td>${this.echapperHtml(tache.titre)}</td>
        <td>${this.echapperHtml(tache.agence)}</td>
        <td>${this.echapperHtml(tache.assigneA)}</td>
        <td>${this.echapperHtml(tache.priorite)}</td>
        <td>${this.echapperHtml(tache.statut)}</td>
        <td>${this.formatDate(tache.dateEcheance)}</td>
      </tr>
    `).join('');

    const contenu = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Liste des tâches - UNACREP</title>

        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 30px;
            color: #111827;
          }

          h1 {
            margin-bottom: 5px;
            color: #166534;
          }

          p {
            margin-top: 0;
            color: #6b7280;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 25px;
          }

          th,
          td {
            border: 1px solid #d1d5db;
            padding: 10px;
            text-align: left;
            font-size: 12px;
          }

          th {
            background: #f3f4f6;
            font-weight: bold;
          }

          .footer {
            margin-top: 20px;
            font-size: 11px;
            color: #6b7280;
          }

          @media print {
            body {
              margin: 15px;
            }
          }
        </style>
      </head>

      <body>

        <h1>UNACREP</h1>

        <p>
          Liste des tâches — ${new Date().toLocaleDateString('fr-FR')}
        </p>

        <table>

          <thead>
            <tr>
              <th>Tâche</th>
              <th>Agence</th>
              <th>Assignée à</th>
              <th>Priorité</th>
              <th>Statut</th>
              <th>Échéance</th>
            </tr>
          </thead>

          <tbody>
            ${lignes}
          </tbody>

        </table>

        <div class="footer">
          Total : ${taches.length} tâche(s)
        </div>

      </body>
      </html>
    `;

    const fenetre = window.open('', '_blank');

    if (!fenetre) {
      alert(
        'Impossible d’ouvrir la fenêtre d’impression. Vérifiez que les fenêtres pop-up sont autorisées.'
      );
      return;
    }

    fenetre.document.open();
    fenetre.document.write(contenu);
    fenetre.document.close();

    fenetre.focus();

    setTimeout(() => {
      fenetre.print();
    }, 300);
  }

  // =====================================================
  // EXPORT EXCEL
  // =====================================================

  exporterExcel(): void {

    const taches = this.tachesFiltrees;

    if (taches.length === 0) {
      alert('Aucune tâche à exporter.');
      return;
    }

    const entetes = [
      'Tâche',
      'Description',
      'Agence',
      'Assignée à',
      'Priorité',
      'Statut',
      'Échéance',
      'Date de création'
    ];

    const lignes = taches.map(tache => [
      tache.titre,
      tache.description,
      tache.agence,
      tache.assigneA,
      tache.priorite,
      tache.statut,
      this.formatDate(tache.dateEcheance),
      this.formatDate(tache.dateCreation)
    ]);

    const csv = [
      entetes,
      ...lignes
    ]
      .map(ligne =>
        ligne
          .map(valeur => `"${String(valeur).replace(/"/g, '""')}"`)
          .join(';')
      )
      .join('\n');

    const contenu = '\uFEFF' + csv;

    const blob = new Blob(
      [contenu],
      {
        type: 'text/csv;charset=utf-8;'
      }
    );

    const url = URL.createObjectURL(blob);

    const lien = document.createElement('a');

    lien.href = url;
    lien.download = `taches-unacrep-${this.dateAujourdHui()}.csv`;

    document.body.appendChild(lien);

    lien.click();

    document.body.removeChild(lien);

    URL.revokeObjectURL(url);
  }

  // =====================================================
  // SÉCURISATION HTML POUR LE PDF
  // =====================================================

  private echapperHtml(valeur: string): string {

    return valeur
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // =====================================================
  // LIBELLÉS / AFFICHAGE
  // =====================================================

  initiales(nom: string): string {

    const parties = nom
      .trim()
      .split(' ')
      .filter(Boolean);

    if (parties.length === 0) {
      return '';
    }

    if (parties.length === 1) {
      return parties[0]
        .substring(0, 2)
        .toUpperCase();
    }

    return (
      parties[0].charAt(0) +
      parties[parties.length - 1].charAt(0)
    ).toUpperCase();
  }

  classePriorite(
    priorite: PrioriteTache
  ): string {

    switch (priorite) {

      case 'Urgente':
        return 'bg-red-50 text-red-700 ring-red-200';

      case 'Haute':
        return 'bg-orange-50 text-orange-700 ring-orange-200';

      case 'Normale':
        return 'bg-blue-50 text-blue-700 ring-blue-200';

      case 'Basse':
        return 'bg-gray-50 text-gray-600 ring-gray-200';

      default:
        return 'bg-gray-50 text-gray-600 ring-gray-200';
    }
  }

  classeStatut(
    statut: StatutTache
  ): string {

    switch (statut) {

      case 'Terminée':
        return 'bg-green-50 text-green-700 ring-green-200';

      case 'En cours':
        return 'bg-blue-50 text-blue-700 ring-blue-200';

      case 'À faire':
        return 'bg-gray-50 text-gray-600 ring-gray-200';

      case 'Annulée':
        return 'bg-red-50 text-red-700 ring-red-200';

      default:
        return 'bg-gray-50 text-gray-600 ring-gray-200';
    }
  }

  dateEchue(tache: Tache): boolean {

    if (tache.statut === 'Terminée') {
      return false;
    }

    return (
      new Date(tache.dateEcheance) <
      new Date(this.dateAujourdHui())
    );
  }

  formatDate(date: string): string {

    if (!date) {
      return '-';
    }

    return new Intl.DateTimeFormat(
      'fr-FR',
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }
    ).format(new Date(date));
  }
}