# Arquitectura de Componentes

Esta documentación describe la organización y propósito de los componentes en la aplicación.

## Jerarquía de Componentes

### UI (Componentes Base)
Componentes sin lógica de negocio, puramente visuales. Son reutilizables y agnósticos.

- `button.tsx` - Botón base
- `input.tsx` - Input base
- `card.tsx` - Card base
- `badge.tsx` - Badge base
- `checkbox.tsx` - Checkbox
- `dialog.tsx` - Modal/Dialog
- `table.tsx` - Tabla base
- `select.tsx` - Select dropdown
- `avatar.tsx` - Avatar
- `chart.tsx` - Gráfico
- `ModeToggle.tsx` - Toggle tema
- `sonner.tsx` - Notificaciones

### Molecules (Componentes Simples con Lógica)
Componentes que combinan UI básicos y agregan lógica simple. Son reutilizables dentro del contexto de la app.

#### Modales
- `AddUserModal.tsx` - Modal para agregar usuarios
- `DeleteUserModal.tsx` - Modal de confirmación de eliminación

#### Cards y Estadísticas
- `StatCard.tsx` - Card de estadística
- `StatCardSkeleton.tsx` - Skeleton para loading

#### Tabla
- `SortableTableHead.tsx` - Encabezado sorteable
- `TablePagination.tsx` - Paginación
- `TableToolbar.tsx` - Barra de herramientas (filtros, búsqueda)
- `StatusBadge.tsx` - Badge de estado

#### Usuario
- `UserActions.tsx` - Acciones (editar, eliminar) para usuario
- `UserIdentity.tsx` - Identidad del usuario (nombre + email)

### Organisms (Componentes Complejos)
Componentes que componen molecules y organismos menores. Tienen lógica de negocio compleja.

- `UsersTable.tsx` - Tabla completa de usuarios con paginación, búsqueda, filtros
- `UserTableRow.tsx` - Fila de usuario
- `UserTableRowSkeleton.tsx` - Skeleton para filas
- `UserCategory.tsx` - Categoría de usuario con estadísticas

### Templates
Layouts que estructuran la página.

- `Layout.tsx` - Layout principal con sidebar y contenido

### Providers
Contextos y configuraciones globales.

- `ThemeProvider.tsx` - Proveedor de tema (light/dark)

## Flujo de Datos

```
App (page.tsx)
  ↓
Layout (template)
  ↓
Organismos (UsersTable, UserCategory)
  ├─ Molecules (TableToolbar, StatusBadge, etc)
  │  ├─ UI (Input, Button, etc)
  │  └─ State (useUserStore)
  └─ State (useUserStore)
```

## Ejemplo de Creación de Componente

### Crear una Molecule (ej: UserCard)

```typescript
// src/components/molecules/UserCard.tsx
import React from 'react';
import { Card } from '@/components/ui/card';
import { User } from '@/types';

interface UserCardProps {
  user: User;
  onClick?: () => void;
}

export const UserCard = ({ user, onClick }: UserCardProps) => {
  return (
    <Card onClick={onClick} className="cursor-pointer hover:shadow-lg">
      <div className="p-4">
        <h3>{user.name}</h3>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    </Card>
  );
};
```

### Crear un Organism (ej: UsersList)

```typescript
// src/components/organisms/UsersList.tsx
import React, { useState } from 'react';
import { UserCard } from '../molecules/UserCard';
import { useUserStore } from '@/store/useUserStore';
import { User } from '@/types';

export const UsersList = () => {
  const users = useUserStore((state) => state.users);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {users.map((user) => (
        <UserCard 
          key={user.id}
          user={user}
          onClick={() => setSelectedUser(user)}
        />
      ))}
    </div>
  );
};
```

## Reglas de Componentes

1. **Responsabilidad única**: Cada componente debe tener un propósito claro
2. **Reutilización**: Molecules y UI deben ser reutilizables
3. **Props explícitas**: Definir interfaces claras para props
4. **Sin efectos secundarios en render**: Usar useEffect adecuadamente
5. **Memoización inteligente**: Usar React.memo solo cuando sea necesario

## State Management

- **Zustand store**: Para estado global (usuarios, filtros, paginación)
- **useState**: Para estado local de componentes (modales abiertos, valores de input)
- **useCallback**: Para funciones que se pasan como props

## Testing

Cada componente molecule u organism debe tener tests:

```typescript
// src/__tests__/UserCard.test.tsx
import { render, screen } from '@testing-library/react';
import { UserCard } from '../components/molecules/UserCard';

describe('UserCard', () => {
  it('debería renderizar el nombre del usuario', () => {
    const user = { id: '1', name: 'John', email: 'john@example.com' };
    render(<UserCard user={user} />);
    expect(screen.getByText('John')).toBeInTheDocument();
  });
});
```
