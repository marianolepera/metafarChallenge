import * as React from 'react';
import { Box, Divider, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { buttonContainer, buttonStyles, checkBoxContainer, datePickerStyles, detailContainer, header, headerIntervalo, intervaloTypo, selectStyles } from "./styles";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { DateTimePicker, DateValidationError, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Chart from '../chart/Chart';
import stockServices from '../../features/stockService';
import { useLocation } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import Modal from '../modal/Modal';




const StockDetail = () => {
    const [open, setOpen] = React.useState(false);
    const [graficadoReal, setGraficadoReal] = React.useState(false);
    const [typeModal, setTypeModal] = React.useState("");
    const location = useLocation();
    const stock = location.state?.stock;
    const [loading, setLoading] = React.useState(false);
    const [value, setValue] = React.useState('real');
    const [dataChart, setDataChart] = React.useState([]);

    const [dateValueDesde, setDateValueDesde] = React.useState<Dayjs | null>(dayjs(new Date));
    const [dateValueHasta, setDateValueHasta] = React.useState<Dayjs | null>(dayjs(new Date));
    const [error, setError] = React.useState<DateValidationError | null>(null);
    const [intervalo, setIntervalo] = React.useState('5min');

    const errorMessage = React.useMemo(() => {
        switch (error) {
            case 'maxDate': {
                return "Seleccione una fecha menor que la de hasta"
            }
            case 'minDate': {

                return 'Seleccione una fecha mayor';
            }
            case 'invalidDate': {
                return 'La fecha ingresada no es valida';
            }
            default: {
                return '';
            }
        }
    }, [error]);


    const handleChangeDateDesde = (newValue: Dayjs | null) => {
        setDateValueDesde(newValue);
    };

    const handleChangeDateHasta = (newValue: Dayjs | null) => {
        setDateValueHasta(newValue);
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value == "historico") {
            setGraficadoReal(false)

        }
        setValue((event.target as HTMLInputElement).value);
    };


    const handleChangeIntervalo = (event: SelectChangeEvent) => {
        setIntervalo(event.target.value as string);
    };

    const getTiempoReal = async () => {
        let auxObject = {}
        const chartAux: any = []
        const result = await stockServices.getDataChartTiempoReal(stock?.symbol, intervalo);
        if (result?.status == "ok") {
            result?.values.map((item: any) => {
                auxObject = {
                    time: item?.datetime.substring(11, 16),
                    price: (parseFloat(item?.high) + parseFloat(item?.low) + parseFloat(item?.open)) / 3
                }
                chartAux.push(auxObject)
            })
            setGraficadoReal(true)
            setDataChart(chartAux)
            setLoading(false)
        }
    }
    React.useEffect(() => {
        if (graficadoReal == true && value == "real") {
            let INTERVALO = 0
            if (intervalo == "5min") {
                INTERVALO = 300000
            } else if (intervalo == "15min") {
                INTERVALO = 900000
            } else {
                INTERVALO = 60000
            }
            const interval = setInterval(() => {
                getTiempoReal()
            }, INTERVALO)

            return () => clearInterval(interval)
        }
    }, [getTiempoReal])

    const graficar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        const valueDateDesdeFormat = dayjs(dateValueDesde).format("YYYY-MM-DD");
        const valueDateHastaFormat = dayjs(dateValueHasta).format("YYYY-MM-DD");

        if (value == "historico") {
            let auxObject = {}
            const chartAux: any = []
            const result = await stockServices.getDataChartHistorico(stock?.symbol, intervalo, valueDateDesdeFormat, valueDateHastaFormat);
            if (result?.status == "ok") {
                result?.values.map((item: any) => {
                    auxObject = {
                        time: item?.datetime.substring(11, 16),
                        price: (parseFloat(item?.high) + parseFloat(item?.low) + parseFloat(item?.open)) / 3
                    }
                    chartAux.push(auxObject)
                })
                setDataChart(chartAux)
                setLoading(false)
            } else if (result?.status == "error") {
                if (result?.message.includes("No data")) {
                    setTypeModal("noData")
                    setOpen(true)
                    setLoading(false)
                }
                else if (valueDateDesdeFormat == valueDateHastaFormat) {
                    setTypeModal("iguales")
                    setOpen(true)
                    setLoading(false)
                } else {
                    setTypeModal("distintos")
                    setOpen(true)
                    setLoading(false)
                }

            }

        } else {
            let auxObject = {}
            const chartAux: any = []
            const result = await stockServices.getDataChartTiempoReal(stock?.symbol, intervalo);
            if (result?.status == "ok") {
                result?.values.map((item: any) => {
                    auxObject = {
                        time: item?.datetime.substring(11, 16),
                        price: (parseFloat(item?.high) + parseFloat(item?.low) + parseFloat(item?.open)) / 3
                    }
                    chartAux.push(auxObject)
                })
                setGraficadoReal(true)
                setDataChart(chartAux)
                setLoading(false)

            }
            else {
                setTypeModal("distintos")
                setOpen(true)
                setLoading(false)
            }

        }

    }
    return (
        <>
            <Box sx={detailContainer}>
                <Box sx={header}>
                    <Typography variant="h6"> {stock?.exchange} - {stock?.name} - {stock?.currency}</Typography>
                </Box>
                <Divider></Divider>
                <Box sx={checkBoxContainer}>
                    <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => graficar(e)}>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={value}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="real" control={<Radio />} label="Tiempo Real" />
                                <Box sx={header}>
                                    <FormControlLabel value="historico" control={<Radio />} label="Histórico" />
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            disabled={value == "real" ? true : false}
                                            sx={datePickerStyles}
                                            label="Fecha Desde"
                                            onError={(newError: any) => setError(newError)}
                                            value={dayjs(dateValueDesde)}
                                            onChange={handleChangeDateDesde}
                                            slotProps={{ textField: { variant: 'outlined' } }}
                                        />
                                        <DateTimePicker
                                            disabled={value == "real" ? true : false}
                                            sx={datePickerStyles}
                                            label="Fecha Hasta"
                                            onError={(newError: any) => setError(newError)}
                                            value={dayjs(dateValueHasta)}
                                            onChange={handleChangeDateHasta}
                                            slotProps={{ textField: { variant: 'outlined', helperText: errorMessage, } }}
                                            minDate={dayjs(dateValueDesde)}
                                            minTime={dayjs(dateValueDesde)}
                                        />
                                    </LocalizationProvider>
                                </Box>
                                <Box sx={headerIntervalo}>
                                    <Typography sx={intervaloTypo}> Intervalo</Typography>
                                    <FormControl sx={selectStyles}>
                                        <Select
                                            variant='outlined'
                                            value={intervalo}
                                            onChange={handleChangeIntervalo}
                                        >
                                            <MenuItem value="1min">1 minutos</MenuItem>
                                            <MenuItem value="5min">5 minutos</MenuItem>
                                            <MenuItem value="15min">15 minutos</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box sx={buttonContainer}>
                                    <LoadingButton loading={loading} sx={buttonStyles} type="submit" variant='contained'>
                                        Graficar
                                    </LoadingButton>
                                </Box>
                                <Modal typeModal={typeModal} open={open} setOpen={setOpen} />
                                <Chart dataChart={dataChart}></Chart>
                            </RadioGroup>
                        </FormControl>
                    </form>
                </Box>
            </Box>
        </>
    )
}

export default StockDetail;