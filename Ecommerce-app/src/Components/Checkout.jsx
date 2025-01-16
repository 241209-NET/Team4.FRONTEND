import React, {useState, useEffect, useContext} from "react"
import axios from "axios"
import { CartContext } from "./cart";

function Checkout() {

    const { cartItems, setCartItems } = useContext(CartContext);

     //Setting up state variables
    const [isHidden, setIsHidden] = useState(true); 

    //Address input data
    const [inputStreet, setInputStreet] = useState(''); 
    const [inputCity, setInputCity] = useState(''); 
    const [inputState, setInputState] = useState(''); 
    const [inputZipcode, setZipcodeState] = useState(""); 

    const [addressData, setAddressData] = useState(null); 

    //autocomplete
    const [autoZipcode, setAutoZipcode] = useState('01604'); 
    const [addressVerified, setVerified] = useState(false); 
    const [isUnverified, setUnverified] = useState(false); 

    let totalCost = 0; 

    //cartItems = [{itemName: "test Name 1", itemId: 5, itemPrice: 10.94, quantitySold: 2},{itemName: "Super extra long test Name 2", itemId: 1, itemPrice: 9.94, quantitySold: 1}]; 
    
    cartItems.map((item) => {
        totalCost += item.quantity * item.price; 
    })

    let formatCost = totalCost.toFixed(2);
    
    const simplified = cartItems.map(item => ({
        'itemId_FK': item.itemId,
        'quantitySold': item.quantity
    }))

    const postCreateOrder = async () => {
        //let addressString = addressData.street + " " + addressData.city + " " + addressData.state + " " + addressData.zipcode; 
        //let dateNow = new Date(); 
        try{
            const response = await axios.post(`http://localhost:5231/Order`, {
                "userId": 1,
                "totalPrice": totalCost, 
                "items": simplified,
                /*"items": [
                    {
                        "itemId_FK": 5,
                        "quantitySold": 1
                    }, 
                    {
                        "itemId_FK": 6,
                        "quantitySold": 1
                    }
                ],*/
                "address": "testPlaceholder",//addressString,
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

    /*
    useEffect(() => {
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
                    setAutoZipcode({
                        zipcode: zipResponse.data[0].components.zipcode,
                    }); 
                }
                if(zipResponse.data.length == 0){
                    console.log(autoZipcode)
                    console.log("Wrong")
                    setZipcodeState(''); 
                }else{
                    //setZipcodeState(autoZipcode.zipcode); 
                }
            }); 

        }, 1000)

        return () => clearTimeout(getZipcode)

    }, [inputState]); */



     const fetchAddressData = async () => {
        try{
            const response = await axios.get(`https://us-street.api.smarty.com/street-address`, {
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
                    setVerified(true); 
                    //etCartItems([]); 
                    clearcart(); 
                    //postCreateOrder(); 
                }else{
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
        //api call Create New Order
        postCreateOrder(); 

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