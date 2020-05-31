const assert = require('assert');
const proxyquire = require('proxyquire');

const {
  MongoLibMock,
  getAllStub,
  getOneStub,
  getIdStub
} = require('../utils/mocks/mongoLib');
const { moviesMock } = require('../utils/mocks/movies');

describe('services - movies', function() {
  const MoviesServices = proxyquire('../services/movies', {
    '../lib/mongo': MongoLibMock
  });

  const moviesService = new MoviesServices();

  describe('when getMovies method is called', async function() {
    it('should call the getAll MongoLib method', async function() {
      await moviesService.getMovies({});
      assert.strictEqual(getAllStub.called, true);
    });

    it('should return an array of movies', async function() {
      const result = await moviesService.getMovies({});
      const expected = moviesMock;
      assert.deepEqual(result, expected);
    });
  });

  describe('when getMovie method is called', async function() {
    it('should call the get MongoLib method', async function() {
      await moviesService.getMovie({});
      assert.strictEqual(getOneStub.called, true);
    });

    it('should return an json with the movie searched', async function() {
      const result = await moviesService.getMovie({});
      const expected = moviesMock[1];
      assert.deepEqual(result, expected);
    });
  });

  describe('when createMovie method is called', async function() {
    it('should call the create MongoLib method', async function() {
      await moviesService.createMovie({});
      assert.strictEqual(getIdStub.called, true);
    });

    it('should return the id of the created movie', async function() {
      const result = await moviesService.createMovie({});
      const expected = moviesMock[1].id;
      assert.deepEqual(result, expected);
    });
  });

  describe('when updateMovie method is called', async function() {
    it('should call the update MongoLib method', async function() {
      await moviesService.updateMovie({});
      assert.strictEqual(getIdStub.called, true);
    });

    it('should return the id of the updated movie', async function() {
      const result = await moviesService.updateMovie({});
      const expected = moviesMock[1].id;
      assert.deepEqual(result, expected);
    });
  });

  describe('when patchMovie method is called', async function() {
    it('should call the update MongoLib method', async function() {
      await moviesService.patchMovie({});
      assert.strictEqual(getIdStub.called, true);
    });

    it('should return the id of the patched movie', async function() {
      const result = await moviesService.patchMovie({});
      const expected = moviesMock[1].id;
      assert.deepEqual(result, expected);
    });
  });

  describe('when deleteMovie method is called', async function() {
    it('should call the delete MongoLib method', async function() {
      await moviesService.deleteMovie({});
      assert.strictEqual(getIdStub.called, true);
    });

    it('should return the id of the deleted movie', async function() {
      const result = await moviesService.deleteMovie({});
      const expected = moviesMock[1].id;
      assert.deepEqual(result, expected);
    });
  });
});
