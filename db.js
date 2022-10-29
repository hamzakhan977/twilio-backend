const { Model, knexSnakeCaseMappers } = require('objection');

const db = require('knex')({
    client: 'pg',
    connection: {
        host: 'ec2-52-70-45-163.compute-1.amazonaws.com',
        user: 'ywizhgfyskbofw',
        password: '6b387c3d8484095a4976bed7266026e5404dfddd870f8d5b8b73e3a25a318f1e',
        database: 'ddn1nd5dpelmv3',
        port: 5432,
        ssl: { rejectUnauthorized: false },
    },
    pool: {
        min: 0,
        max: 10
    },
    ...knexSnakeCaseMappers()
});

Model.knex(db);

module.exports = db;