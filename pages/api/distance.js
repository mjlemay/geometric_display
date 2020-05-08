import axios from 'axios'; // does our fetch calls 
import {
  returnDistance,
  getlatLngArray
} from '../../utils/distance'; //utility fuctions

const protocol = process.env.PROTOCOL || 'http://'; // defaults to http

export default (req, res) => {

  const {address1, address2, latlng1, latlng2, type} = req.query;
  let distance = null;

  //returns if there are no query params
  if (!address1 && !latlng1){
    res.json({error: 'No parameters provided. Please see api intructions for examples.'});
  }
  if (!address2 && !latlng2) {
    res.json({error: 'Please provide two locations. Please see api intructions for examples.'});
  }

  if (!address1 && !address2) {
    //returns the dist object, just with defaulted names
    const [lat1, lng1] = getlatLngArray(latlng1);
    const [lat2, lng2] = getlatLngArray(latlng1);

    returnDistance(latlng1, latlng2, type);
    
    return res.json({
      start: {
        name: 'Location 1',
        location: {lat:lat1, lng:lng1}
      },
      end: {
        name: 'Location 2',
        location: {lat:lat2, lng:lng2}
      },
      distance
    });
  }
  //does our promise all and gets data
    const host = req.headers.host;
    axios.all([
      axios.get(`${protocol}${host}/api/geocode`, {params: {'address':address1}}),
      axios.get(`${protocol}${host}/api/geocode`, {params: {'address':address2}}),
    ])
    .then(axios.spread((address1Res, address2Res) => {
      // do something with both responses
      const location1 = address1Res.data.geometry.location;
      const location2 = address2Res.data.geometry.location;
      const name1 = address1Res.data.address_components[0].short_name;
      const name2 = address2Res.data.address_components[0].short_name;
      const latlng1 = `${location1.lat}, ${location1.lng}`;
      const latlng2 = `${location2.lat}, ${location2.lng}`;
      const distance = returnDistance(latlng1, latlng2, type);

      res.json({
        start: {
          name: name1,
          location: location1
        },
        end: {
          name: name2,
          location: location2
        },
        distance
      });
    }))
    .catch(err => {
      console.log('err', err);
      return res.json(err);
    });
};
