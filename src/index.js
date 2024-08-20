const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/auth-route');
const profileRoute = require('./routes/profile-route');
const taskRoute = require('./routes/task-route');
const proyekRoute = require('./routes/proyek-route');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    const name = process.env.NAME || 'Ady Firdaus';
    res.send(`Technical Test API MSIB SEAL - ${name}!`);
});
app.use('/api/v1', authRoute);
app.use('/api/v1', profileRoute);
app.use('/api/v1', taskRoute);
app.use('/api/v1', proyekRoute);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger-output.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = parseInt(process.env.PORT || '3000');
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

module.exports = app;