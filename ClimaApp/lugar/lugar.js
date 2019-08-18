const axios = require("axios");

const getLugarLatitudYLongitud = async ( direccion ) => {
    const location = encodeURI(direccion);

    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${location}`,
        timeout: 1000,
        headers: {'x-rapidapi-key': 'cde5c85664msh77ee7834d3b75d9p19e3fejsn36aae132255f'}
    }); 

    const result = await instance.get();
    const res = result.data.Results[0];
    if(res === 0) {
        throw new Error(`No hay resultados para ${location}`);
    } else {
        const { lat, lon, name } = res;
        return {
            lat,
            lon,
            name
        }
    }
}

module.exports = {
    getLugarLatitudYLongitud
}