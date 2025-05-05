const express = require('express');
const router = express.Router();
const CartItem = require('../models/cart.model');

// Add to cart
router.post('/', async (req, res) => {
    console.log("Incoming cart item:", req.body); // ✅

    const { productId, quantity, price, userId } = req.body;
    const total = quantity * price;

    try {
        const newItem = new CartItem({ productId, quantity, price, total, userId });
        await newItem.save();
        res.status(201).json({ message: "Item added to cart", item: newItem });
    } catch (error) {
        console.error("❌ Error saving cart item:", error); // ✅
        res.status(400).json({ message: "Failed to add item to cart", error });
    }
});


// Get user's cart
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const cartItems = await CartItem.find({ userId });
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cart', error });
    }
});

module.exports = router;



// // POST - Add item to cart
// router.post('/', async (req, res) => {
//     const { productId, quantity, price, userId } = req.body;

//     const total = quantity * price;

//     try {
//         const newItem = new CartItem({
//             productId,
//             quantity,
//             price,
//             total,
//             userId
//         });

//         await newItem.save();
//         res.status(201).json({
//             message: "Item added to cart",
//             item: newItem
//         });
//     } catch (error) {
//         res.status(400).json({
//             message: "Failed to add item to cart",
//             error: error.message
//         });
//     }
// });
