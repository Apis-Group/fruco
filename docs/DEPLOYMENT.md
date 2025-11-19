# 🚀 Guía de Despliegue en Lucushost

## 📋 Índice

- [Introducción](#introducción)
- [Arquitectura de Despliegue](#arquitectura-de-despliegue)
- [Servidor Express (server.js)](#servidor-express-serverjs)
- [Proceso de Despliegue Paso a Paso](#proceso-de-despliegue-paso-a-paso)
- [Configuración del Hosting](#configuración-del-hosting)
- [Solución de Problemas](#solución-de-problemas)
- [Mantenimiento y Actualizaciones](#mantenimiento-y-actualizaciones)

---

## Introducción

Este proyecto está diseñado específicamente para **Lucushost**, un proveedor de hosting compartido español. El despliegue se realiza mediante un **servidor Express personalizado** (`server.js`) que sirve los archivos estáticos generados por Astro.

### ¿Por qué Express en hosting compartido?

- **Control total**: Express permite manejar rutas SPA en hosting sin configuración especial
- **Compatibilidad**: Funciona en cualquier hosting con soporte Node.js
- **Fallback SPA**: Redirige todas las rutas a `index.html` para navegación client-side
- **Performance**: Sirve archivos estáticos eficientemente con headers optimizados

---

## Arquitectura de Despliegue

```
┌─────────────────────────────────────────────────────┐
│                    LUCUSHOST                        │
│  ┌───────────────────────────────────────────────┐  │
│  │         Servidor Node.js (Express)           │  │
│  │                                               │  │
│  │  ┌─────────────────────────────────────┐     │  │
│  │  │        server.js                    │     │  │
│  │  │  - Puerto 3000 (configurable)       │     │  │
│  │  │  - Sirve archivos desde /dist       │     │  │
│  │  │  - Maneja rutas SPA                 │     │  │
│  │  └─────────────────────────────────────┘     │  │
│  │              ↓                                │  │
│  │  ┌─────────────────────────────────────┐     │  │
│  │  │    Carpeta /dist (Build Astro)      │     │  │
│  │  │  - index.html (SPA entry)           │     │  │
│  │  │  - _astro/ (JS, CSS chunks)         │     │  │
│  │  │  - Assets estáticos optimizados     │     │  │
│  │  └─────────────────────────────────────┘     │  │
│  └───────────────────────────────────────────────┘  │
│                      ↑                              │
│              HTTP Requests                          │
└─────────────────────────────────────────────────────┘
                      ↑
                      │
              Internet / Usuarios
```

---

## Servidor Express (server.js)

### Código Completo Explicado

```javascript
import path from "path";
import process from "process";
import { fileURLToPath } from "url";
import express from "express";

// ========================================
// CONFIGURACIÓN DE PATHS (ES MODULES)
// ========================================
// Necesario porque usamos type: "module" en package.json
// __dirname no existe en ES modules, lo recreamos

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========================================
// INICIALIZACIÓN DE EXPRESS
// ========================================
const app = express();

// Puerto: Usa variable de entorno o 3000 por defecto
// Lucushost puede asignar puerto dinámicamente
const PORT = process.env.PORT || 3000;

// ========================================
// MIDDLEWARE: ARCHIVOS ESTÁTICOS
// ========================================
// Sirve todos los archivos de la carpeta 'dist'
// Incluye: HTML, CSS, JS, imágenes, fonts, etc.
// Express configura automáticamente:
// - Content-Type headers correctos
// - ETag para caching
// - Range requests para archivos grandes

app.use(express.static(path.join(__dirname, "dist")));

// ========================================
// MIDDLEWARE: FALLBACK SPA
// ========================================
// Maneja el routing client-side de la SPA
// Si la URL no corresponde a un archivo físico,
// sirve index.html para que React Router maneje la ruta

app.use((req, res, next) => {
  // Si la ruta contiene un punto (.), probablemente es un archivo
  // Ejemplo: style.css, image.png, bundle.js
  if (req.path.includes(".")) {
    // Deja que Express maneje el error 404 para archivos
    return next();
  }

  // Para cualquier otra ruta (sin extensión),
  // asumimos que es una ruta SPA y servimos index.html
  // Ejemplo: /productos, /contacto, /historia
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ========================================
// INICIO DEL SERVIDOR
// ========================================
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📁 Sirviendo archivos desde: ${path.join(__dirname, "dist")}`);
});
```

### Características Clave del Servidor

#### 1. **Middleware de Archivos Estáticos**

```javascript
app.use(express.static(path.join(__dirname, "dist")));
```

- Sirve automáticamente todos los archivos de `/dist`
- Configura headers de cache apropiados
- Maneja compresión gzip si está disponible
- Soporta rangos para streaming de video/audio

#### 2. **Fallback para SPA**

```javascript
app.use((req, res, next) => {
  if (req.path.includes(".")) return next();
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
```

- **¿Por qué es necesario?**: En una SPA, todas las rutas deben apuntar a `index.html`
- **Funcionamiento**:
  - Si la URL contiene un punto → Es un archivo, intenta servirlo
  - Si no contiene punto → Es una ruta, sirve `index.html`
- **Resultado**: El router client-side (Astro) maneja la navegación

#### 3. **Puerto Configurable**

```javascript
const PORT = process.env.PORT || 3000;
```

- Lee puerto desde variable de entorno
- Permite a Lucushost asignar puerto dinámicamente
- Fallback a 3000 para desarrollo local

---

## Proceso de Despliegue Paso a Paso

### 1️⃣ Preparación Local

#### a) Verificar que el build funciona

```bash
# Desde la raíz del proyecto
pnpm build

# Deberías ver:
# ✓ Building...
# ✓ Build complete!
```

#### b) Probar el servidor localmente

```bash
pnpm start

# Abrir navegador en http://localhost:3000
# Verificar:
# - ✅ Todas las páginas cargan correctamente
# - ✅ Las rutas funcionan (productos, contacto, etc.)
# - ✅ Imágenes se muestran
# - ✅ Animaciones funcionan
# - ✅ Cambio de idioma funciona
```

#### c) Verificar la estructura de /dist

```bash
ls -la dist/

# Deberías ver:
# dist/
# ├── index.html           ← Página principal
# ├── 404.html             ← Página de error
# ├── _astro/              ← JS y CSS optimizados
# │   ├── index.[hash].js
# │   ├── index.[hash].css
# │   └── ...
# ├── favicon/             ← Iconos
# ├── flags/               ← Banderas para idiomas
# ├── products/            ← Imágenes de productos
# └── ...                  ← Otros assets
```

### 2️⃣ Preparación de Archivos para Upload

#### Archivos NECESARIOS para subir:

```
✅ dist/                    # Carpeta completa del build
✅ server.js                # Servidor Express
✅ package.json             # Dependencias
✅ pnpm-lock.yaml          # Lock file (importante para reproducibilidad)
```

#### Archivos que NO debes subir:

```
❌ node_modules/           # Se instalarán en el servidor
❌ src/                    # Código fuente (ya compilado en dist/)
❌ .git/                   # Repositorio git
❌ .astro/                 # Cache de Astro
❌ README.md, LICENSE, etc # Documentación (opcional)
```

### 3️⃣ Conexión al Servidor Lucushost

#### Opción A: FTP/SFTP (Recomendado para archivos grandes)

```bash
# Usando FileZilla o similar
# Host: ftp.tudominio.com
# Usuario: tu_usuario_lucushost
# Contraseña: tu_contraseña
# Puerto: 21 (FTP) o 22 (SFTP)

# Estructura en el servidor:
/home/tu_usuario/
  └── public_html/         # O el directorio que uses
      ├── dist/
      ├── server.js
      ├── package.json
      └── pnpm-lock.yaml
```

#### Opción B: SSH (Más rápido, recomendado)

```bash
# Conectar por SSH
ssh tu_usuario@tudominio.com

# Navegar al directorio web
cd public_html

# Opción 1: Subir archivos con rsync (desde tu máquina local)
rsync -avz --exclude 'node_modules' \
  dist/ server.js package.json pnpm-lock.yaml \
  tu_usuario@tudominio.com:~/public_html/

# Opción 2: Git (si tienes acceso)
git clone https://github.com/zkjon/fruco.git
cd fruco
git pull origin main
```

### 4️⃣ Instalación en el Servidor

```bash
# 1. Conectar por SSH
ssh tu_usuario@tudominio.com

# 2. Navegar al directorio del proyecto
cd public_html  # O donde hayas subido los archivos

# 3. Verificar que Node.js está disponible
node --version
# Debe ser v18.0.0 o superior

# 4. Instalar pnpm si no está instalado
npm install -g pnpm

# 5. Instalar dependencias de producción ÚNICAMENTE
pnpm install --prod

# Esto instalará SOLO:
# - express
# - Y sus dependencias necesarias
# NO instalará devDependencies (Astro, TypeScript, etc.)
```

### 5️⃣ Iniciar el Servidor

#### Opción A: Ejecución Simple (para pruebas)

```bash
# Iniciar servidor manualmente
node server.js

# Deberías ver:
# 🚀 Servidor corriendo en http://localhost:3000
# 📁 Sirviendo archivos desde: /home/usuario/public_html/dist
```

#### Opción B: PM2 (Recomendado para producción)

```bash
# 1. Instalar PM2 globalmente
npm install -g pm2

# 2. Iniciar aplicación con PM2
pm2 start server.js --name "fruco-web"

# 3. Configurar PM2 para auto-start en reboot
pm2 startup
pm2 save

# 4. Verificar estado
pm2 status

# Deberías ver:
# ┌─────┬────────────┬─────────┬─────────┬──────────┐
# │ id  │ name       │ status  │ cpu     │ memory   │
# ├─────┼────────────┼─────────┼─────────┼──────────┤
# │ 0   │ fruco-web  │ online  │ 0%      │ 45.2mb   │
# └─────┴────────────┴─────────┴─────────┴──────────┘

# 5. Logs en tiempo real
pm2 logs fruco-web

# 6. Reiniciar aplicación
pm2 restart fruco-web

# 7. Detener aplicación
pm2 stop fruco-web

# 8. Eliminar de PM2
pm2 delete fruco-web
```

#### Opción C: Configurar como Servicio (Systemd)

```bash
# 1. Crear archivo de servicio
sudo nano /etc/systemd/system/fruco.service

# 2. Contenido del archivo:
[Unit]
Description=Fruco Website
After=network.target

[Service]
Type=simple
User=tu_usuario
WorkingDirectory=/home/tu_usuario/public_html
ExecStart=/usr/bin/node server.js
Restart=on-failure
Environment=PORT=3000

[Install]
WantedBy=multi-user.target

# 3. Recargar systemd
sudo systemctl daemon-reload

# 4. Iniciar servicio
sudo systemctl start fruco

# 5. Habilitar auto-start
sudo systemctl enable fruco

# 6. Verificar estado
sudo systemctl status fruco
```

### 6️⃣ Configuración del Proxy Inverso

Si Lucushost usa Apache o Nginx, necesitas configurar un proxy inverso:

#### Apache (.htaccess)

```apache
# Crear archivo .htaccess en public_html/

RewriteEngine On

# Redirigir todo el tráfico al servidor Node.js
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]

# Headers de proxy
RequestHeader set X-Forwarded-Proto "https"
RequestHeader set X-Forwarded-Port "443"
```

#### Nginx (nginx.conf)

```nginx
server {
    listen 80;
    server_name tudominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 7️⃣ Configurar SSL/HTTPS (Opcional pero Recomendado)

```bash
# Si Lucushost tiene cPanel con Let's Encrypt:
# 1. Ir a cPanel → SSL/TLS Status
# 2. Seleccionar dominio
# 3. Ejecutar AutoSSL

# Si usas Certbot manualmente:
sudo certbot --apache -d tudominio.com -d www.tudominio.com
```

---

## Configuración del Hosting

### Variables de Entorno en Lucushost

Si necesitas configurar variables de entorno:

```bash
# Opción 1: Archivo .env (no recomendado en producción)
echo "PORT=3000" > .env

# Opción 2: Systemd service (mejor)
# En /etc/systemd/system/fruco.service:
[Service]
Environment=PORT=3000
Environment=NODE_ENV=production

# Opción 3: PM2 ecosystem file
# ecosystem.config.js
module.exports = {
  apps: [{
    name: 'fruco-web',
    script: './server.js',
    env: {
      PORT: 3000,
      NODE_ENV: 'production'
    }
  }]
};

# Iniciar con:
pm2 start ecosystem.config.js
```

### Optimización de Performance

#### 1. Habilitar compresión gzip

```javascript
// Agregar al inicio de server.js
import compression from "compression";

app.use(compression());
```

#### 2. Headers de cache

```javascript
// Agregar después de express.static
app.use(
  express.static(path.join(__dirname, "dist"), {
    maxAge: "1y", // Cache por 1 año
    etag: true,
    lastModified: true,
    setHeaders: (res, path) => {
      if (path.endsWith(".html")) {
        // HTML no cachear
        res.setHeader("Cache-Control", "no-cache");
      }
    },
  }),
);
```

---

## Solución de Problemas

### Problema: "Cannot find module 'express'"

**Causa**: No se instalaron las dependencias

**Solución**:

```bash
pnpm install --prod
```

### Problema: "Port 3000 already in use"

**Causa**: El puerto está ocupado

**Solución**:

```bash
# Ver qué proceso usa el puerto
lsof -i :3000

# Matar el proceso
kill -9 <PID>

# O cambiar el puerto
PORT=3001 node server.js
```

### Problema: "dist/index.html not found"

**Causa**: No se ejecutó el build o la carpeta dist no existe

**Solución**:

```bash
# Localmente
pnpm build

# Subir la carpeta dist completa al servidor
```

### Problema: Rutas 404 en producción

**Causa**: El fallback SPA no funciona correctamente

**Solución**:

```javascript
// Verificar que el middleware está DESPUÉS de express.static
app.use(express.static(...));  // Primero esto
app.use((req, res, next) => { // Luego esto
  if (req.path.includes(".")) return next();
  res.sendFile(...);
});
```

### Problema: Imágenes no cargan

**Causa**: Rutas incorrectas o permisos

**Solución**:

```bash
# Verificar permisos
chmod -R 755 dist/

# Verificar que las imágenes existen
ls -la dist/products/
```

---

## Mantenimiento y Actualizaciones

### Actualizar el Sitio

```bash
# 1. Local: hacer cambios y build
pnpm build

# 2. Conectar al servidor
ssh tu_usuario@tudominio.com
cd public_html

# 3. Backup (opcional pero recomendado)
tar -czf backup-$(date +%Y%m%d).tar.gz dist/

# 4. Subir nueva versión de dist/
# Opción A: rsync desde local
rsync -avz --delete dist/ tu_usuario@tudominio.com:~/public_html/dist/

# Opción B: FTP/SFTP (sobrescribir carpeta dist)

# 5. Reiniciar servidor
pm2 restart fruco-web
```

### Monitoreo

```bash
# Ver logs en tiempo real
pm2 logs fruco-web

# Ver uso de recursos
pm2 monit

# Ver estadísticas
pm2 show fruco-web
```

### Backup Automático

```bash
# Crear script de backup
nano ~/backup-fruco.sh

#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/tu_usuario/backups"
PROJECT_DIR="/home/tu_usuario/public_html"

mkdir -p $BACKUP_DIR
tar -czf $BACKUP_DIR/fruco-$DATE.tar.gz -C $PROJECT_DIR dist/ server.js package.json

# Mantener solo últimos 7 backups
ls -t $BACKUP_DIR/fruco-*.tar.gz | tail -n +8 | xargs rm -f

# Hacer ejecutable
chmod +x ~/backup-fruco.sh

# Agregar a cron (diario a las 2 AM)
crontab -e
0 2 * * * /home/tu_usuario/backup-fruco.sh
```

---

## Checklist de Despliegue

Usa este checklist antes de cada deploy:

- [ ] ✅ Build local exitoso (`pnpm build`)
- [ ] ✅ Servidor local funciona (`pnpm start`)
- [ ] ✅ Todas las rutas funcionan
- [ ] ✅ Imágenes cargan correctamente
- [ ] ✅ Animaciones funcionan
- [ ] ✅ Cambio de idioma funciona
- [ ] ✅ Backup del sitio actual
- [ ] ✅ Subir archivos al servidor
- [ ] ✅ Instalar/actualizar dependencias
- [ ] ✅ Reiniciar servidor
- [ ] ✅ Verificar en producción
- [ ] ✅ Probar todas las secciones
- [ ] ✅ Verificar en móvil
- [ ] ✅ Verificar analytics

---

## Recursos Adicionales

- **Documentación Express**: https://expressjs.com/
- **PM2 Documentation**: https://pm2.keymetrics.io/
- **Astro Deployment**: https://docs.astro.build/en/guides/deploy/
- **Lucushost Soporte**: https://lucushost.com/soporte

---

**Última actualización**: Octubre 2025
