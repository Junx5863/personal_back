/**
 * @swagger
 * paths:
 *  /api/v1/session/login:
 *    post:
 *      tags:
 *        - Authentication
 *      requestBody:
 *        description: Inicio de sesión por email y contraseña
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  description: Email del usuario
 *                  example: "prueba1@gmail.com"
 *                  required: true
 *                password:
 *                  type: string
 *                  description: Contraseña del usuario
 *                  example: "123456"
 *                  required: true
 *      responses:
 *        '200':
 *          description: Inicio de sesión exitoso
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 *                    description: Token de autenticación
 *                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
 *        '400':
 *          description: Datos incorrectos
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: string
 *                    description: Error
 *                    example: "Datos incorrectos"
 *  
 *  
 *  /api/v1/session/register:
 *       post:
 *         tags:
 *           - Authentication
 *         summary: Registra un nuevo usuario
 *         requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   first_name:
 *                     type: string
 *                     example: John
 *                   last_name:
 *                     type: string
 *                     example: Doe
 *                   age:
 *                     type: integer
 *                     example: 30
 *                   email:
 *                     type: string
 *                     example: john.doe@example.com
 *                   password:
 *                     type: string
 *                     example: password123
 *                   role:
 *                     type: string
 *                     example: admin - client
 *         responses:
 *           '201':
 *             description: Usuario registrado exitosamente
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         first_name:
 *                           type: string
 *                         last_name:
 *                           type: string
 *                         age:
 *                           type: integer
 *                         email:
 *                           type: string
 *                         role:
 *                           type: string
 *           '400':
 *             description: Error en la solicitud
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: Error creating user
 */
