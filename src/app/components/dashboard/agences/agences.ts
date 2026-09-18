
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


// =====================================================
// TYPES
// =====================================================

type StatutAgence = 'Active' | 'Inactive';

interface Agence {
  id: number;
  code: string;
  nom: string;

  departement: string;
  commune: string;
  arrondissement: string;
  village: string;

  responsable: string;
  clients: number;
  statut: StatutAgence;
}

interface Commune {
  nom: string;
  arrondissements: string[];
}


// =====================================================
// COMPOSANT
// =====================================================

@Component({
  selector: 'app-agences',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './agences.html'
})
export class Agences {


  // =====================================================
  // RECHERCHE
  // =====================================================

  recherche: string = '';


  // =====================================================
  // FILTRE
  // =====================================================

  statutFiltre: 'Tous' | 'Active' | 'Inactive' = 'Tous';


  // =====================================================
  // MODAL
  // =====================================================

  modalOuvert: boolean = false;

  modeEdition: boolean = false;

  agenceSelectionnee: Agence | null = null;


  // =====================================================
  // FORMULAIRE
  // =====================================================

  nouvelleAgence: Agence = this.initialiserAgence();


  // =====================================================
  // DÉPARTEMENTS
  // =====================================================

  departements: string[] = [
    'Alibori',
    'Atacora',
    'Atlantique',
    'Borgou',
    'Collines',
    'Couffo',
    'Donga',
    'Littoral',
    'Mono',
    'Ouémé',
    'Plateau',
    'Zou'
  ];


  // =====================================================
  // COMMUNES + ARRONDISSEMENTS
  // =====================================================

  communesParDepartement: Record<string, Commune[]> = {

    // ===================================================
    // ALIBORI
    // ===================================================

    'Alibori': [

      {
        nom: 'Banikoara',
        arrondissements: [
          'Banikoara',
          'Founougo',
          'Gomparou',
          'Goumori',
          'Kokey',
          'Kokiborou',
          'Ounet',
          'Sompérékou',
          'Soroko',
          'Toura'
        ]
      },

      {
        nom: 'Gogounou',
        arrondissements: [
          'Bagou',
          'Gogounou',
          'Gounarou',
          'Ouara',
          'Sori',
          'Zoungou-Pantrossi'
        ]
      },

      {
        nom: 'Kandi',
        arrondissements: [
          'Angaradébou',
          'Bensékou',
          'Donwari',
          'Kandi I',
          'Kandi II',
          'Kandi III',
          'Kassakou',
          'Saah',
          'Sam',
          'Sonsoro'
        ]
      },

      {
        nom: 'Karimama',
        arrondissements: [
          'Birni-Lafia',
          'Bogo-Bogo',
          'Karimama',
          'Kompa',
          'Monsey'
        ]
      },

      {
        nom: 'Malanville',
        arrondissements: [
          'Garou',
          'Guéné',
          'Malanville',
          'Madécali',
          'Toumboutou'
        ]
      },

      {
        nom: 'Ségbana',
        arrondissements: [
          'Libantè',
          'Liboussou',
          'Lougou',
          'Ségbana',
          'Sokotindji'
        ]
      }

    ],


    // ===================================================
    // ATACORA
    // ===================================================

    'Atacora': [

      {
        nom: 'Boukoumbé',
        arrondissements: [
          'Boukoumbé',
          'Dipoli',
          'Korontière',
          'Kossoucoingou',
          'Manta',
          'Natta',
          'Tabota'
        ]
      },

      {
        nom: 'Cobly',
        arrondissements: [
          'Cobly',
          'Datori',
          'Kountori',
          'Tapoga'
        ]
      },

      {
        nom: 'Kérou',
        arrondissements: [
          'Brignamaro',
          'Firou',
          'Kérou',
          'Koabagou'
        ]
      },

      {
        nom: 'Kouandé',
        arrondissements: [
          'Birni',
          'Chabi-Couma',
          'Fô-Tancé',
          'Guilmaro',
          'Kouandé',
          'Oroukayo'
        ]
      },

      {
        nom: 'Matéri',
        arrondissements: [
          'Dassari',
          'Gouandé',
          'Matéri',
          'Nodi',
          'Tantéga',
          'Tchianhoun-Cossi'
        ]
      },

      {
        nom: 'Natitingou',
        arrondissements: [
          'Kotopounga',
          'Kouaba',
          'Koundata',
          'Natitingou I',
          'Natitingou II',
          'Natitingou III',
          'Natitingou IV',
          'Perma',
          'Tchoumi-Tchoumi'
        ]
      },

      {
        nom: 'Péhunco',
        arrondissements: [
          'Gnémasson',
          'Péhunco',
          'Tobré'
        ]
      },

      {
        nom: 'Tanguiéta',
        arrondissements: [
          'Cotiakou',
          "N'Dahonta",
          'Taiakou',
          'Tanguiéta',
          'Tanongou'
        ]
      },

      {
        nom: 'Toucountouna',
        arrondissements: [
          'Kouarfa',
          'Tampégré',
          'Toucountouna'
        ]
      }

    ],


    // ===================================================
    // ATLANTIQUE
    // ===================================================

    'Atlantique': [

      {
        nom: 'Abomey-Calavi',
        arrondissements: [
          'Abomey-Calavi',
          'Akassato',
          'Godomey',
          'Glo-Djigbé',
          'Hêvié',
          'Kpanroun',
          'Ouèdo',
          'Togba',
          'Zinvié'
        ]
      },

      {
        nom: 'Allada',
        arrondissements: [
          'Agbanou',
          'Ahouannonzoun',
          'Allada',
          'Attogon',
          'Avakpa',
          'Ayou',
          'Hinvi',
          'Lissègazoun',
          'Lon-Agonmey',
          'Sékou',
          'Togoudo',
          'Tokpa-Avagoudo'
        ]
      },

      {
        nom: 'Kpomassè',
        arrondissements: [
          'Aganmalomè',
          'Agbanto',
          'Agonkanmè',
          'Dédomè',
          'Dékanmè',
          'Kpomassè',
          'Sègbèya',
          'Sègbohouè',
          'Tokpa-Domè'
        ]
      },

      {
        nom: 'Ouidah',
        arrondissements: [
          'Avlékété',
          'Djègbadji',
          'Gakpé',
          'Houakpè-Daho',
          'Ouidah I',
          'Ouidah II',
          'Ouidah III',
          'Ouidah IV',
          'Pahou',
          'Savi'
        ]
      },

      {
        nom: 'Sô-Ava',
        arrondissements: [
          'Ahomey-Lokpo',
          'Dékanmey',
          'Ganvié I',
          'Ganvié II',
          'Houédo-Aguékon',
          'Sô-Ava',
          'Vekky'
        ]
      },

      {
        nom: 'Toffo',
        arrondissements: [
          'Agué',
          'Colli-Agbamè',
          'Coussi',
          'Damè',
          'Djanglanmè',
          'Houègbo',
          'Kpomè',
          'Sè',
          'Sèhouè',
          'Toffo-Agué'
        ]
      },

      {
        nom: 'Tori-Bossito',
        arrondissements: [
          'Avamè',
          'Azohouè-Aliho',
          'Azohouè-Cada',
          'Tori-Bossito',
          'Tori-Cada',
          'Tori-Gare',
          'Tori-Aïdohoué',
          'Tori-Acadjamè'
        ]
      },

      {
        nom: 'Zè',
        arrondissements: [
          'Adjan',
          'Dawè',
          'Djigbé',
          'Dodji-Bata',
          'Hèkanmé',
          'Koundokpoé',
          'Sèdjè-Dénou',
          'Sèdjè-Houégoudo',
          'Tangbo-Djevié',
          'Yokpo',
          'Zè'
        ]
      }

    ],


    // ===================================================
    // BORGOU
    // ===================================================

    'Borgou': [

      {
        nom: 'Bembèrèkè',
        arrondissements: [
          'Bembèrèkè',
          'Béroubouay',
          'Bouanri',
          'Gamia',
          'Ina'
        ]
      },

      {
        nom: 'Kalalé',
        arrondissements: [
          'Basso',
          'Bouka',
          'Dérassi',
          'Dunkassa',
          'Kalalé',
          'Péonga'
        ]
      },

      {
        nom: "N'Dali",
        arrondissements: [
          'Bori',
          'Gbégourou',
          "N'Dali",
          'Ouénou',
          'Sirarou'
        ]
      },

      {
        nom: 'Nikki',
        arrondissements: [
          'Biro',
          'Gnonkourakali',
          'Nikki',
          'Ouénou',
          'Sérékali',
          'Suya',
          'Tasso'
        ]
      },

      {
        nom: 'Parakou',
        arrondissements: [
          '1er arrondissement',
          '2ème arrondissement',
          '3ème arrondissement'
        ]
      },

      {
        nom: 'Pèrèrè',
        arrondissements: [
          'Gninsy',
          'Guinagourou',
          'Kpané',
          'Pébié',
          'Pèrèrè',
          'Sontou'
        ]
      },

      {
        nom: 'Sinendé',
        arrondissements: [
          'Fô-Bourè',
          'Sèkèrè',
          'Sikki',
          'Sinendé'
        ]
      },

      {
        nom: 'Tchaourou',
        arrondissements: [
          'Alafiarou',
          'Bétérou',
          'Goro',
          'Kika',
          'Sanson',
          'Tchaourou',
          'Tchatchou'
        ]
      }

    ],


    // ===================================================
    // COLLINES
    // ===================================================

    'Collines': [

      {
        nom: 'Bantè',
        arrondissements: [
          'Agoua',
          'Akpassi',
          'Atokoligbé',
          'Bantè',
          'Bobè',
          'Gouka',
          'Koko',
          'Lougba',
          'Pira'
        ]
      },

      {
        nom: 'Dassa-Zoumè',
        arrondissements: [
          'Akofodjoulè',
          'Dassa I',
          'Dassa II',
          'Gbaffo',
          'Kèrè',
          'Kpingni',
          'Lèma',
          'Paouignan',
          'Soclogbo',
          'Tré'
        ]
      },

      {
        nom: 'Glazoué',
        arrondissements: [
          'Aklankpa',
          'Assanté',
          'Glazoué',
          'Gomè',
          'Kpakpaza',
          'Magoumi',
          'Ouèdèmè',
          'Sokponta',
          'Thio',
          'Zaffé'
        ]
      },

      {
        nom: 'Ouèssè',
        arrondissements: [
          'Challa-Ogoi',
          'Djègbè',
          'Gbanlin',
          'Kémon',
          'Kilibo',
          'Laminou',
          'Odougba',
          'Ouèssè',
          'Toui'
        ]
      },

      {
        nom: 'Savalou',
        arrondissements: [
          'Djaloukou',
          'Doumè',
          'Gobada',
          'Kpataba',
          'Lahotan',
          'Lèma',
          'Logozohè',
          'Monkpa',
          'Ottola',
          'Ouèssè',
          'Savalou-Aga',
          'Savalou-Agbado',
          'Savalou-Attakè',
          'Tchetti'
        ]
      },

      {
        nom: 'Savè',
        arrondissements: [
          'Adido',
          'Bèssè',
          'Boni',
          'Kaboua',
          'Ofè',
          'Okpara',
          'Plateau',
          'Sakin'
        ]
      }

    ],


    // ===================================================
    // COUFFO
    // ===================================================

    'Couffo': [

      {
        nom: 'Aplahoué',
        arrondissements: [
          'Aplahoué',
          'Atomè',
          'Azovè',
          'Dekpo',
          'Godohou',
          'Kissamey',
          'Lonkly'
        ]
      },

      {
        nom: 'Djakotomey',
        arrondissements: [
          'Adjintimey',
          'Bètoumey',
          'Djakotomey I',
          'Djakotomey II',
          'Gohomey',
          'Houègamey',
          'Kinkinhoué',
          'Kokohoué',
          'Kpoba',
          'Sokouhoué'
        ]
      },

      {
        nom: 'Dogbo',
        arrondissements: [
          'Ayomi',
          'Dèvè',
          'Honton',
          'Lokogohoué',
          'Madjrè',
          'Tota',
          'Totchagni'
        ]
      },

      {
        nom: 'Klouékanmè',
        arrondissements: [
          'Adjanhonmè',
          'Ahogbèya',
          'Aya-Hohoué',
          'Djotto',
          'Hondji',
          'Klouékanmè',
          'Lanta',
          'Tchikpé'
        ]
      },

      {
        nom: 'Lalo',
        arrondissements: [
          'Adoukandji',
          'Ahondjinnako',
          'Ahomadégbé',
          'Banigbé',
          'Gnizounmè',
          'Hlassamè',
          'Lalo',
          'Lokogba',
          'Tchito',
          'Tohou',
          'Zalli'
        ]
      },

      {
        nom: 'Toviklin',
        arrondissements: [
          'Adjido',
          'Avédjin',
          'Doko',
          'Houédogli',
          'Missinko',
          'Tannou-Gola',
          'Toviklin'
        ]
      }

    ],


    // ===================================================
    // DONGA
    // ===================================================

    'Donga': [

      {
        nom: 'Bassila',
        arrondissements: [
          'Alédjo',
          'Bassila',
          'Manigri',
          'Pénéssoulou'
        ]
      },

      {
        nom: 'Copargo',
        arrondissements: [
          'Anandana',
          'Copargo',
          'Pabégou',
          'Singré'
        ]
      },

      {
        nom: 'Djougou',
        arrondissements: [
          'Barei',
          'Bariénou',
          'Bélléfoungou',
          'Bougou',
          'Djougou I',
          'Djougou II',
          'Djougou III',
          'Kolokondé',
          'Onklou',
          'Patargo',
          'Pélébina',
          'Sérou'
        ]
      },

      {
        nom: 'Ouaké',
        arrondissements: [
          'Badjoudè',
          'Kondé',
          'Ouaké',
          'Sèmèrè I',
          'Sèmèrè II',
          'Tchalinga'
        ]
      }

    ],


    // ===================================================
    // LITTORAL
    // ===================================================

    'Littoral': [

      {
        nom: 'Cotonou',
        arrondissements: [
          '1er arrondissement',
          '2ème arrondissement',
          '3ème arrondissement',
          '4ème arrondissement',
          '5ème arrondissement',
          '6ème arrondissement',
          '7ème arrondissement',
          '8ème arrondissement',
          '9ème arrondissement',
          '10ème arrondissement',
          '11ème arrondissement',
          '12ème arrondissement',
          '13ème arrondissement'
        ]
      }

    ],


    // ===================================================
    // MONO
    // ===================================================

    'Mono': [

      {
        nom: 'Athiémé',
        arrondissements: [
          'Adohoun',
          'Atchannou',
          'Athiémé',
          'Dédékpoé',
          'Kpinnou'
        ]
      },

      {
        nom: 'Bopa',
        arrondissements: [
          'Agbodji',
          'Badazoui',
          'Bopa',
          'Gbakpodji',
          'Lobogo',
          'Possotomè',
          'Yégodoé'
        ]
      },

      {
        nom: 'Comè',
        arrondissements: [
          'Agatogbo',
          'Akodéha',
          'Comè',
          'Ouèdèmè-Pédah',
          'Oumako'
        ]
      },

      {
        nom: 'Grand-Popo',
        arrondissements: [
          'Adjaha',
          'Agoué',
          'Avloh',
          'Djanglanmey',
          'Gbéhoué',
          'Grand-Popo',
          'Sazoué'
        ]
      },

      {
        nom: 'Houéyogbé',
        arrondissements: [
          'Dahé',
          'Doutou',
          'Honhoué',
          'Houéyogbé',
          'Sè',
          'Zoungbonou'
        ]
      },

      {
        nom: 'Lokossa',
        arrondissements: [
          'Agamè',
          'Houin',
          'Koudo',
          'Lokossa',
          'Ouèdèmè'
        ]
      }

    ],


    // ===================================================
    // OUÉMÉ
    // ===================================================

    'Ouémé': [

      {
        nom: 'Adjarra',
        arrondissements: [
          'Adjarra I',
          'Adjarra II',
          'Aglogbé',
          'Honvié',
          'Malanhoui',
          'Médédjonou'
        ]
      },

      {
        nom: 'Adjohoun',
        arrondissements: [
          'Adjohoun',
          'Akpadanou',
          'Awonou',
          'Azowlissè',
          'Dèmè',
          'Gangban',
          'Kodè',
          'Togbota'
        ]
      },

      {
        nom: 'Aguégués',
        arrondissements: [
          'Avagbodji',
          'Houédomè',
          'Zoungamè'
        ]
      },

      {
        nom: 'Akpro-Missérété',
        arrondissements: [
          'Akpro-Missérété',
          'Gomè-Sota',
          'Katagon',
          'Vakon',
          'Zodogbomey'
        ]
      },

      {
        nom: 'Avrankou',
        arrondissements: [
          'Atchoukpa',
          'Avrankou',
          'Djomon',
          'Gbozounmè',
          'Kouty',
          'Ouanho',
          'Sado'
        ]
      },

      {
        nom: 'Bonou',
        arrondissements: [
          'Affamè',
          'Atchonsa',
          'Bonou',
          'Damè-Wogon',
          'Houinviguè'
        ]
      },

      {
        nom: 'Dangbo',
        arrondissements: [
          'Dangbo',
          'Dèkin',
          'Gbéko',
          'Houédomey',
          'Hozin',
          'Késsounou',
          'Zounguè'
        ]
      },

      {
        nom: 'Porto-Novo',
        arrondissements: [
          '1er arrondissement',
          '2ème arrondissement',
          '3ème arrondissement',
          '4ème arrondissement',
          '5ème arrondissement'
        ]
      },

      {
        nom: 'Sèmè-Podji',
        arrondissements: [
          'Agblangandan',
          'Aholouyèmè',
          'Djèrègbé',
          'Ekpè',
          'Sèmè-Kpodji',
          'Tohouè'
        ]
      }

    ],


    // ===================================================
    // PLATEAU
    // ===================================================

    'Plateau': [

      {
        nom: 'Adja-Ouèrè',
        arrondissements: [
          'Adja-Ouèrè',
          'Ikpinlè',
          'Kpoulou',
          'Massè',
          'Oko-Akarè',
          'Totonnoukon'
        ]
      },

      {
        nom: 'Ifangni',
        arrondissements: [
          'Banigbé',
          'Daagbé',
          'Ifangni',
          'Ko-Koumolou',
          'Lagbé',
          'Tchaada'
        ]
      },

      {
        nom: 'Kétou',
        arrondissements: [
          'Adakplamé',
          'Idigny',
          'Kétou',
          'Kpankou',
          'Odometa',
          'Okpometa'
        ]
      },

      {
        nom: 'Pobè',
        arrondissements: [
          'Ahoyéyé',
          'Igana',
          'Issaba',
          'Pobè',
          'Towé'
        ]
      },

      {
        nom: 'Sakété',
        arrondissements: [
          'Aguidi',
          'Ita-Djèbou',
          'Sakété I',
          'Sakété II',
          'Takon',
          'Yoko'
        ]
      }

    ],


    // ===================================================
    // ZOU
    // ===================================================

    'Zou': [

      {
        nom: 'Abomey',
        arrondissements: [
          'Agbokpa',
          'Dètohou',
          'Djègbè',
          'Hounli',
          'Sèhoun',
          'Vidolé',
          'Zounzounmè'
        ]
      },

      {
        nom: 'Agbangnizoun',
        arrondissements: [
          'Adahondjigon',
          'Adingningon',
          'Agbangnizoun',
          'Kinta',
          'Kpota',
          'Lissazounmè',
          'Sahé',
          'Siwé',
          'Tanvé',
          'Zoungoudo'
        ]
      },

      {
        nom: 'Bohicon',
        arrondissements: [
          'Agongointo',
          'Avogbanna',
          'Bohicon I',
          'Bohicon II',
          'Gnidjazoun',
          'Lissèzoun',
          'Ouassaho',
          'Passagon',
          'Saclo',
          'Sodohomè'
        ]
      },

      {
        nom: 'Covè',
        arrondissements: [
          'Adogbé',
          'Gounli',
          'Houéko',
          'Houen-Hounso',
          'Lanta-Cogbè',
          'Naogon',
          'Soli',
          'Zogba'
        ]
      },

      {
        nom: 'Djidja',
        arrondissements: [
          'Agondji',
          'Agouna',
          'Dan',
          'Djidja',
          'Dohouimè',
          'Gobaix',
          'Monsourou',
          'Mougnon',
          'Houto',
          'Setto',
          'Oungbègamè',
          'Zoukon'
        ]
      },

      {
        nom: 'Ouinhi',
        arrondissements: [
          'Dasso',
          'Ouinhi',
          'Sagon',
          'Tohoué'
        ]
      },

      {
        nom: 'Za-Kpota',
        arrondissements: [
          'Allahé',
          'Assalin',
          'Houngomey',
          'Kpakpamè',
          'Kpozoun',
          'Za-Kpota',
          'Za-Tanta',
          'Zèko'
        ]
      },

      {
        nom: 'Zagnanado',
        arrondissements: [
          'Agonli-Houégbo',
          'Banamè',
          "N'-Tan",
          'Dovi',
          'Kpédékpo',
          'Zagnanado'
        ]
      },

      {
        nom: 'Zogbodomey',
        arrondissements: [
          'Akiza',
          'Avlamè',
          'Cana I',
          'Cana II',
          'Domè',
          'Koussoukpa',
          'Kpokissa',
          'Massi',
          'Tanwé-Hessou',
          'Zogbodomey',
          'Zoukou'
        ]
      }

    ]

  };


  // =====================================================
  // VILLAGES / QUARTIERS
  // =====================================================

  villagesParArrondissement: Record<string, string[]> = {

    // ---------------------------------------------------
    // COTONOU
    // ---------------------------------------------------

    '1er arrondissement': [
      'Avotrou Aimonlonfidé',
      'Avotrou Gbègo',
      'Avotrou Houézékome',
      'Dandji',
      'Dandji Hokanmé',
      'Donatin',
      'Finagnon',
      'Tchanhounkpamè',
      'Tokplégbé',
      "N'Vènamédé",
      'Suru-Léré',
      'Tanto',
      'Yagbé'
    ],

    '2ème arrondissement': [
      'Irédé',
      'Kpondéhou Tchémè',
      "Lom'Nava",
      'Sènandé',
      'Sènandé Sékou',
      'Kowégbo',
      'Ahouassa',
      'Gankpodo',
      'Djèdjèlayé',
      'Kpondéhou',
      'Minontchou',
      'Yénawa',
      'Yénawa Daho'
    ],

    '3ème arrondissement': [
      'Adjégounlè',
      'Adogléta',
      'Gbènonkpo',
      'Hlacomey',
      'Kpankpan',
      'Midombo',
      'Sègbèya Nord',
      'Sègbèya Sud',
      'Agbato',
      'Agbodjèdo',
      'Ayélawadjè',
      'Ayélawadjè Agongomè',
      'Fifatin'
    ],

    '4ème arrondissement': [
      'Enagnon',
      'Fifadji Houto',
      'Sodjatinmè Centre',
      'Sodjatinmè Est',
      'Sodjatinmè Ouest',
      'Abokicodji Centre',
      'Abokicodji Lagune',
      'Abokicodji Dodomè',
      'Dédokpo',
      'Gbèdjèwin',
      'Missessin',
      'Ohè'
    ],

    '5ème arrondissement': [
      'Guinkomey',
      'Tokpa Hoho',
      'Xwlacodji Kpodji',
      'Xwlacodji Plage',
      'Dota',
      'Gbèto',
      'Mifongou',
      'Zongo Ehuzu',
      'Zongo Nima',
      'Avlékété Jonquet',
      'Bocossi Tokpa',
      'Gbédokpo',
      'Missebo',
      'Missité',
      'Nouveau Pont'
    ],

    '6ème arrondissement': [
      'Aidjèdo',
      'Aidjèdo Ayito',
      'Aidjèdo Gbègo',
      'Aidjèdo Vignon',
      'Ahouansori Agata',
      'Ahouansori Towéta',
      'Gbèdjromèdé',
      'Gbèdjromèdé Sud',
      'Ahouansori Ladji',
      'Dantokpa',
      'Hindé Nord',
      'Hindé Sud',
      'Jéricho Nord',
      'Jéricho Sud',
      'Ahouansori Agoué',
      'Vossa',
      'Djidjè',
      'Djidjè Aïchédji'
    ],

    '7ème arrondissement': [
      'Gbedomidji',
      'Gbenan',
      'Gbewa',
      'Sedami',
      'Sedjro',
      'Todoté',
      'Yevedo',
      'Dagbedji',
      'Enagnon',
      'Fignon',
      'Missité',
      'Sehogan'
    ],

    '8ème arrondissement': [
      'Agbodjedo',
      'Agontinkon',
      'Gbedagba',
      'Houéhoun',
      'Héounoussou',
      'Médedjro',
      'Tonato',
      'Minonkpon'
    ],

    '9ème arrondissement': [
      'Fifadji',
      'Vossakpodji',
      'Zogbo',
      'Zogbohouè'
    ],

    '10ème arrondissement': [
      'Gbènonkpo',
      'Kouhounou',
      'Midédji',
      'Missèkplé',
      'Missogbé',
      'Vèdoko',
      'Yénawa'
    ],

    '11ème arrondissement': [
      'Gbediga 1',
      'Gbediga 2',
      'Gbégamey 1',
      'Gbégamey 2',
      'Gbégamey 3',
      'Gbégamey 4',
      'Saint Jean',
      'Alobatin',
      'Ayidoté',
      'Finagnon',
      'Houéyiho 1',
      'Houéyiho 2',
      'Vodjè Centre'
    ],

    '12ème arrondissement': [
      'Cadjèhoun Aupiais',
      'Cadjèhoun Azalokogon',
      'Cadjèhoun Detinsa',
      'Cadjèhoun Gare',
      'Cadjèhoun Kpota',
      'Gbodjétin',
      'Haie Vive',
      'Hlazounto',
      'Vodjè Kpota',
      'Yémicodji'
    ],

    '13ème arrondissement': [
      'Adjaha-Cité',
      'Agla-Agongbomè',
      'Agla-Akplomè',
      'Agla-Figaro',
      'Agla-Finafa',
      'Agla-Les Pylônes',
      'Agla-Petit Château',
      'Agla-Sud',
      'Ahogbohoué-Cité de l’Expérience',
      'Ahogbohoué-Cité Eucharistie',
      'Aibatin Kpota',
      'Gbedegbé',
      'Houénoussou',
      'Missité'
    ]

  };


  // =====================================================
  // AGENCES
  // =====================================================

  agences: Agence[] = [

    {
      id: 1,
      code: 'AG-001',
      nom: 'Agence Centrale',
      departement: 'Littoral',
      commune: 'Cotonou',
      arrondissement: '1er arrondissement',
      village: 'Dandji',
      responsable: 'Jean Kossi',
      clients: 458,
      statut: 'Active'
    },

    {
      id: 2,
      code: 'AG-002',
      nom: 'Agence Porto-Novo',
      departement: 'Ouémé',
      commune: 'Porto-Novo',
      arrondissement: '',
      village: '',
      responsable: 'Marie Adjovi',
      clients: 326,
      statut: 'Active'
    },

    {
      id: 3,
      code: 'AG-003',
      nom: 'Agence Abomey',
      departement: 'Zou',
      commune: 'Abomey',
      arrondissement: '',
      village: '',
      responsable: 'Paul Dossou',
      clients: 285,
      statut: 'Active'
    },

    {
      id: 4,
      code: 'AG-004',
      nom: 'Agence Parakou',
      departement: 'Borgou',
      commune: 'Parakou',
      arrondissement: '1er arrondissement',
      village: '',
      responsable: 'Thomas Ahouansou',
      clients: 214,
      statut: 'Active'
    },

    {
      id: 5,
      code: 'AG-005',
      nom: 'Agence Pobè',
      departement: 'Plateau',
      commune: 'Pobè',
      arrondissement: 'Pobè',
      village: '',
      responsable: 'David Soglo',
      clients: 156,
      statut: 'Inactive'
    }

  ];


  // =====================================================
  // INITIALISATION
  // =====================================================

  initialiserAgence(): Agence {

    return {
      id: 0,
      code: '',
      nom: '',
      departement: '',
      commune: '',
      arrondissement: '',
      village: '',
      responsable: '',
      clients: 0,
      statut: 'Active'
    };

  }


  // =====================================================
  // COMMUNES DISPONIBLES
  // =====================================================

  get communesDisponibles(): Commune[] {

    if (!this.nouvelleAgence.departement) {
      return [];
    }

    return this.communesParDepartement[
      this.nouvelleAgence.departement
    ] ?? [];

  }


  // =====================================================
  // ARRONDISSEMENTS DISPONIBLES
  // =====================================================

  get arrondissementsDisponibles(): string[] {

    if (
      !this.nouvelleAgence.departement ||
      !this.nouvelleAgence.commune
    ) {
      return [];
    }

    const commune =
      this.communesDisponibles.find(
        item =>
          item.nom === this.nouvelleAgence.commune
      );

    return commune?.arrondissements ?? [];

  }


  // =====================================================
  // VILLAGES DISPONIBLES
  // =====================================================

  get villagesDisponibles(): string[] {

    if (!this.nouvelleAgence.arrondissement) {
      return [];
    }

    return this.villagesParArrondissement[
      this.nouvelleAgence.arrondissement
    ] ?? [];

  }


  // =====================================================
  // VÉRIFICATION LISTE VILLAGES
  // =====================================================

  get villageListeDisponible(): boolean {

    return this.villagesDisponibles.length > 0;

  }


  // =====================================================
  // CHANGEMENT DÉPARTEMENT
  // =====================================================

  changementDepartement(): void {

    this.nouvelleAgence.commune = '';
    this.nouvelleAgence.arrondissement = '';
    this.nouvelleAgence.village = '';

  }


  // =====================================================
  // CHANGEMENT COMMUNE
  // =====================================================

  changementCommune(): void {

    this.nouvelleAgence.arrondissement = '';
    this.nouvelleAgence.village = '';

  }


  // =====================================================
  // CHANGEMENT ARRONDISSEMENT
  // =====================================================

  changementArrondissement(): void {

    this.nouvelleAgence.village = '';

  }


  // =====================================================
  // STATISTIQUES
  // =====================================================

  totalAgences(): number {

    return this.agences.length;

  }


  totalClients(): number {

    return this.agences.reduce(
      (total, agence) =>
        total + agence.clients,
      0
    );

  }


  totalAgencesActives(): number {

    return this.agences.filter(
      agence =>
        agence.statut === 'Active'
    ).length;

  }


  totalAgencesInactives(): number {

    return this.agences.filter(
      agence =>
        agence.statut === 'Inactive'
    ).length;

  }


  // =====================================================
  // FILTRE STATUT
  // =====================================================

  filterStatut(
    statut: 'Tous' | 'Active' | 'Inactive'
  ): void {

    this.statutFiltre = statut;

  }


  // =====================================================
  // AGENCES FILTRÉES
  // =====================================================

  get agencesFiltrees(): Agence[] {

    const terme =
      this.recherche
        .toLowerCase()
        .trim();

    return this.agences.filter(
      (agence: Agence) => {

        const correspondRecherche =
          terme === '' ||

          agence.code
            .toLowerCase()
            .includes(terme) ||

          agence.nom
            .toLowerCase()
            .includes(terme) ||

          agence.departement
            .toLowerCase()
            .includes(terme) ||

          agence.commune
            .toLowerCase()
            .includes(terme) ||

          agence.arrondissement
            .toLowerCase()
            .includes(terme) ||

          agence.village
            .toLowerCase()
            .includes(terme) ||

          agence.responsable
            .toLowerCase()
            .includes(terme);


        const correspondStatut =
          this.statutFiltre === 'Tous' ||
          agence.statut === this.statutFiltre;


        return (
          correspondRecherche &&
          correspondStatut
        );

      }
    );

  }


  // =====================================================
  // AJOUT
  // =====================================================

  ouvrirModalAjout(): void {

    this.modeEdition = false;

    this.agenceSelectionnee = null;

    this.nouvelleAgence =
      this.initialiserAgence();

    this.modalOuvert = true;

  }


  // =====================================================
  // MODIFICATION
  // =====================================================

  ouvrirModalModification(
    agence: Agence
  ): void {

    this.modeEdition = true;

    this.agenceSelectionnee =
      agence;

    this.nouvelleAgence = {
      ...agence
    };

    this.modalOuvert = true;

  }


  // =====================================================
  // FERMER MODAL
  // =====================================================

  fermerModal(): void {

    this.modalOuvert = false;

    this.agenceSelectionnee = null;

    this.nouvelleAgence =
      this.initialiserAgence();

  }


  // =====================================================
  // ENREGISTRER
  // =====================================================

  enregistrerAgence(): void {

    const agence =
      this.nouvelleAgence;


    if (
      !agence.code.trim() ||
      !agence.nom.trim() ||
      !agence.departement.trim() ||
      !agence.commune.trim() ||
      !agence.arrondissement.trim() ||
      !agence.village.trim() ||
      !agence.responsable.trim()
    ) {

      window.alert(
        'Veuillez renseigner toutes les informations obligatoires de l’agence.'
      );

      return;

    }


    // ---------------------------------------------------
    // MODIFICATION
    // ---------------------------------------------------

    if (this.modeEdition) {

      const index =
        this.agences.findIndex(
          item =>
            item.id === agence.id
        );


      if (index !== -1) {

        this.agences[index] = {

          ...agence,

          code: agence.code.trim(),
          nom: agence.nom.trim(),
          departement: agence.departement.trim(),
          commune: agence.commune.trim(),
          arrondissement: agence.arrondissement.trim(),
          village: agence.village.trim(),
          responsable: agence.responsable.trim(),
          clients: Number(agence.clients)

        };

      }

    }


    // ---------------------------------------------------
    // AJOUT
    // ---------------------------------------------------

    else {

      const nouvelId =
        this.agences.length > 0
          ? Math.max(
              ...this.agences.map(
                item => item.id
              )
            ) + 1
          : 1;


      this.agences.push({

        ...agence,

        id: nouvelId,

        code: agence.code.trim(),
        nom: agence.nom.trim(),
        departement: agence.departement.trim(),
        commune: agence.commune.trim(),
        arrondissement: agence.arrondissement.trim(),
        village: agence.village.trim(),
        responsable: agence.responsable.trim(),
        clients: Number(agence.clients)

      });

    }


    this.fermerModal();

  }


  // =====================================================
  // VOIR
  // =====================================================

  voirAgence(
    agence: Agence
  ): void {

    this.agenceSelectionnee =
      agence;

  }


  // =====================================================
  // FERMER DÉTAILS
  // =====================================================

  fermerDetails(): void {

    this.agenceSelectionnee =
      null;

  }


  // =====================================================
  // SUPPRIMER
  // =====================================================

  supprimerAgence(
    agence: Agence
  ): void {

    const confirmation =
      window.confirm(
        `Voulez-vous vraiment supprimer l'agence "${agence.nom}" ?`
      );


    if (!confirmation) {
      return;
    }


    this.agences =
      this.agences.filter(
        item =>
          item.id !== agence.id
      );


    if (
      this.agenceSelectionnee &&
      this.agenceSelectionnee.id === agence.id
    ) {

      this.agenceSelectionnee =
        null;

    }

  }


  // =====================================================
  // CHANGER STATUT
  // =====================================================

  changerStatut(
    agence: Agence
  ): void {

    agence.statut =
      agence.statut === 'Active'
        ? 'Inactive'
        : 'Active';

  }

}

