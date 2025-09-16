# Rick & Morty Character Viewer - Makefile

.PHONY: help install first-dev dev build json-server lint lint-fix format format-check clean

# Variables
DIST = .next

# Comando por defecto
help: ## Mostrar ayuda
	@echo "🎬 Rick & Morty Character Viewer - Comandos disponibles:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

# Instalación
install: ## Instalar dependencias
	@echo "📦 Instalando dependencias..."
	npm install

# Desarrollo
first-dev: install ## Primera instalación: instalar dependencias, iniciar JSON Server y desarrollo
	@echo "🚀 Primera instalación - Iniciando desarrollo completo..."
	@echo "📦 Instalando dependencias..."
	@echo "🗄️  Iniciando JSON Server..."
	npm run json-server &
	@echo "🔥 Iniciando servidor de desarrollo..."
	npm run dev

dev: ## Iniciar JSON Server y desarrollo (sin instalar dependencias)
	@echo "🚀 Iniciando desarrollo..."
	@echo "🗄️  Iniciando JSON Server..."
	npm run json-server &
	@echo "🔥 Iniciando servidor de desarrollo..."
	npm run dev

# Construcción
build: ## Construir para producción
	@echo "🏗️  Construyendo aplicación para producción..."
	npm run build

# JSON Server
json-server: ## Iniciar JSON Server
	@echo "🗄️  Iniciando JSON Server..."
	npm run json-server

# Calidad de código
lint: ## Verificar código con ESLint
	@echo "🔍 Verificando código..."
	npm run lint

lint-fix: ## Corregir errores de ESLint automáticamente
	@echo "🔧 Corrigiendo errores de código..."
	npm run lint:fix

format: ## Formatear código con Prettier
	@echo "✨ Formateando código..."
	npm run format

format-check: ## Verificar formato de código
	@echo "📏 Verificando formato de código..."
	npm run format:check

# Testing
test: ## Ejecutar pruebas E2E con Cypress
	@echo "🧪 Ejecutando pruebas E2E..."
	npx cypress run

test:open ## Abrir Cypress en modo interactivo
	@echo "🧪 Abriendo Cypress..."
	npx cypress open

# Limpieza
clean: ## Limpiar archivos generados
	@echo "🧹 Limpiando archivos generados..."
	rm -rf $(DIST)
	rm -rf out
	rm -rf .next
	@echo "✅ Limpieza completada"