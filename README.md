# Proyecto 1 Topicos de Telematica
By: Pablo Cano --- pcanogo@eafit.edu.co

## 1.Descripción
BlogTing es una aplicación tipo blog donde los usuarios puden escribir sus propios articulos


## 2.Analisis
### 2.1 Requisitos Funcionales
1. Crear Cuenta e ingresar a la pagina.
2. Crear Blogpost cuando uno este ingresado en la pagina.
3. Comentar en los post solo si esta metido en su cuenta.
4. Buscar post por su titulo.
5. Mostrar todoso los blogsposts actualmente en la base de datos
### 2.2 Tecnologías de Desarrollo y Ejecución
* Lenguaje de Programación: Javascript
* Framework Web Backend: NodeJS - Express
* Base de Datos: MongoDB
* Web App Server: NodeJS Referenciado
* Web Server: NGINX
### 2.3 Ambientes de Desarrollo, Pruebas y Producción
#### 2.3.1 Desarrollo
  * Sistema Operativo: MacOS Sierra 
  * Lenguaje de Programación: Javascript
  * Framework Web Backend: Node.js 8.2.1 -- Express.js 4.15.2
  * Web App Server: Referenciado
  * Base de Datos: MongoDB 3.4.6
  * Editor: Sublime Text 3
#### 2.3.2 Pruebas
  DCA:
  * Sistema Operativo: Linux Centos 7.1
  * Lenguaje de Programación: Javascript
  * Framework web Backend: Node.js 8.2.1 -- Express.js 4.15.2
  * Framework web Frontend: --
  * Web App Server: Referenciado
  * Web Server: NGINX
  * Link: 10.131.137.204 
  * Base de Datos: MongoDB 3.4.6
  La versión de node se manejó con nvm a la versión actual que es 8.2.1
#### 2.3.3 Producción
  * Proveedores: Heroku MongoLab
  * Link: https://frozen-gorge-34663.herokuapp.com/
  * Lenguaje de Programación: Javascript
  * Framework web Backend: Node.js 8.2.1 -- Express.js 4.15.2
  * Web App Server: Referenciado
  * Web Server: NGINX
  * Base de Datos: MongoDB 3.2.1
  
## 3.Diseño
### 3.1 Modelo de Datos
    
    Blogpost: {
       name: String,
       image: String,
       description: String,
       created: {type: Date, default: Date.now},
       author: {
          id: {
             type: mongoose.Schema.Types.ObjectId,
             ref: "User"
          },
          username: String
       },
       comments: [
          {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Comment"
          }
       ]
    }

    Comment = {
        text: String,
        author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: String
        }
    }

    User: {
        username: String,
        password: String
    }
    
### 3.2 Servicios Web

    /* URI: /
      METODO: GET
      Servicio Web: Muestra el home de la pagina.
      */
    /* URI: /users
      METODO: GET
      Servicio Web: Respuesta de prueba.
      */
    /* URI: /users
      METODO: POST
      Servicio Web: Crea un nuevo usuario.
      */
    /* URI: /users/new
      METODO: GET
      Servicio Web: Muestra el formulario para crear un nuevo usuario.
      */
    /* URI: /users/login
      METODO: GET
      Servicio Web: Devuelve el formulario para ingresar a la pagina con una cuenta ya creada.
      */
    /* URI: /users/login
      METODO: POST
      Servicio Web: Ingresar el usuario a la plataforma.
      */
    /* URI: /users/logout
      METODO: GET
      Servicio Web: Hace un log out del usuario.
      */
    /* URI: /blogposts
      METODO: GET
      Servicio Web: Muestra todos los blogposts.
      */
    /* URI: /blogposts
      METODO: POST
      Servicio Web: Crea un nuevo blogpost en la base de datos si el usuario tiene sesion activa.
      */
    /* URI: /blogposts/new
      METODO: GET
      Servicio Web: Formulario para agregar un blogpost si el usuario tiene sesion activa.
    /* URI: /blogposts/:id
      METODO: GET
      Servicio Web: Muestra el blogpost seleccionado y los comentarios que tenga.
      */
    /* URI: /blogposts/:id/edit
      Servicio Web: Formulario para editar un blogpost si pertenece a la cuenta inciada.
      */
    /* URI: /blogposts/:id
      METODO: PUT
      Servicio Web: Actualiza el blogpost si pertenece a la cuenta inciada.
      */
    /* URI: /blogposts/:id
      METODO: DELETE
      Servicio Web: Elimina el blogpost seleccionado si pertenece a la cuenta inciada.
      */
    /* URI: /blogposts/:id/comments
      METODO: POST
      Servicio Web: Crea un nuevo comentario asociado al usuario loggeado.
      */
    /* URI: blogposts/:id/comments/new
      METODO: GET
      Servicio Web: Formulario para adicionar un nuevo comentario.
      */
    /* URI: /blogposts/:id/:comment_id/edit
      METODO: GET
      Servicio Web: Formulario para editar un comentario si pertenece a la cuenta inciada.
      */
    /* URI: /blogposts/:id/:comment_id
      METODO: PUT
      Servicio Web: Edita el comentario seleccionado si pertenece a la cuenta inciada.
      */
    /* URI: /blogposts/:id/:comment_id
      METODO: DELETE
      Servicio Web: Elimina el comentario seleccionado si pertenece a la cuenta inciada.
      */

