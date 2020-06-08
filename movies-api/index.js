const express = require('express');
const helmet = require('helmet');
const app = express();

const { config } = require('./config/index');

const authApi = require('./routes/auth');
const moviesApi = require('./routes/movies');
const userMoviesApi = require('./routes/userMovies');

const {
  logErrors,
  errorHandler,
  wrapErrors
} = require('./utils/middlewares/errorHandler');

const notFoundHandler = require('./utils/middlewares/notFoundHandler');

// body parser - middleware
app.use(express.json());
app.use(helmet());

// Routes
authApi(app);
moviesApi(app);
userMoviesApi(app);

// Para capturar el error 404 se debe agregar el middleware apenas terminen las rutas
app.use(notFoundHandler);

// Middlewares manejadores de errores siempre al final de las rutas
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});
