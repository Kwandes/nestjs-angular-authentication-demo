import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'nestjs-angular-authentication-demo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  /**
   * Small object used to show simple alerts to the user
   */
  alert?: { message: string; type: 'error' | 'info' };
  /**
   * Is set to true when certain actions like pressing the login button shouldn't be possible due to data loading / waiting for request result.
   */
  isLoading = false;

  /**
   * Initialize the login form
   */
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
    });
  }

  /**
   *  Sign in the user with the credentials from the form.
   */
  async onSubmit(): Promise<void> {
    if (this.loginEnabled()) {
      console.warn('Tried to submit an invalid/dirty login form');

      return;
    }
    this.isLoading = true;
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    // temp timeout to imitiate an API call
    await new Promise((f) => setTimeout(f, 1000));
    this.isLoading = false;
    this.alert = {
      message: `Logged in as ${email}:${password}`,
      type: 'info',
    };
  }

  /**
   * Check whether the login forms' state allows logging in.
   * @returns whether it is possible to log in.
   */
  loginEnabled(): boolean {
    return !(this.isLoading || (this.loginForm.valid && this.loginForm.dirty));
  }

  /**
   * Allow pressing the log in button by pressing enter while the credentials are valid.
   */
  @HostListener('document:keydown.enter') enterKeyPressed() {
    if (this.loginEnabled()) {
      this.onSubmit();
    }
  }
}
