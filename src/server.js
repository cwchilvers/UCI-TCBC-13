const express = require('express');
const routes = require('../routes/router');
const sequelize = require('../config/connection');

const PORT = process.env.PORT || 3001;

const app = express();

app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});