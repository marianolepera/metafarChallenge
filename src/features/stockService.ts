import axios from 'axios'

const API_URL = "https://api.twelvedata.com/"
const API_KEY = "5aa6e43b06094cb9a10f5197ab312fff"
const getDataStocks = async () => {
    try {
        const {data} = await axios.get(API_URL + `stocks?source=docs&exchange=NYSE&apikey=${API_KEY}`)
        data?.data.forEach((item:any, i:number) => {
            item.id = i + 1;
          });
        return data?.data
    } catch (error:any) {
        return error.message
    }
}

const getDataChartTiempoReal = async (symbol:string, intervalo:string) => {
    try {
        const {data} = await axios.get(API_URL + `time_series?symbol=${symbol}&interval=${intervalo}&apikey=${API_KEY}`)
        return data
    } catch (error:any) {
        return error.message
    }
}

const searchDataBySymbol = async (symbol:string) => {
    try {
        const {data} = await axios.get(API_URL+ `stocks?source=docs&symbol=${symbol}&exchange=NYSE&apikey=${API_KEY}`);
        data?.data.forEach((item:any, i:number) => {
            item.id = i + 1;
          });
        return data?.data
    } catch (error:any) {
        return error.message
    }
}


const getDataChartHistorico = async (symbol:string, intervalo:string,startDate: string, endDate: string) => {
    try {
        const {data} = await axios.get(API_URL + `time_series?symbol=${symbol}&interval=${intervalo}&start_date=${startDate}%2009:48:00&end_date=${endDate}%2019:48:00&apikey=${API_KEY}`)
        return data
    } catch (error:any) {
        return error.message
    }
}

const stockServices ={
    getDataStocks,
    getDataChartTiempoReal,
    getDataChartHistorico,
    searchDataBySymbol,
}

export default stockServices