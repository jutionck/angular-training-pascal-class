import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginToken } from './models/login.model';
import { AuthService } from './services/auth.service';

import { map } from 'rxjs/operators'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        map((params: Params) => params.action))
      .subscribe((action) => {
        if (action === 'logout') {
          sessionStorage.removeItem('token')
          this.router.navigateByUrl('/auth/login');
        } else if (sessionStorage.getItem('token') && action === 'login') {
          this.router.navigateByUrl('/');
        }
      })
  }

  authForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  })

  onSubmit(): void {
    if (this.authForm.valid) {
      this.authService.login(this.authForm.value)
        .subscribe((response: LoginToken) => {
          sessionStorage.setItem('token', response.token);
          this.router.navigateByUrl('/')
        }, console.error)
    }
  }

  isFieldValid(fieldName: string, parent?: AbstractControl): string {
    const control: AbstractControl = this.authForm.get(fieldName) as AbstractControl;

    if (parent) {
      parent = control;
    }

    if (control && control.touched && control.invalid) {
      return 'is-invalid';
    } else if (control && control.valid) {
      return 'is-valid';
    } else {
      return '';
    }
  }

}
