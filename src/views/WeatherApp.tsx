import React, { useState } from 'react';
import styled from 'styled-components';
import { MainWrapper } from 'Templates/MainWrapper/MainWrapper';
import { Container } from 'Templates/Container/Container';
import Loader from 'Components/Loader/Loader';
import Location from 'Components/Location/Location';
import API from 'Helpers/API';

const initialCity = 'Białystok';

interface WeatherAppProps {}

const WeatherApp: React.FC<WeatherAppProps> = ({}) => {
  const [currentCity, setCurrentCity] = useState(initialCity);

  //    console.log( API.getCityByName('Bialystok'))
  return (
    <MainWrapper>
      <Container>
        <Location
          currentCity={currentCity}
          setCurrentCity={setCurrentCity}
          countryIso2="PL"
        />
      </Container>
    </MainWrapper>
  );
};

export default WeatherApp;
