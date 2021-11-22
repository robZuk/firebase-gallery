# gallery

### [https://fir-gallery-dd503.web.app/](https://fir-gallery-dd503.web.app/)

![gallery](https://user-images.githubusercontent.com/40764780/142878993-88d09ccd-1f9e-433d-9bda-cda72f6da339.png)

### Technologies
- React
- MongoDB
- Express
- Bootstrap 4
- styled components

### Features

- Full featured shopping cart
- Car search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- PayPal / credit card integration

### Env Variables
Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
```

### Install Dependencies (frontend & backend)
```
npm install
cd frontend
npm install
```
### Run
```
Run frontend (:3000) & backend (:5000)
npm run dev

Run backend only
npm run server
```

Seed Database
You can use the following commands to seed the database with some sample users and products as well as destroy all data

### Import data
```
npm run data:import
```

### Destroy data
```
npm run data:destroy
```
### Admin Panel
```
user: admin@example.com
password: 123456
```
