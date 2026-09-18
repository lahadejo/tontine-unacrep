import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface Activite {
  type: 'cotisation' | 'retrait' | 'client' | 'carte' | 'commission';
  titre: string;
  description: string;
  montant?: number;
  date: string;
}

interface AgenceStatistique {
  agence: string;
  clients: number;
  cartes: number;
  cotisations: number;
  retraits: number;
  solde: number;
}

@Component({
  selector: 'app-rapports',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './rapports.html'
})
export class Rapports implements AfterViewInit, OnDestroy {

  @ViewChild('evolutionChart')
  evolutionChart!: ElementRef<HTMLCanvasElement>;

  @ViewChild('agenceChart')
  agenceChart!: ElementRef<HTMLCanvasElement>;

  private evolutionChartInstance?: Chart;
  private agenceChartInstance?: Chart;

  /* ======================================================= */
  /* FILTRES */
  /* ======================================================= */

  periode = 'mois';

  agenceSelectionnee = 'Toutes les agences';

  periodes = [
    {
      value: 'jour',
      label: 'Aujourd’hui'
    },
    {
      value: 'semaine',
      label: 'Cette semaine'
    },
    {
      value: 'mois',
      label: 'Ce mois'
    },
    {
      value: 'trimestre',
      label: 'Ce trimestre'
    },
    {
      value: 'annee',
      label: 'Cette année'
    }
  ];

  agences = [
    'Toutes les agences',
    'Agence Centrale',
    'Agence Porto-Novo',
    'Agence Abomey',
    'Agence Parakou',
    'Agence Pobè'
  ];

  /* ======================================================= */
  /* STATISTIQUES */
  /* ======================================================= */

  statistiques = {
    clients: {
      total: 1248,
      actifs: 1186,
      nouveaux: 87
    },

    cartes: {
      total: 1865,
      actives: 1524,
      terminees: 276,
      inactives: 65
    },

    cotisations: {
      total: 18745000,
      aujourdHui: 725000,
      operations: 3842
    },

    portefeuilles: {
      soldeTotal: 15480000
    },

    retraits: {
      total: 9325000,
      effectues: 615,
      attente: 48
    },

    commissions: {
      total: 932500
    },

    cycles: {
      enCours: 1524,
      termines: 276
    },

    agences: {
      actives: 5
    }
  };

  /* ======================================================= */
  /* STATISTIQUES PAR AGENCE */
  /* ======================================================= */

  statistiquesAgences: AgenceStatistique[] = [
    {
      agence: 'Agence Centrale',
      clients: 385,
      cartes: 562,
      cotisations: 5825000,
      retraits: 2945000,
      solde: 4810000
    },

    {
      agence: 'Agence Porto-Novo',
      clients: 294,
      cartes: 438,
      cotisations: 4265000,
      retraits: 2185000,
      solde: 3625000
    },

    {
      agence: 'Agence Abomey',
      clients: 238,
      cartes: 351,
      cotisations: 3540000,
      retraits: 1675000,
      solde: 2950000
    },

    {
      agence: 'Agence Parakou',
      clients: 191,
      cartes: 286,
      cotisations: 2940000,
      retraits: 1450000,
      solde: 2185000
    },

    {
      agence: 'Agence Pobè',
      clients: 140,
      cartes: 228,
      cotisations: 2280000,
      retraits: 1070000,
      solde: 1910000
    }
  ];

  /* ======================================================= */
  /* ACTIVITÉS RÉCENTES */
  /* ======================================================= */

  activitesRecentes: Activite[] = [
    {
      type: 'cotisation',
      titre: 'Nouvelle cotisation',
      description: 'Jean Kouassi — CAR-00125',
      montant: 500,
      date: 'Il y a 5 min'
    },

    {
      type: 'retrait',
      titre: 'Retrait effectué',
      description: 'Marie Adé — CAR-00126',
      montant: 12600,
      date: 'Il y a 18 min'
    },

    {
      type: 'client',
      titre: 'Nouveau client',
      description: 'Inscription depuis Agence Centrale',
      date: 'Il y a 32 min'
    },

    {
      type: 'carte',
      titre: 'Nouvelle carte',
      description: 'CAR-00129 — Journalière 500 FCFA',
      date: 'Il y a 45 min'
    },

    {
      type: 'commission',
      titre: 'Commission enregistrée',
      description: 'Retrait — CAR-00124',
      montant: 1400,
      date: 'Il y a 1 h'
    }
  ];

  /* ======================================================= */
  /* INITIALISATION */
  /* ======================================================= */

  ngAfterViewInit(): void {
    this.creerGraphiqueEvolution();
    this.creerGraphiqueAgences();
  }

  /* ======================================================= */
  /* DESTRUCTION */
  /* ======================================================= */

  ngOnDestroy(): void {
    this.evolutionChartInstance?.destroy();
    this.agenceChartInstance?.destroy();
  }

  /* ======================================================= */
  /* GRAPHIQUE ÉVOLUTION */
  /* ======================================================= */

  creerGraphiqueEvolution(): void {

    if (!this.evolutionChart) {
      return;
    }

    const contexte =
      this.evolutionChart.nativeElement.getContext('2d');

    if (!contexte) {
      return;
    }

    this.evolutionChartInstance?.destroy();

    this.evolutionChartInstance = new Chart(contexte, {

      type: 'line',

      data: {

        labels: [
          'Janvier',
          'Février',
          'Mars',
          'Avril',
          'Mai',
          'Juin',
          'Juillet',
          'Août',
          'Septembre'
        ],

        datasets: [

          {
            label: 'Cotisations',

            data: [
              1450000,
              1780000,
              1940000,
              2120000,
              2360000,
              2210000,
              2540000,
              2680000,
              2082777
            ],

            borderColor: '#16a34a',

            backgroundColor:
              'rgba(22, 163, 74, 0.10)',

            fill: true,

            tension: 0.4,

            borderWidth: 2,

            pointRadius: 3,

            pointHoverRadius: 5
          },

          {
            label: 'Retraits',

            data: [
              650000,
              820000,
              910000,
              1050000,
              1180000,
              1090000,
              1270000,
              1350000,
              1036111
            ],

            borderColor: '#2563eb',

            backgroundColor:
              'rgba(37, 99, 235, 0.06)',

            fill: true,

            tension: 0.4,

            borderWidth: 2,

            pointRadius: 3,

            pointHoverRadius: 5
          }

        ]
      },

      options: {

        responsive: true,

        maintainAspectRatio: false,

        interaction: {
          mode: 'index',
          intersect: false
        },

        plugins: {

          legend: {

            display: true,

            position: 'top',

            align: 'end',

            labels: {

              usePointStyle: true,

              pointStyle: 'circle',

              padding: 18

            }
          },

          tooltip: {

            callbacks: {

              title: (items) => {
                return items[0]?.label ?? '';
              },

              label: (context) => {

                return `${context.dataset.label} : ${this.formatMontant(
                  Number(context.raw)
                )}`;

              }

            }

          }

        },

        scales: {

          x: {

            title: {

              display: true,

              text: 'Période'

            },

            grid: {
              display: false
            }

          },

          y: {

            beginAtZero: true,

            title: {

              display: true,

              text: 'Montant (FCFA)'

            },

            ticks: {

              callback: (value) => {

                return this.formatNombre(
                  Number(value)
                ) + ' F';

              }

            },

            grid: {

              color:
                'rgba(148, 163, 184, 0.15)'

            }

          }

        }

      }

    });
  }

  /* ======================================================= */
  /* GRAPHIQUE AGENCES */
  /* ======================================================= */

  creerGraphiqueAgences(): void {

    if (!this.agenceChart) {
      return;
    }

    const contexte =
      this.agenceChart.nativeElement.getContext('2d');

    if (!contexte) {
      return;
    }

    this.agenceChartInstance?.destroy();

    this.agenceChartInstance = new Chart(contexte, {

      type: 'bar',

      data: {

        labels:
          this.statistiquesAgences.map(
            agence =>
              agence.agence.replace('Agence ', '')
          ),

        datasets: [

          {
            label: 'Cotisations',

            data:
              this.statistiquesAgences.map(
                agence => agence.cotisations
              ),

            backgroundColor: '#16a34a',

            borderRadius: 6,

            borderSkipped: false
          },

          {
            label: 'Retraits',

            data:
              this.statistiquesAgences.map(
                agence => agence.retraits
              ),

            backgroundColor: '#2563eb',

            borderRadius: 6,

            borderSkipped: false
          }

        ]

      },

      options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

          legend: {

            display: true,

            position: 'top',

            align: 'end',

            labels: {

              usePointStyle: true,

              pointStyle: 'circle',

              padding: 18

            }

          },

          tooltip: {

            callbacks: {

              title: (items) => {
                return `Agence : ${items[0]?.label ?? ''}`;
              },

              label: (context) => {

                return `${context.dataset.label} : ${this.formatMontant(
                  Number(context.raw)
                )}`;

              }

            }

          }

        },

        scales: {

          x: {

            title: {

              display: true,

              text: 'Agence'

            },

            grid: {
              display: false
            }

          },

          y: {

            beginAtZero: true,

            title: {

              display: true,

              text: 'Montant (FCFA)'

            },

            ticks: {

              callback: (value) => {

                return this.formatNombre(
                  Number(value)
                ) + ' F';

              }

            },

            grid: {

              color:
                'rgba(148, 163, 184, 0.15)'

            }

          }

        }

      }

    });
  }

  /* ======================================================= */
  /* FILTRE PÉRIODE */
  /* ======================================================= */

  changerPeriode(): void {

    setTimeout(() => {

      this.creerGraphiqueEvolution();

      this.creerGraphiqueAgences();

    });

  }

  /* ======================================================= */
  /* FILTRE AGENCE */
  /* ======================================================= */

  changerAgence(): void {

    setTimeout(() => {

      this.creerGraphiqueAgences();

    });

  }

  /* ======================================================= */
  /* LABEL PÉRIODE */
  /* ======================================================= */

  getPeriodeLabel(): string {

    const periodeSelectionnee =
      this.periodes.find(
        item => item.value === this.periode
      );

    return periodeSelectionnee?.label ?? '';

  }

  /* ======================================================= */
  /* FORMATAGE */
  /* ======================================================= */

  formatNombre(nombre: number): string {

    return new Intl.NumberFormat(
      'fr-FR'
    ).format(nombre);

  }

  formatMontant(montant: number): string {

    return new Intl.NumberFormat(
      'fr-FR'
    ).format(montant) + ' FCFA';

  }

  /* ======================================================= */
  /* ICÔNES ACTIVITÉS */
  /* ======================================================= */

  getIconeActivite(
    type: Activite['type']
  ): string {

    switch (type) {

      case 'cotisation':
        return 'payments';

      case 'retrait':
        return 'account_balance_wallet';

      case 'client':
        return 'person_add';

      case 'carte':
        return 'credit_card';

      case 'commission':
        return 'percent';

      default:
        return 'info';

    }

  }

  /* ======================================================= */
  /* TAUX CLIENTS */
  /* ======================================================= */

  getTauxClientsActifs(): number {

    if (!this.statistiques.clients.total) {
      return 0;
    }

    return Math.round(
      (
        this.statistiques.clients.actifs /
        this.statistiques.clients.total
      ) * 100
    );

  }

  /* ======================================================= */
  /* TAUX CARTES */
  /* ======================================================= */

  getTauxCartesActives(): number {

    if (!this.statistiques.cartes.total) {
      return 0;
    }

    return Math.round(
      (
        this.statistiques.cartes.actives /
        this.statistiques.cartes.total
      ) * 100
    );

  }

  /* ======================================================= */
  /* TAUX RETRAITS */
  /* ======================================================= */

  getTauxRetrait(): number {

    if (!this.statistiques.cotisations.total) {
      return 0;
    }

    return Math.round(
      (
        this.statistiques.retraits.total /
        this.statistiques.cotisations.total
      ) * 100
    );

  }

  /* ======================================================= */
  /* EXPORT PDF */
  /* ======================================================= */

  exporterPDF(): void {
    window.print();
  }

  /* ======================================================= */
  /* EXPORT EXCEL */
  /* ======================================================= */

  exporterExcel(): void {

    alert(
      'L’export Excel sera connecté au service Laravel.'
    );

  }

  /* ======================================================= */
  /* ACTUALISER */
  /* ======================================================= */

  actualiser(): void {
    this.changerPeriode();
  }

}