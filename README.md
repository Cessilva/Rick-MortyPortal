# 🎬 Rick & Morty Character Viewer

Un visualizador de personajes de Rick & Morty construido con Next.js, Redux Saga y TypeScript. Utiliza JSON Server para el manejo de datos de personajes de forma local.

## ✨ Características

- **Visualización de personajes** con paginación (10 por página)
- **Búsqueda** por nombre, estado, tipo o género
- **Datos locales** con JSON Server
- **Funciona sin internet** una vez configurado
- **Interfaz moderna** con CSS Modules
- **Redux simplificado** con acciones directas

## 🚀 Configuración Rápida

```bash
# 1. Clonar el repositorio
git clone https://github.com/Cessilva/Rick-MortyPortal

# 2. Instalar dependencias
npm install

# 3. Iniciar JSON Server (en una terminal separada)
npm run json-server

# 4. Iniciar la aplicación (en otra terminal)
npm run dev
```

## ⚙️ Configuración de JSON Server

La aplicación utiliza JSON Server para manejar los datos de personajes localmente.

### Configuración

1. **Iniciar JSON Server**:

   ```bash
   npm run json-server
   ```

2. **Iniciar la aplicación**:
   ```bash
   npm run dev
   ```

**Nota:** Los datos se cargan desde `db.json` que incluye 826 personajes completos de Rick & Morty. La aplicación está configurada para usar `http://localhost:3001` por defecto y no requiere configuración adicional.

## 📋 Comandos Disponibles

### Desarrollo

```bash
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Construir para producción
npm run start        # Iniciar servidor de producción
```

### JSON Server

```bash
npm run json-server  # Iniciar JSON Server en puerto 3001
```

### Calidad de Código

```bash
npm run lint         # Verificar código
npm run lint:fix     # Corregir errores automáticamente
npm run format       # Formatear código
npm run format:check # Verificar formato
```

## 🌐 URLs

### Aplicación

- **Desarrollo**: http://localhost:3000

### JSON Server

- **Base URL**: http://localhost:3001
- **Endpoint**: `/characters`
- **Búsqueda**: `?name_like=rick&_page=1&_limit=10`

## 🔧 Redux Store

### Estado Principal

```typescript
interface CharacterState {
  characters: Character[]; // Lista de personajes
  loading: boolean; // Estado de carga
  error: string | null; // Errores
  pagination: PaginationInfo; // Información de paginación
  searchQuery: string; // Consulta de búsqueda
}
```

### Acciones Simplificadas

```typescript
// Obtener personajes
dispatch(fetchCharacters({ page: 1 }));

// Buscar personajes
dispatch(
  searchCharacters({
    page: 1,
    searchQuery: 'rick',
  })
);

// Establecer consulta de búsqueda
dispatch(setSearchQuery('rick'));

// Establecer personajes (manejado automáticamente por sagas)
dispatch(setCharacters({ characters, pagination }));

// Manejo de errores (manejado automáticamente por sagas)
dispatch(setError('Error message'));
```

## 🙏 Agradecimientos

- [Rick and Morty API](https://rickandmortyapi.com/) por los datos
- [Next.js](https://nextjs.org/) por el framework
- [Redux](https://redux.js.org/) por la gestión de estado
