import { Component, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { KENDO_COMBOBOX } from '@progress/kendo-angular-dropdowns';
import { KENDO_DROPDOWNLIST } from '@progress/kendo-angular-dropdowns';
import { ErrorMessageComponent } from '../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-kendo-ui',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JsonPipe,
    ...KENDO_COMBOBOX,
    ...KENDO_DROPDOWNLIST,
    ErrorMessageComponent,
  ],
  templateUrl: './kendo-ui.component.html',
  styleUrl: './kendo-ui.component.scss',
})
export class KendoUiComponent {
  private fb = inject(FormBuilder);

  // Demo 1 — ComboBox
  form = this.fb.group({
    country: this.fb.control<string | null>(null, Validators.required),
  });

  countries: string[] = ['Ecuador', 'Colombia', 'Peru', 'Chile', 'Argentina'];

  get country(): FormControl<string | null> {
    return this.form.controls.country;
  }

  // Demo 2 — DropDownList
  form2 = this.fb.group({
    language: this.fb.control<string | null>(null, Validators.required),
  });

  languages: string[] = ['TypeScript', 'JavaScript', 'Python', 'Java', 'Go'];

  get language(): FormControl<string | null> {
    return this.form2.controls.language;
  }
}
