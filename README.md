# Github finder

A simple application to find Github user by their username and display a card with some of their information.

The goal of this project was to learn how to create a custom Webpack configuration to build, develop and minimize a web application. I used the bootstrap library for styling. For the Javascript, the focus was on document node creation, the fetch API and the use of functions.

[Live preview](https://githubfinder.francispelletier.ca)

## Requirements

- `Node js LTS` ([Node.js](https://nodejs.org/en/download/))

### Node js LTS

Assuming you have [Node Version Manager](https://github.com/nvm-sh/nvm) installed:

```
$ nvm install --lts
```

## Installation

### Setup for local development:

Clone the repository:

```
$ git clone https://github.com/fpelletier-gh/github-finder
```

Change directory:

```
$ cd github-finder
```

Launch the development server:

```
$ npm run start
```

> If you have problem with the development server make sure you are using Node js version 16.17.0

### Setup for production:

Create the production build:

```
$ npm run build
```

> The production files will be created in the "dist" folder at the root of the project.

Serve the production build locally:

```
$ npm run serve
```

Open the URL:

```
localhost:3000
```

**_Deploy the "dist" folder to your favorite CDN_**
