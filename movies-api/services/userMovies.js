const MongoLib = require('../lib/mongo');

class UserMoviesService {
  constructor() {
    this.collection = 'user-movies';
    this.mongoDB = new MongoLib();
  }

  async getUserMovies({ userId }) {
    const query = userId && { userId };
    const userMovies = await this.mongoDB.getAll(this.collection, query);

    return userMovies || [];
  }

  async createUserMovie({ userMovie }) {
    return await this.mongoDB.create(this.collection, userMovie);
  }

  async deleteUserMovie({ userMovieId }) {
    return await this.mongoDB.delete(this.collection, userMovieId);
  }
}

module.exports = UserMoviesService;
