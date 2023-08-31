import * as React from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import theme from '../../themes/themes';


interface ChartInterface {
    dataChart: any,
}
const Chart: React.FC<ChartInterface> = ({ dataChart }: ChartInterface) => {
    return (
        <>
            <ResponsiveContainer width="99%" height={600}>
                <LineChart width={600} height={700} data={dataChart} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="price" stroke={theme.palette.primary.main} label="ASDASD" />
                    <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
                    <XAxis dataKey="time" label={{ value: "Intervalos", position: "outside", dy: 14 }} />
                    <YAxis label={{ value: "Cotización", position: "insideLeft", angle: -90, dy: -10 }} />
                    <Tooltip />
                    {dataChart.length != 0 && <Legend layout="horizontal" verticalAlign="top" align="center" />}
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}

export default Chart;