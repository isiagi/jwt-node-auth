# JWT-Node-Auth

**JWT-Node-Auth** is a NodeJS authentication package using JWT in the background. This package let you generate a JWT Token and Verify the token on a fly.

## Installation

```bash
npm install jwt-node-auth
```

## Usage

To use jwt-node-auth in your NodeJS application, you'll need to create a new instance of the NodeAuth class:

```js
const { NodeAuth } = require("jwt-node-auth");
const auth = new NodeAuth(process.env.jwt__secret);

 // Generate Token 
 To generate a JWT token, call the getSignedJwtToken method on the auth object:

 const token = auth.getSignedJwtToken({ userId: '12345' }, process.env.jwt_expiry);


 // Verify Token 
 To verify a JWT token, you can use the authenticationMiddleware middleware provided by the package. To use this middleware, first add the following line to your code:

 app.use(auth.authenticationMiddleware);

 This will automatically verify the JWT token in the Authorization header of incoming requests. If the token is valid, the middleware will set the req.user property to the decoded token payload.

 In protected a route
 
 console.log(req.user); //{ userId: '12345' }
 
``` 

 ## Contributing 

 Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.  

 Please make sure to update tests as appropriate.  

 ## License  

 [MIT](https://choosealicense.com/licenses/mit/)
