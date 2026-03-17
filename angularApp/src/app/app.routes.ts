import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReactiveComponent } from './reactive/reactive.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'reactive', component: ReactiveComponent },
];
