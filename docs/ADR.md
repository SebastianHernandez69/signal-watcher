# ADR 0001 – Decisiones Técnicas Generales

## Contexto
El objetivo principal del sistema fue desarrollar un **sistema de monitoreo de eventos en tiempo real** que permita:

- Registrar y categorizar eventos financieros.  
- Crear **watchlists** personalizadas para seguimiento de activos.  
- Integrar con **IA** para análisis y resúmenes automáticos.  
- Exponer una **API RESTful** robusta y documentada.  
- Ofrecer una **interfaz web responsive** e intuitiva.  

La solución debía ser **funcional, mantenible y escalable**, dentro de las restricciones de tiempo de la prueba técnica.

---

## Decisión: Arquitectura Modular
- **Adoptada**: Separación por dominios (`events`, `watchlists`, `ai`).  
- **Beneficios**:  
  - Mejor mantenibilidad dado que cada módulo tiene responsabilidad única.
  - Escalabilidad, porque es posible escalar módulos de forma independiente.
  - Onboarding más sencillo para nuevos desarrolladores.  
- **Alternativas descartadas**:  
  - Monolítico plano → difícil de mantener y probar.  
  - Microservicios → innecesario para el alcance de la prueba técnica.  

---

## Patrones de Diseño

### Factory Pattern
- **Uso**: Selección entre servicio de IA real (OpenAI) o Mock.  
- **Motivación**: Permitir desarrollo y pruebas sin depender de un proveedor externo.  

### Singleton Pattern
- **Aplicado en**:  
  - Redis (conexión única).  
  - Prisma (conexión DB única).  
  - Logger (instancia compartida).  
- **Ventaja**: Evitar múltiples conexiones y manejar estado global de forma consistente.  

### Custom Errors
- Errores específicos del dominio (ej. `NotFoundError`, `TooManyRequestsError`).  
- Mensajes más descriptivos y logging contextualizado.  
- Facilita debugging y soporte.  

---

## Backend

### Prisma + PostgreSQL
- **Razones**:  
  - Type safety con TypeScript.  
  - Migraciones automáticas y versionadas.  
  - Comunidad amplia y documentación sólida.  

### Redis como Cache
- **Valor agregado**:  
  - Respuestas hasta 100x más rápidas.  
  - Reducción de carga en PostgreSQL.  

---

## Frontend

### Next.js + Server Actions
- **Ventajas**:  
  - Mutaciones directas desde componentes.  
  - Type safety end-to-end.  
  - Menos boilerplate comparado con API calls tradicionales.  

### ShadCN UI
- **Razones**:  
  - Componentes accesibles y listos para producción.  
  - Customización sencilla con Tailwind.  
  - Diseño responsive incluido.  
  - Balance entre simplicidad y flexibilidad.  

---

## Infraestructura

### Docker Compose (local)
- Entorno consistente entre desarrolladores.  
- Configuración simple de dependencias (Postgres, Redis).  

### Vercel (frontend) + Railway (backend)
- **Frontend en Vercel**: optimizado para Next.js, deploys rápidos.  
- **Backend en Railway**: facilidad para Node.js + DBs.  
- Beneficios:  
  - Deploys automáticos desde GitHub.  
  - Monitoring integrado.  
  - Plan free tier suficiente para la prueba técnica.  

---

## DevOps

### GitHub Actions
- Integración nativa con GitHub.  
- Ejecución de lint y build antes del deploy.  
- Despliegue automático en Vercel/Railway si pasa el pipeline.  

---

## Consecuencias

### Positivas
- Código más organizado y fácil de mantener.  
- Pruebas más simples y desarrollo más ágil.  
- Escalabilidad futura (modularidad).  
- Deploys automáticos y reproducibles.  

### Negativas / Limitaciones
- Redis es opcional pero añade complejidad.  
- La integración con OpenAI depende de presupuesto y cuota.  
- Railway tiene limitaciones en su free tier (CPU/tiempo).  
