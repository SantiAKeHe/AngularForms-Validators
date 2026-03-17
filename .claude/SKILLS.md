# SKILLS.md — Execution Recipes

These are step-by-step recipes for the JR to execute common tasks in this project.
Rules and restrictions live in CLAUDE.md. This file is about HOW to build.

---

## SKILL 01 — Create an Educational Section Component

Use this when an issue asks you to create a new section of the app (e.g. reactive forms section, template-driven section).

**Steps:**

1.  Create the folder:

        angularApp/src/app/<section-name>/

2.  Create these four files manually:

        <section-name>.component.ts
        <section-name>.component.html
        <section-name>.component.scss
        <section-name>.component.spec.ts

3.  Minimum component class structure:

        import { Component } from '@angular/core';
        import { CommonModule } from '@angular/common';

        @Component({
          selector: 'app-<section-name>',
          standalone: true,
          imports: [CommonModule],
          templateUrl: './<section-name>.component.html',
          styleUrl: './<section-name>.component.scss'
        })
        export class <SectionName>Component {}

4.  Register the component in `app.routes.ts` or the parent component that navigates to it — only if the issue requires navigation.

5.  Do not add logic beyond what the issue describes.

---

## SKILL 02 — Create a Custom Validator

Use this when an issue asks for a custom validator (simple, factory, or cross-field).

**Steps:**

1.  Create the validator file:

        angularApp/src/app/<feature>/
          <feature>.validator.ts
          <feature>.validator.spec.ts

2.  Simple validator structure:

        import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

        export function myValidator(): ValidatorFn {
          return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value as string;
            const isInvalid = /* your condition here */;
            return isInvalid ? { myValidatorKey: true } : null;
          };
        }

3.  Factory validator structure (when the validator needs a parameter):

        export function minValueValidator(min: number): ValidatorFn {
          return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value as number;
            return value < min ? { minValue: { required: min, actual: value } } : null;
          };
        }

4.  Cross-field validator structure (applied at FormGroup level):

        export function fieldMatchValidator(fieldA: string, fieldB: string): ValidatorFn {
          return (group: AbstractControl): ValidationErrors | null => {
            const fg = group as FormGroup;
            const a = fg.controls[fieldA].value;
            const b = fg.controls[fieldB].value;
            return a !== b ? { fieldMismatch: true } : null;
          };
        }

5.  Write the spec file — tests are mandatory for all validators:

        import { FormControl, FormGroup } from '@angular/forms';
        import { myValidator } from './my.validator';

        describe('myValidator', () => {
          it('should return null when value is valid', () => {
            const control = new FormControl('valid-value');
            const result = myValidator()(control);
            expect(result).toBeNull();
          });

          it('should return error when value is invalid', () => {
            const control = new FormControl('invalid-value');
            const result = myValidator()(control);
            expect(result).toEqual({ myValidatorKey: true });
          });
        });

6.  Apply the validator to a FormControl or FormGroup in the component:

        // Field-level
        name: this.fb.control<string>('', [Validators.required, myValidator()])

        // Group-level (cross-field)
        this.fb.group({ ... }, { validators: fieldMatchValidator('password', 'confirm') })

---

## SKILL 03 — Create a Dynamic FormArray

Use this when an issue asks for a list of dynamic fields that can be added or removed.

**Steps:**

1.  Inject `FormBuilder` in the component:

        private fb = inject(FormBuilder);

2.  Define the form with a `FormArray`:

        form = this.fb.group({
          items: this.fb.array<FormGroup>([])
        });

3.  Add a typed getter:

        get items(): FormArray {
          return this.form.controls['items'] as FormArray;
        }

4.  Add the method to push a new item:

        addItem(): void {
          this.items.push(
            this.fb.group({
              name: this.fb.control<string>('', Validators.required)
            })
          );
        }

5.  Add the method to remove an item by index:

        removeItem(index: number): void {
          this.items.removeAt(index);
        }

6.  Bind the FormArray in the template:

        <div [formGroup]="form">
          <div formArrayName="items">
            @for (item of items.controls; track $index) {
              <div [formGroupName]="$index">
                <input formControlName="name" />
                <button type="button" (click)="removeItem($index)">Remove</button>
              </div>
            }
          </div>
          <button type="button" (click)="addItem()">Add item</button>
        </div>

---

## SKILL 04 — Add Playground (Real-time State Display)

Use this when an issue asks for a real-time state panel alongside a form.

**Steps:**

1.  Add the playground block in the component template, next to the form:

        <div class="playground-state">
          <pre>Value: {{ form.value | json }}</pre>
          <pre>Status: {{ form.status }}</pre>
        </div>

2.  Import `JsonPipe` in the component imports array:

        imports: [ReactiveFormsModule, JsonPipe]

3.  No additional logic is needed — Angular updates the output automatically on every change.

4.  If the issue asks to show a specific control's errors, add:

        <pre>Errors: {{ form.controls['fieldName'].errors | json }}</pre>

---

## SKILL 05 — Create the Shared Error Message Component

Use this when an issue asks to create or use the reusable error display component.

**Steps:**

1.  Create the folder and files:

        angularApp/src/app/shared/components/error-message/
          error-message.component.ts
          error-message.component.html
          error-message.component.scss

2.  Component class structure:

        import { Component, Input } from '@angular/core';
        import { AbstractControl } from '@angular/forms';
        import { CommonModule } from '@angular/common';

        const ERROR_MESSAGES: Record<string, string> = {
          required: 'This field is required',
          email: 'Enter a valid email address',
          minlength: 'Value is too short',
          maxlength: 'Value is too long',
          noSpaces: 'Spaces are not allowed',
          passwordMismatch: 'Passwords do not match',
        };

        @Component({
          selector: 'app-error-message',
          standalone: true,
          imports: [CommonModule],
          templateUrl: './error-message.component.html',
          styleUrl: './error-message.component.scss'
        })
        export class ErrorMessageComponent {
          @Input() control!: AbstractControl;

          get errorMessage(): string | null {
            if (!this.control.errors || !this.control.touched) return null;
            const firstKey = Object.keys(this.control.errors)[0];
            return ERROR_MESSAGES[firstKey] ?? 'Invalid value';
          }
        }

3.  Component template:

        @if (errorMessage) {
          <span class="error-message">{{ errorMessage }}</span>
        }

4.  Use the component in any form template:

        <app-error-message [control]="form.controls['email']" />

5.  Import `ErrorMessageComponent` in the consuming component's imports array.
