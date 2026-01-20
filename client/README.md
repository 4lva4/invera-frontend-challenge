# Invera User Management Dashboard

Una aplicación moderna para gestionar usuarios, construida con **Next.js 16** y **React 19**. El objetivo es proporcionar una interfaz fluida, responsiva y fácil de usar para administrar datos de usuarios.

Este proyecto fue desarrollado como parte del **Invera Frontend Challenge**, un desafío técnico donde se pone en práctica el desarrollo frontend con herramientas modernas.

## Qué trae este proyecto

- Interfaz moderna con soporte para tema claro y oscuro
- Diseño responsivo que se adapta a cualquier dispositivo
- Búsqueda y filtrado de usuarios en tiempo real
- Tabla interactiva con paginación, ordenamiento y selección múltiple
- Componentes UI reutilizables basados en Radix UI
- Validación de formularios robusta con React Hook Form y Zod
- Tests unitarios y de componentes con Jest y React Testing Library
- Soporte para temas dinámicos

## Requisitos Previos

Antes de empezar, necesitas tener instalado:
- **Node.js** v18 o superior ([descargar acá](https://nodejs.org/))
- **npm** (viene con Node.js) o también puedes usar **yarn/pnpm** si preferis

Verificá las versiones que tenés con:
```bash
node --version
npm --version
```

## Instalación

### 1. Cloná el repositorio

```bash
git clone <tu-repo>
cd invera-frontend-challenge/client
```

### 2. Instalá las dependencias

```bash
npm install
```

Esto descarga todas las dependencias que están listadas en `package.json`.

### 3. Configurá las variables de entorno

Creá un archivo `.env.local` en la raíz del proyecto:

```bash
cp .env.example .env.local
```

O hacelo manualmente creando `.env.local` con:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Primeros Pasos

### Ejecutá el servidor de desarrollo

```bash
npm run dev
```

El servidor va a estar disponible en [http://localhost:3000](http://localhost:3000)

### Otros comandos útiles

```bash
# Ejecutar el linter
npm run lint

# Ejecutar los tests
npm test

# Construir para producción
npm run build

# Ejecutar la app en producción (localmente)
npm start
```

## Dependencias Principales

### Framework y UI
- **Next.js 16** - Framework React moderno con SSR y optimizaciones incluidas
- **React 19** - La librería de UI más usada en el mundo
- **Tailwind CSS** - Framework CSS que te permite escribir estilos sin salir del HTML
- **Radix UI** - Componentes accesibles listos para usar

### Gestión de Estado y Formularios
- **Zustand** - Gestor de estado global simple y efectivo
- **React Hook Form** - Manejo de formularios de forma eficiente
- **Zod** - Validación de esquemas en TypeScript

### Extras útiles
- **next-themes** - Para manejar el tema claro/oscuro
- **Lucide React** - Iconos lindos y modernos
- **Sonner** - Notificaciones tipo toast bien diseñadas

### Testing
- **Jest** - Framework de testing
- **React Testing Library** - Para testear componentes como lo haría un usuario

## Estructura del Proyecto

Acá te muestro cómo está organizado todo:

```
src/
├── app/                    # Rutas y config de Next.js
├── components/             # Componentes React reutilizables
│   ├── ui/                # Componentes base sin lógica
│   ├── molecules/         # Componentes compuestos medianos
│   ├── organisms/         # Componentes complejos y completos
│   ├── templates/         # Layouts de página
│   └── providers/         # Context providers
├── store/                 # Zustand stores (estado global)
├── services/              # Llamadas a la API y lógica
├── types/                 # Tipos TypeScript compartidos
├── schemas/               # Esquemas Zod para validación
├── constants/             # Constantes y valores por defecto
├── enums/                 # Enumeraciones
└── utils/                 # Funciones auxiliares
```

## Stack Tecnológico

| Tecnología | Qué hace |
|-----------|----------|
| **Next.js** | Framework fullstack que potencia toda la app |
| **React** | La librería para construir la UI |
| **TypeScript** | JavaScript con tipos para evitar errores |
| **Tailwind CSS** | Estilos rápidos y limpios |
| **Zustand** | Guarda el estado de forma simple |
| **React Hook Form** | Maneja los formularios sin complicaciones |
| **Zod** | Valida los datos que entran |
| **Jest** | Tests unitarios |
| **React Testing Library** | Tests de componentes como un usuario real |

## Testing

Ejecutá los tests así:

```bash
# Tests en modo watch (se ejecutan cuando cambias algo)
npm test

# Ver la cobertura de tests
npm test -- --coverage
```

Tenemos tests para los componentes principales y para los hooks personalizados.

## Tips para Desarrollar

- **Hot Reload**: Los cambios se ven al toque en el navegador, sin necesidad de recargar
- **TypeScript**: Todo está tipado para evitar errores antes de que sucedan
- **Linting**: Ejecutá `npm run lint` para mantener el código limpio
- **Temas**: La app detecta automáticamente si usás tema claro u oscuro
- **Componentes**: Echa un vistazo en `/components` para entender cómo está todo organizado
- **Git Hooks**: Si trabajás en equipo, considera agregar husky para validar antes de hacer push

## Despliegue

La app está lista para deployarse en [Vercel](https://vercel.com), que te ofrece:
- Deploy automático cuando hacés push a tu rama
- Previsualización de los cambios en los PRs
- Optimizaciones automáticas
- CDN global para que todo sea rápido

Para preparar la app para producción:

```bash
npm run build
npm start
```

## Recursos Útiles

Si querés aprender más sobre las tecnologías que usamos:

- [Documentación de Next.js](https://nextjs.org/docs) - Para entender el framework
- [React Docs](https://react.dev) - Todo sobre React
- [Tailwind CSS](https://tailwindcss.com/docs) - Estilos con clases
- [Radix UI](https://www.radix-ui.com/docs/primitives/overview/introduction) - Componentes accesibles
- [Zustand](https://github.com/pmndrs/zustand) - Gestión de estado simple
- [TypeScript](https://www.typescriptlang.org/docs/) - Para dominar los tipos

## Licencia

Este proyecto está bajo licencia MIT. Siente se libre de usarlo como referencia o base para tus propios proyectos.
