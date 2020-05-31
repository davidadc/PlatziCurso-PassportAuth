const assert = require('assert');
const proxyquire = require('proxyquire');

const { moviesMock, MoviesServiceMock } = require('../utils/mocks/movies');
const testServer = require('../utils/testServer');

describe('routes - movies', function() {
  const route = proxyquire('../routes/movies', {
    '../services/movies': MoviesServiceMock
  });

  const request = testServer(route);
  const BASE_URL = '/api/movies';
  const movieId = '5e24b99f78e0751fc072ff8d';

  describe('GET /movies', function() {
    it('should respond with status 200', function(done) {
      request.get(BASE_URL).expect(200, done);
    });

    it('should respond with the list of movies', function(done) {
      request.get(BASE_URL).end((err, res) => {
        assert.deepEqual(res.body, {
          data: moviesMock,
          message: 'Movies listed'
        });

        done();
      });
    });
  });

  describe('GET /movies/:movieId', function() {
    it('should respond with status 200', function(done) {
      request.get(`${BASE_URL}/${movieId}`).expect(200, done);
    });

    it('should respond with the object of the movie retrieved', function(done) {
      request.get(`${BASE_URL}/${movieId}`).end((err, res) => {
        assert.deepEqual(res.body, {
          data: moviesMock[1],
          message: 'Movie retrieved'
        });

        done();
      });
    });
  });

  describe('POST /movies', function() {
    it('should respond with status 201', function(done) {
      request.post(BASE_URL).expect(201, done);
    });

    it('should respond with the id of the movie created', function(done) {
      request.post(BASE_URL).end((err, res) => {
        assert.deepEqual(res.body, {
          data: movieId,
          message: 'Movie created'
        });
      });

      done();
    });
  });

  describe('PUT /movies/:movieId', function() {
    it('should respond with status 200', function(done) {
      request.put(`${BASE_URL}/${movieId}`).expect(200, done);
    });

    it('should respond with the id of the movie updated', function(done) {
      request.put(`${BASE_URL}/${movieId}`).end((err, res) => {
        assert.deepEqual(res.body, {
          data: movieId,
          message: 'Movie updated'
        });
      });

      done();
    });
  });

  describe('PATCH /movies/:movieId', function() {
    it('should respond with status 200', function(done) {
      request.patch(`${BASE_URL}/${movieId}`).expect(200, done);
    });

    it('should respond with the id of the movie patched', function(done) {
      request.patch(`${BASE_URL}/${movieId}`).end((err, res) => {
        assert.deepEqual(res.body, {
          data: movieId,
          message: 'Movie patched'
        });
      });

      done();
    });
  });

  describe('DELETE /movies/:movieId', function() {
    it('should respond with status 200', function(done) {
      request.delete(`${BASE_URL}/${movieId}`).expect(200, done);
    });

    it('should respond with the id of the movie deleted', function(done) {
      request.delete(`${BASE_URL}/${movieId}`).end((err, res) => {
        assert.deepEqual(res.body, {
          data: movieId,
          message: 'Movie deleted'
        });
      });

      done();
    });
  });
});
