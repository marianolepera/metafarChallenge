export const boxContainer = () => ({
  display: 'flex',
  justifyContent: 'center'
})

export const paperContainer = () => ({
  width: '80%',
  marginTop: 10,
  boxShadow: 0
})

export const tableContainer = () => ({
  maxHeight: 440,
  boxShadow: 4
})

export const tableHeaderStyles = (theme: any) => ({
  "& .MuiTableCell-head": {
    color: "white",
    backgroundColor: theme.palette.primary.main
  },
})

export const tablePaginationStyles = (theme: any) => ({
  ".MuiTablePagination-toolbar": {
    backgroundColor: theme.palette.primary.main
  },
  ".MuiTablePagination-selectLabel, .MuiTablePagination-input": {
    fontWeight: "bold",
    color: "white"
  },
  ".MuiTablePagination-displayedRows": {
    color: "white"
  },
})

export const textFieldNameStyles = (theme: any) => ({
  marginLeft: 2,
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
    marginTop: 1
  },
})

export const boxTextFieldContainer = () => ({
  marginBottom: 2
})