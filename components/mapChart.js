import React, {useContext} from 'react';
import {DistanceContext} from '../context/distanceContext';
import styled from'styled-components';
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Line,
  Marker,
  Sphere
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


  const MapWrapper = styled.div`
    width: 96vw;
    height: calc(96vw * .5);
    background-color: #526b61;
    border-radius: 5rem;
    margin: 2vh 2vw 0;
    border-bottom: 3px solid #42594f;
    border-top: 1px solid #5c8976;

    font-size: 0.75rem;
    font-weight: bold

  `;

const Kilometers = styled.h2`
  color: #fff;
  text-align: center;
  margin-top: -5rem;
  font-size: 3rem;
`;

function generateCircle(deg) {
  if (!deg) return [[-180, 0], [-90, 0], [0, 0], [90, 0], [180, 0]];
  return new Array(361).fill(1).map((d, i) => {
    return [-180 + i, deg];
  });
}

const MapChart = () => {
  const {dists} = useContext(DistanceContext);
  const {start, end, distance} = dists.dists || {};

  const cleanDist = distance && Math.floor(distance);


  return (
    <>
    <MapWrapper>
        <ComposableMap 
        width={800}
        height={400}
        projectionConfig={{
            scale: 147
      }}>
        <Sphere stroke="#42594f" />
        <Graticule stroke="#42594f" />
        <Geographies geography={geoUrl} stroke="#496057" strokeWidth={0.5}>
            {({ geographies }) =>
            geographies.map(geo => {
                return (
                <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={"#63937f"}
                />
                );
            })
            }
        </Geographies>
          {start && end &&
            <Line
            to={[start.location.lng, start.location.lat]}
            from={[end.location.lng, end.location.lat]}
            stroke="#e49d31"
            strokeWidth={4}
            strokeLinecap="round"
          />
          }
          {start && 
            <Marker coordinates={[start.location.lng, start.location.lat]} fill="#777">
              <text textAnchor="middle" fill="#fff">
                {start.name}
              </text>
            </Marker>
          }
          {end && 
            <Marker coordinates={[end.location.lng, end.location.lat]} fill="#777">
              <text textAnchor="middle" fill="#fff">
                {end.name}
              </text>
            </Marker>
          }
        </ComposableMap>
    </MapWrapper>
    <Kilometers>{distance && `${cleanDist} kilometers`}</Kilometers>
    </>
  );
};

export default MapChart;
