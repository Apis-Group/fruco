import path from "path";
import process from "process";
import { fileURLToPath } from "url";

import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde la carpeta dist
app.use(express.static(path.join(__dirname, "dist")));

// Middleware para manejar rutas SPA - redirigir todas las rutas no encontradas a index.html
app.use((req, res, next) => {
  // Si es una solicitud de archivo estático que no existe, continúa
  if (req.path.includes(".")) {
    return next();
  }
  // Para rutas SPA, sirve index.html
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📁 Sirviendo archivos desde: ${path.join(__dirname, "dist")}`);
});
