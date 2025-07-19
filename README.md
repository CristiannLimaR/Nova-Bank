# 🏦 Nova-Bank – Frontend

Este es el frontend del proyecto **Nova Bank**, una plataforma web que permite a los usuarios gestionar cuentas bancarias, realizar transacciones y consultar su historial financiero de manera segura e intuitiva.

## ✨ Funcionalidades principales

- Registro e inicio de sesión de usuarios
- Creación y gestión de cuentas bancarias (ahorro y corriente)
- Realización de transacciones: depósitos, retiros y transferencias
- Visualización de historial de movimientos por cuenta
- Sistema de autenticación con roles (usuario y administrador)
- Implementación de **autenticación en dos factores (2FA)** para mayor seguridad al realizar transacciones o transferencias
- Interfaz moderna, responsiva y enfocada en la experiencia del cliente

## 🛠️ Tecnologías utilizadas

- **Frontend:** React.js + Tailwind CSS + ShadCN UI  
- **Backend:** Node.js + Express.js  
- **Base de datos:** MongoDB  
- **API REST:** Axios para llamadas al backend  
- **Control de versiones:** Git & GitHub

> Stack utilizado: **MERN (MongoDB, Express.js, React, Node.js)**

## 🔐 Seguridad

- Uso de tokens JWT para autenticación
- Validación de roles para proteger rutas sensibles
- **2FA (Two-Factor Authentication)** al realizar operaciones críticas como transferencias o retiros, mediante código enviado por correo electrónico o aplicación de autenticación

## 🔗 Backend

Este frontend se comunica con el backend desarrollado con Node.js y Express:  
👉 [Repositorio Backend](https://github.com/SantiagoContreras1/Bank-System)
