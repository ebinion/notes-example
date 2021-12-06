# Notes - A sample React application

[![Netlify Status](https://api.netlify.com/api/v1/badges/2b9eb17e-2b40-4a1a-a8ea-b6f9bebe5c40/deploy-status)](https://app.netlify.com/sites/laughing-sinoussi-90cb37/deploys)

This minimally featured “notes” app leverages modern tools – including Framer Motion, Redux, React, Storybook, and Firebase – to deliver a Responsive notetaking experience.

## High-Level User Stories

The following user stories represent high-level functionality offered in the application. In real-life software development, these stories would serve as a basis for creating more detailed stories that convey the value of individual features to their intended audience and break the work into more manageable pieces.

_As a user..._

- I want my notes to only be accessible to me (user authentication & account creation)
- I want to CRUD (create, read, update, and delete) my own notes
- I want to style my note (bold, italic, code)
- I want to be warned if an action I take could cause data loss (e.g. navigating away from app)
- I want changes to my note to be automatically saved
- I want my "dark mode" preferences to be observed

## Development

This project uses NPM for package management and Create React App for development. See [Create React App's Readme](README-Create-React-App.md) for instructions and available scripts.

### Start a local dev server

```
$ npm start
```

### Start Storybook

```
$ npm run storybook
```
