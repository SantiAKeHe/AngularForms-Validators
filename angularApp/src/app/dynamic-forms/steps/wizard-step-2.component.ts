import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from '../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-wizard-step-2',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './wizard-step-2.component.html',
  styleUrl: './wizard-step-2.component.scss',
})
export class WizardStep2Component {
  @Input() group!: FormGroup<{
    email: FormControl<string | null>;
    age: FormControl<number | null>;
  }>;

  get email(): FormControl<string | null> {
    return this.group.controls.email;
  }

  get age(): FormControl<number | null> {
    return this.group.controls.age;
  }
}
