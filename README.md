# Backend API — Gestión de Tarjetas de Crédito

Este proyecto es un backend desarrollado con **Node.js**, **Express** y **Firebase Realtime Database** para almacenar, consultar, actualizar y eliminar información de tarjetas de crédito.

El servidor expone un conjunto de endpoints REST que permiten gestionar tarjetas enviadas desde un cliente frontend.

---

## 🚀 Tecnologías utilizadas

- **Node.js**
- **Express.js**
- **Firebase Admin SDK** (Realtime Database)
- **CORS**
- **dotenv** (para variables de entorno)

---

## 📁 Configuración del entorno

Este backend utiliza variables de entorno para configurar las credenciales del servicio de Firebase.

Cree un archivo `.env` en la raíz del proyecto con las siguientes claves:

```
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=xxxxx
FIREBASE_PRIVATE_KEY_ID=xxxxx
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nXXXXXX\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=xxxxx
FIREBASE_CLIENT_ID=xxxxx
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=xxxxx
FIREBASE_CLIENT_X509_CERT_URL=xxxxx
FIREBASE_UNIVERSE_DOMAIN=googleapis.com
```

Asegúrese de reemplazar los valores con sus datos reales generados desde Firebase.

---

## ▶️ Cómo ejecutar el proyecto

1. Instalar dependencias:

```bash
npm install
```

2. Iniciar el servidor:

```bash
npm start
```

El backend correrá en:

```
http://localhost:3001
```

---

## 🔥 Endpoints disponibles

### 📌 **1. Crear tarjeta**

**POST** `/create-card`

**Body esperado:**

```json
{
  "id": "123456",
  "cardName": "Juan Perez",
  "cardNumber": "4111111111111111",
  "expirationDate": "12/24",
  "cvvNumber": "123"
}
```

**Respuesta exitosa:**

```json
{ "message": "Credit Card created successfully" }
```

---

### 📌 **2. Obtener tarjeta por ID**

**GET** `/get-card/:id`

**Respuesta exitosa:**

```json
{
  "cardName": "Juan Perez",
  "cardNumber": "4111111111111111",
  "expirationDate": "12/24",
  "cvvNumber": "123"
}
```

Si no existe:

```json
{ "message": "Credit Card not found" }
```

---

### 📌 **3. Obtener todas las tarjetas**

**GET** `/get-cards`

**Respuesta exitosa:**

```json
[
  {
    "id": "123456",
    "cardName": "Juan Perez",
    "cardNumber": "4111111111111111",
    "expirationDate": "12/24",
    "cvvNumber": "123"
  },
  ...
]
```

---

### 📌 **4. Actualizar tarjeta**

**POST** `/update-card/:id`

**Body:**

```json
{
  "cardName": "Nuevo Nombre",
  "cardNumber": "4222222222222222",
  "expirationDate": "10/25",
  "cvvNumber": "555"
}
```

**Respuesta:**

```json
{ "message": "Credit Card updated successfully" }
```

---

### 📌 **5. Eliminar tarjeta**

**POST** `/delete-card/:id`

**Respuesta:**

```json
{ "message": "Credit Card deleted successfully" }
```

---

## 🗄️ Estructura en Firebase

Las tarjetas se almacenan bajo el nodo:

```
cards/{id}
```

Ejemplo:

```json
{
  "cards": {
    "123456": {
      "cardName": "Juan Perez",
      "cardNumber": "4111111111111111",
      "expirationDate": "12/24",
      "cvvNumber": "123"
    }
  }
}
```

---

## 📘 Notas importantes

- El backend asume que el frontend envía un `id` único para cada tarjeta.
- El servidor utiliza `express.json()` para leer cuerpos JSON.
- El proyecto puede ampliarse fácilmente con autenticación o validaciones adicionales.

---
