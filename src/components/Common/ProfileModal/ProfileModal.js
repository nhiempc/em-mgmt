import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    styled
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// styles
import useStyles from './styles';
import { TabContext } from '../TabContext';
import Profile from './Profile';
import Resume from './Resume';
import CertificateList from './CertificateList';

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle
            sx={{ m: 0, p: 1, textAlign: 'center', fontSize: '18px' }}
            {...other}
        >
            {children}
            {onClose ? (
                <IconButton
                    aria-label='close'
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: 0
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1)
    }
}));

const ProfileModal = ({ title, isOpen, handleClose }) => {
    const { classes } = useStyles();
    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby='customized-dialog-title'
            open={isOpen}
            fullWidth
            maxWidth={'lg'}
            PaperProps={{
                sx: {
                    minHeight: '95vh'
                }
            }}
        >
            <BootstrapDialogTitle
                id='customized-dialog-title'
                onClose={handleClose}
            >
                {title}
            </BootstrapDialogTitle>
            <DialogContent dividers className={classes.modalContent}>
                <TabContext
                    orientation={'vertical'}
                    labelOne={'Hồ sơ'}
                    labelTwo={'Sơ yếu lý lịch'}
                    labelThree={'Danh sách văn bằng'}
                    componentOne={<Profile />}
                    componentTwo={<Resume />}
                    componentThee={<CertificateList />}
                />
            </DialogContent>
            <DialogActions className={classes.dialogActionWrapper}>
                <Button
                    variant='contained'
                    color='error'
                    autoFocus
                    onClick={handleClose}
                >
                    Hủy
                </Button>
                <Button
                    variant='contained'
                    color='success'
                    autoFocus
                    onClick={() => {}}
                >
                    Lưu
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    autoFocus
                    onClick={() => {}}
                >
                    Trình lãnh đạo
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
};

export default ProfileModal;
