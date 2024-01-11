const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = process.env.PORT || 3000;

// Подключение к MongoDB с использованием Mongoose
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Определение схемы и модели для MongoDB
const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  done: Boolean,
});

const TodoModel = mongoose.model('Todo', TodoSchema);

// Используем bodyParser для обработки данных из запросов
app.use(bodyParser.json());

// Определение маршрутов
app.get('/api/todos', async (req, res) => {
  try {
    // Получение всех задач из базы данных
    const todos = await TodoModel.find();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/todos', async (req, res) => {
  try {
    // Создание новой задачи
    const newTodo = await TodoModel.create(req.body);
    res.json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Swagger определение
const swaggerDefinition = {
  info: {
    title: 'Simple Todo API',
    version: '1.0.0',
    description: 'A simple REST API for managing todos',
  },
  host: `localhost:${port}`,
  basePath: '/api',
};

const options = {
  swaggerDefinition,
  apis: ['./index.js'],
};

const swaggerSpec = swaggerJSDoc(options);

// Swagger маршрут
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
