// --- helper functions ---

  //basic  string manipulation
  export const getlatLngArray = latlngString => {
    return latlngString.split(',', 2);
  };

  //converts degrees to rad
  export const deg2rad = deg => {
    return deg * (Math.PI/180);
  };

  //gets the basic distance between two points by calculating the hypotenuse
  export const geometricDist = (lat1,lng1,lat2,lng2) => {
    const diffLat = lat1 - lat2;
    const diffLng = lng1 - lng2;
    return Math.hypot(diffLat, diffLng);
  };

  //gets the distance taking into account the curve of earth using the haversine formula
  export const orthodromicDist = (lat1,lng1,lat2,lng2) => {
    const RADIUS_KM = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2-lat1);  // deg2rad below
    const dLng = deg2rad(lng2-lng1); 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLng/2) * Math.sin(dLng/2)
      ; 
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      const distance = RADIUS_KM * c;
    return distance;
  };

//basic response of json with just ther distance object
export const returnDistance = (latlng1, latlng2, type) => {
    const [lat1, lng1] = getlatLngArray(latlng1);
    const [lat2, lng2] = getlatLngArray(latlng2);
    let distance = null;
    
    if (
          type === 'orthodromic' ||
          type === 'o'
        ) {
        distance = orthodromicDist(lat1, lng1, lat2, lng2);
    } else {
        distance = geometricDist(lat1, lng1, lat2, lng2);
    }
    return distance;
};
    