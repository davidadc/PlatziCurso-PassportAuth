const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const cookieParser = require('cookie-parser');
const axios = require('axios');

const { config } = require('./config');

const app = express();

// Body Parser
app.use(express.json());
app.use(cookieParser());

// Basic Strategy
require('./utils/auth/strategies/basic');

app.post('/auth/sign-in', async function (req, res, next) {
  passport.authenticate('basic', function (error, data) {
    try {
      if (error || !data) {
        next(boom.unauthorized());
      }

      req.login(data, { session: false }, async function (error) {
        if (error) {
          next(error);
        }

        const { token, ...user } = data;

        res.cookie('token', token, {
          httpOnly: !config.dev,
          secure: !config.dev,
        });

        res.status(200).json(user);
      })(req, res, next);
    } catch (error) {
      next(error);
    }
  });
});

app.post('/auth/sign-up', async function (req, res, next) {
  const { body: user } = req;

  try {
    const { data, status } = await axios({
      url: `${config.apiUrl}/api/auth/sign-up`,
      method: 'post',
      data: user,
    });

    res.status(201).json({ message: 'User created.' });
  } catch (error) {
    next(error);
  }
});

app.get('/movies', async function (req, res, next) {});

app.post('/user-movies', async function (req, res, next) {});

app.delete('/user-movies/:userMovieId', async function (req, res, next) {});

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
