import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';


Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);


@Component({
  selector: 'app-home',
  standalone: true,

  imports: [
    FormsModule,
    RouterLink
  ],

  templateUrl: './home.html',
  styleUrl: './home.css'
})


export class Home implements AfterViewInit {

  // =====================================================
  // RÉFÉRENCE DU CANVAS
  // =====================================================

  @ViewChild('cotisationsChart')
  cotisationsChart!: ElementRef<HTMLCanvasElement>;


  // =====================================================
  // INSTANCE DU GRAPHIQUE
  // =====================================================

  chart: Chart | undefined;


  // =====================================================
  // PÉRIODE SÉLECTIONNÉE
  // =====================================================

  periode: 'semaine' | 'mois' | 'annee' = 'semaine';


  // =====================================================
  // INITIALISATION
  // =====================================================

  ngAfterViewInit(): void {

    // On attend un court instant afin de garantir
    // que le canvas est bien présent dans le DOM.
    setTimeout(() => {
      this.createCotisationsChart();
    });

  }


  // =====================================================
  // CRÉATION DU GRAPHIQUE
  // =====================================================

  createCotisationsChart(): void {

    // Vérification du canvas
    if (!this.cotisationsChart) {
      console.error('Canvas du graphique introuvable.');
      return;
    }


    const canvas = this.cotisationsChart.nativeElement;


    // Récupération du contexte 2D
    const ctx = canvas.getContext('2d');


    if (!ctx) {
      console.error('Impossible de récupérer le contexte 2D.');
      return;
    }


    // Si un ancien graphique existe déjà,
    // on le détruit avant d'en créer un nouveau.
    if (this.chart) {
      this.chart.destroy();
    }


    // ===================================================
    // CRÉATION CHART.JS
    // ===================================================

    this.chart = new Chart(ctx, {

      type: 'line',


      data: {

        labels: [
          'Lun',
          'Mar',
          'Mer',
          'Jeu',
          'Ven',
          'Sam',
          'Dim'
        ],


        datasets: [

          {
            label: 'Cotisations',

            data: [
              1250000,
              1850000,
              1500000,
              2400000,
              2100000,
              2850000,
              3250000
            ],

            borderColor: '#16a34a',

            backgroundColor: 'rgba(22, 163, 74, 0.12)',

            borderWidth: 3,

            fill: true,

            tension: 0.4,

            pointRadius: 4,

            pointHoverRadius: 6,

            pointBackgroundColor: '#ffffff',

            pointBorderColor: '#16a34a',

            pointBorderWidth: 2
          }

        ]

      },


      options: {

        responsive: true,

        maintainAspectRatio: false,


        plugins: {

          legend: {
            display: false
          },


          tooltip: {

            backgroundColor: '#111827',

            titleColor: '#ffffff',

            bodyColor: '#ffffff',

            padding: 12,

            displayColors: false,


            callbacks: {

              label: (context) => {

                const value = context.parsed.y ?? 0;

                return `${Number(value).toLocaleString('fr-FR')} FCFA`;

              }

            }

          }

        },


        scales: {

          x: {

            grid: {
              display: false
            },

            ticks: {

              color: '#9ca3af',

              font: {
                size: 12
              }

            }

          },


          y: {

            beginAtZero: true,

            grid: {

              color: '#f3f4f6'
            },


            ticks: {

              color: '#9ca3af',

              font: {
                size: 11
              },


              callback: (value) => {

                return Number(value).toLocaleString('fr-FR');

              }

            }

          }

        }

      }

    });

  }


  // =====================================================
  // CHANGEMENT DE PÉRIODE
  // =====================================================

  changerPeriode(): void {

    // Vérification
    if (!this.chart) {
      return;
    }


    // ===================================================
    // SEMAINE
    // ===================================================

    if (this.periode === 'semaine') {

      this.chart.data.labels = [

        'Lun',
        'Mar',
        'Mer',
        'Jeu',
        'Ven',
        'Sam',
        'Dim'

      ];


      this.chart.data.datasets[0].data = [

        1250000,
        1850000,
        1500000,
        2400000,
        2100000,
        2850000,
        3250000

      ];

    }


    // ===================================================
    // MOIS
    // ===================================================

    else if (this.periode === 'mois') {

      this.chart.data.labels = [

        'S1',
        'S2',
        'S3',
        'S4'

      ];


      this.chart.data.datasets[0].data = [

        8200000,
        10500000,
        12800000,
        15250000

      ];

    }


    // ===================================================
    // ANNÉE
    // ===================================================

    else {

      this.chart.data.labels = [

        'Jan',
        'Fév',
        'Mar',
        'Avr',
        'Mai',
        'Juin',
        'Juil',
        'Août'

      ];


      this.chart.data.datasets[0].data = [

        8200000,
        9800000,
        11200000,
        10500000,
        12800000,
        13700000,
        14500000,
        15250000

      ];

    }


    // Actualisation du graphique
    this.chart.update();

  }

}