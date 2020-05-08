import {Client, Status} from "@googlemaps/google-maps-services-js"; // google's api
import axiosInstance from 'axios'; // goes our fetch calls 

const TIMEOUT = 15000;  // milliseconds

export default (req, res) => {
  const {address, latlng} = req.query;
  const key = process.env.GOOGLE_MAPS_API_KEY;
  const client = new Client({});

  //returns if there are no query params
  if (!address && !latlng){
    res.json({error: 'No parameters provided. Please see api intructions for examples.'});
  }

  client.geocode({
    params: {
      address,
      latlng,
      key
    },
    timeout: TIMEOUT
  }, axiosInstance).then(result => {
    //console out any errors from the request
    if (result.data.status !== Status.OK) {
      console.log(result.data.error_message);
    }
    //if there is no second adress return result
    return res.json(result.data.results[0]);
  })
  .catch(err => {
    return res.json(err);
  });
};
