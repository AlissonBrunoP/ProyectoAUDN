const knex = require("knex")({
    client: "pg",
    connection: {
        host: "database-1.crai5lewke8u.us-east-2.rds.amazonaws.com",
        port: 5432,
        user: "postgres",
        password: process.env.DB_PASSWORD,
        database: "postgres",
    },
});

module.exports = knex;