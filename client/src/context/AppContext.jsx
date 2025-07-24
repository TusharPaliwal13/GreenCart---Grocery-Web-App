import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true; // Allow cookies to be sent with requests
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setsearchQuery] = useState({});

    //Fetch Seller Status
    const fetchSeller = async () => {
        try {
            const {data} = await axios.get('/api/seller/is-auth')
            if (data.success) {
                setIsSeller(true);
            } else {
                setIsSeller(false);
            }
        } catch (error) {
            setIsSeller(false);
        }
    }

    //fetch user auth status , user Data and cart items

    const fetchUser = async () => {
    try {
        const { data } = await axios.get('/api/user/is-auth');
        if (data.success) {
            setUser(data.user);
            console.log("Fetched cart items:", data.cartItems);
            setCartItems(data.cartItems || {}); // ✅ updated to use returned cartItems
        } else {
            setUser(null);
            setCartItems({}); // clear cart if user not authenticated
        }
    } catch (error) {
        console.log(error.message);
        setUser(null);
        setCartItems({}); // clear cart on error
    }
}



    // Fetch products from an API or use dummy data
    const fetchProducts = async () => {
    try {
        const { data } = await axios.get('/api/product/list');
        if (data.success) {
            setProducts(data.products);
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
    }
}


    // Add product to the cart
    const addToCart = (itemId) => {
        let cardData = structuredClone(cartItems);

        if(cardData[itemId]) {
            cardData[itemId] += 1;
        }
        else {
            cardData[itemId] = 1;
        }
        setCartItems(cardData);
        toast.success("Added to cart");
    };

    // update cart items Quantity
    const updateCartItem = (itemId, quantity) => {
        let cardData = structuredClone(cartItems);
        cardData[itemId] = quantity;
        setCartItems(cardData);
        toast.success("Cart updated");
    };

    // remove item from cart
    const removeFromCart = (itemId) => {
        let cardData = structuredClone(cartItems);
        if(cardData[itemId]) {
            cardData[itemId] -= 1;
            if(cardData[itemId] === 0) {
                delete cardData[itemId];
            }
        }
        
        toast.success("Item removed from cart");
        setCartItems(cardData);
    }
    //Get Cart Item Count
    const getCartCount=()=>{
        let totalCount = 0;
for(const item in cartItems){
    totalCount += cartItems[item];
}

        return totalCount;
    }
    // Get Cart Total Amount
    const getCartAmount=()=>{
        let totalAmount = 0;
for(const item in cartItems){
    let itemInfo = products.find((product) => product._id == item); 

    if(itemInfo && cartItems[item] > 0){
        totalAmount += itemInfo.offerPrice * cartItems[item];
    }
}
return Math.floor(totalAmount * 100) / 100;

    }

    useEffect(() => {
        fetchUser();
        fetchSeller();
        fetchProducts();
    }, []);

    //update database cart items
    useEffect(() => {
        const updateCart = async () => {
            try {
                const { data } = await axios.post('/api/cart/update', { cartItems });
                if (!data.success) {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
        if(user){
            updateCart();
        }
    } , [cartItems])

    const value = {navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartItem, removeFromCart, cartItems , setCartItems, searchQuery, setsearchQuery,getCartAmount,getCartCount , axios , fetchProducts};
    return <AppContext.Provider value={value}>
        {children}
        </AppContext.Provider>  
}
export const useAppContext = () => {

    return useContext(AppContext);
};