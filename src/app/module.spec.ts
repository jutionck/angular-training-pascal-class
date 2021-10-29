import { TestBed } from "@angular/core/testing";
import { AppModule } from "./app.module";
import { AuthModule } from "./auth/auth.module";
import { DemoModule } from "./demo/demo.module";
import { PagesModule } from "./pages/pages.module";
import { ResumeModule } from "./resume/resume.module";
import { SampleModule } from "./sample/sample.module";
import { SharedModule } from "./shared/shared.module";

describe('Module Test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        SharedModule,
        SampleModule,
        ResumeModule,
        PagesModule,
        DemoModule,
        AuthModule
      ]
    })
  })

  it('Initialize AppModule()', () => {
    const module = TestBed.inject(AppModule)
    expect(module).toBeDefined()
  })

  it('Initialize SharedModule()', () => {
    const module = TestBed.inject(SharedModule)
    expect(module).toBeTruthy()
  })

  it('Initialize SampleModule()', () => {
    const module = TestBed.inject(SampleModule)
    expect(module).toBeDefined()
  })

  it('Initialize ResumeModule()', () => {
    const module = TestBed.inject(ResumeModule)
    expect(module).toBeDefined()
  })

  it('Initialize PagesModule()', () => {
    const module = TestBed.inject(PagesModule)
    expect(module).toBeDefined()
  })

  it('Initialize DemoModule()', () => {
    const module = TestBed.inject(DemoModule)
    expect(module).toBeDefined()
  })

  it('Initialize AuthModule()', () => {
    const module = TestBed.inject(AuthModule)
    expect(module).toBeDefined()
  })


});