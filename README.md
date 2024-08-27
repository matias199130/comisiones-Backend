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


  **Errores Comunes**:
     `403 Forbidden` - No tiene permisos para acceder a esta ruta.
     `500 Internal Server Error` - Error al obtener usuarios.

  **Nota**: Asegúrate de reemplazar `<token>` en los encabezados de las solicitudes con un token JWT válido obtenido durante la autenticación.