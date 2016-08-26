## Participedia Front-end code

This is a static content front-end site which powers the upcoming version 3
of Participedia.net.

It uses `hjs-webpack` for the basic build/update configuration.

## Development Approach

React, redux where appropriate; react-router for all routes; `react-intl` localization (all copy should be localized).
`Auth0` for authentication.

### Requirements

* npm v6

### Setup

* clone the repo
* npm install


### Development

`npm start` will start a dev server which will detect code changes (both
in JS and CSS) and do "hot reloading".  It will not detect changes to the 
webpack config for example.

### Deployment

`npm build:j

### Contributing

We use Javascript `Standard` as the linting style.

