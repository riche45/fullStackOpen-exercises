# Blog App E2E Tests

Este proyecto contiene las pruebas End-to-End (E2E) para la aplicación de blogs usando Playwright.

## Configuración

### Prerrequisitos

1. **Backend corriendo**: El servidor backend debe estar ejecutándose en `http://localhost:3003`
2. **Frontend corriendo**: El servidor frontend debe estar ejecutándose en `http://localhost:5173`

### Instalación

```bash
npm install
npx playwright install
```

## Ejecutar las pruebas

### Ejecutar todas las pruebas
```bash
npx playwright test
```

### Ejecutar en modo UI (para debugging)
```bash
npx playwright test --ui
```

### Ejecutar con reporte
```bash
npx playwright test --reporter=html
npx playwright show-report
```

## Tests implementados

### Tests básicos de login
- ✅ **Login form is shown by default**: Verifica que el formulario de login se muestre por defecto
- ✅ **Login form can be filled and submitted**: Verifica que el formulario se puede llenar y enviar
- ✅ **Login fails with wrong credentials**: Verifica que el login falla con credenciales incorrectas

### Tests de funcionalidad de blogs
- ✅ **Blog creation form is accessible after login**: Verifica que el formulario de creación de blogs esté disponible
- ✅ **Blog creation form has all required fields**: Verifica que todos los campos requeridos estén presentes
- ✅ **User can fill blog creation form**: Verifica que el usuario puede llenar el formulario de creación

## Configuración del proyecto

### playwright.config.js
- Configurado para usar Chromium
- Base URL: `http://localhost:5173`
- Timeouts optimizados para estabilidad
- Configurado para ejecutar tests secuencialmente

### Estructura de archivos
```
bloglist-e2e/
├── tests/
│   └── blog_app.spec.js    # Tests principales
├── playwright.config.js     # Configuración de Playwright
└── package.json           # Dependencias del proyecto
```

## Notas importantes

1. **Puerto del backend**: Los tests están configurados para usar el puerto 3003 para el backend
2. **Reset de base de datos**: Cada test resetea la base de datos antes de ejecutarse
3. **Login manual**: Los tests usan login manual mediante localStorage para evitar problemas de autenticación
4. **data-testid**: Los elementos del frontend tienen atributos `data-testid` para facilitar la selección en los tests

## Próximos pasos

Para completar los ejercicios 5.17-5.23, se pueden agregar los siguientes tests:

1. **Creación de blogs**: Test que verifique la creación exitosa de blogs
2. **Likes**: Test que verifique la funcionalidad de likes
3. **Eliminación**: Test que verifique la eliminación de blogs propios
4. **Ordenamiento**: Test que verifique que los blogs se ordenen por likes
5. **Visibilidad de botones**: Test que verifique que el botón de eliminar solo aparezca para el creador

## Troubleshooting

### Problemas comunes

1. **Backend no disponible**: Asegúrate de que el backend esté corriendo en el puerto 3003
2. **Frontend no disponible**: Asegúrate de que el frontend esté corriendo en el puerto 5173
3. **Timeouts**: Si los tests fallan por timeouts, verifica que ambos servidores estén funcionando correctamente

### Logs útiles

Los tests incluyen logs en la consola para ayudar con el debugging:
- Respuestas del backend
- Estado del localStorage
- Errores de autenticación 