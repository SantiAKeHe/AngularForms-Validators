import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from '../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-wizard-step-3',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './wizard-step-3.component.html',
  styleUrl: './wizard-step-3.component.scss',
})
export class WizardStep3Component {
  @Input() group!: FormGroup<{
    username: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  get username(): FormControl<string | null> {
    return this.group.controls.username;
  }

  get password(): FormControl<string | null> {
    return this.group.controls.password;
  }
}
