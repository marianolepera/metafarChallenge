import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Typography } from '@mui/material';
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';
import { buttonDialogStyledAcept, directionRow, iconStyles, stylesTitle, typoBody } from './styles';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface ModalInterface {
    typeModal: string,
    open: boolean,
    setOpen: (open: boolean) => void;
}
const Modal: React.FC<ModalInterface> = ({ typeModal, open, setOpen }: ModalInterface) => {

    const handleClose = () => {
        setOpen(false);
    };




    return (
        <div>
            <Dialog
                maxWidth="sm"
                fullWidth
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={stylesTitle}><DangerousOutlinedIcon sx={iconStyles}></DangerousOutlinedIcon></DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        {typeModal == "distintos" &&
                            <>
                                <Typography sx={typoBody}> Rango de fechas invalidos!</Typography>
                                <Typography sx={typoBody}>  Ingrese otras fechas.</Typography>
                            </>
                        }
                        {typeModal == "iguales" &&
                            <>
                                <Typography sx={typoBody}> Las fechas no pueden ser iguales!</Typography>
                                <Typography sx={typoBody}>  Ingrese fechas distintas.</Typography>
                            </>
                        }
                        {typeModal == "noData" &&
                            <>
                                <Typography sx={typoBody}> No hay informacion disponible para las fechas seleccionadas!</Typography>
                                <Typography sx={typoBody}>  Ingrese otras fechas.</Typography>
                            </>
                        }
                    </DialogContentText>
                </DialogContent>
                <Box sx={directionRow}>
                    <Button sx={buttonDialogStyledAcept} variant="outlined" onClick={handleClose}>Aceptar</Button>
                </Box>
            </Dialog>
        </div>
    );
}

export default Modal