## Participedia Front-end code

This is a static content front-end site which powers the upcoming version 3
of Participedia.net.

It currently uses `hjs-webpack` for the basic build/update configuration (although see #16)

## Development Approach

React, redux where appropriate; react-router for all routes; `react-intl` localization (all copy should be localized).
`Auth0` for authentication.  Material-ui as baseline UI framework.

### Requirements

* `node` and `npm` v6 or later (node is just used in the build process)

### Setup

Clone the repo:

```
npm clone git@github.com:participedia/frontend.git
```

npm install:

```
npm install
```

### Configuration

One of two configuration files will be loaded depending on whether the code is run in production mode or development mode.  If in development mode, you should specify whether you're running your own instance of the API server, or want to use an existing API server (e.g. api.participedia.xyz).  Edit `config/development.env` accordingly (it comes with two example lines, the last one that isn't commented out will be used.

### Development

`npm start` will start a dev server which will detect code changes (both
in JS and CSS) and do "hot reloading".  It will not detect changes to the 
webpack config for example.

### Deployment

`npm build:js`

### Contributing

We use Javascript `Standard` as the linting style.

