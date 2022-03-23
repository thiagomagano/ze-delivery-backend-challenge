const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//Carregando Variaveis de ambiente
dotenv.config({ path: './src/config/.env' });

//Conectando Banco de dados
connectDB();

const app = express();

//Body parser
app.use(express.json())

//Rotas

app.use('/api/v1', require('./routes/partners'))

//Subindo Servidor
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server runnning in ${process.env.NODE_ENV} in http://localhost:${PORT}`))
