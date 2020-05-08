# Going the Distance!
Discover what dis distance is between two points in different absurd values of measure.

Thios project is built with the following frameworks: 

[Node.js](https://nodejs.org/) for backend scaffolding
[Next.js](https://nextjs.org/) for routing
[`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app) for botstrapping and swift development and packaging
[`React.js`](https://reactjs.org/) for frontend development
[`styled-components`](https://react.js/) for addtional custom styles
[`react-simple-maps`](https://www.react-simple-maps.io/) for a simple map display


## Getting Started

This project equires a google maps api key. Locally, create a file at the root of the poject named '.env' and add in the following line:
```bash
GOOGLE_MAPS_API_KEY=youKeyGoesHere
```

To run in a production evenironment, make sure to have your deployment execute the following command, or run it in a shell locally:

```bash
npm run start
```


To diplay is a sandbox mode and develop locally:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Using Geoogle's Geocode API

The gecode api can be access independantly at 'api/geocode' Examples shown below:

```bash
http://localhost:3000/api/geocode?address=santa+monica+pier
http://localhost:3000/api/geocode?latlng=34.0099215,-118.4960063
```

Addtionally, distance can be calcuate from 'api/distance'. This will return an object with some basic location information and gemetric distance.  Orthodromic is provided with passing in the peramter  of 'type=o'. Examples shown below:

```bash
http://localhost:3000/api/distance?latlng1=34.0099215,-118.4960063&latlng2=34.050604,-118.2478573
http://localhost:3000/api/distance?address1=santa+monica+pier&address1=brabury+building&type=o
```

## Addtional notes

The google api requires a credit card on file, which slowed development process. make sure you have the correct credentails when deploying this application.

Future intallments will allow for better visuals on the map display, with more options and configuations, Also I would also like the option for multiple distances to be stored as refernce.

It was interesting to learn the differences about orthodromic distacnes (taking into account he curve of the earth.) I had used apis in the past for this and never did the math myself!