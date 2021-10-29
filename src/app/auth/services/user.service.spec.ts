import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { getTestBed, inject, TestBed } from "@angular/core/testing";
import { Login, LoginToken } from "../models/login.model";
import { AuthService } from "./auth.service";

describe('AuthService', () => {
  let injector: TestBed;
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    injector = getTestBed();
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // HttpTestingController#verify to make sure that there are no outstanding requests:
  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  describe('Login()', () => {
    it('Should return Observable<LoginToken>', () => {
      const expectedUrl = `/api/auth/login`;
      const mockLogin: Login = {
        username: 'admin',
        password: 'admin'
      }

      const mockLoginToken: LoginToken = {
        token: '7%&***dhdhud-hdhdud'
      }

      authService.login(mockLogin)
        .subscribe((response: LoginToken) => {
          console.log(response);
          expect(response).toEqual(mockLoginToken);
        })
      const request = httpMock.expectOne(expectedUrl);
      // request.flush(mockLogin);
      expect(request.request.method).toBe("POST");
      expect(request.request.body).toEqual(mockLogin);
    })
  })
})
