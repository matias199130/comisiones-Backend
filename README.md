## Documentación de la API

###  Introducción

  
Esta documentación describe las rutas de la API del backend para gestionar proyectos y usuarios. La autenticación se realiza mediante tokens JWT, y los permisos para cada operación se gestionan a través de middleware específico.

#### Rutas de la API

### 1.   Autenticación

 Ruta para Iniciar Sesión
- **Método**: `POST`
- **Ruta**: `/api/login`
- **Descripción**: Autentica al usuario y devuelve un token JWT.
- **Cuerpo de Solicitud**:
 
 ```
  {
   "documento": "Número de Documento"
 }
```
 

**Respuesta Exitosa**:

 ```
 {  
 "token": "Token JWT"  
}
 ```

**Errores Comunes**:

*   `401 Unauthorized` - Credenciales inválidas.
*   `500 Internal Server Error` - Error en el proceso de autenticación.

### 2. Proyectos

#### Obtener Todos los Proyectos

*   **Ruta**: `/api/projects`
*   **Método**: `GET`
*   **Descripción**: Obtiene una lista de todos los proyectos.
*   **Autenticación Requerida**: Sí (cualquier usuario autenticado)
*   **Headers Requeridos**:
    *   `Authorization: Bearer <token>`
*   **Respuesta Exitosa**:

     ```
    [
     {  
       "id": "ID",  
       "nombre": "Nombre del Proyecto",  
       "descripcion": "Descripción",  
       "fechaInicio": "Fecha de Inicio",  
       "fechaFin": "Fecha de Fin",  
       "estado": "Estado"  
     }
    ]
     ```

    **Errores Comunes**:

    *   `500 Internal Server Error` - Error al obtener proyectos.
   
   #### Obtener Proyecto Específico
    
*   **Ruta**: `/api/projects/:id`
*   **Método**: `GET`
*   **Descripción**: Obtiene un proyecto específico por ID.
*   **Autenticación Requerida**: Sí (cualquier usuario autenticado)
*   **Headers Requeridos**:
    
       `Authorization: Bearer <token>`
        
*   **Respuesta Exitosa**:

    ```   {
     "id": "ID",
     "nombre": "Nombre del Proyecto",
     "descripcion": "Descripción",
     "fechaInicio": "Fecha de Inicio",
     "fechaFin": "Fecha de Fin",
     "estado": "Estado"
    } 
      ```


    **Errores Comunes**:

    *   `404 Not Found` - Proyecto no encontrado.
    *   `500 Internal Server Error` - Error al obtener el proyecto.

   #### Actualizar Proyecto
    
*   **Ruta**: `/api/projects/:id`
*   **Método**: `PUT`
*   **Descripción**: Actualiza un proyecto específico por ID.
*   **Autenticación Requerida**: Sí (solo administradores)
*   **Headers Requeridos**:
   - `Authorization: Bearer <token>`
        
*   **Cuerpo de Solicitud**:  
    
    ``` {  
     "nombre": "Nombre del Proyecto",  
     "descripcion": "Descripción",  
     "fechaInicio": "Fecha de Inicio",  
     "fechaFin": "Fecha de Fin",  
     "estado": "Estado"  
    }
     ```
    
      
    **Respuesta Exitosa**:  
    
    ```
    {  
     "message": "Proyecto actualizado con éxito"  
    }
    ```
    
      
 ###   **Errores Comunes**:
    
    *   `400 Bad Request` - Datos faltantes en la solicitud.
    *   `404 Not Found` - Proyecto no encontrado.
    *   `500 Internal Server Error` - Error al actualizar el proyecto.
        

#### Eliminar Proyecto

*   **Ruta**: `/api/projects/:id`
*   **Método**: `DELETE`
*   **Descripción**: Elimina un proyecto específico por ID.
*   **Autenticación Requerida**: Sí (solo administradores)
*   **Headers Requeridos**:
   `Authorization: Bearer <token>`
*   **Respuesta Exitosa**:

 ``` 
    {
     "message": "Proyecto eliminado con éxito"
    }
 ```
-
    **Errores Comunes**:
   *    `404 Not Found` - Proyecto no encontrado.
   *    `500 Internal Server Error` - Error al eliminar el proyecto.

  ### 3. Usuarios
    
#### Registrar un Usuario

- **URL:** `/api/users/register`
- **Método:** `POST`
- **Descripción:** Registra un nuevo usuario en el sistema.
- **Body:**

  ```json
  {
      "documento": "12345678",
      "rol": "admin"
  }


#### Obtener Usuarios
    
*   **Ruta**: `/api/users`
*   **Método**: `GET`
*   **Descripción**: Obtiene una lista de todos los usuarios.
*   **Autenticación Requerida**: Sí (solo administradores)
*   **Headers Requeridos**:
*    `Authorization: Bearer <token>`
*   **Respuesta Exitosa**:  

   ``` [  
     {  
       "id": "ID",  
       "documento": "Número de Documento",  
       "rol": "Rol"  
     }  
    ] 
   ```

*   **Respuesta Exitosa**:

```
{
    "message": "Usuario registrado exitosamente",
    "user": {
        "id": 1,
        "documento": "12345678",
        "rol": "admin"
    }
}

```

*    **Código de Respuesta**: 201 Created

*    **Obtener Todos los Usuarios**
*    **URL**: `/api/users`
*    **Método**: `GET`
*    **Descripción**: ` Obtiene una lista de todos los usuarios registrados. (Debe estar autenticado y autorizado)`


**Respuesta Exitosa**:


```
[
    {
        "id": 1,
        "documento": "12345678",
        "rol": "admin"
    },
    {
        "id": 2,
        "documento": "87654321",
        "rol": "user"
    }
]
```


**Código de Respuesta**: 200 OK


* **Proyectos**
* **Crear un Proyecto**
* **URL**: `/api/projects`
* **Método**: `POST`
* **Descripción**: `Crea un nuevo proyecto. (Debe estar autenticado y autorizado como administrador)`
* **Body**:

```
{
    "nombre_proyecto": "Nuevo Proyecto",
    "fecha_ingresada": "2024-08-28",
    "proyeccion": "HCD",
    "estado": "En progreso",
    "archivo_documento": "documento.pdf",
    "categoria_id": 1
}
```


* **Respuesta Exitosa**:


```
{
    "id": 1
}
```

*   **Código de Respuesta**: `201 Created`
*   **Obtener Proyectos por Categoría**
*   **URL**: `/api/projects/categoria/:categoria_id`
*   **Método**: `GET`
*   **Descripción**: `Obtiene todos los proyectos de una categoría específica.`

*   **Respuesta Exitosa**:


```
[
    {
        "id": 1,
        "nombre_proyecto": "Proyecto 1",
        "fecha_ingresada": "2024-08-28",
        "proyeccion": "HCD",
        "estado": "En progreso",
        "archivo_documento": "documento1.pdf",
        "categoria_id": 1
    },
    {
        "id": 2,
        "nombre_proyecto": "Proyecto 2",
        "fecha_ingresada": "2024-08-28",
        "proyeccion": "2025",
        "estado": "Finalizado",
        "archivo_documento": "documento2.pdf",
        "categoria_id": 1
    }
]
```

*    **Código de Respuesta**: 200 OK

*    **Errores Comunes**:
     `403 Forbidden` - No tiene permisos para acceder a esta ruta.
     `500 Internal Server Error` - Error al obtener usuarios.

  **Nota**: Asegúrate de reemplazar `<token>` en los encabezados de las solicitudes con un token JWT válido obtenido durante la autenticación.