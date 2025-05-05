const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// User schema
const userSchema = new mongoose.Schema({
    name: String,
    username: { type: String, unique: true },
    password: String,
    userId: { type: Number, default: 1 } // Set default userId to 1
});

const User = mongoose.model('User ', userSchema); // Corrected model name

// Cart item schema
const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity cannot be less than 1.']
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true,
    },
    userId: { type: Number, required: true } // Reference to the userId
});

const CartItem = mongoose.model('CartItem', cartItemSchema); // CartItem model

// Registration endpoint
app.post('/api/register', async (req, res) => {
    const { name, username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser  = new User({ name, username, password: hashedPassword });
        await newUser .save();
        res.status(201).json({ message: 'User  registered successfully', userId: newUser ._id });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user' });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User  not found' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            res.status(200).json({ message: 'Login successful', userId: user.userId });
        } else {
            res.status(401).json({ message: 'Incorrect password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});

// Add item to cart
app.post('/api/cart', async (req, res) => {
    const { productId, quantity, price, userId } = req.body; // Get productId, quantity, price, and userId

    const total = price * quantity; // Calculate total price

    try {
        const newItem = new CartItem({ productId, quantity, price, total, userId });
        await newItem.save();
        res.status(201).json({ message: 'Item added to cart', item: newItem });
    } catch (error) {
        res.status(400).json({ message: 'Error adding item to cart', error });
    }
});

// Get user's cart
app.get('/api/cart/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const cartItems = await CartItem.find({ userId });
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cart', error });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});