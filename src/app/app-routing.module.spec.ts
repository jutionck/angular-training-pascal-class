import { Location } from "@angular/common";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing"
import { AppRoutingModule } from "./app-routing.module";
import { AboutComponent } from "./pages/about/about.component";

describe('AppRoutingModule()', () => {
  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), AppRoutingModule]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(AboutComponent);
    router.initialNavigation();
  })

  it('navigate to "" get resumeComponent', fakeAsync(() => {
    router.navigate(["/about"]).then(() => {
      tick(50);
      expect(location.path()).toBe("/about");
    });
  }));
})