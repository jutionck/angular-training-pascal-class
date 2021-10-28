import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { AppComponent } from "./app.component"
import { BsbuttonDirective } from "./shared/directives/bsbutton.directive";
import { HighlightDirective } from "./shared/directives/highlight.directive";

describe('AppComponent()', () => {

  let fixture: ComponentFixture<AppComponent>;
  let element: HTMLElement;
  let component: AppComponent;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, BsbuttonDirective, HighlightDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    debugElement = fixture.debugElement;
  });

  it('Should create the AppComponent', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Should have as title "Angular Intro"', () => {
    const app = fixture.componentInstance;
    expect(app.title).toBe('Angular Intro');
  });

  it('Should have a function sum(2, 2) result 4', () => {
    const app = fixture.componentInstance;
    expect(app.sum(-2, 1)).toEqual(-1);
  })

  it('Should have <app-header></app-header>', () => {
    const appHeader = element.querySelector("app-header")
    expect(appHeader).toBeTruthy();
  })

  it('No title in the DOM after create component', () => {
    const header = element.querySelector('h1');
    expect(header.textContent).toEqual('');
  })

  it('should display title = "Angular Intro" in html', () => {
    const header = element.querySelector('h1');
    fixture.detectChanges();
    expect(header.textContent).toContain(component.title);
  })

  it('should have one appHiglight element', () => {
    fixture.detectChanges();
    const highlight = debugElement.queryAll(By.directive(HighlightDirective));
    expect(highlight.length).toBe(1);
    fixture.detectChanges()
  })

  it('should have one appBsbutton element', () => {
    const bsButton = debugElement.queryAll(By.directive(BsbuttonDirective));
    // fixture.detectChanges();
    expect(bsButton.length).toBe(1);
  })

  describe('#fakeAsync and Tick', () => {
    it('Asynchronous test example with setTimeOut without fakeAsync and tick', () => {
      let test: boolean = false;
      setTimeout(() => {
        console.log("running assertion");
        test = true;
        expect(test).toBeTruthy()
      }, 1000);
    })

    it('Asynchronous test example with setTimeOut without fakeAsync and tick', fakeAsync(() => {
      let test: boolean = false;
      setTimeout(() => {
        console.log("running assertion");
        test = true;
        expect(test).toBeTruthy()
      }, 1000);
      expect(test).toBe(false);
      tick(500);
      expect(test).toBe(false);
      tick(500);
      expect(test).toBe(true);
    }))
  })
})
// npm run test:coverage