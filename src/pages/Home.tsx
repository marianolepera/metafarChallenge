import * as React from 'react';
import TableStock from "../components/table/Table";
import { DataStock } from "../interfaces/interfaces";
import stockServices from '../features/stockService';
import Loader from '../components/loader/Loader';
import { Typography } from '@mui/material';

const Home = () => {
    const [stocks, setStocks] = React.useState<DataStock[]>([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(false)
    const getStocks = async () => {
        setLoading(true)
        try {
            const data = await stockServices.getDataStocks()
            setStocks(data)
            setLoading(false)
        } catch (error: any) {
            setLoading(false)
            setError(true)
            return error.message
        }

    }

    React.useEffect(() => {
        getStocks()
    }, [])

    if (loading) return <Loader size={60}></Loader>

    if (error) return <> <Typography sx={{ textAlign: "center" }}>Hubo un error en el servidor</Typography></>

    return (
        <>
            <TableStock stocks={stocks}></TableStock>
        </>
    )
}

export default Home;