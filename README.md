# Blog - Proyecto final Digitalers

Proyecto final del curso Digitalers Node.js Developer.
Server-side rendering Blog con temática sobre resaña de restaurantes.

## Deploy
El proyecto se encuentra desplegado en railways: 
https://blog-gastronomico-digitalers.up.railway.app/

## Herramientas principales utilizadas:
- Handlebars
- Estilos: Bootstrap y Bootswatch Litera.
- Javascript

## Pasos para arrancar el proyecto

1. Ejecuta `npm init` para descargar las dependencias del proyecto.
2. Renombrar el .env.example y colocar lo datos personales.
3. Levantar el servidor dev, ejecutando `npm run dev`.

## Endpoints
-    Home:
    - GET Home page - GET http://localhost:3000/ 
-   Post:
    - GET all posts - http://localhost:3000/posts
    - GET one post by its slug - http://localhost:3000/posts/:slug
    - GET all the posts that contain the value of the input search - http://localhost:3000/posts/search
    - GET a form to create a post - http://localhost:3000/posts/new
    - GET a form to edit a post - http://localhost:3000/posts/edit/:id
    - POST, create one post - http://localhost:3000/posts
    - PUT, edit one post - http://localhost:3000/posts/:id
    - DELETE, delete one post - http://localhost:3000/posts/:id
-   Auth:
    - GET a form to Sign up - http://localhost:3000/auth/signup
    - GET a form to Sign in - http://localhost:3000/auth/signin
    - GET, log out user - http://localhost:3000/auth/logout
    - GET user posts - http://localhost:3000/auth/:user
-   category:
    - GET all categories - http://localhost:3000/category
    - GET all posts by its category - http://localhost:3000/category/:slug

## Librerias utilizadas:
- mongoose: librería que utiliza un ODM para realizar consultas a una base de datos MongoDB.
- dotenv: para manejar tus variables de entorno.
- express-handlebars: para configurar el motor de plantillas handlebars.
- bcrypt: para hashear las contraseñas de los usuarios.
- express-session: para crear y administrar un middleware de sesión.
- connect-flash: para almacenar los mensajes de las sesiones.
- DOMPurify: para sanitizar el cuerpo de los posts anters de guardarlos en la DB.
- jsdom: para poder utilizar DOMPurify, el cual require de la API DOM.
- joi: para realizar validaciones de los datos ingresador por el usuario.
- method-override: generar peticiones PUT y DELETE utilizando formularios.
- multer: middleware para manipular multipart/form-data cuando tus usuarios suben archivos.
- sharp: procesador de imagenes, para redimensionar las imagenes que ingresa el usuario y modificar su formato.
- passport: crear middleware para implementar estrategias de autenticación.
- passport-local: estrategia para autenticarse con un nombre de usuario y contraseña.
- slugify: crear un slug a partir de un texto.

