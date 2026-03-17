import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { noSpacesValidator } from '../custom-validators/no-spaces.validator';
import { minAgeValidator } from '../custom-validators/min-age.validator';
import { ErrorMessageComponent } from '../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-dynamic-forms',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, ErrorMessageComponent],
  templateUrl: './dynamic-forms.component.html',
  styleUrl: './dynamic-forms.component.scss',
})
export class DynamicFormsComponent {
  private fb = inject(FormBuilder);

  // ── Demo 1 — FormArray ────────────────────────────────────────────────────

  participantsForm = this.fb.group({
    participants: this.fb.array<FormGroup>([]),
  });

  submittedParticipants: unknown = null;

  get participants(): FormArray<FormGroup> {
    return this.participantsForm.controls.participants;
  }

  constructor() {
    this.addParticipant();
  }

  addParticipant(): void {
    this.participants.push(
      this.fb.group({
        name: this.fb.control<string>('', [Validators.required, noSpacesValidator()]),
        age: this.fb.control<number | null>(null, [Validators.required, minAgeValidator(18)]),
      })
    );
  }

  removeParticipant(index: number): void {
    this.participants.removeAt(index);
  }

  participantControl(index: number, field: string): AbstractControl {
    return this.participants.at(index).get(field)!;
  }

  onSubmitParticipants(): void {
    if (this.participantsForm.valid) {
      this.submittedParticipants = this.participantsForm.value;
    }
  }

  // ── Demo 2 — Multi-step Wizard ────────────────────────────────────────────

  wizardForm = this.fb.group({
    step1: this.fb.group({
      firstName: this.fb.control<string>('', Validators.required),
      lastName: this.fb.control<string>('', Validators.required),
    }),
    step2: this.fb.group({
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      age: this.fb.control<number | null>(null, [Validators.required, minAgeValidator(18)]),
    }),
    step3: this.fb.group({
      username: this.fb.control<string>('', [Validators.required, noSpacesValidator()]),
      password: this.fb.control<string>('', Validators.required),
    }),
  });

  currentStep = 1;
  submittedWizard: unknown = null;

  get step1() {
    return this.wizardForm.controls.step1;
  }

  get step2() {
    return this.wizardForm.controls.step2;
  }

  get step3() {
    return this.wizardForm.controls.step3;
  }

  get currentStepGroup(): FormGroup {
    if (this.currentStep === 1) return this.step1;
    if (this.currentStep === 2) return this.step2;
    return this.step3;
  }

  // Step 1 controls
  get firstName() {
    return this.step1.controls.firstName;
  }
  get lastName() {
    return this.step1.controls.lastName;
  }

  // Step 2 controls
  get email() {
    return this.step2.controls.email;
  }
  get wizardAge() {
    return this.step2.controls.age;
  }

  // Step 3 controls
  get username() {
    return this.step3.controls.username;
  }
  get password() {
    return this.step3.controls.password;
  }

  canAdvance(): boolean {
    return this.currentStepGroup.valid;
  }

  nextStep(): void {
    if (this.canAdvance() && this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmitWizard(): void {
    if (this.wizardForm.valid) {
      this.submittedWizard = this.wizardForm.value;
    }
  }
}
