import User from '../models/User.js';

export const updateCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { cartItems } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        user.cartItems = cartItems;
        await user.save();

        res.json({ success: true, message: "Cart updated successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}
