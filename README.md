# The Shoppies - by Alexander Zenner

## Link to deployed app: [zenner.org/shoppies](https://zenner.org/shoppies)
___ 

## Overview
This project was setup with
- React / [Create React App](https://github.com/facebook/create-react-app) 
- Components from [Shopify Polaris](https://polaris.shopify.com/)
- hosting on [Github Pages](https://pages.github.com/)
- ❤️

### My Design Goal
I chose to use Shopify Polaris, because
  - I wanted the app to have the look and feel of an actual Shopify app
  - I love exploring new design systems :)

I challenged myself to replicate the design shown in the challenge description doc. \
After replicating the design I added a few more touches to help the user, including some instructions and a link back to this repository (+ see the "Extras added" below).

___

## Features
### Technical Requirements (from the challenge description doc)
- [x] Search results should come from OMDB's API
- [x] Each search result should list at least its title, year of release and a button to nominate that film.
- [x] Updates to the search terms should update the result list
- [x] Movies in search results can be added and removed from the nomination list.
- [x] If a search result has already been nominated, disable its nominate button.
- [x] Display a banner when the user has 5 nominations.

### Extras added
- [x] Display spinner when results are being fetched 
- [x] Display overview of how many nominations the user has made and how many they can still make
- [x] Once the user has 5 nominations, all nominate buttons are disabled, so no more nominations can be added
- [x] SSL Encrypted Traffic
- [x] Shopify Favicon
___

## Setup
- clone this repository
- in the project directory run
  - `npm install`
- now you can run
  - `npm start`
    - Runs the app in the development mode.\
    - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
  - `npm run build`
    - Builds the app for production to the `build` folder.\
