import React, {useState, useEffect} from "react"
import axios from "axios"

function Checkout() {

     //Setting up state variables
    const [isHidden, setIsHidden] = useState(true); 

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
         fetchPokemonData();
 
     }, [pokemonToFind]); // UseEffect exepcts a dependency array as a second argument.
     //Even if you have none, omitting this can result in an infinite loop. 
 
     const handleInputChange = (event) => {
         setPokemonToFind(event.target.value);
     }

     const handleCheckout = () => {
        setIsHidden(!isHidden); 
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

        <div class="AddressCheckout" hidden={isHidden}>
            <br></br>
            <label for="streetaddress">Street Address:</label><br></br>
            <input 
                type="text" 
                id="streeaddress"
                name="streetaddress"
                //value="Enter Street Address"
                onChange={handleInputChange}
                placeholder='Enter Street Address'
            />
            <br></br><br></br>

            <label for="city">City:</label><br></br>
            <input 
                type="text" 
                id="city"
                name="city"
                //value="Enter Street Address"
                onChange={handleInputChange}
                placeholder='Enter City'
            />
            <br></br><br></br>

            <label for="stateaddress">State:</label><br></br>
            <input 
                type="text" 
                id="stateaddress"
                name="stateaddress"
                //value="Enter Street Address"
                onChange={handleInputChange}
                placeholder='Enter State'
            />
            <br></br><br></br>

            <label for="zipcode">Zipcode:</label><br></br>
            <input 
                type="text" 
                id="zipcode"
                name="zipcode"
                //value="Enter Street Address"
                onChange={handleInputChange}
                placeholder='Enter Zipcode'
            />
            <br></br><br></br>

            <input 
                type="submit" 
                value="Confirm Address"
                //onChange={handleInputChange}
                //placeholder='Enter pokemon to search for'
            />
         </div>
 
         {/* Conditionally render the pokeData if any has ben returned 
         {
             pokemonData ? (
                 <div>
                     <h3>{pokemonData.name}</h3>
                     <img src={pokemonData.sprite} alt={pokemonData.name} />
                     <p>Type(s): {pokemonData.types}</p>
                 </div>
             ) : (
                 <div>
                     <p>Loading Pokemon data...</p>
                 </div>
             )
         }
             */}
 
 
 
     </div>
   )

}

export default Checkout