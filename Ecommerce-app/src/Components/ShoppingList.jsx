import '../shop.css'

import C_in_Depth from '../images/C in Depth.jpg'

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
                <img src={img_name} alt={img_name} height={200}/>
            </div>
        </>
    )
}

const ProductList = items.map(
    (item) =>
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
                <button>-</button>
                <input type="text" name="item-q" id="item-q" />
                <button>+</button>
                <h4>Add To Cart</h4>
            </div>
        </div>
        </>
        
)

// function AllItemDetails(){
//     return (
//         <ul>
//             {ProductList}
//         </ul>
//     )
// }


function ListOfItemsDetails(){
    return (
        <>
        {/* <AllItemDetails /> */}
        <div>
            {ProductList}
        </div>
        
        </>
    )
}

export default ListOfItemsDetails;