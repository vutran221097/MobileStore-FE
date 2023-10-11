# Mobile Website (MERN Stack)

## Mobile Website
An ecommerce website for selling mobile devices, full of features like quick-view, mange user-account, add to cart, check out, filter list product in Client Page. When it comes to Admin Page, you can observe a summary revenue dashboard, add/edit/delete product, manage the role of users.

## Technologies
Technologies used: MongoDB, Express, ReactJS, NodeJS, React Router, Redux thunk.

## Project Breakdown

### Server

- Directory: Server
- Features:
  - [x] Building api server (MVC model) - CRUD operations
  - [x] Generating schema models
  - [x] JWT Authentication
  - [x] Authenticating api based on user role

### Client App

- Directory: Client
- Features:
  - [x] Home page, Category page, Product detail page
  - [x] Cart page, Check out page, History orders page
  - [x] View history by phone number OTP (Firebase)
  - [x] Realtime chat with Tawk.to (using cdn)

### Admin App

- Directory: Admin
- Features:
  - [x] Private router with react router
  - [x] Login page - authenticate for role admin
  - [x] Dashboard to summarize data
  - [x] Create/Update/Delete products
  - [x] Show all orders - Update/Delete order
  - [x] User Page - Create/Delete/Update user

### Node version

- Node -v 18.17.1
- Npm -v 9.6.7

## Source code
- ClientApp / AdminApp: https://github.com/vutran221097/mobileweb-fe
- Server: https://github.com/vutran221097/mobileweb-be

### Clone or download the `E-commerce App` from source code
#### Client-side / Admin-site usage(PORT: 3000)
- Url: http://localhost:3000
- Change backend url to http://localhost:4000 in src/setup

```
$ yarn # or npm i    // npm install packages
$ npm start       // run it locally
```

#### Server-side usage(PORT: 4000)
- Url: http://localhost:4000
- Add the .env same with .env.example and replace all the variable by your account, config, origin same

```
$ npm i       // npm install packages
$ npm start // run it locally
```
