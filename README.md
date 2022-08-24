# Github finder

A simple application to find Github user by their username and display a card with informations about them.

The goal of this project was to learn how to create a custom Webpack configuration to build, develop and minimize a web application. I used the bootstrap library for styling. For the Javascript, the focus was on document node creation, the fetch API and the use of functions.

[Live preview](https://githubfinder.francispelletier.ca)

## Table of Contents

<!-- vim-markdown-toc GFM -->

- [Feature overview](#feature-overview)
- [Requirements](#requirements)
  - [Node js LTS](#node-js-lts)
- [Installation](#installation)
  - [Development](#development)
  - [Development Server](#development-server)
  - [Production](#production)
  - [serve the production build locally](#serve-the-production-build-locally)
  - [Deployment](#deployment)

<!-- vim-markdown-toc -->

## Feature overview

- Minimize Html
- Minimize and bundle Javascript
- [Bootstrap](https://getbootstrap.com/)

## Requirements

- `Node js LTS` ([Node.js](https://nodejs.org/en/download/))

### Node js LTS

Assuming you have [Node Version Manager](https://github.com/nvm-sh/nvm) installed

```
$ nvm install --lts
```

## Installation

### Development

Clone the repository

```
$ git clone https://github.com/fpelletier-gh/github-finder
```

Change directory

```
$ cd github-finder
```

### Development Server

Launch the development server

```
$ npm run start
```

> If you have problem with the development server make sure you are using the LTS version of Node js (version 16.17.0)

### Production

Create the production build

```
$ npm run build
```

> The production files will be created in the "dist" folder at the root of the project.

### serve the production build locally

Serve the production build locally

```
$ npm run serve
```

Open the URL

```
localhost:3000
```

### Deployment

Some Deployment options

- [Vercel](https://vercel.com/)
- [Netlify](https://netlify.com/)
