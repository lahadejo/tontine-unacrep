import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface CommissionConfig {
  id: number;
  type: 'pourcentage' | 'fixe';
  taux: number;
  active: boolean;
  dateModification: string;
  modifiePar: string;
}

@Component({
  selector: 'app-commissions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './commissions.html',
  styleUrl: './commissions.css'
})
export class Commissions {

  // ============================================================
  // CONFIGURATION ACTUELLE
  // ============================================================

  commission: CommissionConfig = {
    id: 1,
    type: 'pourcentage',
    taux: 5,
    active: true,
    dateModification: '2026-09-18',
    modifiePar: 'Administrateur UNACREP'
  };

  // ============================================================
  // FORMULAIRE
  // ============================================================

  typeCommission: 'pourcentage' | 'fixe' = 'pourcentage';
  tauxCommission = 5;
  commissionActive = true;

  afficherConfirmation = false;
  messageSucces = '';
  messageErreur = '';

  // ============================================================
  // EXEMPLE DE SIMULATION
  // ============================================================

  montantExemple = 12000;

  get commissionExemple(): number {
    if (this.typeCommission === 'pourcentage') {
      return (this.montantExemple * this.tauxCommission) / 100;
    }

    return this.tauxCommission;
  }

  get montantNetExemple(): number {
    return Math.max(
      0,
      this.montantExemple - this.commissionExemple
    );
  }

  // ============================================================
  // MODIFICATION
  // ============================================================

  modifierCommission(): void {
    this.messageErreur = '';
    this.messageSucces = '';

    if (this.tauxCommission < 0) {
      this.messageErreur = 'Le taux de commission ne peut pas être négatif.';
      return;
    }

    if (
      this.typeCommission === 'pourcentage' &&
      this.tauxCommission > 100
    ) {
      this.messageErreur =
        'Le taux de commission en pourcentage ne peut pas dépasser 100 %.';
      return;
    }

    this.afficherConfirmation = true;
  }

  annulerModification(): void {
    this.afficherConfirmation = false;
  }

  confirmerModification(): void {

    this.commission = {
      ...this.commission,
      type: this.typeCommission,
      taux: this.tauxCommission,
      active: this.commissionActive,
      dateModification: new Date().toISOString().split('T')[0],
      modifiePar: 'Administrateur UNACREP'
    };

    this.afficherConfirmation = false;

    this.messageSucces =
      'La configuration de la commission a été mise à jour avec succès.';

    setTimeout(() => {
      this.messageSucces = '';
    }, 4000);
  }

  // ============================================================
  // CHARGEMENT DE LA CONFIGURATION
  // ============================================================

  chargerConfiguration(): void {
    this.typeCommission = this.commission.type;
    this.tauxCommission = this.commission.taux;
    this.commissionActive = this.commission.active;
  }

  // ============================================================
  // FORMATAGE
  // ============================================================

  formaterMontant(montant: number): string {
    return new Intl.NumberFormat('fr-FR').format(montant);
  }

  get libelleTypeCommission(): string {
    return this.commission.type === 'pourcentage'
      ? 'Pourcentage'
      : 'Montant fixe';
  }

  get libelleStatut(): string {
    return this.commission.active
      ? 'Active'
      : 'Inactive';
  }
}