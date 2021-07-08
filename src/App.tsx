import React, { lazy, Suspense, useState } from 'react';
import Theme from 'theme/Theme';
import { ThemeProvider } from 'styled-components/macro';
import GlobalStyle from 'theme/GlobalStyle';

import { MainWrapper } from 'Templates/MainWrapper/MainWrapper';
import { Container } from 'Templates/Container/Container';
import Loader from 'Components/Loader/LoaderPrimary';
// import Location from 'Components/Location/Location';
import API from 'Helpers/API';

const Location = lazy(() => import('Components/Location/Location'));

export interface ICity {
  name: string;
  country: string;
  lat: number;
  lon: number;
  local_names?: unknown;
}

const initialCity = {
  name: 'Białystok',
  country: 'PL',
  lat: 53.1333,
  lon: 23.15,
};

function App() {
  const [currentCity, setCurrentCity] = useState<ICity>(initialCity);
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={Theme}>
        <Suspense fallback={<Loader />}>
          <MainWrapper>
            <Container>
              <Location
                currentCity={currentCity}
                setCurrentCity={setCurrentCity}
              />
            </Container>
          </MainWrapper>
        </Suspense>
      </ThemeProvider>
    </>
  );
}

export default App;
