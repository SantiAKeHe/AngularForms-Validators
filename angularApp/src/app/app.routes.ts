import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReactiveComponent } from './reactive/reactive.component';
import { TemplateDrivenComponent } from './template-driven/template-driven.component';
import { CustomValidatorsComponent } from './custom-validators/custom-validators.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'reactive', component: ReactiveComponent },
  { path: 'template', component: TemplateDrivenComponent },
  { path: 'validators', component: CustomValidatorsComponent },
];
