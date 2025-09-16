# 🎬 Rick & Morty Character Viewer

Un visualizador de personajes de Rick & Morty construido con Next.js, React Context y TypeScript. Utiliza JSON Server para el manejo de datos de personajes de forma local.

## ✨ Características

- **Visualización de personajes** con paginación responsive (4 en desktop, 2 en móvil)
- **Búsqueda** por nombre
- **Sistema de favoritos** con dropdown interactivo
- **Datos locales** con JSON Server
- **Interfaz moderna** con CSS Modules
- **Arquitectura simplificada** con React Context

## 🚀 Configuración Rápida

### Opción 1: Con Makefile (Recomendado)

```bash
# 1. Clonar el repositorio
git clone https://github.com/Cessilva/Rick-MortyPortal

# 2. Navegar al directorio
cd Rick-MortyPortal

# 3. Primera instalación (instala dependencias + inicia servicios)
make first-dev

# 4. Para ejecuciones posteriores (solo inicia servicios)
make dev
```

### Opción 2: Manual

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

**Nota:** Los datos se cargan desde `db.json` que incluye 826 personajes completos de Rick & Morty. La aplicación está configurada para usar `http://localhost:3001` por defecto y no requiere configuración adicional.

## 📋 Comandos Disponibles

```bash
make help           # Mostrar ayuda
make first-dev      # Primera instalación (instala + inicia servicios)
make dev            # Iniciar servicios (sin instalar dependencias)
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Construir para producción
npm run start        # Iniciar servidor de producción
npm run json-server  # Iniciar JSON Server en puerto 3001
```

### Calidad de Código

```bash
npm run lint         # Verificar código
npm run lint:fix     # Corregir errores automáticamente
npm run format       # Formatear código
npm run format:check # Verificar formato
```

### Pruebas

```bash
npm run cypress:open # Abrir interfaz de Cypress
npm run cypress:run  # Ejecutar pruebas en modo headless
```

**Nota**: Para más información sobre las pruebas, consulta [cypress/README.md](cypress/README.md).

## 🌐 URLs

### Aplicación

- **Desarrollo**: http://localhost:3000

### JSON Server

- **API**: http://localhost:3001
- **Personajes**: http://localhost:3001/characters

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Páginas de Next.js
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   ├── page.module.css    # Estilos de la página principal
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── CharacterCard.tsx  # Tarjeta de personaje
│   ├── CharacterCard.module.css
│   ├── CharacterDashboard.tsx # Dashboard principal
│   ├── CharacterDashboard.module.css
│   ├── CharacterList.tsx  # Lista de personajes
│   ├── CharacterList.module.css
│   ├── CharacterView.tsx  # Vista de personaje
│   ├── CharacterView.module.css
│   ├── FavoritesTab.tsx   # Tab de favoritos
│   ├── FavoritesTab.module.css
│   ├── StatusBadge.tsx    # Badge de estado
│   └── StatusBadge.module.css
├── context/              # Contextos de React
│   ├── CharactersContext.tsx # Contexto de personajes
│   └── FavoritesContext.tsx  # Contexto de favoritos
└── services/             # Servicios de API
    └── characterService.ts # Servicio de personajes
```

## 💭 Reflexiones del Desarrollo

### ¿Qué es lo que más te gustó de TU desarrollo?

Lo que más me gustó de mi desarrollo fue la estructura del proyecto, que se mantuvo simple y fácil de entender. Disfruté trabajando con CSS Modules, especialmente al aprender sobre sus limitaciones de anidación al intentar aplicar BEM. Además, fue una experiencia enriquecedora conocer e integrar JSON Server, ya que era mi primera vez usándolo.

### Si hubieras tenido más tiempo ¿qué hubieras mejorado o qué más hubieras hecho?

Si hubiera tenido más tiempo, me habría dedicado a revisar a fondo mi código para mejorar la distribución de la interfaz, asegurarme de manejar adecuadamente los errores y la carga de datos, y me habría enfocado en completar las pruebas unitarias para completar los requerimientos minimos.

### Descríbenos un pain point o bug con el que te hayas encontrado y cómo lo solucionaste.

En este proyecto, me encontré con un pain point al dar por hecho el flujo de la aplicación, enfocándome demasiado en cumplir con los requisitos sin considerar cómo mantener el diseño simple. Esto es algo que como programadores nos sucede a menudo, ya que nos centramos en las especificaciones y no siempre en la mejor solución. Para resolver esto, me tomé el tiempo para reevaluar los requisitos y reestructurar mi código, adecuando las necesidades del proyecto a una solución más óptima y eficiente.
