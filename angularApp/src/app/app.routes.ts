import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReactiveComponent } from './reactive/reactive.component';
import { TemplateDrivenComponent } from './template-driven/template-driven.component';
import { CustomValidatorsComponent } from './custom-validators/custom-validators.component';
import { DynamicFormsComponent } from './dynamic-forms/dynamic-forms.component';
import { ErrorMessagesComponent } from './error-messages/error-messages.component';
import { KendoUiComponent } from './kendo-ui/kendo-ui.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'reactive', component: ReactiveComponent },
  { path: 'template', component: TemplateDrivenComponent },
  { path: 'validators', component: CustomValidatorsComponent },
  { path: 'dynamic', component: DynamicFormsComponent },
  { path: 'errors', component: ErrorMessagesComponent },
  { path: 'kendo-ui', component: KendoUiComponent },
];
