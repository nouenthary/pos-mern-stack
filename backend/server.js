const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.use('/api/users', require('./routes/users'));

app.listen(5000, () => console.log('Server running on port 5000'));
