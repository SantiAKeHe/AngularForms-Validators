# INSTRUCCIONES.md — Live Coding Presentation Guide

> This guide is based on the actual code in the app.
> All file paths and line numbers have been verified against the source.

---

## 1. Reactive vs Template-driven Forms

### What to say

Angular gives you two ways to build forms. Template-driven keeps the logic in the HTML — you add `ngModel` and validators directly on the inputs. Reactive Forms move all the logic to the TypeScript class — you define the structure, the validators, and the state there. For anything beyond a simple contact form, Reactive is the better choice because it is fully typed, testable, and easier to reason about.

### What to show on screen

```
Open:    src/app/reactive/reactive.component.ts — lines 22 to 37
Point at: the FormBuilder injection (line 22), the typed fb.nonNullable.control<string>
          declarations, and updateOn: 'blur' on each control

Then open: src/app/template-driven/template-driven.component.html — lines 19 to 31
Point at:  [(ngModel)]="model.name", #nameRef="ngModel", and the inline @if error block
```

### Live interaction

In the Reactive form, type a name with a space (e.g. "Jane Doe") and then click outside the field. Watch the playground on the right update `Status: INVALID` and the error appear. Then do the same in the Template-driven form — notice that error messages are written inline in the template (line 29-31) instead of coming from a shared component.

### The one thing the junior must walk away knowing

In Reactive Forms, the form state lives in the TypeScript class and is always in sync — the template only binds to it; in Template-driven Forms, the template owns the state and Angular infers it at runtime.

---

## 2. Custom Validators

### What to say

A custom validator is just a function that receives a control and returns either `null` (valid) or an object describing the error. There are three types: a simple validator checks one thing on one field; a factory validator accepts a parameter so the rule is configurable; a cross-field validator is applied to the whole FormGroup so it can compare two sibling fields.

### What to show on screen

```
Open:    src/app/custom-validators/no-spaces.validator.ts — lines 3 to 8
Point at: the function signature, the null return for valid, and the error object key

Open:    src/app/custom-validators/min-age.validator.ts — lines 3 to 8
Point at: the minAge parameter and how it is captured in the closure

Open:    src/app/custom-validators/password-match.validator.ts — lines 3 to 10
Point at: the group as FormGroup cast and accessing fg.controls[...] directly

Then open: src/app/custom-validators/custom-validators.component.ts — lines 44 to 50
Point at:  { validators: passwordMatchValidator() } as the second argument to fb.group —
           this is how a group-level validator is attached, not to a single control
```

### Live interaction

In the noSpacesValidator demo, type "jane doe" (with a space) in the Username field and tab away. The playground shows `Errors: { "noSpaces": true }`. Then change the value to "janedoe" — the error disappears and status flips to VALID. In the passwordMatchValidator demo, type different values in Password and Confirm Password and show the form-level error banner appearing.

### The one thing the junior must walk away knowing

A simple and factory validator return null or an error object; a cross-field validator is the same function signature but receives the entire FormGroup as its argument, so it must be attached at the group level, not at the control level.

### Suggested Simplifications

- `src/app/custom-validators/custom-validators.component.html` lines 196–198: the cross-field error renders via a raw `@if (passwordForm.hasError('passwordMismatch') && confirmPassword.touched)` block. This works correctly, but during a live demo it requires a side explanation — the error is on the FormGroup, not on `confirmPassword`, so `<app-error-message [control]="confirmPassword" />` (line 193) would never show it. Consider adding a brief inline comment explaining why this `@if` exists alongside the `<app-error-message>`. Fix: one comment line, less than 5 lines total.

---

## 3. Dynamic Forms and Wizards

### What to say

A FormArray is a reactive form control that holds a list of FormGroups. You push new groups in to add rows and call removeAt to delete them — Angular re-renders the list automatically. A multi-step wizard is a single parent FormGroup with one sub-group per step; you only validate the current step before letting the user advance, so the Next button stays blocked until the current page is filled correctly.

### What to show on screen

```
Open:    src/app/dynamic-forms/dynamic-forms.component.ts — lines 27 to 56
Point at: the FormArray declaration (line 28), the typed getter (lines 33–35),
          addParticipant() (lines 41–48), and the participantControl() helper (lines 54–56)

Then open: src/app/dynamic-forms/dynamic-forms.component.html — lines 18 to 61
Point at:  formArrayName="participants" (line 18), [formGroupName]="$index" (line 20),
           and the app-error-message using the helper participantControl($index, 'name') (line 33)

For the wizard section:
Open:    src/app/dynamic-forms/dynamic-forms.component.ts — lines 66 to 128
Point at: the nested structure (step1/step2/step3 sub-groups, lines 67–79),
          currentStepGroup getter (lines 96–100), and canAdvance() (lines 126–128)
```

### Live interaction

Click "+ Add participant" twice to add two rows. Fill in the first row correctly and leave the second row empty. Point at the playground — `Status: INVALID` and participant count is 2. Click Submit — it stays blocked. Then fill the second row. Status flips to VALID and Submit works. For the wizard, intentionally leave First Name empty and click Next — the button stays disabled. Fill it and show the step advance.

### The one thing the junior must walk away knowing

FormArray manages a variable-length list of FormGroups — push to add, removeAt to delete; and in a wizard, validate only the current sub-group before advancing so the user never gets blocked by errors on a page they have not reached yet.

### Suggested Simplifications

- `src/app/dynamic-forms/dynamic-forms.component.ts` lines 84–94: the three step getters (`get step1()`, `get step2()`, `get step3()`) have no explicit return type annotation. Under TypeScript strict mode, return types on public getters should be explicit. Fix: add `: FormGroup` to each getter — 3 one-line changes, each under 5 lines.

---

## 4. Error Messages Best Practices

### What to say

If you write error messages inline in every template field, you end up maintaining the same strings in dozens of places. The better approach is one shared component that accepts a FormControl as an input, reads its errors, and picks the right message from a central map. Every field in the app then uses `<app-error-message [control]="myControl" />` — one line, always consistent.

### What to show on screen

```
Open:    src/app/error-messages/error-messages.component.html — lines 13 to 35
Point at: the bad pattern — each @if block (lines 17–23, 30–34) with repeated string literals

Then scroll to lines 56 to 65 in the same file.
Point at: the good pattern — the same fields, now each with a single
          <app-error-message [control]="emailDemo2" /> line (line 60)

Then open: src/app/shared/components/error-message/error-message.component.ts — lines 5 to 33
Point at:  the ERROR_MESSAGES map (lines 5–14), the showOn input (line 25),
           and the errorMessage getter logic (lines 27–33)
```

### Live interaction

In Demo 1 (bad pattern), click the email field and then click away without typing anything. The inline `@if` renders "This field is required". Then type "notanemail" and tab away — "Enter a valid email address" appears. Now scroll to Demo 3 (showOn modes) — use the same username field and show how the three `<app-error-message>` instances each respond at different moments (on blur, on first keystroke, immediately on load).

### The one thing the junior must walk away knowing

Put all error strings in one map in one component, pass the FormControl as an input, and every field in every form automatically gets consistent, centralized error messages with a single HTML tag.

---

## 5. Kendo UI for Angular

### What to say

Kendo UI is a commercial component library by Progress Telerik. Its Angular components implement `ControlValueAccessor`, which means they plug directly into Reactive Forms using `formControlName` — no wrappers, no adapters, no extra logic. There are two dropdown variants: `ComboBox` allows the user to pick from a list or type a custom value; `DropDownList` restricts the user to the predefined options only. Both accept the same `[data]` binding and work with `Validators.required` out of the box.

### What to show on screen

```
Open:    src/app/kendo-ui/kendo-ui.component.ts — lines 1 to 46
Point at: the KENDO_COMBOBOX and KENDO_DROPDOWNLIST imports (lines 4–5),
          the spread syntax in the imports array (lines 15–16),
          and the two typed FormControls: FormControl<string | null> (lines 27, 38)

Then open: src/app/kendo-ui/kendo-ui.component.html — lines 13 to 29
Point at:  formControlName="country" on <kendo-combobox> — same API as a native input,
           and <app-error-message [control]="country" /> working unchanged
```

### Live interaction

In the ComboBox demo, click the dropdown and select "Ecuador" — the playground on the right shows `Value: { "country": "Ecuador" }` and `Status: VALID`. Then clear the field and tab away — `Errors: { "required": true }` appears and the error message component shows "This field is required". In the DropDownList demo, open the dropdown — notice you cannot type; you can only pick. Select a language and watch the playground update.

### The one thing the junior must walk away knowing

Any component that implements `ControlValueAccessor` works with `formControlName` — Kendo, Angular Material, or any third-party library. You do not need to learn a new form API; the Reactive Forms layer stays exactly the same.
