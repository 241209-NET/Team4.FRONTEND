
import { createRoot } from 'react-dom/client'
import '../shop.css'
import  ListOfItemsDetails  from './ShoppingList.jsx'

createRoot(document.getElementById('root')).render(
    <>
        <div className='main-div'>
            <h1>
                Here are the List of Products !!!
            </h1>
        </div>
        <ListOfItemsDetails />
    </>
)
