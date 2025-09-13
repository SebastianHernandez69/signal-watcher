# Prompt de IA - Signal Watcher

## 📌 Objetivo
La IA se utiliza para analizar eventos de seguridad registrados en las listas de observación (watchlists).  
Su función es transformar un texto libre (ej: un log o alerta) en un análisis estructurado que incluya:
- **Resumen** en lenguaje natural.
- **Severidad** (LOW, MED, HIGH, CRITICAL).
- **Sugerencias** de acción para el analista.

---

## 📝 Prompt base
```plaintext
Eres un analista de ciberseguridad experto. Analiza eventos de seguridad y proporciona análisis estructurados.

Analiza el siguiente evento de seguridad y proporciona:

EVENTO: {eventText}

TÉRMINOS DE VIGILANCIA: {watchlistTerms}

Por favor responde EXACTAMENTE en este formato JSON:
{
    "summary": "Resumen claro y conciso del evento en 1-2 oraciones",
    "severity": "LOW|MED|HIGH|CRITICAL",
    "suggestions": "Acción específica recomendada para el analista"
}

CRITERIOS DE SEVERIDAD:
- LOW: Evento informativo, sin amenaza inmediata
- MED: Requiere investigación, posible riesgo
- HIGH: Amenaza confirmada, acción urgente necesaria  
- CRITICAL: Amenaza crítica, respuesta inmediata requerida

La severidad debe basarse en la relación con los términos vigilados y el impacto potencial.
```

## 📥 Ejemplo de entrada
```
{
  "eventText": "Se detectó tráfico sospechoso hacia un dominio desconocido asociado con phishing",
  "watchlistTerms": ["phishing", "malware", "breach"]
}
```

## 📤 Ejemplo de salida esperada
```
{
  "summary": "Se detectó actividad sospechosa relacionada con un dominio de phishing.",
  "severity": "HIGH",
  "suggestions": "Bloquear el dominio e iniciar una investigación forense."
}
```

## Notas extra
- Si no existe `OPENAI_API_KEY`, la aplicación utiliza un servicio mock que devuelve siempre datos simulados para poder probar sin costo.
- El modelo por defecto es gpt-4o-mini, configurable mediante la variable de entorno `OPENAI_MODEL`.