import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate, CanActivateChild {

  constructor(
    private readonly router: Router,
  ) { }

  canActivate(): boolean {
    return this.authorize();
  }

  canActivateChild(): boolean {
    return this.authorize();
  }

  private authorize(): boolean {

    const authorize: boolean = (sessionStorage.getItem('token') !== null);

    if (!authorize) {
      alert('Kamu tidak mempunyai akses di halaman ini');
      this.router.navigateByUrl('/auth/login');
    }

    return authorize;
  }
}
