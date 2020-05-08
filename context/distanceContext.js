import React, {createContext, Component, useReducer, useEffect} from 'react';
import {distanceReducer} from '../reducers/distanceReducer';

export const DistanceContext = createContext();

const DistanceContextProvider = props => {
    const {children} = props;
    const hasLocalStorage = typeof localStorage !== 'undefined';
    const [dists, dispatch] = useReducer(distanceReducer, {}, () => {
        const localData = hasLocalStorage && localStorage.getItem('dists') || null;
        return localData ? JSON.parse(localData) : {};
    });

    useEffect(() => {
        hasLocalStorage && localStorage.setItem('dists', JSON.stringify(dists));
    }, [dists]);

    return (
        <DistanceContext.Provider 
            value={
                {
                    dists,
                    dispatch
                 }
            }
        >
            {children}
        </DistanceContext.Provider>
    );
}

export default DistanceContextProvider;