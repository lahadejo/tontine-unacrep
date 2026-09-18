
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  firstName = '';
  lastName = '';
  phone = '';
  email = '';
  password = '';
  passwordConfirmation = '';
  acceptTerms = false;

  showPassword = false;
  showPasswordConfirmation = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  togglePasswordConfirmation(): void {
    this.showPasswordConfirmation =
      !this.showPasswordConfirmation;
  }

  onSubmit(): void {

    if (this.password !== this.passwordConfirmation) {
      console.log('Les mots de passe ne correspondent pas.');
      return;
    }

    if (!this.acceptTerms) {
      console.log('Les conditions doivent être acceptées.');
      return;
    }

    console.log('Inscription', {
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      email: this.email
    });
  }
}
