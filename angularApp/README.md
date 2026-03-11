# Angular Forms & Validators

Aplicación educativa construida con **Angular 19** para aprender y practicar Angular Forms y la creación de Validators personalizados.

---

## Objetivo

Este proyecto sirve como referencia práctica para entender:

- Cómo funcionan los formularios reactivos en Angular
- Cómo crear y usar validators built-in
- Cómo construir validators personalizados tipados y testeables

No es una aplicación de producción. El código está orientado a la claridad y al aprendizaje.

---

## Temas cubiertos

### Reactive Forms

- `FormControl<T>` — control individual tipado
- `FormGroup` — agrupación de controles
- `FormArray` — listas dinámicas de controles
- `FormBuilder` — construcción declarativa de formularios

### Validators built-in

| Validator              | Descripción                        |
| ---------------------- | ---------------------------------- |
| `Validators.required`  | Campo obligatorio                  |
| `Validators.minLength` | Longitud mínima de caracteres      |
| `Validators.maxLength` | Longitud máxima de caracteres      |
| `Validators.min`       | Valor numérico mínimo              |
| `Validators.max`       | Valor numérico máximo              |
| `Validators.email`     | Formato de email válido            |
| `Validators.pattern`   | Validación por expresión regular   |

### Validators personalizados (Custom Validators)

- **Síncronos**: función que recibe un `AbstractControl` y retorna `ValidationErrors | null`
- **Asíncronos**: retornan `Promise` u `Observable`
- **Validator factories**: funciones que reciben parámetros y retornan un `ValidatorFn`
- **Cross-field validators**: aplicados a un `FormGroup` para validar relaciones entre campos

### Testing de Validators

Todos los validators personalizados incluyen tests unitarios con **Jasmine + Angular TestBed**.

---

## Stack técnico

| Elemento        | Tecnología                   |
| --------------- | ---------------------------- |
| Framework       | Angular 19 (standalone APIs) |
| Lenguaje        | TypeScript — strict mode     |
| Testing         | Jasmine + Angular TestBed    |
| Package manager | npm                          |

---

## Comandos principales

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

## Estructura relevante

```
angularApp/src/app/
├── app.ts                      # Componente raíz
├── app.config.ts               # Configuración standalone
├── app.routes.ts               # Rutas de la aplicación
└── [feature]/
    ├── feature.component.ts
    ├── feature.component.html
    ├── feature.validator.ts
    └── feature.validator.spec.ts
```
