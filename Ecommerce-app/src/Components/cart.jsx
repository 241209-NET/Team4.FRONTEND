import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) =>  {

    // const [cartItems, setCartItems] = useState( JSON.parse(localStorage.getItem("cartItems")) || []);
    const [cartItems, setCartItems] = useState([]);

    const add_to_cart = (item_tobe_added) => {
        console.log("##### cart details ################");
        console.log(cartItems);
        console.log(item_tobe_added);
        console.log(localStorage.length);

        const isItemInCart = cartItems.some(item => item.itemId === item_tobe_added.itemId);
        console.log("########### Check if item exists ##########")
        console.log(isItemInCart)

        if (isItemInCart){
            setCartItems(
                cartItems.map(
                    (item) =>  {
                        if (item.itemId === item_tobe_added.itemId) {
                            item.quantity += 1;
                            // return item;
                        } 

                        return item;
                    } 
                )
            );
        } else {
            setCartItems([ ...cartItems, { ...item_tobe_added, quantity: 1}]);
        }
            
            
    }; 

    const remove_from_cart = (item_to_be_removed) => {
        
        const isItemInCart = cartItems.find(item => item.itemId === item_to_be_removed.itemId);

        if (isItemInCart.quantity === 1){
            setCartItems(cartItems.filter(item => item.itemId !== item_to_be_removed.itemId))
        } else {
            setCartItems(
                cartItems.map(item => item.itemId === item_to_be_removed.itemId ? { ...cartItems, quantity: item.quantity - 1} : item)
            )
        }
        
    };

    const clearcart = () => {
        setCartItems([]);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    // useEffect(
    //     () => {
    //         localStorage.setItem("cartItems", JSON.stringify(cartItems));
    //     }, [cartItems]
    // );

    // useEffect( () => {
    //     const cartItems = localStorage.getItem("cartItems");
    //     if(cartItems){
    //         setCartItems(JSON.stringify(cartItems));
    //     }
    // }, []);

    useEffect(
        () => {
            // cartItems.length == 0 ? cartItems : localStorage.setItem("cartItems", JSON.stringify(cartItems));
            if (cartItems.length !== 0) localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }, [cartItems]
    );

    useEffect( () => {
        const cartItems = localStorage.getItem("cartItems");
        if(cartItems){
            setCartItems(JSON.parse(cartItems));
        }
    }, []);

    return (
        <CartContext.Provider value={{cartItems, add_to_cart, remove_from_cart, clearcart, getCartTotal}}>
            {children}
        </CartContext.Provider>
    );

};

// export const useCart = () => useContext(CartContext);

// const [cartItems, setCartItems] = useState([]);

