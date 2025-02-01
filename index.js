const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const UserRouter = require('./routes/users');

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
},
).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// middleweares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use('/api/users', UserRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});
