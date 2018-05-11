# Map Search Application

This application allows you to search for locations and compute the shortest distance.

The ProductMapScreen shows the map with Location Autocomplete Search capability. Users are able to search and add places to a list of destinations.

The project is built on top of Expo Demo Project, where the _LinksScreen_ returns a MapScreen and SettingsScreen returns a practice todo app

## Quick Start

* Install Expo and Expo XDE
* Create `config.js`
* export the Google API key as `DEV_API` from `config.js`
* Run Expo XDE and Simulator or mobile device

## Immediate Todos

* Use Google Distance Matrix API to compute the relative distances between each location
* Use Nearest Neighbour heuristics to solve travelling salesman problem https://web.tuke.sk/fei-cit/butka/hop/htsp.pdf
