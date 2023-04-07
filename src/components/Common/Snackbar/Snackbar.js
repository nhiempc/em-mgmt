import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const CustomizedSnackbars = ({ contentSnack, severity, open, setOpen }) => {
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    elevation={6}
                    variant='filled'
                    onClose={handleClose}
                    severity={severity}
                    sx={{ width: '100%' }}
                >
                    {contentSnack}
                </Alert>
            </Snackbar>
        </Stack>
    );
};

export default CustomizedSnackbars;
