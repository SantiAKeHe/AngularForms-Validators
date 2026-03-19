import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from '../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-wizard-step-1',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './wizard-step-1.component.html',
  styleUrl: './wizard-step-1.component.scss',
})
export class WizardStep1Component {
  @Input() group!: FormGroup<{
    firstName: FormControl<string | null>;
    lastName: FormControl<string | null>;
  }>;

  get firstName(): FormControl<string | null> {
    return this.group.controls.firstName;
  }

  get lastName(): FormControl<string | null> {
    return this.group.controls.lastName;
  }
}
