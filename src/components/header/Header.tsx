import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { appBarTitle, appBarContainer, title } from "./styles";
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <Box >
            <AppBar position="static" sx={appBarContainer}>
                <Box sx={appBarTitle} >
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Typography sx={title} variant="h6" component="div" >
                            Metafar
                        </Typography>
                    </Link>
                </Box>
            </AppBar>
        </Box>
    );
}

export default Header;