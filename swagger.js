/**
 * @swagger
 * definitions:
 *   Todo:
 *     properties:
 *       title:
 *         type: string
 *         description: The title of the todo
 *       description:
 *         type: string
 *         description: The description of the todo
 *       done:
 *         type: boolean
 *         description: Whether the todo is done or not
 */
/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos
 *     responses:
 *       200:
 *         description: Successful response with an array of todos
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Todo'
 *   post:
 *     summary: Create a new todo
 *     parameters:
 *       - in: body
 *         name: todo
 *         description: The todo to create
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Todo'
 *     responses:
 *       200:
 *         description: Successful response with the created todo
 *         schema:
 *           $ref: '#/definitions/Todo'
 */

// Этот файл используется Swagger для генерации документации
