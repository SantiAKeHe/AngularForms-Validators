# Angular Forms & Validators

> Aplicación educativa con **Angular 19** para aprender Reactive Forms, Template-driven Forms y Custom Validators — con ejemplos reales, live playground y tests incluidos.

---

## Contenidos

- [Reactive Forms](#reactive-forms)
- [Template-driven Forms](#template-driven-forms)
- [Validators built-in](#validators-built-in)
- [Custom Validators](#custom-validators)
- [Testing de Validators](#testing-de-validators)
- [Stack técnico](#stack-técnico)
- [Rutas](#rutas)
- [Comandos](#comandos)
- [Estructura del proyecto](#estructura-del-proyecto)

---

## Reactive Forms

Los formularios reactivos se definen en la clase del componente usando `FormBuilder`. Nunca se usa `new FormControl()` o `new FormGroup()` directamente.

```ts
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({ /* ... */ })
export class MyComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    name:  this.fb.control<string>('', Validators.required),
    email: this.fb.control<string>('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur'
    }),
    age: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.min(18)
    ]),
  });

  // Acceso tipado con getters — nunca form.get('field') en el template
  get email(): FormControl<string> {
    return this.form.controls.email;
  }
}
```

### Template binding

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <input formControlName="email" type="email" />

  @if (form.controls.email.hasError('email')) {
    <span>El email no tiene un formato válido.</span>
  }

  <button type="submit" [disabled]="form.invalid">Enviar</button>
</form>
```

### Playground — estado en tiempo real

```html
<pre class="playground-state">{{ form.value | json }}</pre>
<pre class="playground-state">Status: {{ form.status }}</pre>
```

---

## Template-driven Forms

Enfoque declarativo usando `ngModel`. Apropiado para formularios simples sin lógica dinámica.

```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  /* ... */
})
export class MyComponent {
  model = { name: '', email: '' };
}
```

```html
<form #myForm="ngForm">
  <input
    name="name"
    [(ngModel)]="model.name"
    #nameRef="ngModel"
    required
  />
  @if (nameRef.invalid && nameRef.touched) {
    <span>This field is required</span>
  }
</form>
```

> **Cuándo usar:** formularios simples de comparación educativa. Para formularios dinámicos o con validación compleja, siempre usar Reactive Forms.

---

## Validators built-in

Angular incluye validators listos para usar:

| Validator              | Descripción               | Ejemplo                          |
| ---------------------- | ------------------------- | -------------------------------- |
| `Validators.required`  | Campo obligatorio         | `Validators.required`            |
| `Validators.minLength` | Mínimo de caracteres      | `Validators.minLength(3)`        |
| `Validators.maxLength` | Máximo de caracteres      | `Validators.maxLength(50)`       |
| `Validators.min`       | Valor numérico mínimo     | `Validators.min(0)`              |
| `Validators.max`       | Valor numérico máximo     | `Validators.max(100)`            |
| `Validators.email`     | Formato de email          | `Validators.email`               |
| `Validators.pattern`   | Expresión regular         | `Validators.pattern(/^[a-z]+$/)` |

### Combinar validators

```ts
password: this.fb.control<string>('', [
  Validators.required,
  Validators.minLength(8),
  Validators.pattern(/[A-Z]/), // al menos una mayúscula
])
```

---

## Custom Validators

Existen tres tipos según la necesidad. Todos devuelven `ValidationErrors | null`.

### Tipo 1 — Simple Validator

Una sola responsabilidad. Aplicado directamente a un `FormControl`.

```ts
// no-spaces.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasSpaces = (control.value as string)?.includes(' ');
    return hasSpaces ? { noSpaces: true } : null;
  };
}
```

```ts
// Uso
username: this.fb.control<string>('', [
  Validators.required,
  noSpacesValidator()
])
```

### Tipo 2 — Factory Validator (con parámetro)

Una función que acepta un parámetro y retorna un `ValidatorFn`. Usar cuando la regla depende de un valor configurable.

```ts
// min-age.validator.ts
export function minAgeValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const age = control.value as number;
    return age < minAge
      ? { minAge: { required: minAge, actual: age } }
      : null;
  };
}
```

```ts
// Uso — el parámetro va en la llamada a la factory
age: this.fb.control<number | null>(null, [
  Validators.required,
  minAgeValidator(18)
])
```

### Tipo 3 — Cross-field Validator (a nivel de FormGroup)

Aplicado al `FormGroup`, no a un control individual. Tiene acceso a todos los controles hermanos para poder compararlos.

```ts
// password-match.validator.ts
export function passwordMatchValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const fg      = group as FormGroup;
    const pass    = fg.controls['password'].value;
    const confirm = fg.controls['confirmPassword'].value;
    return pass !== confirm ? { passwordMismatch: true } : null;
  };
}
```

```ts
// Uso — se pasa como validador del grupo, no de un control
this.fb.group(
  {
    password:        this.fb.control<string>('', Validators.required),
    confirmPassword: this.fb.control<string>('', Validators.required),
  },
  { validators: passwordMatchValidator() }
)
```

```html
@if (passwordForm.hasError('passwordMismatch') && confirmPassword.touched) {
  <div class="alert alert--error">Passwords do not match.</div>
}
```

### Validator asíncrono

Para validaciones que requieren una llamada a una API (p.ej. verificar si un email ya existe).

```ts
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export function uniqueEmailValidator(service: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return service.checkEmail(control.value as string).pipe(
      map(isTaken => (isTaken ? { emailTaken: true } : null)),
      catchError(() => of(null))
    );
  };
}
```

---

## Testing de Validators

Todos los validators personalizados incluyen tests. Como los validators usan el patrón factory, se llaman primero para obtener la función y luego se ejecutan con el control.

```ts
// no-spaces.validator.spec.ts
import { FormControl } from '@angular/forms';
import { noSpacesValidator } from './no-spaces.validator';

describe('noSpacesValidator', () => {
  it('returns null when there are no spaces', () => {
    const control = new FormControl<string>('validusername');
    // noSpacesValidator() devuelve el ValidatorFn — luego se llama con el control
    expect(noSpacesValidator()(control)).toBeNull();
  });

  it('returns error when value has spaces', () => {
    const control = new FormControl<string>('invalid username');
    expect(noSpacesValidator()(control)).toEqual({ noSpaces: true });
  });
});
```

```ts
// password-match.validator.spec.ts
import { FormControl, FormGroup } from '@angular/forms';
import { passwordMatchValidator } from './password-match.validator';

describe('passwordMatchValidator', () => {
  it('returns null when passwords match', () => {
    const group = new FormGroup({
      password:        new FormControl('secret123'),
      confirmPassword: new FormControl('secret123'),
    });
    expect(passwordMatchValidator()(group)).toBeNull();
  });

  it('returns error when passwords do not match', () => {
    const group = new FormGroup({
      password:        new FormControl('secret123'),
      confirmPassword: new FormControl('different'),
    });
    expect(passwordMatchValidator()(group)).toEqual({ passwordMismatch: true });
  });
});
```

```bash
# Correr todos los tests
ng test --watch=false

# Correr un archivo específico
ng test --watch=false --include="src/app/custom-validators/no-spaces.validator.spec.ts"
```

---

## Stack técnico

| Elemento        | Tecnología                   |
| --------------- | ---------------------------- |
| Framework       | Angular 19 (standalone APIs) |
| Lenguaje        | TypeScript — strict mode     |
| Testing         | Jasmine + Angular TestBed    |
| Package manager | npm                          |

---

## Rutas

| Ruta          | Componente                  | Topic    |
| ------------- | --------------------------- | -------- |
| `/`           | `HomeComponent`             | Home     |
| `/reactive`   | `ReactiveComponent`         | Topic 01 |
| `/template`   | `TemplateDrivenComponent`   | Topic 02 |
| `/validators` | `CustomValidatorsComponent` | Topic 03 |

---

## Comandos

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
ng serve

# Ejecutar tests
ng test --watch=false

# Build de producción
ng build
```

> Todos los comandos se ejecutan desde `angularApp/`.

---

## Estructura del proyecto

```
angularApp/src/app/
├── app.ts                              # Componente raíz — navegación + router-outlet
├── app.html                            # Template raíz — navbar
├── app.routes.ts                       # Rutas de la aplicación
├── app.config.ts                       # Configuración standalone (provideRouter, etc.)
│
├── home/
│   └── home.component.ts/.html/.scss   # Página principal con cards de topics
│
├── reactive/
│   └── reactive.component.*            # Topic 01 — Reactive Forms
│
├── template-driven/
│   └── template-driven.component.*     # Topic 02 — Template-driven Forms
│
├── custom-validators/
│   ├── custom-validators.component.*   # Topic 03 — Custom Validators (página educativa)
│   ├── no-spaces.validator.ts          # Simple validator
│   ├── no-spaces.validator.spec.ts
│   ├── min-age.validator.ts            # Factory validator
│   ├── min-age.validator.spec.ts
│   ├── password-match.validator.ts     # Cross-field validator
│   └── password-match.validator.spec.ts
│
└── shared/
    └── components/
        └── error-message/
            └── error-message.component.*  # Componente reutilizable de mensajes de error
```

---

> Este proyecto es educativo. El código está orientado a la claridad y al aprendizaje, no a producción.
