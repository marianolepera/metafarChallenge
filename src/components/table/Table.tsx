import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Column, DataStock } from '../../interfaces/interfaces';
import { Box, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import { paperContainer, boxContainer, tableContainer, tableHeaderStyles, tablePaginationStyles, textFieldNameStyles, boxTextFieldContainer } from './styles';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import stockServices from '../../features/stockService';




const columns: readonly Column[] = [
    { id: 'name', label: 'Nombre', width: 170 },
    { id: 'currency', label: 'Moneda', width: 100 },
    {
        id: 'type',
        label: 'Tipo',
        width: 170,
    },
    {
        id: 'symbol',
        label: 'Simbolo',
        width: 170,
    },
];



interface TableStockInterface {
    stocks: DataStock[],
}

const TableStock: React.FC<TableStockInterface> = ({ stocks }: TableStockInterface) => {
    const [rows, setRows] = React.useState<DataStock[]>(stocks);
    const [searched, setSearched] = React.useState<string>("");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [querySymbol, setQuerySymbol] = React.useState("");

    const requestSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filteredRows = stocks.filter((row) => {
            return row.name.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setSearched(event.target.value);
        setRows(filteredRows);
    };


    const fetchData = async () => {
        try {
            const result = await stockServices.searchDataBySymbol(querySymbol);
            setRows(result);
        } catch (error: any) {
            console.log(error.message);
        }

    };

    React.useEffect(() => {
        if (querySymbol.length === 0 || querySymbol.length > 2) fetchData();
    }, [querySymbol]);



    const clearSearchSymbol = () => {
        setQuerySymbol("")
    }

    const clearSearchName = () => {
        setSearched("")
    }
    const handleChangePage = (event: unknown, newPage: number) => {
        console.log(event)
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <Box sx={boxContainer}>
            <Paper sx={paperContainer}>
                <Box sx={boxTextFieldContainer}>
                    <TextField
                        value={querySymbol}
                        placeholder="Buscar por simbolo"
                        onChange={(e) => setQuerySymbol(e.target.value.toLowerCase())}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {querySymbol.length == 0 ?
                                        <SearchIcon></SearchIcon>
                                        :
                                        <IconButton onClick={clearSearchSymbol}>
                                            <ClearIcon></ClearIcon>
                                        </IconButton>

                                    }
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        sx={textFieldNameStyles}
                        value={searched}
                        placeholder='Buscar por nombre'
                        onChange={requestSearch}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {searched.length == 0 ?
                                        <SearchIcon></SearchIcon>
                                        :
                                        <IconButton onClick={clearSearchName}>
                                            <ClearIcon></ClearIcon>
                                        </IconButton>

                                    }
                                </InputAdornment>
                            )
                        }}>
                    </TextField>
                </Box>

                <TableContainer sx={tableContainer}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow sx={tableHeaderStyles}>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ width: column.width }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((stock) => {
                                    return (
                                        <TableRow component={Link} to={`/${stock?.id}`} state={{ stock: stock }} sx={{ textDecoration: "none" }} hover role="checkbox" tabIndex={-1} key={stock?.id}>
                                            {columns.map((column) => {
                                                const value = stock[column.id];
                                                return (
                                                    <TableCell scope="row" key={column.id} align={column.align}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    sx={tablePaginationStyles}
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={!rows.length || rows.length <= 0 ? 0 : page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage={<Typography >Filas:</Typography>}
                    labelDisplayedRows={({ page }) => {
                        return `Pagina: ${page}`;
                    }}
                    backIconButtonProps={{
                        color: "secondary"
                    }}
                    nextIconButtonProps={{ color: "secondary" }}
                    SelectProps={{
                        inputProps: {
                            "aria-label": "page number"
                        }
                    }}
                    showFirstButton={true}
                    showLastButton={true}
                />
            </Paper>
        </Box>
    );
}

export default TableStock;