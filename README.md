# House Points
House Points is a public application for demonstrating how approved 3rd party products can integrate with Tes using [OpenId Connect (OIDC)](https://openid.net/connect/). You can find it running on Heroku at http://tes-house-points.herokuapp.com/.

It demonstrates three scenarios:

1. Unauthenticated users
2. Authenticated users who not a member of a school that has a House Points subscription
3. Authenticated users who are a member of one or more schools that have a House Points subscription

### Limitations
The most significant limitation of this demo is that House Points does not have it's own user database. Instead it is fully reliant on tes.com accounts. A real 3rd party application is likely to have existing users, that must somehow be associated with equivalent users on tes.com. There are multiple strategies for attempting this which must be taken on a case by case basis

Other limitations include:

* The application assumes that the 3rd party application has a database of schools which have already been associated with tes.com portal accounts via the tes onlineId
* The application does not confirm the identity of the user if they are already logged on to tes.com 
* The application does not honour the OIDC token expiry time
* The application does not honour the entitlements start / end date

### Development
#### Pre Requisits
* [Node.js](https://nodejs.org/en/) v8 or greater
* [Nodemon](https://nodemon.io/) (optional)
* OIDC client credentials (ask Tes)
* Access to the tes.com product and/or staging environments

#### Starting the application 
When running locally it is easiest to start the the server and client side parts of the application separately...
```
npm start
```
```
TES_OIDC_CLIENT_ID=app-house-points TES_OIDC_CLIENT_SECRET=replace-with-real-secret TES_OIDC_PROVIDER_URL=replace-with-real-provider-url nodemon server
```

This should start the client side application on http://localhost:3000 and automatically proxy API and authentication requests to the server running on http://localhost:30001. Both client and server will montitor the filesystem for changes and automatically rebuild.

### Deployment
The application is automatically deployed to [Heroku](https://www.heroku.com/) when changes are pushed to master.

## Learn More
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
