import express from 'express';
import route from './routes/user/user.js';  // Adjust path as needed
import cors from 'cors';

const app = express();
const port = 8000;
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Use the 'user' route for handling user-related requests
app.use('/user', route);

app.listen(port, () => {
    console.log('Server running on port', port);
});
