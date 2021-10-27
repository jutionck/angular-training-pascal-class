import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertMessage } from 'src/app/shared/models/alert-message';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

import { delay, map, switchMap } from 'rxjs/operators'
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  user?: User;
  message?: AlertMessage;
  loading: boolean = false;

  constructor(
    private readonly userService: UserService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.params.pipe(
      map(params => params.id),
      switchMap((id: string) => {
        if (!id) return EMPTY
        else {
          return this.userService.getById(id)
        }
      })
    )
      .subscribe((user: User) => {
        if (user) {
          this.user = user;
          this.setFormValues(this.user);
        }
      }, console.error,
        () => this.loading = false
      )
  }

  userForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.min(6)]),
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required])
  })


  setFormValues(user: User): void {
    this.userForm.get('id')?.setValue(user.id);
    this.userForm.get('username')?.setValue(user.username);
    this.userForm.get('password')?.setValue(user.password);
    this.userForm.get('fullName')?.setValue(user.fullName);
    this.userForm.get('email')?.setValue(user.email);
    this.userForm.get('phone')?.setValue(user.phone);
  }

  onSubmituser(): void {
    const user: User = this.userForm.value;
    if (this.user && this.user.id) {
      user.id = this.user.id
    }
    this.userService.save(user)
      .subscribe(() => {
        this.router.navigateByUrl('/demo/users');
        this.userForm.reset()
        this.message = {
          status: 'success',
          text: `User ${user.fullName} berhasil tersimpan`
        }
      })
  }


  // validasi form
  isFieldValid(fieldName: string, parent?: AbstractControl): string {
    const control: AbstractControl = this.userForm.get(fieldName) as AbstractControl;

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
