import React, {useContext, useState} from 'react';
import {DistanceContext} from '../context/distanceContext';
import styled from 'styled-components';
import axios from 'axios';

const port = process.env.PORT || 3000

const FormWrapper = styled.form`
    display: flex;
    flex-direction: row;
    font-size: 1rem;
    padding: 1rem;
    width: 90vw;
    margin: 1vh 5vw;
    border-radius: 0.5rem;
    background-color: #f8f8f7;
    box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.3);

    @media (max-width: 600px) {
        min-width: 98vw;
      }

    &:focus {
        outline: none;
        outline-width: 0;
    }
`;

const FormColumn = styled.div`
    flex:1;
    text-align:left;
    padding: 0 1em;
    min-height: 100%;
`;

const Input = styled.input`
    left: 0;
    padding: 0.25rem;
    margin: 0.5rem 0;
    width: 100%;
    background: transparent;
    border: 1px solid transparent;
    border-bottom: 1px solid #a5a7a3;
    text-indent: 0.25rem;

    &:focus {
        outline: none;
        outline-width: 0;
    }
`;

const Button = styled.button`
    font-size: 1rem;
    padding: 0.25rem 0.5rem;
    margin: 0.25rem 0;
    border-radius: 2rem;
    text-align: center;
    background-color: #999;
    border: none;
    color: #f8f8f7;
    font-family: 'Nunito-Light';
    font-weight: 100;
    cursor: pointer;

    &:hover {
        box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.125);
    }

    &:focus {
        outline: none;
        outline-width: 0;
    }
`;

const Error = styled.div`
    font-size: 1rem;
    heioght: 1rem;
    padding: 0.25rem 0.5rem;
    margin: 0.25rem 0;
    text-align: center;
    border: none;
    color: #f44336;
    font-family: 'Nunito-Light';
    font-weight: 100;
`;

const distanceForm = () => {
    const {dispatch, dists} = useContext(DistanceContext);
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [error, setError] = useState('');

    //our submit handler. Generates a time stamp and uses state values to add a new todo
    const handleSubmit = e => {
        e.preventDefault();
        if (address1 === '' || address2 === '') {
            setError('Please provide two adresses.');
            return;
        }

        axios.get('api/distance', {params: {address1, address2, type: 'orthodromic'}})
        .then(({data}) => {
            const dists = data;
            dispatch({ type: 'UPDATE_DISTANCE', dists: {dists}});
            setAddress1('');
            setAddress2('');
            setError();
        })
        .catch(error => {
            setError('Sorry, please try again later.');
            console.log(JSON.stringify(error));
        });
    };

    return (
        <FormWrapper onSubmit={handleSubmit}>
            <FormColumn>
            <Input 
                type="text"
                placeholder="Address #1" value={address1}
                onChange={(e) => setAddress1(e.target.value)} 
                required
            />
            <Button>Calculate</Button>
            </FormColumn>
            <FormColumn>
                <Input 
                    type="text"
                    placeholder="Address #2" value={address2}
                    onChange={(e) => setAddress2(e.target.value)} 
                    required
                />
                <Error>{error}</Error>
            </FormColumn>
        </FormWrapper>
    );
}
 
export default distanceForm;