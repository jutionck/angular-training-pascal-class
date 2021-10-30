import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Login, LoginToken } from "../models/login.model";
import { AuthService } from "./auth.service";

describe('AuthService with HTTP Service', () => {

  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('Should return Observable<LoginToken>', () => {
    const url = '/api/auth/login';
    const mockLogin: Login = {
      username: 'admin',
      password: 'admin'
    }
    const mockLoginToken: LoginToken = {
      token: '%225dbi2d2dvdv26276'
    }
    authService.login(mockLogin)
      .subscribe((response: LoginToken) => {
        expect(response).toEqual(mockLoginToken);
      })
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(mockLogin)
  })
});