"use strict";
var dotenv = require("dotenv");
dotenv.config();
module.exports = [
    {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        entities: ['./dist/modules/**/infra/typeorm/entities/*.ts'],
        migrations: ['./dist/shared/infra/typeorm/migrations/*.ts'],
        cli: {
            migrationsDir: './src/shared/infra/typeorm/migrations',
            entitiesDir: './src/modules/**/infra/typeorm/entities/*.ts'
        },
        autoLoadEntities: true
    },
];
