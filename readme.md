# Práctica BootWeb1 Master Keepcoding - Node 
# NODEPOP
##1: Primeros pasos - INSTALACIÓN
>Ejecutar dentro del proyecto Nodepop "npm install" para instalar todas los módulos necesarios para que funcione el proyecto.
>Se ejecuta el comando "npm run installdb" para ejecutar el fichero install_db.js. Se cargan los ficheros .json que se encuentran en la carpeta "install"
>eliminando todos los ficheros existentes en la base de datos y cargando los nuevos (lista de usuarios y anuncios).

##2. API - NODEPOP
La url de la API es **http://localhost:3002/apiv1/**

El puerto se puede cambiar en ***Nodepop/bin/www***

Hay dos zonas bien diferenciadas, la de anuncios y la de usuarios.
##2.1. Usuarios
###**POST: /apiv1/users/**
>Método **POST** para dar de alta a un nuevo usuario. Es necesario el nombre de usuario, email y clave. Esta clave será guardada en un***hash***para mayor seguridad. Para crear dicho hash se ha usado el módulo sha1.
Si el registro ha sido satisfactorio devuelve el token del usuario con una caducidad de 2 días(se puede configurar en el localConfig.js). Los campos nombre y clave son obligatorios.

-Recomendación:Usar un programa con***Postman***para poder utilizar POST :

>REQUEST -
**Body** --> **(x-www-form-urlencoded)**:***nombre***, ***email*** y ***clave*** 

>La respuesta es de tipo **JSON:** ***success*** y ***token***

###**POST: /apiv1/users/authenticate**
>Método **POST** de autenticación de usuario que precisa del email y la clave de usuario para poder obtener el token.
El token es necesario para poder acceder a la aplicación, tiene una caducidad de 2 días (se puede configurar en el archivo localConfig.json).

-Recomendación:Usar un programa con***Postman***para poder utilizar POST :

>**REQUEST**-	
>**Body** --> **(x-www-form-urlencoded)** --> ***email*** y ***clave*** 

>La respuesta es de tipo **JSON:** ***success*** y ***token***

###2.1.1. TOKEN
>Todas las llamadas a la API que necesiten autentificación, será necesario escribir un token válido. Está configurado para que se le pueda pasar como parámetro get en la url, como parte del body o como un header con el nombre "x-access-token"

##2.2. Anuncios
Para utilizar todos los métodos recogidos en anuncios se necesita la autentificación mediante un token. Para ello se necesita crear un usuario o identificarte como un usuario ya registrado y obtener el token.

###**GET: /apiv1/anuncios**

>Este método **GET** devuelve todos los anuncios de la base de datos. Se pueden filtrar y hacer más selecciones. Los parámetros se pueden utilizar en conjunto o individuales.

**Request params:**

- **nombre**: se filtra por la propiedad nombre. Se devolverán todos los que coincidan por el valor escrito o por el comiezo del mismo.
- **venta**: puede tener sólo dos valores: "true" o "false". Crea un filtro para los anuncios "a la venta"=true o "se busca"=false.
- **precio**: rango de precio (min o max). Puede tener estas representaciones para el filtro deseado --> ***precio1-precio2***: buscará anuncios con precio incluido entre precio1 y precio2. ***precio1-***: buscará los que tengan mayor precio que precio1. ***-precio1***: buscará los que tengan precio menos que precio1.
 ***precio1***: buscará los que tengan precio igual a precio1.
- **tag**:  filtro que devolverá todos los anuncios que contengan al menos un valor que contenga el tag buscado.
- **sort**: parámetro que permite que el resultado se muestre de forma ordenada de forma ascendente por ejemplo***sort: precio***. Para que se muestre de forma descendente sería ***sort:-precio***.
- **limit**: parámetro (número) que permite limitar el número de registros de que se quiere obtener.
- **skip**: este parámetro (número) desplaza el número de registro que se le indique.


>La respuesta es de tipo **JSON:** ***success*** y ***anuncios***

###**GET: /apiv1/anuncios/tags** 

>Este método GET devuelve todos los tags activos en todos los anuncios de la base de datos. No hay registros repetidos.


>La respuesta es de tipo **JSON:** ***success***y***tags***

###**POST: /apiv1/anuncios/** 

>Este método **POST** requiere del nombre, de si esta en venta o no (true o false), del precio, de una foto, y de una lista de tags para crear el anuncio. 
Si se ha creado bien el anuncio creado. **Solo el nombre es obligatorio**

>**REQUEST**-**BODY-->(x-www-form-urlencoded):** **nombre** - **venta** - **precio** - **foto** - **tags**

>La respuesta es de tipo **JSON:** ***success*** y ***anuncio***

###**PUT: /apiv1/anuncios/:id** 
El _id se tiene que buscar haciendo un GET de anuncios. Mongo lo crea automaticamente y es único para cada registro que se cree.

>Este método **PUT** sirve para modificar un registro creado con anterioridad. Requiere del nombre, de si esta en venta o no (true o false), del precio, de una foto, y de una lista de tags para crear el anuncio.
Si todo está correcto devuelve la respuesta de satisfactorio y cuantos elementos se han modificado.
**Solo el nombre es obligatorio**.

>**REQUEST**-**BODY --> (x-www-form-urlencoded):** **nombre** - **venta** - **precio** - **foto** - **tags**


>La respuesta es de tipo **JSON:** ***success*** y ***response***

###**DELETE: /apiv1/anuncios/:id** 

El _id se tiene que buscar haciendo un GET de anuncios. Mongo lo crea automaticamente y es único para cada registro que se cree.

>Este método **DELETE** requiere del id para encontrar el anuncio y eliminarlo. 
Si se ha eliminado devuelve una respuesta de satisfactorio y cuantos elementos se han eliminado.
**Solo el nombre es obligatorio**.

>La respuesta es de tipo **JSON:** ***success*** y ***token***

##3. BASE de DATOS
>Se ha utilizado Mongo DB como base de datos no relacional y se usa mongoose para modelar los datos de la aplicación.


##4. Cluster
>Se ha añadido el control del cluster para mejorar el rendimiento de la aplicación en el servidor. Hay una mejora considerable ya recoge cuantos cores tiene la máquina donde se esta el servido aprovechando el máximo sus recursos.