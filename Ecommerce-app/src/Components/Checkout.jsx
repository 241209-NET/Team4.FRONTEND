import React, {useState, useEffect} from "react"
import axios from "axios"

function Checkout() {

     //Setting up state variables
    const [isHidden, setIsHidden] = useState(true); 

    //Address input data
    const [inputStreet, setInputStreet] = useState(''); 
    const [inputCity, setInputCity] = useState(''); 
    const [inputState, setInputState] = useState(''); 

    const [addressData, setAddressData] = useState(null); 

     const [pokemonToFind, setPokemonToFind] = useState(1); //By default, it loads Bulbasaur 
     const [pokemonData, setPokemonData] = useState(null); //By default, before the user searches this is null
 
     //Setting up our useEffect to fetch pokemon data when component mounts OR when it re-renders
     useEffect(() => {
         
         //This is a function that I will call to send that GET request to the pokeAPI
         const fetchPokemonData = async () => {
             try{
                 //First we try to get a response from pokeAPI
                 const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonToFind}`); 
                 
                 setPokemonData({
                     name: response.data.name,
                     sprite: response.data.sprites.front_default,
                     types: response.data.types.map((typeInfo) => typeInfo.type.name).join(', '),
                 });
 
             } catch (error) {
                 console.error('Error fetching Pokemon data:', error)
                 setPokemonData(null);
             }
         };

         //Here we just call the function
         //fetchPokemonData();

         
 
         
 
     }, [pokemonToFind]); // UseEffect exepcts a dependency array as a second argument.
     //Even if you have none, omitting this can result in an infinite loop. 

     const fetchAddressData = async () => {
        try{
            //const response = await axios.get(`https://us-street.api.smarty.com/street-address?auth-id=5f956086-9408-2c33-e17c-6130e8d0280e&auth-token=7D5HgFavm8M1oIAGQ7rQ&street=${inputStreet}&city=${inputCity}&state=${inputState}`)
            
            const response = await axios.get(`https://us-street.api.smarty.com/street-address`, {
                params: {
                    //'auth-id': '5f956086-9408-2c33-e17c-6130e8d0280e', 
                    //'auth-token' : '7D5HgFavm8M1oIAGQ7rQ', 
                   // license : 'us-core-cloud', 
                    street : inputStreet, 
                    city : inputCity, 
                    state : inputState,
                    key: '221396359215966175'

                }
            })
            .then(function (response){

                console.log(response); 
                setAddressData({
                    street: response.data[0].delivery_line_1,
                    city: response.data[0].components.city_name,
                    state: response.data[0].components.state_abbreviation, 
                    zipcode: response.data[0].components.zipcode,
                }); 
            })

            

        }catch(error){
            //error code! 
            console.error('Error fetching address data:', error)
            setAddressData(null); 
        }
    };
 
     const handleInputChange = (event) => {
         setPokemonToFind(event.target.value);
     }

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
 
 
   return (
     <div>
         <h2>Checkout Cart</h2>
         <h3>Placeholder Item Checkout List</h3>
         <ul>
            <li>Example Item 1</li>
            <li>Example Item 2</li>
            <li>Example Item 3</li>
            <li>Example Item 4</li>
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

        <div className="AddressCheckout" hidden={isHidden}>
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
                //value="Enter Street Address"
                //onChange={handleInputChange}
                placeholder='Enter Zipcode'
            />
            <br></br><br></br>

            <input 
                type="submit" 
                value="Confirm Address"
                onClick={fetchAddressData}
                //placeholder='Enter pokemon to search for'
            />
         </div>
 
         {/* Conditionally render the pokeData if any has ben returned */}
         {
             addressData ? (
                 <div>
                     <h3>Street: {addressData.street}</h3>
                     <h3>{addressData.city}</h3>
                     <h3>{addressData.state}</h3>
                     <h3>{addressData.zipcode}</h3>
                 </div>
             ) : (
                 <div>
                     <p>Loading address data...</p>
                 </div>
             )
         }
             
 
 
 
     </div>
   )

}

export default Checkout