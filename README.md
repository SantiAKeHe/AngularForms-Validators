# AngularForms-Validators

A focused educational Angular 19 application for learning and practicing **Angular Forms** and **Validators**.

---

## Project Scope

This project covers the following topics:

### Reactive Forms
- `FormControl`, `FormGroup`, `FormArray`
- Typed reactive forms (`FormControl<string>`, etc.)
- Form submission and reset

### Built-in Validators
- `Validators.required`
- `Validators.minLength` / `Validators.maxLength`
- `Validators.min` / `Validators.max`
- `Validators.email`
- `Validators.pattern`

### Custom Validators
- Synchronous custom validators
- Asynchronous custom validators
- Cross-field validators (group-level)
- Reusable validator utilities

### Error Handling & UX
- Displaying validation error messages in templates
- Conditional error visibility (touched, dirty, submitted)
- Error key conventions

### Testing
- Unit tests for custom validators using **Jasmine + Angular TestBed**
- Testing valid and invalid cases

---

## Tech Stack

| Concern     | Detail                        |
|-------------|-------------------------------|
| Framework   | Angular 19 (standalone APIs)  |
| Language    | TypeScript (strict mode)      |
| Forms       | Reactive Forms                |
| Testing     | Jasmine + Angular TestBed     |
| Package mgr | npm                           |

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
ng serve

# Run unit tests
ng test --watch=false

# Build
ng build
```

---

## Project Structure

```
angularApp/
└── src/
    └── app/
        ├── validators/       # Custom validators and their specs
        └── components/       # Feature components demonstrating forms
```
