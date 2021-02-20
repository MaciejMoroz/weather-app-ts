import React, {lazy, Suspense} from 'react';
import Theme from 'theme/Theme'
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'theme/GlobalStyle';
import Loader from 'Components/Loader/Loader'

const WeatherApp = lazy(() => import('views/WeatherApp'));


function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={Theme}>
        <Suspense fallback={<Loader/>}>
          <WeatherApp/>
        </Suspense>
      </ThemeProvider>
    </>
  );
}

export default App;
