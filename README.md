# zimbra-admin-ui-ember

This project started off as an Ember Data front-end to the Zimbra SOAP APIs. Its purpose was to make it easier to get started with managing a Zimbra server from JavaScript.

Later a Bootstrap based adaptive UI was added, to put the Ember Data bindings through their paces. This makes the project a good launchpad for a custom administrative UI.

Watch the [Inroduction Video](http://youtu.be/zSKwlW7L5uw) on YouTube.

## Goals

* Use [Ember CLI](http://www.ember-cli.com) for project scaffolding and [Bower](http://bower.io/)-based dependency management.
* Provide Ember Data models and SOAP-based Adapter for common tasks, such as managing users and aliases.
* Provide a minimal adaptive UI and routes to exercise the data layer, and for use by others kicking off new projects.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM) and [Bower](http://bower.io/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at http://localhost:4200.

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [Zimbra SOAP API Reference](http://wiki.zimbra.com/wiki/SOAP_API_Reference_Material_Beginning_with_ZCS_8.0)
* ember: [http://emberjs.com]()
* ember-cli: [http://www.ember-cli.com/]()
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
