import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the user.json file
const userFilePath = path.join(__dirname, '../../UserData/user.json');

// Helper functions to read and write from user.json
const readUsersFromFile = async () => {
    try {
        const data = await fs.readFile(userFilePath, 'utf-8');

        // Check if the file is empty and return an empty array if so
        if (!data) {
            return [];
        }

        // Parse the data if it's not empty
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // If file doesn't exist, return an empty array
            return [];
        } else {
            throw error; // Re-throw other errors (e.g., syntax errors)
        }
    }
};

const writeUsersToFile = async (users) => {
    try {
        await fs.writeFile(userFilePath, JSON.stringify(users, null, 2), 'utf-8');
    } catch (error) {
        throw new Error('Error writing to file');
    }
};

// Controller for signup
export const signup = async (req, res) => {
    try {
        console.log('Signup details---', req.body);

        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        // Read users from the file
        const users = await readUsersFromFile();

        // Check if user already exists
        const userExists = users.find(user => user.email === email);
        if (userExists) {
            return res.status(400).json({
                status: 409,
                message: "User already exists in the database."
            });
        }

        // If user doesn't exist, add them to the file
        users.push({ email, password });
        await writeUsersToFile(users);

        res.status(201).json({
            status: 201,
            message: 'User signed up successfully!'
        });

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message || 'Something went wrong during signup.'
        });
    }
};

// Controller for login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ status: 400, message: 'Email and password are required.' });
        }

        // Read users from the file
        const users = await readUsersFromFile();

        // Check if user exists and password matches
        const user = users.find(user => user.email === email && user.password === password);
        if (!user) {
            return res.status(400).json({ status: 400, message: 'Invalid email or password.' });
        }

        res.status(200).json({ status: 200, message: 'User logged in successfully!', data: user });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message || 'Something went wrong during login.' });
    }
};
