# 🧪 Cypress Testing Suite

Suite de pruebas end-to-end para el visualizador de personajes de Rick & Morty utilizando Cypress y Page Object Model (POM).

## 📁 Estructura del Proyecto

```
cypress/
├── e2e/                           # Archivos de pruebas
│   ├── character-card.cy.ts       # Pruebas del componente CharacterCard
│   ├── character-list.cy.ts       # Pruebas del componente CharacterList
│   ├── character-view.cy.ts       # Pruebas del componente CharacterView
│   └── rick-morty-app.cy.ts       # Pruebas de integración del dashboard
├── pom/                           # Page Object Model
│   ├── base-pom.ts                # Clase base con métodos comunes
│   ├── components/                 # POMs de componentes
│   │   ├── character-card-pom.ts
│   │   ├── character-list-pom.ts
│   │   └── character-view-pom.ts
│   └── pages/                     # POMs de páginas
│       └── character-dashboard-page.ts
├── support/                       # Configuración de Cypress
│   └── e2e.ts                     # Configuración de pruebas
└── screenshots/                   # Capturas de pantalla (generadas automáticamente)
```

## 🚀 Comandos de Pruebas

### Ejecutar Pruebas

```bash
# Ejecutar todas las pruebas en modo headless
npm run cypress:run

# Abrir interfaz de Cypress para ejecutar pruebas interactivamente
npm run cypress:open
```

## 🏗️ Arquitectura de Pruebas

### Page Object Model (POM)

El proyecto utiliza el patrón Page Object Model para mantener las pruebas organizadas y reutilizables:

## ⚙️ Configuración

### Requisitos Previos

1. La aplicación debe estar ejecutándose en `http://localhost:3000`
2. JSON Server debe estar ejecutándose en `http://localhost:3001`

**Nota**: Puedes usar los comandos del Makefile para iniciar los servicios:

- `make first-dev` - Primera instalación (instala dependencias + inicia servicios)
- `make dev` - Iniciar servicios (sin instalar dependencias)

## 🔧 Desarrollo de Pruebas

### Agregar Nuevas Pruebas

1. Crear o modificar el POM correspondiente en `cypress/pom/`
2. Agregar las pruebas en `cypress/e2e/`
3. Seguir el patrón de nomenclatura existente

## 📊 Estado Actual

**Nota**: Las pruebas actuales están en desarrollo y se enfocan en verificar la funcionalidad básica de visualización de componentes. No representan una suite completa de pruebas y no cumplen el requerimiento para considerarse unitarias.
