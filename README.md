# POLI HUELLAS :dog:
El sistema web permite gestionar la publicación y adopción de mascotas rescatadas de la calle en la ciudad de Quito.

## Roles de usuario:man_office_worker:
El sistema de adopción cuenta con dos tipo de roles de usuarios:
- Rol Ciudadano
- Rol Administrador

## Anexos :page_facing_up:🎥
- [Informe Técnico](https://docs.google.com/document/d/1QQrjvp8LLsJYbu36nmvyAK4r6Og1QMJN/edit?usp=sharing&ouid=115500227898869112651&rtpof=true&sd=true)
- [Manual de usuario](#)
## Manual de instalación 	:computer:
Para la correcta instalación del proyecto se debe seguir los siguientes pasos:

1. Clonar el proyecto mediante una terminal.
```bash
git clone https://github.com/JoseLuisColcha/Poli-Huellas.git
```
2. Ubicarse en el directorio donde se clono el repositorio e instalar las dependencias.

```bash
npm install
```
3. Configurar las variables de entorno en este directorio `src/lib/firebase/client.js`.
```bash
const firebaseConfig = {
  apiKey: "[YOUR_apiKey_HERE]",
  authDomain: "[YOUR_authDomain_HERE]",
  projectId: "[YOUR_projectId_HERE]",
  storageBucket: "[YOUR_storageBucket_HERE]",
  messagingSenderId: "[YOUR_messagingSenderId_HERE]",
  appId: "[YOUR_appId_HERE]",
};
```
4. Correr el servidor con el siguiente comando.

```bash
npm run dev
```
5. Abrir [http://localhost:3000](http://localhost:3000) en el navegador y se visualizará el sistema web.
![polHuellas7](https://user-images.githubusercontent.com/66267613/189255471-7202223c-00dc-4c78-bc0b-7b8caaefeda9.gif) 
