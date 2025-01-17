import React, {useState, useEffect, useContext} from "react"
import axios from "axios"
import { CartContext } from "./cart";

function Checkout() {

    //Set up context data
    const { cartItems, setCartItems, clearcart} = useContext(CartContext);

     //Setting up state variables
    const [isHidden, setIsHidden] = useState(true); 

    //Address input data
    const [addressData, setAddressData] = useState(''); 
    const [inputStreet, setInputStreet] = useState(''); 
    const [inputCity, setInputCity] = useState(''); 
    const [inputState, setInputState] = useState(''); 
    const [inputZipcode, setZipcodeState] = useState('');  

    //display state booleans
    const [addressVerified, setVerified] = useState(false); 
    const [isUnverified, setUnverified] = useState(false); 

    //calculate cart total
    let totalCost = 0; 
    cartItems.map((item) => {
        totalCost += item.quantity * item.price; 
    })

    //format the total for display
    let formatCost = totalCost.toFixed(2);
    
    //map cart items for Order creation
    const simplified = cartItems.map(item => ({
        'itemId_FK': item.itemId,
        'quantitySold': item.quantity
    }))

    //Logic for creating an Order and saving it to the DB
    const postCreateOrder = async () => {
        try{
            const response = await axios.post(`https://revecommerce.azurewebsites.net/Order`, {
                "userId": 1,
                "totalPrice": totalCost, 
                "items": simplified,
                "address": inputStreet + " " + inputCity + " " + inputState + " " + inputZipcode,
                "orderDate": new Date()
            })
            .then(function (response){
                console.log(response); 
            })

        }catch(error){
            //error code! 
            console.error('Error posting new order:', error)
            setAddressData(null); 
        }
    };

    //Update cart items, and perform zipcode autocomplete
    useEffect(() => {

        //refresh cart items
        const cartItems = localStorage.getItem("cartItems");
        if(cartItems){
            setCartItems(JSON.parse(cartItems));
        }

        //Zipcode autocomplete code
        if(inputState){
            const getZipcode = setTimeout(() => {
                
                const zipResponse = axios.get(`https://us-street.api.smarty.com/street-address`, {
                    params: {
                        street: inputStreet,
                        city: inputCity,
                        state: inputState,
                        key: '221396359215966175'
                    }
                }).then((zipResponse) => {
                    console.log(zipResponse); 
                    if(zipResponse.data.length > 0){
                        setZipcodeState(zipResponse.data[0].components.zipcode); 
                    }
                    if(zipResponse.data.length == 0){
                        setZipcodeState(''); 
                    }
                }); 

            }, 1000)

            return () => clearTimeout(getZipcode)
        }
    }, [inputState]); 


    //Verify user's entered delivery address
    const fetchAddressData = async () => {
        try{
            const response = await axios.get(`https://us-street.api.smarty.com/street-address`, {
                //Other potential APIs being tested: 
                //const response = await axios.get(`https://us-zipcode.api.smarty.com/lookup`, {
                //const response = await axios.get(`https://us-autocomplete-pro.api.smarty.com/lookup`, {
                params: {
                    //'auth-id': '5f956086-9408-2c33-e17c-6130e8d0280e', 
                    //'auth-token' : '7D5HgFavm8M1oIAGQ7rQ', 
                    // license : 'us-core-cloud', 
                    street : inputStreet, 
                    city : inputCity, 
                    state : inputState,
                    zipcode: inputZipcode,
                    key: '221396359215966175'
                }
            })
            .then(function (response){
                console.log(response); 
                if(response.data.length > 0){
                    setAddressData({
                        street: response.data[0].delivery_line_1,
                        city: response.data[0].components.city_name,
                        state: response.data[0].components.state_abbreviation, 
                        zipcode: response.data[0].components.zipcode,
                    }); 

                    //reveal verification message
                    setVerified(true); 
                    //clear the cart of bought items
                    clearcart(); 
                    //create an Order and post to DB
                    postCreateOrder(); 

                }else{

                    //show unverified address message
                    setUnverified(true); 
                }
            })

        }catch(error){

            console.error('Error fetching address data:', error)
            setAddressData(null); 
        }
    };

    //Setter functions of address input fields
    const handleCheckout = () => {
        setIsHidden(!isHidden); 
    }

    const handleStreetChange = (event) => {
        setInputStreet(event.target.value); 
    }

    const handleCityChange = (event) => {
        setInputCity(event.target.value); 
    }

    const handleStateChange = (event) => {
        setInputState(event.target.value); 
    }

    const handleZipcodeChange = (event) => {
        setZipcodeState(event.target.value); 
    }
 
    //Checkout Display
    return (
        
        <div className="checkout">

            <div className="checkoutList">

                <h1>Checkout Cart</h1>
                <ul id="checkoutList">
                {
                    cartItems.map((item, index) => (
                        <li key={index}>{item.name}...................................... {item.quantity} x ${item.price} = ${(item.quantity*item.price).toFixed(2)}</li>
                    ))  
                    
                }
                <br></br>
                <li><b>Cart Total: ${formatCost}</b></li>
                </ul>

            <div>
                <input 
                    type="submit" 
                    value="Checkout"
                    onClick={handleCheckout}
                    hidden={!isHidden}
                    className = "checkoutButton"
                    //placeholder='Enter pokemon to search for'
                />
            </div>

            </div>

            <div className="AddressCheckout" hidden={isHidden}>
            <div hidden={addressVerified}>
                <br></br>
                <h4 id="deliveryTitle">Enter delivery address: </h4>
                <br></br>
                <label htmlFor="streetaddress">Street Address:</label><br></br>
                <input 
                    type="text" 
                    id="streeaddress"
                    name="streetaddress"
                    value={inputStreet}
                    onChange={handleStreetChange}
                    placeholder='Enter Street Address'
                />
                <br></br><br></br>

                <label htmlFor="city">City:</label><br></br>
                <input 
                    type="text" 
                    id="city"
                    name="city"
                    value={inputCity}
                    onChange={handleCityChange}
                    placeholder='Enter City'
                />
                <br></br><br></br>

                <label htmlFor="stateaddress">State:</label><br></br>
                <input 
                    type="text" 
                    id="stateaddress"
                    name="stateaddress"
                    value={inputState}
                    onChange={handleStateChange}
                    placeholder='Enter State'
                />
                <br></br><br></br>

                <label htmlFor="zipcode">Zipcode:</label><br></br>
                <input 
                    type="text" 
                    id="zipcode"
                    name="zipcode"
                    value={inputZipcode}
                    onChange={handleZipcodeChange}
                    placeholder='Enter Zipcode'
                />
                <br></br><br></br>
                <div hidden={!isUnverified} id="unverified">
                    <h3>Your address could not be verified, please check and enter again</h3>
                </div>

            <input 
                type="submit" 
                value="Confirm Address"
                onClick={fetchAddressData}
                className="checkoutButton"
                //placeholder='Enter pokemon to search for'
            />
        </div>
         </div>
 
         {/* Conditionally render the pokeData if any has ben returned */}
         {
                 <div hidden={!addressVerified} style={{backgroundColor: '#66FF99'}}>
                     <h3>Your Address has been verified... Checkout Successful!</h3>
                 </div>
         
         }

 {/* 
        {
             addressToRetrieve ? (
                 <div>
                     <h3>{addressToRetrieve.city}</h3>
                     <h3>{addressToRetrieve.state}</h3>
                 </div>
             ) : (
                 <div>
                     <p>Loading address data...</p>
                 </div>
             )
         }  */}
             
 
 
 
     </div>
   )

}

export default Checkout