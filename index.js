const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db');


const app = express();

connectDB();
const optionsCors = {
    origin: process.env.FRONTEND_URL,
}
app.use(cors(optionsCors));

const PORT = process.env.PORT || 4000;
app.use(express.json());

app.use(express.static('uploads'));

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/enlaces', require('./routes/enlaces'));
app.use('/api/archivos', require('./routes/archivos'));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started on port ${PORT}`);
});