import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/material";
import { FC } from 'react';
import { loaderStyle } from './styles';

interface LoaderInterface {
  size: number,
}
const Loader: FC<LoaderInterface> = ({ size }: LoaderInterface) => {
  return (
    <Box sx={loaderStyle}>
      <CircularProgress size={size} color="primary" />
    </Box>
  );
}

export default Loader