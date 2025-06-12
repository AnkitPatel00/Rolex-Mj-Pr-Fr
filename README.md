
# Cloth App

 ClothStore is a full-stack e-commerce web app where users can browse, filter, search, and purchase clothes, manage their wishlist, cart, orders, and profile with address support. Built using React, Node.js, and MongoDB, it features secure JWT-based authentication for user access.

## Demo Link

[Live Demo](https://clothstoreapp.vercel.app)  

---

## Login

> **Guest**
> Email: `user@gmail.com`
> Password: `user`

---

## Quick Start

```
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
npm run dev 
```

## Technologies
- React JS
- React Router
- Node.js
- Express
- MongoDB
- JWT

## Demo Video
Watch a walkthrough (5–7 minutes) of all major features of this app:
[Loom Video Link](https://drive.google.com/file/d/1PnUL1jwAQJVbEjOu1fh0wQsHPA2VfWTR/view?usp=sharing)

## Features
**Home**
- Displays Category
- New Arrival Cloths

**Cloths Listing**
- Paginated Cloths list
- Search with Cloth Title
- Filters
- “Add to Widhlist” Button

**Cloths Details**
- View full Cloth information (Rating, Price, Disscount, Size ,Description)
- “Buy Now” and “Add to Cart” Buttons

**Authentication**
- User signup and login with JWT
- Protected routes for buying/adding cart and wishlist

## API Reference

### **GET	/api/cloths/**<br>	 
List all cloths<br>	 
Sample Response:<br>
```[{ _id, title, imgUrl, ... }, …]```

### **GET	/api/cloths/:id**<br>	 	
Get details for one cloth<br>		
Sample Response:<br>
```{ _id, title, imgUrl, price, ... }```

### **POST	/api/users/login**<br> 	
login user <br>	
Sample Response:<br>
```{token,user:userInfo}```

### **POST	/api/users/register**<br>  	
Register a new user<br> 	 
Sample Response:<br> 
```{message:`Congratulations! username is Registered Please Login With Email`}```

## Contact
For bugs or feature requests, please reach out to ankitpatel.web@gmail.com
