import { Location } from "@angular/common"
import { fakeAsync, flush, TestBed, tick } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DemoRoutingModule } from "./demo/demo-routing.module";
import { ResumeComponent } from "./resume/resume.component";
import { RouteGuard } from "./shared/guard/route.guard";

describe('AppRoutingModule()', () => {

  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '',
            loadChildren: () => import('./resume/resume.module')
              .then(module => module.ResumeModule)
          },
        ])
      ]
    })

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
  })

  it('Navigate to "/" get ResumeComponent', fakeAsync(() => {
    router.navigate(["/"]).then(() => {
      expect(location.path()).toBe("/");
    })
  }))
})
