import '../shop.css'
import { useState, useEffect, useContext } from 'react';
import { CartContext, CartProvider } from './cart';
import DisplayCartDetails from './CartDetails';

function AllItemDetails({deptid}){
    const [items, setItems] = useState([]);
    // let [count, setCount] = useState(0);
    // let [cartItems, setCartItems] = useState([]);
    const { cartItems, add_to_cart, remove_from_cart } = useContext(CartContext);

    // const handleAddToCart = (item) => add_to_cart(item);
    
    console.log("#############Cart updates ###################");
    console.log(cartItems);
    console.log("################################");

    
    useEffect(
        () => {
            const itemdata = async () => {
                const itemurl = "http://localhost:5231/api/Item"
                const itemresponse = await fetch(itemurl);
                const resjson = await itemresponse.json();
                setItems(resjson);
            };
            itemdata();
            console.log(items);
        }
        ,[]);

    items.forEach(item => {
        // item.img = item.name.split(' ').join('_');
        item.button_plus = "plus" + item.itemId;
        item.button_minus = "minus" + item.itemId;
        // item.textname = "text" + item.itemId;
        // item.QtySelected = 0;
    });   

    
    const newitems = items.filter(item => {
        return item.departmentId === deptid
    })

    return (
        <div >
            
                {
                    newitems.map(
                        item => (
                            
                            <>
                          
                                
                                <div className='itemrow' key={item.itemId}>
                                    
                                        <p> <b>Name:</b> {item.name}</p>           
                                        <p> <b>Description:</b> {item.description}</p>           
                                        <p> <b>Cost:</b> ${item.price}</p>       
                                        <div className='qty'>     
                                        <button id={item.button_minus} onClick={() => remove_from_cart(item)} >-</button>
                                        {/* <span>{item.QtySelected}</span> */}
                                        <button id={item.button_plus} onClick={() => add_to_cart(item)}>+</button>
                                        </div>
                                        <h4>Add To Cart</h4>
                                    
                                </div>
                           
                        
                            
                            </>
                        )
                    )
                }
            
        </div>
    )
    
    
}

export function ListOfItemsDetails(deptid){
    return (
        <>
        {/* <AllItemDetails /> */}
        <div id = "departmentList">
            {/* {ProductList} */}
            <CartProvider> 
                <div className='maincontainer'>
                    <div className='container1'>
                        <AllItemDetails deptid={deptid}/>             
                    </div>
                    <div className='container2'>
                        <DisplayCartDetails />               
                    </div>
                </div>               
                
           </CartProvider>
        </div>
        
        </>
    )
}

export default ListOfItemsDetails;