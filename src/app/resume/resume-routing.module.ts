import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ResumeComponent } from "./resume.component";

const routes: Routes = [
  {
    path: '',
    component: ResumeComponent // eager load
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ResumeRoutingModule { }