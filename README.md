# Team4.FRONTEND

## E-Commerce Portal:

This E-Commerce portal is a full-stack user centric application that allows a user to browse and purchase with a large variety of products. A user can
create a new account, access an existing account, browse products sorted by department, add products to the cart,
and modify and checkout with their order. The Portal is cloud hosted and utilizes the Smarty Streets API to verify inputted addresses.

## Team Members:

- Alex Piccolo
- Ethan Catania
- Jude Hoekstra
- Vamsi Gurram

## Technologies Used

- C# (Backend programming language)
- EF Core (ORM)
- SQL Server (Azure hosted)
- ASP.NET Core (Web API Framework)
- xUnit/Moq (Backend Testing)
- Azure App Service (for application hosting)
- React as front end

## MVP:

    1. User should be able to login. Simple authentication.
    2. User Should be able to create a new account.
    3. After account verification, user should hit home page complete with a Top Navigation Bar to display different departments.
        a. By default, we list all items in main Window frame.
        b. Menu --> drop down list (categories), Cart --> Congregate orders and allow users to checkout.
    3. User should be able to select a department to display the list of products and their inventory count and price.
    4. User should be able to select an item and add that item to the cart for checkout.
        a. If inventory count <=0, then we should display "Out of stock". Display "Out of Stock" Label.
    5. User should be able to select their cart to see which items they have added to it.
    6. User should be able to modify the quantity of items in their cart.
    7. User should be able to delete items from their cart.
    8. User should be able to checkout with their selected items and input an address to ship the items to.
        a. Once checkout is completed, display message that items will be shipped via Courier.
        b. While checking out, use the 3rd party API, to check if Postal address is correct or NOT.

## External API:

- When Users type the Postall Address, we will use external API, to validate if address is correct or NOT.
- https://www.smarty.com/docs/sdk/dotnet

## Stretch Goal:

We can Add lot more functionality to this Ecommerce Portal. Listed a few below for stretch Goal.

    1. Search Bar
    2. User Login via authentication provider
    3. Add the sub-categories for the list in the Navigation Bar.
    4. Add Credit card authentication
    5. Allow different levels of access (i.e admin, subscriber, etc.)
    6. Validation of username (Valid email, Unique for each user)

## ERD Diagram:

![E-Commerce ERD (2)](https://github.com/user-attachments/assets/73c1a68b-0c17-4828-98ef-045e897823e6)



## Controller API's:

1. List all users (GET ALL)
2. Add user (POST User)
3. Check_UserCreds() (GET user_name/password)
4. List All Departments (GET)
5. List All Items in DepartmentById (GET {id})
6. List an ItemById(GET {id})
7. Get ItemsInStock(Get)
8. AddItemToCart(POST {Item})
9. DeleteItemFromCart(Delete)
10. UpdateItemInCart(Patch)
11. GetItemsTotal()
12. GetOrderStatus(GET OrderID)
13. CompleteCheckout()

## Xunit Test:

To be Added later

## Work Distribution:

- Alex Piccolo
  - Set up the DB in cloud
  - Users
  - Add the DB context
- Ethan Catania
  - Adding content to readme
  - ERD Diagram
  - Order
- Jude Hoekstra
  - Create React Project
  - Item
- Vamsi Gurram
  - Create initial ASP.NET Webapi
  - Department

## Project management system:

- We will be using Github Projects with Daily status updates, Via Teams

## Front End

- User login Page: (Ethan)

  - Username textbox
  - password textbox
  - submit button
  - register button
  - Color palette

- Main Shopping Page (Vavigation - Jude, itemlist - Vamsi)

  - 2 Frames/Panels
  - 1st one is navigation bar with list of Departments, Shopping cart icon along with displaying count of items in basket, Username, logout
  - 2nd one, will list all the items/prodcuts for the selected Department
  - 3rd (stretch goal), to add filters
  - Color palette

- Checkout Page (Alex)
  - 1 panel, listing all items in shopping cart, with total, submit/complete button
  - Will open another panel at the bottom, to fill in the address details, which needs validation VIA external API
  - color palette

## Backend DB

    - Loading tables with data. get 10 items in each category
    - Vamsi (Books, Electronics)
    - Alex (Kitchen ware, toiletries)
    - Ethan (Clothing, Furniture)
    - Jude (Groceries, Pharmacy)
    - For images, lets store them on frontend (in images folder) with same name as item name.png

## ASP.net

    - Models
    - Controller
    - Service
    - repository
    - data
    - Test cases
