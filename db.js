const { Model, knexSnakeCaseMappers } = require('objection');

const db = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'turing',
    },
    pool: {
        min: 0,
        max: 10
    },
    ...knexSnakeCaseMappers()
});

Model.knex(db);

module.exports = db;