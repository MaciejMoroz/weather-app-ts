const opencagedataAPi_KEY = process.env.REACT_APP_URL_opencagedataAPi_KEY;
const opencagedata_API_URL = 'http://api.openweathermap.org/geo/1.0/';

function requestCityByName(cityName: string) {
  const config = {
    method: 'GET',
  };
  const url = `${opencagedata_API_URL}direct?q=${cityName}&limit=10&appid=${opencagedataAPi_KEY}`;

  return fetch(url, config).then((response) => {
    if (response.ok) {
      return response.json();
    }

    if (!response.ok) {
      return response.json().then((err) => {
        throw err;
      });
    }
  });
}

function requestCityByGeo(lat: number | null, lon: number | null) {
  const config = {
    method: 'GET',
  };
  const url = `${opencagedata_API_URL}reverse?lat=${lat}&lon=${lon}&limit=10&appid=${opencagedataAPi_KEY}`;

  return fetch(url, config).then((response) => {
    if (response.ok) {
      return response.json();
    }

    if (!response.ok) {
      return response.json().then((err) => {
        throw err;
      });
    }
  });
}

function getCityByName<T>(cityName: string): Promise<T> {
  return requestCityByName(cityName);
}

function getCityByGeo<T>(lat: number | null, lon: number | null): Promise<T> {
  return requestCityByGeo(lat, lon);
}

export default {
  getCityByName,
  getCityByGeo,
};
