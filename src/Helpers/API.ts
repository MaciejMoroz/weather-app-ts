const opencagedataAPi_KEY = process.env.REACT_APP_URL_opencagedataAPi_KEY;
const opencagedata_API_URL = 'https://api.opencagedata.com/geocode/v1/json'

function requestGetCityByName(cityName: string) {
    const config = {
        method: "GET",
        // headers: {
        //     "Content-type": "application/json",
        // }
    };

    const url = `${opencagedata_API_URL}?q=${cityName}&key=${opencagedataAPi_KEY}`;

    return fetch(url, config)
        .then(response => {
            if (response.ok)
                return response.json();

            if (response.status === 422)
                return response.json().then(err => { throw err; });
        });
}


function getCityByName(cityName: string) {
    return requestGetCityByName(cityName);
}


export default {
    getCityByName,
};
