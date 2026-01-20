# Esquemas de Validación

Este archivo documenta los esquemas de validación usando Zod que se utilizan en la aplicación.

## Ubicación

Todos los esquemas se encuentran en `src/schemas/` y deben exportar:
- El esquema Zod
- El tipo TypeScript inferido

## Esquemas Disponibles

### userSchema

**Ubicación**: `src/schemas/user.schema.ts`

Valida los datos de un usuario antes de crear o actualizar.

**Validaciones**:
- `name`: String con mínimo 2 caracteres
- `email`: Email válido
- `phone`: String con mínimo 8 dígitos
- `company`: String requerido
- `location`: String requerido
- `status`: Uno de los valores de `UserStatus`
- `category`: Uno de los valores de `UserCategory`
- `type`: Uno de los valores de `UserType`

**Uso**:

```typescript
import { userSchema, UserFormData } from '@/schemas/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const MyComponent = () => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  return <form onSubmit={form.handleSubmit(onSubmit)}>...</form>;
};
```

**Ubicación Actual**:
- `src/components/molecules/AddUserModal.tsx` - Formulario de agregar usuario

## Agregar Nuevos Esquemas

### Paso 1: Crear el esquema

```typescript
// src/schemas/newSchema.schema.ts
import * as z from 'zod';

export const newSchema = z.object({
  field1: z.string().min(1, 'Field is required'),
  field2: z.number().positive('Must be positive'),
});

export type NewFormData = z.infer<typeof newSchema>;
```

### Paso 2: Usarlo en un componente

```typescript
import { newSchema, NewFormData } from '@/schemas/newSchema.schema';
import { zodResolver } from '@hookform/resolvers/zod';

const MyForm = () => {
  const form = useForm<NewFormData>({
    resolver: zodResolver(newSchema),
  });
  
  // ...
};
```

## Mejores Prácticas

1. **Nombra los esquemas con suffix `.schema`**: `user.schema.ts`, `form.schema.ts`
2. **Exporta el tipo TypeScript**: Usa `z.infer<typeof schema>`
3. **Mensajes claros**: Proporciona mensajes de error descriptivos
4. **Validación compartida**: Si hay validaciones comunes, extrae funciones helper
5. **Coloca esquemas en la carpeta `schemas/`**: Mantén centralizado

## Ejemplo Completo de Validación

```typescript
// src/schemas/company.schema.ts
import * as z from 'zod';

const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

export const companySchema = z.object({
  name: z.string()
    .min(2, 'Company name is too short')
    .max(100, 'Company name is too long'),
  website: z.string()
    .regex(urlRegex, 'Invalid website URL')
    .optional()
    .or(z.literal('')),
  employees: z.number()
    .int('Must be a whole number')
    .positive('Must be greater than 0'),
});

export type CompanyFormData = z.infer<typeof companySchema>;
```

## Validación Condicional

```typescript
export const complexSchema = z.object({
  userType: z.enum(['individual', 'company']),
  companyName: z.string().optional(),
}).refine((data) => {
  // Si es empresa, el nombre es obligatorio
  if (data.userType === 'company' && !data.companyName) {
    return false;
  }
  return true;
}, {
  message: 'Company name is required for company type',
  path: ['companyName'],
});
```

## Debugging de Errores de Validación

```typescript
const result = userSchema.safeParse(data);
if (!result.success) {
  console.log(result.error.flatten());
  // Output: { fieldErrors: { email: ['Invalid email'] }, ... }
}
```
