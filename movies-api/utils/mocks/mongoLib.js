const sinon = require('sinon');

const { moviesMock, filteredMoviesMock } = require('./movies');

const getAllStub = sinon.stub();
getAllStub.withArgs('movies').resolves(moviesMock);

const tagQuery = { tags: { $in: ['Drama'] } };
getAllStub.withArgs('movies', tagQuery).resolves(filteredMoviesMock('Drama'));

const getOneStub = sinon.stub().resolves(moviesMock[1]);

const getIdStub = sinon.stub().resolves(moviesMock[1].id);

class MongoLibMock {
  getAll(collection, query) {
    return getAllStub(collection, query);
  }

  get(collection, id) {
    return getOneStub(collection, id);
  }

  create(collection, data) {
    return getIdStub(collection, data);
  }

  update(collection, id, data) {
    return getIdStub(collection, id, data);
  }

  delete(collection, id) {
    return getIdStub(collection, id);
  }
}

module.exports = {
  getAllStub,
  getOneStub,
  getIdStub,
  MongoLibMock
};
