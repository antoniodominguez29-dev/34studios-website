# 34Studios Official Website

Web oficial demo para 34Studios, creada con Next.js, TypeScript y Tailwind CSS.

## Que incluye

- Portada editorial inspirada en el Brand Book oficial de 34Studios.
- Selected Work con imagenes extraidas del Brand Book.
- Seccion `Über mich` adaptada para web a partir del texto real del PDF.
- Seccion `Interessen & Zusammenarbeit` para redacciones, magazines y proyectos culturales.
- Briefing conversacional para solicitudes editoriales.
- Studio Ledger demo de leads guardado en el navegador con `localStorage`.
- Contacto real centralizado en `lib/site-content.ts`.
- Preparada para Vercel: `pnpm build` genera la version de produccion.

## Como ejecutarlo en tu Mac

### 1. Instala Node.js

Si no tienes Node instalado:

1. Entra en https://nodejs.org
2. Descarga la version LTS.
3. Instalala como cualquier app de Mac.
4. Cierra y abre Terminal.

Comprueba que funciona:

```bash
node --version
```

### 2. Entra en la carpeta del proyecto

En Terminal, escribe:

```bash
cd /Users/antoniodominguez/Documents/Codex/2026-06-29/quiero-crear-la-web-oficial-de
```

### 3. Instala pnpm

```bash
npm install -g pnpm
```

### 4. Instala las dependencias del proyecto

```bash
pnpm install
```

### 5. Arranca la web en local

```bash
pnpm dev
```

Abre esta direccion en tu navegador:

```text
http://localhost:3000
```

## Comandos importantes

Comprueba TypeScript:

```bash
pnpm typecheck
```

Crea la version de produccion:

```bash
pnpm build
```

Arranca la version de produccion despues del build:

```bash
pnpm start
```

## Subir a GitHub

Desde la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Create 34Studios official website"
```

Luego crea un repositorio nuevo en GitHub y sigue las instrucciones que te muestra GitHub para conectar el repositorio remoto.

## Desplegar en Vercel

1. Entra en https://vercel.com
2. Conecta tu cuenta de GitHub.
3. Importa el repositorio de `34studios-official`.
4. Vercel detectara Next.js automaticamente.
5. Build command: `pnpm build`
6. Output: Next.js default.

No hay APIs externas, pagos ni autenticacion real todavia. Es una demo local lista para evolucionar.
