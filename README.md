# Full Stack Dev test

The goal is to show a in a web view the avaiability of each location of City Bikes in Miami FL stations. For this project we will be using NodeJS / Socket IO / React and LeafLet Maps. For the data we are extracting availability from https://citybik.es/ to build the app.

## Objective 

- Complete the code to show in map via socket.io the availability of bikes at each station.
- Generate a PR to submit your code. 

## Requirements (Node Modules)

- Nodejs & NPM
- Express.js / Socket IO / Axios
- React / React-Leaflet

## Folder Structure

There are two parts for the web app:

The server

`cd /citibike-server`

This is the node socket.io Server app to start :

`node server.js`

Then run the client app

`cd /citibike-client`

That is the client React Application to start :

`npm strat`

# Resolve 

This repo contains my solution, using `localStorage` to keep the "re-play" data. Also using the `useState` and `useEffect` the new "react stantard".

**To check the history, first you need to wait for some API data. Every `ws` request is stored into `localStorage` up to 100 items.**

