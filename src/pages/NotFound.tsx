import { Box, Button } from "@mui/material"
import { Link } from "react-router-dom"

const NotFound = () => {

    return (
        <>
            <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                <h1 >404 - Not Found!</h1>
                <Link to="/">
                    <Button >
                        Go Home
                    </Button>
                </Link>
            </Box>
        </>
    )
}

export default NotFound;