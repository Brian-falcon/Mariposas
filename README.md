# 🦋 Mariposas - Plataforma Educativa

Plataforma web educativa interactiva diseñada para personas con discapacidades cognitivas (Síndrome de Down, TEA, retrasos cognitivos). Incluye más de **50 actividades** organizadas en 7 categorías.

## Categorías y Actividades

- **Memoria**: Memorizar imágenes, encontrar pares, recordar secuencias
- **Visual**: Reconocer colores, identificar formas, encontrar diferencias, asociar imagen con palabra
- **Matemática**: Contar objetos, sumar, restar, elegir números
- **Lectura**: Reconocer letras, completar palabras, unir palabra con imagen
- **Auditivo**: Reconocer sonidos, elegir el sonido correcto
- **Coordinación**: Arrastrar y soltar, ordenar objetos, seguir secuencias
- **Juegos**: Puzzles, asociación, memoria visual

## Tecnologías

- **Next.js 14** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **Vercel** - Despliegue

## Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Despliegue en Vercel

1. Conecta el repositorio con Vercel
2. Vercel detectará automáticamente Next.js
3. El despliegue será automático en cada push

## Agregar nuevas actividades

Las actividades están en `src/data/activities/`. Cada categoría tiene su archivo:

- `memoria.ts`
- `visual.ts`
- `matematica.ts`
- `lectura.ts`
- `auditivo.ts`
- `coordinacion.ts`
- `juegos.ts`

Para agregar una actividad, crea un objeto con la estructura definida en `src/types/index.ts` y añádelo al array correspondiente.

## Diseño accesible

- Botones grandes (mínimo 44px)
- Colores contrastantes y amigables
- Iconos claros
- Navegación simple
- Tipografía legible (Nunito)
