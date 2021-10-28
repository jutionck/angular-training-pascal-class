import { TestBed } from "@angular/core/testing"
import { AppModule } from "./app.module"
import { AuthModule } from "./auth/auth.module"
import { DemoModule } from "./demo/demo.module"
import { PagesModule } from "./pages/pages.module"
import { ResumeModule } from "./resume/resume.module"
import { SampleModule } from "./sample/sample.module"
import { SharedModule } from "./shared/shared.module"

describe('Module Test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        SharedModule,
        DemoModule,
        AuthModule,
        PagesModule,
        ResumeModule,
        SampleModule
      ]
    });
  })

  it("initialize AppModule", () => {
    const module = TestBed.inject(AppModule);
    expect(module).toBeTruthy();
  });

  it("initialize SharedModule", () => {
    const module = TestBed.inject(SharedModule);
    expect(module).toBeTruthy();
  });

  it("initialize DemoModule", () => {
    const module = TestBed.inject(DemoModule);
    expect(module).toBeTruthy();
  });

  it("initialize AuthModule", () => {
    const module = TestBed.inject(AuthModule);
    expect(module).toBeTruthy();
  });

  it("initialize PagesModule", () => {
    const module = TestBed.inject(PagesModule);
    expect(module).toBeTruthy();
  });

  it("initialize ResumeModule", () => {
    const module = TestBed.inject(ResumeModule);
    expect(module).toBeTruthy();
  });

  it("initialize SampleModule", () => {
    const module = TestBed.inject(SampleModule);
    expect(module).toBeTruthy();
  });
})