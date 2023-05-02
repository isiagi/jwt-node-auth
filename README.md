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

const auth = new NodeAuth(process.env.jwt__secret, process.env.jwt_expiry);

 // Generate Token 
 To generate a JWT token, call the getSignedJwtToken method on the auth object:

 const token = auth.getSignedJwtToken({ userId: '12345' }); 
 //userId is token payload to be signed with token in generation.It can be any key value pair's like auth.getSignedJwtToken({ user: '12345', role: Admin, ... }).


 // Verify Token 
 To verify a JWT token, you can use the requireAuth middleware provided by the package. 
 This middleware can be used in the following ways.

 app.use(auth.requireAuth);
 // OR with Router
 router.get("/all", auth.requireAuth, testController.getAll);

 This will automatically verify the JWT token in the Authorization header of incoming requests. 

 //headers must have

`Authorization: Bearer ${token}`

Example
// "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgzMDIxMjU4LCJleHAiOjE2ODMwMjE3NTh9.jDVTDEoZsEG2m70qrxKzRcv1qo8er02PzFv3V-05ou0"

 If the token is valid, the middleware will set the req.user property to the decoded token payload.

 In protected a route
 
 console.log(req.user); //{ userId: '12345' }
 
``` 

 ## Contributing 

 Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.  

 Please make sure to update tests as appropriate.  

 ## License  

 [MIT](https://choosealicense.com/licenses/mit/)
