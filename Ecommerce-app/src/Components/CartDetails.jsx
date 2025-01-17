import { CartContext } from "./cart";
import { useContext, useEffect} from "react";

function DisplayCartDetails(){

    const { cartItems, setCartItems } = useContext(CartContext);
    console.log("From CartDetails.jsx");

    // useEffect( () => {
    //     const cartItems = localStorage.getItem("cartItems");
    //     if(cartItems){
    //         setCartItems(JSON.parse(cartItems));
    //     }
    // }, []);

    if (cartItems.length === 0) {
        console.log("In Cart > 0")
        return (
            <div>
                <h1> No Items in Cart</h1>
            </div>
        );
    } else {   
        console.log("In Cart < 0");

    return(
        
        <div>
            <h1> Shopping Cart Details</h1>
            {
                
                cartItems.map(
                    (item) => (
                        <>
                        <div className="cartrow">
                            <h5> <b>Item Name: </b>{item.name} </h5>
                            <h5> <b>Item Price: </b>${item.price} </h5>
                            <h5> <b>Quantity: </b>{item.quantity} </h5>
                        </div>
                        </>
                    )
                )
            }
        </div>
    );
}
}

export default DisplayCartDetails;