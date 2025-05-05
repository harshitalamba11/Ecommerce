const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: String,  // temporarily String for testing
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
        required: true
    },
    userId: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
