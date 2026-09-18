import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profil.html'
})
export class Profil {

  // =====================================================
  // DONNÉES DU CLIENT CONNECTÉ
  // =====================================================

  client = {
    nom: 'Jean Kouassi',
    dateNaissance: '15/06/1995',
    telephone: '+229 97 00 00 00',
    npi: '123456789012',
    matricule: 'CLI-2026-00125',

    agence: 'Agence Centrale',
    codeAgence: 'AG-001',

    departement: 'Littoral',
    commune: 'Cotonou',
    arrondissement: '1er arrondissement',

    identifiantConnexion: '123456789012',

    dateInscription: '10/08/2026',
    statut: 'Actif',

    nombreCartes: 3,
    cartesActives: 2,
    soldeGlobal: 47500
  };


  // =====================================================
  // MODIFICATION DU PROFIL
  // =====================================================

  afficherModalModification = false;

  profilModification = {
    nom: this.client.nom,
    dateNaissance: this.client.dateNaissance,
    telephone: this.client.telephone
  };


  // =====================================================
  // MOT DE PASSE
  // =====================================================

  afficherModalMotDePasse = false;

  motDePasse = {
    actuel: '',
    nouveau: '',
    confirmation: ''
  };


  // =====================================================
  // SUPPRESSION DU COMPTE
  // =====================================================

  afficherModalSuppression = false;

  confirmationSuppression = '';


  // =====================================================
  // MESSAGE
  // =====================================================

  messageSucces = '';
  afficherMessageSucces = false;


  // =====================================================
  // MODIFICATION PROFIL
  // =====================================================

  ouvrirModification(): void {

    this.profilModification = {
      nom: this.client.nom,
      dateNaissance: this.client.dateNaissance,
      telephone: this.client.telephone
    };

    this.afficherModalModification = true;
  }


  fermerModification(): void {
    this.afficherModalModification = false;
  }


  enregistrerProfil(): void {

    this.client.nom = this.profilModification.nom;
    this.client.dateNaissance = this.profilModification.dateNaissance;
    this.client.telephone = this.profilModification.telephone;

    this.fermerModification();

    this.afficherSucces(
      'Vos informations personnelles ont été mises à jour avec succès.'
    );
  }


  // =====================================================
  // MOT DE PASSE
  // =====================================================

  ouvrirMotDePasse(): void {

    this.motDePasse = {
      actuel: '',
      nouveau: '',
      confirmation: ''
    };

    this.afficherModalMotDePasse = true;
  }


  fermerMotDePasse(): void {
    this.afficherModalMotDePasse = false;
  }


  changerMotDePasse(): void {

    if (
      !this.motDePasse.actuel ||
      !this.motDePasse.nouveau ||
      !this.motDePasse.confirmation
    ) {
      return;
    }

    if (this.motDePasse.nouveau !== this.motDePasse.confirmation) {
      return;
    }

    this.fermerMotDePasse();

    this.afficherSucces(
      'Votre mot de passe a été modifié avec succès.'
    );
  }


  // =====================================================
  // SUPPRESSION DU COMPTE
  // =====================================================

  ouvrirSuppression(): void {

    this.confirmationSuppression = '';
    this.afficherModalSuppression = true;
  }


  fermerSuppression(): void {

    this.confirmationSuppression = '';
    this.afficherModalSuppression = false;
  }


  supprimerCompte(): void {

    if (this.confirmationSuppression !== 'SUPPRIMER') {
      return;
    }

    /*
     * Plus tard :
     * appel API Laravel pour supprimer/désactiver le compte.
     */

    this.afficherModalSuppression = false;

    this.afficherSucces(
      'La demande de suppression du compte a été enregistrée.'
    );
  }


  // =====================================================
  // MESSAGE SUCCÈS
  // =====================================================

  afficherSucces(message: string): void {

    this.messageSucces = message;
    this.afficherMessageSucces = true;

    setTimeout(() => {
      this.afficherMessageSucces = false;
    }, 4000);
  }


  fermerMessage(): void {
    this.afficherMessageSucces = false;
  }
}