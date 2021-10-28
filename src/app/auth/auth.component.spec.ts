import { Location } from "@angular/common";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { Router } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { AuthService } from "./services/auth.service";
import { RouterTestingModule } from "@angular/router/testing";
import { ResumeComponent } from "../resume/resume.component";
import { Login, LoginToken } from "./models/login.model";
import { from, Observable } from "rxjs";
import { By } from "@angular/platform-browser";

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authService: AuthService;

  const mockLogin = {
    username: 'admin',
    password: 'admin',
  }

  const mockLoginResponse = {
    token: '9289n9d&86%$)!djdjd'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [AuthService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  const form = (username: string, password: string) => {
    component.authForm.controls['username'].setValue(username);
    component.authForm.controls['password'].setValue(password);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.authForm).toBeDefined();
    expect(component.authForm.invalid).toBeTruthy();
  });

  it('check validality', (() => {
    form("admin", "admin");
    const authMock: Login = { username: "admin", password: "admin" }
    expect(component.authForm.value).toEqual(authMock);
  }));

  it('AuthForm field validity', () => {
    let error = {}
    let username = component.authForm.controls['username'];
    expect(username.valid).toBeFalsy();

    let password = component.authForm.controls['password'];
    expect(password.valid).toBeFalsy();

    error = username.errors || {}
    expect(error['required']).toBeTruthy();

    error = password.errors || {}
    expect(error['required']).toBeTruthy();

    username.setValue('admin');
    error = username.errors || {}
    expect(error['required']).toBeFalsy();

    password.setValue('password');
    error = password.errors || {}
    expect(error['required']).toBeFalsy();
  });

  it('should have method success login()', () => {
    component.authForm.value.username = 'admin'
    component.authForm.value.password = 'admin'
    component.onSubmit();
  });

  it('should not save session storage if response not null ', () => {
    const token: string = 'odqodgqfdg9qtf83yf0yfy0ycyq0cyqc';
    sessionStorage.setItem('token', token);
    expect(sessionStorage.getItem('token')).toEqual('odqodgqfdg9qtf83yf0yfy0ycyq0cyqc')
    sessionStorage.clear()
    expect(sessionStorage.getItem('token')).toEqual(null)
  })
})
