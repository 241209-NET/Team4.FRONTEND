import '../shop.css'
import React, { useState, useEffect } from 'react';
import C_in_Depth from '../images/C in Depth.jpg';
import CSS_in_Depth from '../images/CSS in Depth.jpg';



// export var shoppingcart = [];

// console.log(getItems());

// const items = getItems();

const items = [
    {
        Id: 1,
        Name: "CSS in Depth",
        Description: "All about Book1",
        Price: 10.50
    },
    {
        Id: 2,
        Name: "C in Depth",
        Description: "All about Book2",
        Price: 100.50
    }
]

function DisplayImg({img_name}){
    return (
        <>
            <div>
                <img src={`${img_name}`} alt={img_name} height={200}/>
            </div>
        </>
    )
}

const ProductList = items.map(
    (item) =>{
        const button_minus = "minus" + item.itemId;
        const button_plus = "plus" + item.itemId;
        const input_text = "input" + item.itemId;
        item.QtySelected = 0;
        return(
        <>
        <div className='itemrow'>
            <div>
                <DisplayImg img_name={C_in_Depth}/>
            </div>
            <div>
                {/* <img src={C_in_Depth} alt={item.Name} height={200}/> */}
                <p> Name: {item.Name}</p>           
                <p> Description: {item.Description}</p>           
                <p> Cost: {item.Price}</p>            
                <button id={button_minus}>-</button>
                <input type="text" name={input_text} defaultValue={item.QtySelected}></input>
                <button id={button_plus}>+</button>
                <h4>Add To Cart</h4>
            </div>
        </div>
        </>
        )
    }
        
)




function AllItemDetails({deptid}){
    const [items, setItems] = useState([]);
    let [count, setCount] = useState(0);
    let [cartItems, setCartItems] = useState([]);

    console.log("################################");
    console.log(cartItems);
    console.log("################################");

    // let cart = [];
    const add_to_cart = (item_tobe_added) => {
        setCount((prevCount) => prevCount + 1);
        setCartItems(
            (prevItems) => {
                const itemExists = prevItems.find(item => item.itemId === item_tobe_added.itemId);
                if (itemExists){
                    return prevItems.map(
                        (item) => item.itemId === item_tobe_added.itemId ? { ...item_tobe_added, qty: item.qty++} : item
                    );
                } else {
                    return [...prevItems, {...item_tobe_added, qty: 1}];
                }
            }  
                
        );
    }; 

    const remove_from_cart = (item_to_be_removed) => {
        // setCartItems(
        //     (prevItems) => prevItems.filter(
        //         (item) => item.id !== id
        //     )
        // );
        setCount((prevCount => prevCount===1 ? 0: prevCount - 1));
        setCartItems(
            (prevItems) => prevItems.map(
                (item) => {
                    if (item.qty > 1 && item.itemId === item_to_be_removed.itemId) { 
                        update_cart(item_to_be_removed.itemId, item_to_be_removed.qty)
                    } else if (item.qty ===1 ){
                        prevItems.filter(item => item.itemId !== item_to_be_removed.itemId)
                    }
                
                }
            )
        );
    };

    const update_cart = (id, newqty) => {
        setCartItems(
            (prevItems) => prevItems.map(
                (item) => item.itemId === id ? { ...item, qty: newqty > 0 ? newqty : 1} : item
            )
        );
    };


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
        item.QtySelected = 0;
    });   

    
    const newitems = items.filter(item => {
        return item.departmentId === deptid
    })

    return (
        <div>
            
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


function ListOfItemsDetails(deptid){
    return (
        <>
        {/* <AllItemDetails /> */}
        <div>
            {/* {ProductList} */}
            <AllItemDetails deptid={deptid}/>
        </div>
        
        </>
    )
}

export default ListOfItemsDetails;