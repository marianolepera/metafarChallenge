export const header = (theme: any) => ({
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down('md')]: {
        flexDirection: "column"
    },
})

export const detailContainer = () => ({
    margin: 5
})

export const checkBoxContainer = () => ({
    marginTop: 5
})

export const datePickerStyles = (theme: any) => ({
    marginLeft: 10,
    width: 205,
    [theme.breakpoints.down('md')]: {
        marginLeft: 0,
        marginTop: 1
    },
})

export const headerIntervalo = (theme: any) => ({
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
    [theme.breakpoints.down('md')]: {
        flexDirection: "column",
    },
})

export const selectStyles = (theme: any) => ({
    marginLeft: 16,
    [theme.breakpoints.down('md')]: {
        marginTop: 2,
        marginLeft: 0
    },
    width: 205
})

export const intervaloTypo = () => ({
    marginTop: 1.5
})

export const buttonStyles = (theme: any) => ({
    textTransform: "none",
    fontSize: "18px",
    marginLeft: 23,
    [theme.breakpoints.down('md')]: {
        marginLeft: 0,
    },

})

export const buttonContainer = (theme: any) => ({
    marginTop: 5,
    [theme.breakpoints.down('md')]: {
        marginLeft: 0,
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
    },
})