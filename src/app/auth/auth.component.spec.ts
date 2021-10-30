import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AuthComponent } from "./auth.component";
import { AuthService } from "./services/auth.service";
import { Login, LoginToken } from "./models/login.model";
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { from, Observable } from "rxjs";

describe('AuthComponent with HTTP Service', () => {

  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authService: AuthService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [AuthService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  const form = (username: string, password: string) => {
    component.authForm.controls["username"].setValue(username);
    component.authForm.controls["password"].setValue(password);
  };

  it('Component created', () => {
    expect(component).toBeTruthy();
  })

  it('Component form initial state', () => {
    expect(component.authForm).toBeDefined();
    expect(component.authForm.valid).toBeDefined();
    expect(component.authForm.invalid).toBeDefined();
  })

  it("check validity", () => {
    form("admin", "admin");
    const authMock: Login = { username: "admin", password: "admin" };
    expect(component.authForm.value).toEqual(authMock);
  })

  it('AuthForm field validity', () => {
    let error: ValidationErrors = {};

    let username: AbstractControl = component.authForm.controls['username'];
    expect(username.valid).toBeFalse();

    error = username.errors || {};
    expect(error['required']).toBeTruthy()

    component.authForm.get('username').setValue('adm');
    error = username.errors['minlength'] || {};
    expect(error).toBeTruthy()

    username.setValue("admin");
    error = username.errors || {};
    expect(error["required"]).toBeFalsy();

    let password: AbstractControl = component.authForm.controls['password'];
    expect(password.valid).toBeFalse();

    error = password.errors || {};
    expect(error['required']).toBeTruthy()

    component.authForm.get('password').setValue('adm');
    error = password.errors['minlength'] || {};
    expect(error).toBeTruthy()

    password.setValue("admin");
    error = password.errors || {};
    expect(error["required"]).toBeFalsy();
  })

  // solution use spy
  it('Successfully login from onSubmit() with spy', () => {
    const mockTokenLogin: LoginToken = {
      token: '&9%3@#$%dwoofgwgfwgfiuw'
    }
    const spy = spyOn(authService, 'login')
      .and.callThrough()
      .and.callFake((): Observable<LoginToken> => {
        return from([mockTokenLogin])
      })
    component.authForm.get('username').setValue('admin');
    component.authForm.get('password').setValue('admin');
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  })
})
