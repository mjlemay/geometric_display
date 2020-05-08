import React from 'react';
import Head from 'next/head';
import styled from'styled-components';
import DistanceContextProvider from '../context/distanceContext';
import DistanceForm from '../components/distanceForm';
import MapChart from '../components/mapChart';

const Header = styled.h1`
  font-family: 'Nunito-Light';
  text-align: center;
  width: 100%;
  color: #e49d31;
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Going The Distance
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Header>Going The Distance</Header>
      <DistanceContextProvider>
        <DistanceForm />
        <MapChart />
      </DistanceContextProvider>

      <style jsx global>{`

      @font-face {
        font-family: 'Nunito';
        font-style: normal;
        src: url('/fonts/Nunito-Regular.ttf');
        font-weight: 300;
        font-style: normal;
      }
      @font-face {
        font-family: 'Nunito-Bold';
        font-style: normal;
        font-weight: 600;
        src: url('/fonts/Nunito-Bold.ttf');
      }
      @font-face {
        font-family: 'Nunito-Light';
        font-style: normal;
        font-weight: 100;
        src: url('/fonts/Nunito-Light.ttf')
      }


        html,
        body {
          padding: 0;
          margin: 0;
          font-family: Nunito, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          background-color: #4A5F57;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  )
}
