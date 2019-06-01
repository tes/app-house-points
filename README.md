# House Points
House Points is a public application for demonstrating how approved 3rd party products can integrate with Tes using [OpenId Connect (OIDC)](https://openid.net/connect/). You can find it running on Heroku at http://tes-house-points.herokuapp.com/.

It demonstrates four scenarios:

1. Unauthenticated users
2. Authenticated users who not a member of a school that has a House Points subscription
3. Authenticated users who are a member of one or more schools that have a House Points subscription
4. Implementing Tes web analytics using the Tes mz tracking framework.

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
* OIDC client credentials (ask Tes)
* Access to the tes.com staging and/or production environments
* The [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)

#### Installation
```
git clone git@github.com:tes/app-house-points.git
cd app-house-points
npm install
```

#### Starting the application
```
TES_OIDC_CLIENT_ID=app-house-points \
TES_OIDC_CLIENT_SECRET=replace-with-real-secret \
TES_OIDC_PROVIDER_URL=replace-with-real-provider-url \
npm run dev
```
This should start the client side application on http://localhost:3000 (this may take a little time) and automatically proxy API and authentication requests to the server running on http://localhost:3001. Both client and server will monitor the filesystem for changes and automatically rebuild.

### Deployment
To deploy the application either navigate to enter the following commands...
```bash
heroku login # if not already logged in (you will need to be added as a collaborator in Heroku)
heroku git:remote -a tes-house-points # if not done before
git push heroku master
```

## Web Analytics

A web tracking strategy should be agreed between the 3rd party and Tes before adding the analytics library to the 3rd party site. The Tes data analytics team will provide the tracking events and expected values for these events.

### Meet mz

[mz](https://github.com/tes/app-house-points/wiki/Tes-mz-Web-Analytics) is the web analytics tool Tes uses on its own sites, read more about how mz works [here](https://github.com/tes/app-house-points/wiki/Tes-mz-Web-Analytics)

### How to implement mz

Before adding mz to the 3rd party site a number of steps need to be performed by Tes for setup.

1) Ensure the 3rd party site domain is added to the [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) list in Tes' event tracking service
2) The Tes data team have created a new data stream split for the 3rd party site (TBC).
3) As specified above a tracking strategy has been agreed between the 3rd party and Tes product / data.

When the above tasks have been completed the mz library can be added to the 3rd party site.

mz tracks by creating a `POST` request to the mz configured endpoint e.g. `https://www.tes.com/et`. To enable this cross-site request Tes has to enable the 3rd party domain in its CORS configuration.

Event data should be attached to the `TES.pageMetadata` and `TES.userMetadata` window objects. mz will automatically include this data with each event. Below is an example of how a page view can be tracked.

```html
<head>
  <script>
        window.TES = window.TES || {};
        window.TES.domain = 'https://www.tes.com';
        window.TES.pageMetadata = {
          type : 'home',
          section: 'news',
          subsection: 'article',
          employerData: {
            employerID: '123456'
          }
        };
        window.TES.userMetadata = {
          id: '13456'
        };
    </script>
    <script src="https://www.tes.com/cdn/mz/450/js/mz.js"></script>
</head>
<body>
  ...
    <script>
        _mz.emit(_mze.PAGE_VIEW);
    </script>
</body>
```

Some examples of the kinds of events mz can track:

* `PAGE_VIEW` - single fired event to capture page views
* `CLICK` - track button clicks
`DOWNLOAD` - tracks events related to downloads of assets and links to documents
* `SUBMIT` - fired on the next page after a successful submission of a job application.

A full list of supported events can be found [here](https://docs.google.com/spreadsheets/d/1FYdbR5bMdNaoj22nEvgeuLb3aMMt-cu_gbqR5GCgjHs/edit#gid=835562550)

Tes engineers will provide full assistance with different implementation requirements.

## Learn More
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
