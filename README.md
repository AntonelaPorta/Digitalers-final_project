# Blog - Proyecto final Digitalers

Proyecto final del curso Digitalers Node.js Developer.
Server-side rendering Blog con tematica sobre resaña para restaurantes.

## Herramientas principales utilizadas:
- Handlebars
- Estilos: Boostrap y Bootswatch Litera.
- NodeJS

## Pasos para arrancar el proyecto

1. Ejecuta `npm init` para descargar las dependencias del proyecto.
2. Renombrar el .env.example y colocar lo datos personales.
3. Levantar el servidor dev, ejecutando `npm run dev`.

## Endpoints
-   [ ] Home:
    - GET Home page - GET http://localhost:3000/ 
-   [ ] Post:
    - GET all posts - http://localhost:3000/posts
    - GET one post by its slug - http://localhost:3000/posts/:slug
    - GET all the posts that contain the value of the input search - http://localhost:3000/posts/search
    - GET a form to create a post - http://localhost:3000/posts/new
    - GET a form to edit a post - http://localhost:3000/posts/edit/:id
    - POST, create one post - http://localhost:3000/posts
    - PUT, edit one post - http://localhost:3000/posts/:id
    - DELETE, delete one post - http://localhost:3000/posts/:id
-   [ ] Auth:
    - GET a form to Sign up - http://localhost:3000/auth/signup
    - GET a form to Sign in - http://localhost:3000/auth/signin
    - GET, log out user - http://localhost:3000/auth/logout
    - POST, log out user - http://localhost:3000/auth/logout



