# 💰 FinanSmart - Backend API

**Sistema de gestión financiera personal** que permite a los usuarios administrar sus ingresos, gastos, presupuestos y categorías de manera eficiente.

---

## 🎯 Descripción del Proyecto

FinanSmart Backend es una API REST desarrollada con **Node.js + TypeScript + Express** que proporciona endpoints para la gestión completa de finanzas personales. Incluye validación robusta de datos, manejo centralizado de errores, y una arquitectura modular escalable.

---

## 🛠️ Tecnologías y Herramientas

### **Core**

- **Node.js 20.x** - Runtime de JavaScript
- **TypeScript 4.x** - Tipado estático y mejor DX
- **Express.js** - Framework web minimalista y flexible

### **Base de Datos**

- **PostgreSQL** - Base de datos relacional
- **Prisma ORM** - ORM moderno con migraciones y type-safety
  - Cliente type-safe para queries
  - Migraciones automáticas
  - Introspección de esquema

### **Validación y Schemas**

- **Zod** - Validación de datos en runtime
  - Schemas reutilizables
  - Type inference automática
  - Mensajes de error personalizados

### **Desarrollo**

- **ts-node-dev** - Hot reload en desarrollo
- **dotenv** - Gestión de variables de entorno
- **CORS** - Habilitación de recursos entre orígenes

---

## 📂 Estructura del Proyecto

```
financial-organizer-backend/
├── src/
│   ├── controllers/         # Lógica de controladores (manejo de req/res)
│   │   ├── user.controller.ts
│   │   ├── budget.controller.ts
│   │   ├── category.controller.ts
│   │   ├── income.controller.ts
│   │   └── expense.controller.ts
│   │
│   ├── services/           # Lógica de negocio
│   │   ├── user.service.ts
│   │   ├── budget.service.ts
│   │   ├── category.service.ts
│   │   ├── income.service.ts
│   │   └── expense.service.ts
│   │
│   ├── routes/             # Definición de rutas
│   │   ├── user.routes.ts
│   │   ├── budget.routes.ts
│   │   ├── category.routes.ts
│   │   ├── income.routes.ts
│   │   └── expense.routes.ts
│   │
│   ├── schemas/            # Schemas de validación con Zod
│   │   ├── user.schema.ts
│   │   ├── budget.schema.ts
│   │   ├── category.schema.ts
│   │   └── transaction.schema.ts
│   │
│   ├── dtos/              # Data Transfer Objects
│   │   ├── user.dto.ts
│   │   ├── budget.dto.ts
│   │   ├── category.dto.ts
│   │   └── transaction.dto.ts
│   │
│   ├── mappers/           # Transformación de entidades Prisma → DTOs
│   │   └── entity.mapper.ts
│   │
│   ├── middleware/        # Middlewares personalizados
│   │   ├── error-handler.middleware.ts
│   │   └── validation.middleware.ts
│   │
│   ├── errors/            # Clases de error personalizadas
│   │   └── custom-errors.ts
│   │
│   └── index.ts           # Entry point de la aplicación
│
├── prisma/
│   ├── schema.prisma      # Modelo de datos
│   └── migrations/        # Historial de migraciones
│
├── .env.example           # Template de variables de entorno
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📊 Modelo de Datos

### **User (Usuario)**

```typescript
- id: UUID
- email: String (único)
- name: String
- createdAt: DateTime
- updatedAt: DateTime
```

### **Budget (Presupuesto)**

```typescript
- id: UUID
- userId: UUID (FK → User)
- name: String
- amount: Decimal
- month: Int (1-12)
- year: Int
- createdAt: DateTime
- updatedAt: DateTime
```

### **Category (Categoría)**

```typescript
- id: UUID
- userId: UUID (FK → User)
- name: String
- type: Enum (INCOME | EXPENSE)
- createdAt: DateTime
- updatedAt: DateTime
```

### **Income (Ingreso)**

```typescript
- id: UUID
- userId: UUID (FK → User)
- categoryId: UUID (FK → Category)
- amount: Decimal
- description: String (opcional)
- date: DateTime
- createdAt: DateTime
- updatedAt: DateTime
```

### **Expense (Gasto)**

```typescript
- id: UUID
- userId: UUID (FK → User)
- budgetId: UUID (FK → Budget, opcional)
- categoryId: UUID (FK → Category)
- amount: Decimal
- description: String (opcional)
- date: DateTime
- createdAt: DateTime
- updatedAt: DateTime
```

---

## 🚀 APIs Disponibles

### **Health Check**

```
GET  /              - Status de la API
GET  /health        - Health check con verificación de DB
```

### **Users (Usuarios)**

```
POST   /api/users           - Crear usuario
GET    /api/users           - Listar usuarios
GET    /api/users/:id       - Obtener usuario por ID
PUT    /api/users/:id       - Actualizar usuario
DELETE /api/users/:id       - Eliminar usuario
```

### **Budgets (Presupuestos)**

```
POST   /api/budgets         - Crear presupuesto
GET    /api/budgets         - Listar presupuestos
GET    /api/budgets/:id     - Obtener presupuesto por ID
PUT    /api/budgets/:id     - Actualizar presupuesto
DELETE /api/budgets/:id     - Eliminar presupuesto
```

### **Categories (Categorías)**

```
POST   /api/categories      - Crear categoría
GET    /api/categories      - Listar categorías
GET    /api/categories/:id  - Obtener categoría por ID
PUT    /api/categories/:id  - Actualizar categoría
DELETE /api/categories/:id  - Eliminar categoría
```

### **Incomes (Ingresos)**

```
POST   /api/incomes         - Registrar ingreso
GET    /api/incomes         - Listar ingresos
GET    /api/incomes/:id     - Obtener ingreso por ID
PUT    /api/incomes/:id     - Actualizar ingreso
DELETE /api/incomes/:id     - Eliminar ingreso
```

### **Expenses (Gastos)**

```
POST   /api/expenses        - Registrar gasto
GET    /api/expenses        - Listar gastos
GET    /api/expenses/:id    - Obtener gasto por ID
PUT    /api/expenses/:id    - Actualizar gasto
DELETE /api/expenses/:id    - Eliminar gasto
```

---

## 📋 Formato de Requests/Responses

### **Ejemplo: Crear Usuario**

**Request:**

```json
POST /api/users
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "name": "Juan Pérez"
}
```

**Response (200 OK):**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "usuario@ejemplo.com",
  "name": "Juan Pérez",
  "createdAt": "2025-11-16T10:30:00Z",
  "updatedAt": "2025-11-16T10:30:00Z"
}
```

**Response (400 Bad Request):**

```json
{
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email"
    }
  ]
}
```

---

## 🔧 Configuración Inicial

### **1. Clonar el repositorio**

```bash
git clone https://github.com/tu-organizacion/financial-organizer-backend.git
cd financial-organizer-backend
```

### **2. Instalar dependencias**

```bash
npm install
```

### **3. Configurar variables de entorno**

Copia el archivo `.env.example` como `.env`:

```bash
cp .env.example .env
```

Edita `.env` con tus valores:

```bash
# Base de datos
DATABASE_URL="postgresql://user:password@localhost:5432/financial_organizer"

# Servidor
PORT=3000
NODE_ENV=development

# CORS - Frontend
FRONTEND_URL=http://localhost:4200
```

### **4. Configurar PostgreSQL**

Asegúrate de tener PostgreSQL instalado y corriendo:

```bash
# macOS (Homebrew)
brew install postgresql
brew services start postgresql

# Crear base de datos
createdb financial_organizer
```

### **5. Ejecutar migraciones**

```bash
npx prisma migrate dev
```

Esto creará todas las tablas necesarias en tu base de datos.

### **6. (Opcional) Generar datos de prueba**

```bash
npx prisma db seed
```

### **7. Iniciar servidor de desarrollo**

```bash
npm run dev
```

El servidor estará corriendo en `http://localhost:3000`

---

## 📜 Scripts Disponibles

```bash
npm run dev          # Iniciar en modo desarrollo (hot reload)
npm run build        # Compilar TypeScript a JavaScript
npm start            # Iniciar en producción (requiere build previo)
npm run migrate      # Ejecutar migraciones de Prisma
npm run migrate:dev  # Crear y ejecutar nueva migración
npm run studio       # Abrir Prisma Studio (GUI para la DB)
```

---

## 🏗️ Arquitectura y Patrones

### **Separation of Concerns**

El proyecto sigue una arquitectura en capas:

1. **Routes** → Definen endpoints y asocian con controladores
2. **Controllers** → Manejan HTTP (req/res), llaman a services
3. **Services** → Contienen lógica de negocio, usan Prisma
4. **Schemas** → Validan datos de entrada con Zod
5. **DTOs** → Definen estructura de datos de salida
6. **Mappers** → Transforman entidades Prisma → DTOs

### **Error Handling Centralizado**

- Middleware global de manejo de errores
- Clases de error personalizadas (`ValidationError`, `NotFoundError`, etc.)
- Responses consistentes en toda la API

### **Type Safety**

- TypeScript en todo el código
- Prisma genera tipos automáticamente desde el schema
- Zod infiere tipos desde los schemas de validación

### **Validación en Capas**

1. **Schema validation** (Zod) → Valida estructura y tipos
2. **Business rules** (Services) → Valida reglas de negocio
3. **Database constraints** (Prisma/PostgreSQL) → Valida integridad

---

## 🔐 Características de Seguridad

- ✅ **CORS configurado** según entorno (desarrollo/producción)
- ✅ **Validación estricta** de todos los inputs con Zod
- ✅ **Type safety** completo con TypeScript
- ✅ **Graceful shutdown** para cierre limpio de conexiones
- ✅ **Health checks** para monitoreo de disponibilidad
- ✅ **Error handling** que no expone información sensible

---

## 🌍 Entornos

### **Desarrollo**

```bash
NODE_ENV=development
DATABASE_URL=postgresql://localhost:5432/financial_organizer
FRONTEND_URL=http://localhost:4200
```

### **Producción**

```bash
NODE_ENV=production
DATABASE_URL=postgresql://admin:password@rds-endpoint:5432/finansmart
FRONTEND_URL=https://finansmart.com
```

---

## 🧪 Testing

### **Health Check**

```bash
# Verificar que la API está funcionando
curl http://localhost:3000/health

# Response esperado:
{
  "status": "OK",
  "timestamp": "2025-11-16T10:30:00.000Z",
  "database": "connected",
  "environment": "development"
}
```

### **Crear Usuario**

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@test.com",
    "name": "Usuario de Prueba"
  }'
```

---

## 📚 Recursos Útiles

- [Documentación de Express](https://expressjs.com/)
- [Documentación de Prisma](https://www.prisma.io/docs/)
- [Documentación de Zod](https://zod.dev/)
- [Documentación de TypeScript](https://www.typescriptlang.org/docs/)

---

## 👥 Contribución

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📝 Convención de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: nueva funcionalidad
fix: corrección de bug
docs: cambios en documentación
style: formato, sin cambios de código
refactor: refactorización de código
test: agregar o modificar tests
chore: tareas de mantenimiento
```

---

## 📄 Licencia

Este proyecto es privado y confidencial.

---

## 🚧 Roadmap

- [x] API REST completa (Users, Budgets, Categories, Incomes, Expenses)
- [x] Validación con Zod
- [x] Error handling centralizado
- [x] Health checks
- [x] Configuración para múltiples entornos
- [ ] Autenticación con JWT
- [ ] Tests unitarios y de integración
- [ ] Documentación con Swagger/OpenAPI
- [ ] Rate limiting
- [ ] Logs estructurados
- [ ] Deploy en AWS EC2
- [ ] CI/CD con GitHub Actions

---

**Versión:** 1.0.0  
**Última actualización:** Noviembre 2025  
**Autor:** Mauricio Lenis
