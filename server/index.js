require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index');
const fileUpload = require('express-fileupload');
const path = require('path');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const https = require('https');
const fs = require('fs');

const PORT = process.env.PORT || 5000;

const app = express();

// Настройка CORS
const corsOptions = {
    origin: ['https://aliot-shop.ru', 'http://aliot-shop.ru'], // Добавьте здесь дополнительные разрешенные источники, если нужно
    methods: "GET, PUT, PATCH, POST, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization, X-Requested-With",
    credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));

app.use('/api', router);
app.use(errorHandler); // Обработка ошибок, последний Middleware

const sslOptions = {
    key: fs.readFileSync('/var/www/private/aliot-shop.ru.key'),
    cert: fs.readFileSync('/var/www/certs/aliot-shop.ru.pub')
};

const httpsServer = https.createServer(sslOptions, app);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        httpsServer.listen(PORT, () => console.log(`Server started on HTTPS port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();