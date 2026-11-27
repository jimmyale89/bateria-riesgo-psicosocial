# 🛡️ Batería de Riesgo Psicosocial PRO

> **Plataforma Normativa & Sistema SaaS para Especialistas en Seguridad y Salud en el Trabajo (SST)**  
> Basado en la **Resolución 2646 de 2008**, **Resolución 2404 de 2019**, **Resolución 2764 de 2022** y Baremos Oficiales de la **Pontificia Universidad Javeriana** / Ministerio del Trabajo de Colombia.

---

## 📌 Descripción del Proyecto

Sistema integral para la recolección, tabulación, ponderación psicométrica oficial y generación de informes de la **Batería de Instrumentos para la Evaluación de Factores de Riesgo Psicosocial**.

Diseñado bajo arquitectura **SaaS Multi-Tenant con Sistema de Créditos**, permitiendo a psicólogos especialistas en SST adquirir bolsas de créditos y gestionar las evaluaciones de sus empresas clientes con total aislamiento, trazabilidad y cumplimiento legal.

---

## 🚀 Características Principales

### 1. 🧮 Motor Psicométrico Normativo Oficial
- **Forma A (123 ítems):** Para jefaturas, profesionales y técnicos (19 dimensiones, 4 dominios).
- **Forma B (97 ítems):** Para cargos operativos y auxiliares (16 dimensiones, 4 dominios).
- **Extralaboral (31 ítems):** 7 dimensiones con divisor estándar $124$.
- **Cuestionario de Estrés (31 síntomas):** Ponderación oficial de síntomas fisiológicos ($\times 4$), sociales ($\times 3$), intelectuales/laborales ($\times 2$) y psicoemocionales ($\times 1$) sobre factor divisor $61.16$.
- **Baremos Oficiales Javeriana:** 5 niveles de riesgo percentilares (*Sin Riesgo, Riesgo Bajo, Riesgo Medio, Riesgo Alto, Riesgo Muy Alto*).

### 2. 📊 Dashboard Analítico & Semáforos en Tiempo Real
- Semáforos de criticidad para Intralaboral (Forma A y B), Extralaboral y Estrés.
- Comparativo interactivo de los 4 grandes dominios: *Demandas del Trabajo, Control sobre el Trabajo, Liderazgo y Relaciones Sociales, Recompensas*.
- Matriz de dimensiones críticas prioritarias para el Programa de Vigilancia Epidemiológica (PVE).
- Identificación de factores protectores de la organización.
- Indicador de periodicidad legal obligatoria (Anual vs. Bianual).

### 3. 📑 Generador de Informes Oficiales
- **Informe Técnico General de Diagnóstico:** Marco normativo, caracterización sociodemográfica y ocupacional, análisis epidemiológico por dominios/dimensiones, perfil de estrés y concepto del especialista con firma y licencia SST.
- **Informe Gerencial Ejecutivo:** Resumen de impacto para la Alta Dirección, costos ocultos (ausentismo, rotación) y **Plan de Acción Priorizado en Ciclo PHVA (Planear, Hacer, Verificar, Actuar)**.
- Exportación directa a **PDF Maquetado / Impresión**.

### 4. 💳 Modelo de Negocio SaaS & Bolsa de Créditos
- Saldo de evaluaciones en tiempo real para el psicólogo consultor.
- Descuento de **1 crédito** por cada trabajador tabulado y calificado.
- Simulación de paquetes de compra (50, 150 y 500 créditos).
- Enlace web y código QR de **Auto-Diligenciamiento Digital** con Consentimiento Informado (Res. 2764/2022).

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React 19 + Vite 8
- **Estilos:** Tailwind CSS 4 + Lucide Icons
- **Motor de Cálculo:** Pure TypeScript/JavaScript Psychometric Engine
- **Manejo de Datos:** SheetJS (xlsx)

---

## 💻 Instalación y Ejecución Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/jimmyale89/bateria-riesgo-psicosocial.git

# 2. Entrar a la carpeta
cd bateria-riesgo-psicosocial

# 3. Instalar dependencias
npm install

# 4. Iniciar en modo desarrollo
npm run dev
# Abrir en el navegador: http://localhost:3000

# 5. Compilar para producción
npm run build
npm run preview
```

---

## 📜 Marco Normativo Colombiano

- **Resolución 2646 de 2008:** Establece disposiciones y define responsabilidades para la identificación, evaluación, prevención, intervención y monitoreo permanente de la exposición a factores de riesgo psicosocial en el trabajo y para la determinación del origen de las patologías causadas por el estrés ocupacional.
- **Resolución 2404 de 2019:** Adopta los instrumentos de la Batería elaborados por el Ministerio del Trabajo y la Pontificia Universidad Javeriana.
- **Resolución 2764 de 2022:** Reglamenta la aplicación digital/virtual de la Batería y las condiciones del consentimiento informado.

---

Desarrollado con dedicación para profesionales de Seguridad y Salud en el Trabajo.
