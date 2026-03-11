# Angular Forms & Validators

> Aplicación educativa con **Angular 19** para aprender Reactive Forms y Validators personalizados — con ejemplos reales y tests incluidos.

---

## Contenidos

- [Reactive Forms](#reactive-forms)
- [Validators built-in](#validators-built-in)
- [Custom Validators](#custom-validators)
- [Testing de Validators](#testing-de-validators)
- [Stack técnico](#stack-técnico)
- [Comandos](#comandos)
- [Estructura del proyecto](#estructura-del-proyecto)

---

## Reactive Forms

Los formularios reactivos se definen en la clase del componente, no en el template.

```ts
import { FormControl, FormGroup, Validators } from '@angular/forms';

const form = new FormGroup({
  name: new FormControl<string>('', Validators.required),
  email: new FormControl<string>('', [Validators.required, Validators.email]),
  age: new FormControl<number | null>(null, [Validators.min(18), Validators.max(99)]),
});
```

### Acceder a valores y errores

```ts
// Leer valor actual
const email = form.controls.email.value; // string

// Verificar si un control tiene error
const hasError = form.controls.email.hasError('required');

// Estado general del form
const isValid = form.valid;
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

---

## Validators built-in

Angular incluye validators listos para usar:

| Validator              | Descripción                      | Ejemplo                              |
| ---------------------- | -------------------------------- | ------------------------------------ |
| `Validators.required`  | Campo obligatorio                | `Validators.required`                |
| `Validators.minLength` | Mínimo de caracteres             | `Validators.minLength(3)`            |
| `Validators.maxLength` | Máximo de caracteres             | `Validators.maxLength(50)`           |
| `Validators.min`       | Valor numérico mínimo            | `Validators.min(0)`                  |
| `Validators.max`       | Valor numérico máximo            | `Validators.max(100)`                |
| `Validators.email`     | Formato de email                 | `Validators.email`                   |
| `Validators.pattern`   | Expresión regular                | `Validators.pattern(/^[a-z]+$/)`     |

### Combinar validators

```ts
const password = new FormControl<string>('', [
  Validators.required,
  Validators.minLength(8),
  Validators.pattern(/[A-Z]/), // al menos una mayúscula
]);
```

---

## Custom Validators

### Validator síncrono

Un validator es una función que recibe un `AbstractControl` y retorna `ValidationErrors | null`.

```ts
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noSpacesValidator(control: AbstractControl): ValidationErrors | null {
  const hasSpaces = (control.value as string)?.includes(' ');
  return hasSpaces ? { noSpaces: true } : null;
}
```

```ts
// Uso
const username = new FormControl<string>('', [Validators.required, noSpacesValidator]);
```

### Validator factory (con parámetros)

```ts
export function minAgeValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const age = control.value as number;
    return age < minAge ? { minAge: { required: minAge, actual: age } } : null;
  };
}
```

```ts
// Uso
const age = new FormControl<number | null>(null, minAgeValidator(18));
```

### Cross-field validator (a nivel de FormGroup)

```ts
export function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value as string;
  const confirm = group.get('confirm')?.value as string;
  return password !== confirm ? { passwordMismatch: true } : null;
}
```

```ts
// Aplicado al FormGroup
const form = new FormGroup(
  {
    password: new FormControl<string>('', Validators.required),
    confirm: new FormControl<string>('', Validators.required),
  },
  { validators: passwordMatchValidator }
);
```

```html
@if (form.hasError('passwordMismatch')) {
  <span>Las contraseñas no coinciden.</span>
}
```

### Validator asíncrono

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

Todos los validators personalizados incluyen tests con **Jasmine + Angular TestBed**.

```ts
import { FormControl } from '@angular/forms';
import { noSpacesValidator } from './no-spaces.validator';

describe('noSpacesValidator', () => {
  it('returns null when there are no spaces', () => {
    const control = new FormControl<string>('hello');
    expect(noSpacesValidator(control)).toBeNull();
  });

  it('returns error when value has spaces', () => {
    const control = new FormControl<string>('hello world');
    expect(noSpacesValidator(control)).toEqual({ noSpaces: true });
  });

  it('returns null for empty string', () => {
    const control = new FormControl<string>('');
    expect(noSpacesValidator(control)).toBeNull();
  });
});
```

```bash
ng test --watch=false
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

---

## Estructura del proyecto

```
angularApp/src/app/
├── app.ts                        # Componente raíz
├── app.config.ts                 # Configuración standalone
├── app.routes.ts                 # Rutas de la aplicación
└── [feature]/
    ├── feature.component.ts      # Lógica del componente
    ├── feature.component.html    # Template
    ├── feature.component.scss    # Estilos
    ├── feature.validator.ts      # Validator personalizado
    └── feature.validator.spec.ts # Tests del validator
```

---

> Este proyecto es educativo. El código está orientado a la claridad y al aprendizaje, no a producción.
