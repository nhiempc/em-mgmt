/* eslint-disable */
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Tab,
    Tabs,
    TextField,
    Typography,
    styled
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import React, { useEffect, useRef, useState } from 'react';
// styles
import useStyles from './styles';
import { newEmployeeSelector } from '../../../redux/selectors/selectors';
import { useDispatch, useSelector } from 'react-redux';
import useValidate from '../../../hooks/useValidate';
import moment from 'moment';
import {
    GENDER,
    headerCertificateData,
    headerFamilyData
} from '../../../common';
import {
    addCertificate,
    addEmployInfo,
    addFamilyMember,
    deleteCertificate,
    deleteFamilyMember,
    editCertificate,
    editFamilyMember
} from '../../../redux/actions/actions';
import ListTemplate from '../ListTemplate/ListTemplate';
import { isEmptyObject } from '../../../helpers/common';
import { PhotoCamera } from '@mui/icons-material';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    const handleChangeTabContent = (event) => {};

    return (
        <div
            onChange={handleChangeTabContent}
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0 }}>
                    <Typography component={'div'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

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
        padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1)
    }
}));

const AddEmployeeModalContainer = ({
    isOpen,
    editData,
    title,
    handleClose,
    handleSave
}) => {
    const { classes } = useStyles();
    const employee = useSelector(newEmployeeSelector);
    const { errors, validate } = useValidate();
    const [value, setValue] = useState(0);
    const [employeeInfo, setEmployeeInfo] = useState(
        editData ? editData.employeeInfo : employee.employeeInfo
    );
    const [certificate, setCertificate] = useState({});
    const certificateList = editData
        ? editData.certificates
        : employee.certificates;
    const [familyMember, setFamilyMember] = useState({});
    const familyMemberList = editData
        ? editData.familyRelations
        : employee.familyRelations;
    const [errorCertificate, setErrorCertificate] = useState(false);
    const [errorFamily, setErrorFamily] = useState(false);
    const errEmployeeInfoRef = useRef({});
    const [errEmployeeInfo, setErrEmployeeInfo] = useState({});
    const [isValidEmployeeInfo, setIsValidEmployeeInfo] = useState(false);
    const [isEditCertificate, setIsEditCertificate] = useState(false);
    const [isEditFamilyMember, setIsEditFamilyMember] = useState(false);
    const [certificateIdEdit, setCertificateIdEdit] = useState();
    const [familyIdEdit, setFamilyIdEdit] = useState();
    const avatar = useRef('');
    const dispatch = useDispatch();

    const rowFamilyData = [];
    const rowCertificateData = [];
    const idCertificateData = [];
    const idFamilyData = [];

    const handleCancel = () => {
        setEmployeeInfo({});
        Object.entries(errors).map((entry) => delete errors[entry[0]]);
        handleClose();
    };

    if (editData) {
        editData.certificates.map((item) => {
            rowCertificateData.push([
                item.name,
                moment(item.issuanceDate).format('DD-MM-YYYY') ===
                'Invalid date'
                    ? moment().format('DD-MM-YYYY')
                    : moment(item.issuanceDate).format('DD-MM-YYYY'),
                item.content,
                item.field
            ]);
            idCertificateData.push(Number(item.certificateId));
            return rowCertificateData;
        });
        editData.familyRelations.map((item) => {
            rowFamilyData.push([
                item.name,
                GENDER[item.gender],
                moment(item.dateOfBirth).format('DD-MM-YYYY') === 'Invalid date'
                    ? moment().format('DD-MM-YYYY')
                    : moment(item.dateOfBirth).format('DD-MM-YYYY'),
                item.citizenId,
                item.relation,
                item.address
            ]);
            idFamilyData.push(Number(item.familyId));
            return rowFamilyData;
        });
    } else {
        certificateList.map((item) => {
            rowCertificateData.push([
                item.name,
                moment(item.issuanceDate).format('DD-MM-YYYY') ===
                'Invalid date'
                    ? moment().format('DD-MM-YYYY')
                    : moment(item.issuanceDate).format('DD-MM-YYYY'),
                item.content,
                item.field
            ]);
            idCertificateData.push(Number(item.certificateId));
            return rowCertificateData;
        });
        familyMemberList.map((item, index) => {
            rowFamilyData.push([
                item.name,
                GENDER[item.gender],
                moment(item.dateOfBirth).format('DD-MM-YYYY') === 'Invalid date'
                    ? moment().format('DD-MM-YYYY')
                    : moment(item.dateOfBirth).format('DD-MM-YYYY'),
                item.citizenId,
                item.relation,
                item.address
            ]);
            idFamilyData.push(Number(item.familyId));
            return rowFamilyData;
        });
    }

    const handleChangeTab = (event, newValue) => {
        if (!employeeInfo.fullName) {
            errors.employee_name = 'Tên nhân viên không được để trống';
            errEmployeeInfoRef.current.employee_name = true;
        }
        if (!employeeInfo.code) {
            errors.employee_code = 'Mã nhân viên không được để trống';
            errEmployeeInfoRef.current.employee_code = true;
        }
        if (
            employeeInfo.gender === '' ||
            employeeInfo.gender === null ||
            employeeInfo.gender === undefined
        ) {
            errors.employee_sex = 'Vui lòng chọn giới tính';
            errEmployeeInfoRef.current.employee_sex = true;
        }
        if (!employeeInfo.dateOfBirth) {
            errors.employee_date = 'Vui lòng chọn ngày khác';
            errEmployeeInfoRef.current.employee_date = true;
        }
        if (!employeeInfo.phone) {
            errors.employee_phone = 'Số điện thoại không được để trống';
            errEmployeeInfoRef.current.employee_phone = true;
        }
        if (!employeeInfo.email) {
            errors.employee_email = 'Email không được để trống';
            errEmployeeInfoRef.current.employee_email = true;
        }
        if (!employeeInfo.citizenId) {
            errors.employee_num = 'Số CMND/CCCD không được để trống';
            errEmployeeInfoRef.current.employee_num = true;
        }
        if (
            employeeInfo.teamId === '' ||
            employeeInfo.teamId === null ||
            employeeInfo.teamId === undefined
        ) {
            errors.employee_team = 'Vui lòng chọn nhóm';
            errEmployeeInfoRef.current.employee_team = true;
        }
        if (!employeeInfo.address) {
            errors.employee_address = 'Địa chỉ không được để trống';
            errEmployeeInfoRef.current.employee_address = true;
        }
        const err = errEmployeeInfoRef.current;
        setErrEmployeeInfo({ ...err });
        let values = Object.entries(err).map((item) => item[1]);
        let isValid = values.every((item) => item === false);
        setIsValidEmployeeInfo(isValid);
        if (isEmptyObject(employeeInfo) || !isValid) return;
        setValue(newValue);
    };

    useEffect(() => {
        dispatch(addEmployInfo(employeeInfo));
    }, [dispatch, employeeInfo]);

    const handleChangeEmployeeInfo = (e) => {
        let { name, value, id } = e.target;
        if (value) {
            errEmployeeInfoRef.current[id] = false;
        } else {
            errEmployeeInfoRef.current[id] = true;
        }
        if (name === 'gender' || name === 'teamId') {
            value = Number(value);
        }
        const err = errEmployeeInfoRef.current;
        setErrEmployeeInfo({ ...err });
        validate(e);
        setEmployeeInfo({
            ...employeeInfo,
            [name]: value
        });
    };

    const handleChangeAvatar = (e) => {
        const file = e.target.files[0];
        const fr = new FileReader();
        fr.readAsDataURL(file);

        fr.addEventListener('load', function (e) {
            setEmployeeInfo({ ...employeeInfo, photoUrl: e.target.result });
        });
    };

    const handleChangeEmployeeCertificate = (e) => {
        let { name, value } = e.target;
        validate(e);
        if (name === 'gender' || name === 'teamId') {
            value = Number(value);
        }
        if (certificateIdEdit) {
            setCertificate({
                ...certificate,
                // certificateId: certificateIdEdit,
                [name]: value
            });
        } else {
            setCertificate({
                ...certificate,
                // certificateId: Date.now(),
                [name]: value
            });
        }
    };

    const handleAddCertificate = (e) => {
        e.preventDefault();
        const nodeList = e.target;
        const inputArray = Array.from(nodeList)
            .filter(
                (item) =>
                    item.localName === 'input' || item.localName === 'select'
            )
            .filter((item) => item.id);

        const labels = inputArray.map((item) => item.labels[0].textContent);
        const ids = inputArray.map((item) => item.id);

        const values = inputArray.map((item) => item.value);

        values.map((item, index) => {
            if (item === '') {
                setErrorCertificate(true);
                errors[ids[index]] = `${labels[index]} không được để trống`;
            } else if (item === moment().format('YYYY-MM-DD')) {
                errors[ids[index]] = `Vui lòng chọn ngày khác`;
            } else {
                setErrorCertificate(false);
            }
            return errors;
        });
        const index = ids.findIndex((item) => errors[item]);
        if (index === -1 && !values.some((item) => item === '')) {
            dispatch(addCertificate(certificate));
            setCertificate({});
        }
    };

    const handleChangeEmployeeFamily = (e) => {
        let { name, value } = e.target;
        validate(e);
        if (name === 'gender' || name === 'teamId') {
            value = Number(value);
        }
        if (familyIdEdit) {
            setFamilyMember({
                ...familyMember,
                // familyId: familyIdEdit,
                [name]: value
            });
        } else {
            setFamilyMember({
                ...familyMember,
                // familyId: Date.now(),
                [name]: value
            });
        }
    };

    const handleAddFamilyMember = (e) => {
        e.preventDefault();
        const nodeList = e.target;
        const inputArray = Array.from(nodeList)
            .filter(
                (item) =>
                    item.localName === 'input' || item.localName === 'select'
            )
            .filter((item) => item.id);

        const labels = inputArray.map((item) => item.labels[0].textContent);
        const ids = inputArray.map((item) => item.id);

        const values = inputArray.map((item) => item.value);

        values.map((item, index) => {
            if (item === '') {
                setErrorFamily(true);
                errors[ids[index]] = `${labels[index]} không được để trống`;
            } else if (item === moment().format('YYYY-MM-DD')) {
                errors[ids[index]] = `Vui lòng chọn ngày khác`;
            } else {
                setErrorFamily(false);
            }
            return errors;
        });

        const index = ids.findIndex((item) => errors[item]);
        if (index === -1 && !values.some((item) => item === '')) {
            dispatch(addFamilyMember(familyMember));
            setFamilyMember({});
        }
    };

    const handleEditCertificateClick = (id) => {
        setIsEditCertificate(true);
        setCertificateIdEdit(id);
        const [selectedCertificate] = certificateList.filter(
            (item) => item.certificateId === id
        );
        setCertificate(selectedCertificate);
    };

    const handleUpdateCertificate = () => {
        let index = certificateList.findIndex(
            (item) => item.certificateId === certificateIdEdit
        );
        dispatch(editCertificate(index, certificate));
        setIsEditCertificate(false);
        setCertificate({});
        setCertificateIdEdit();
    };

    const handleDeleteCertificate = (id) => {
        dispatch(deleteCertificate(id));
    };

    const handleEditFamilyMemberClick = (id) => {
        setIsEditFamilyMember(true);
        setFamilyIdEdit(id);
        const [selectedFamilyMember] = familyMemberList.filter(
            (item) => item.familyId === id
        );
        setFamilyMember(selectedFamilyMember);
    };

    const handleUpdateFamilyMember = () => {
        let index = familyMemberList.findIndex(
            (item) => item.familyId === familyIdEdit
        );
        dispatch(editFamilyMember(index, familyMember));
        setIsEditFamilyMember(false);
        setFamilyMember({});
        setFamilyIdEdit();
    };

    const handleDeleteFamilyMember = (id) => {
        dispatch(deleteFamilyMember(id));
    };

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby='customized-dialog-title'
            open={isOpen}
            fullWidth
            maxWidth={'md'}
            PaperProps={{
                sx: {
                    minHeight: '80vh'
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
                <Box>
                    <Tabs
                        value={value}
                        onChange={handleChangeTab}
                        aria-label='basic tabs example'
                    >
                        <Tab label='Thông tin nhân viên' {...a11yProps(0)} />
                        <Tab label='Thông tin văn bằng' {...a11yProps(1)} />
                        <Tab label='Quan hệ gia đình' {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Grid container spacing={2} sx={{ pt: 2 }}>
                        <Grid item xs={8}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        error={
                                            errors['employee_name']
                                                ? true
                                                : false
                                        }
                                        fullWidth
                                        id='employee_name'
                                        focused
                                        label='Tên nhân viên'
                                        variant='outlined'
                                        size='small'
                                        name='fullName'
                                        value={
                                            employeeInfo.fullName !== undefined
                                                ? employeeInfo.fullName
                                                : ''
                                        }
                                        helperText={errors['employee_name']}
                                        onChange={handleChangeEmployeeInfo}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        error={
                                            errors['employee_code']
                                                ? true
                                                : false
                                        }
                                        helperText={errors['employee_code']}
                                        fullWidth
                                        focused
                                        id='employee_code'
                                        label='Mã nhân viên'
                                        variant='outlined'
                                        size='small'
                                        name='code'
                                        value={
                                            employeeInfo.code !== undefined
                                                ? employeeInfo.code
                                                : ''
                                        }
                                        onChange={handleChangeEmployeeInfo}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label='Giới tính'
                                        fullWidth
                                        focused
                                        error={
                                            errors['employee_sex']
                                                ? true
                                                : false
                                        }
                                        helperText={errors['employee_sex']}
                                        size='small'
                                        value={
                                            employeeInfo.gender !== undefined
                                                ? employeeInfo.gender
                                                : ''
                                        }
                                        name='gender'
                                        id='employee_sex'
                                        onChange={handleChangeEmployeeInfo}
                                        select
                                        SelectProps={{ native: true }}
                                    >
                                        <option value={''}>
                                            Chọn giới tính
                                        </option>
                                        <option value={1}>Nam</option>
                                        <option value={0}>Nữ</option>
                                    </TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id='employee_date'
                                        error={
                                            errors['employee_date']
                                                ? true
                                                : false
                                        }
                                        helperText={errors['employee_date']}
                                        type='date'
                                        fullWidth
                                        label='Ngày sinh'
                                        variant='outlined'
                                        size='small'
                                        focused
                                        name='dateOfBirth'
                                        value={
                                            employeeInfo.dateOfBirth !==
                                            undefined
                                                ? moment(
                                                      employeeInfo.dateOfBirth
                                                  ).format('YYYY-MM-DD')
                                                : moment().format('YYYY-MM-DD')
                                        }
                                        onChange={handleChangeEmployeeInfo}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        error={
                                            errors['employee_phone']
                                                ? true
                                                : false
                                        }
                                        helperText={errors['employee_phone']}
                                        fullWidth
                                        focused
                                        id='employee_phone'
                                        label='Số điện thoại'
                                        variant='outlined'
                                        size='small'
                                        type='tel'
                                        name='phone'
                                        value={
                                            employeeInfo.phone !== undefined
                                                ? employeeInfo.phone
                                                : ''
                                        }
                                        onChange={handleChangeEmployeeInfo}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        error={
                                            errors['employee_email']
                                                ? true
                                                : false
                                        }
                                        helperText={errors['employee_email']}
                                        fullWidth
                                        focused
                                        id='employee_email'
                                        label='Email'
                                        variant='outlined'
                                        size='small'
                                        name='email'
                                        type='email'
                                        value={
                                            employeeInfo.email !== undefined
                                                ? employeeInfo.email
                                                : ''
                                        }
                                        onChange={handleChangeEmployeeInfo}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{ pt: 2 }}>
                                <Grid item xs={6}>
                                    <TextField
                                        error={
                                            errors['employee_num']
                                                ? true
                                                : false
                                        }
                                        helperText={errors['employee_num']}
                                        fullWidth
                                        focused
                                        id='employee_num'
                                        label='Số CMND/CCCD'
                                        variant='outlined'
                                        size='small'
                                        name='citizenId'
                                        type='number'
                                        value={
                                            employeeInfo.citizenId !== undefined
                                                ? employeeInfo.citizenId
                                                : ''
                                        }
                                        onChange={handleChangeEmployeeInfo}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label='Nhóm'
                                        fullWidth
                                        focused
                                        error={
                                            errors['employee_team']
                                                ? true
                                                : false
                                        }
                                        helperText={errors['employee_team']}
                                        size='small'
                                        value={
                                            employeeInfo.teamId !== undefined
                                                ? employeeInfo.teamId
                                                : ''
                                        }
                                        name='teamId'
                                        id='employee_team'
                                        onChange={handleChangeEmployeeInfo}
                                        select
                                        SelectProps={{ native: true }}
                                    >
                                        <option value={''}>Chọn nhóm</option>
                                        <option value={1}>Front-end</option>
                                        <option value={2}>Back-end</option>
                                    </TextField>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{ pt: 2 }}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        focused
                                        error={
                                            errors['employee_address']
                                                ? true
                                                : false
                                        }
                                        helperText={errors['employee_address']}
                                        id='employee_address'
                                        label='Địa chỉ'
                                        variant='outlined'
                                        size='small'
                                        name='address'
                                        value={
                                            employeeInfo.address !== undefined
                                                ? employeeInfo.address
                                                : ''
                                        }
                                        onChange={handleChangeEmployeeInfo}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            {avatar.current && !employeeInfo.photoUrl && (
                                <>
                                    <div className={classes.imageContainer}>
                                        <img
                                            style={{ width: '100%' }}
                                            src={avatar.current}
                                            alt='Avatar'
                                            className={classes.avatar}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            width: '100%',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <IconButton
                                            color='primary'
                                            aria-label='upload picture'
                                            component='label'
                                        >
                                            <input
                                                hidden
                                                accept='image/*'
                                                type='file'
                                                name='photoUrl'
                                                onChange={handleChangeAvatar}
                                            />
                                            <PhotoCamera />
                                        </IconButton>
                                    </div>
                                </>
                            )}

                            {!avatar.current && employeeInfo.photoUrl && (
                                <>
                                    <div className={classes.imageContainer}>
                                        <img
                                            style={{ width: '100%' }}
                                            src={employeeInfo.photoUrl}
                                            alt='Avatar'
                                            className={classes.avatar}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            width: '100%',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <IconButton
                                            color='primary'
                                            aria-label='upload picture'
                                            component='label'
                                        >
                                            <input
                                                hidden
                                                accept='image/*'
                                                type='file'
                                                name='photoUrl'
                                                onChange={handleChangeAvatar}
                                            />
                                            <PhotoCamera />
                                        </IconButton>
                                    </div>
                                </>
                            )}

                            {avatar.current && employeeInfo.photoUrl && (
                                <>
                                    <div className={classes.imageContainer}>
                                        <img
                                            style={{ width: '100%' }}
                                            src={employeeInfo.photoUrl}
                                            alt='Avatar'
                                            className={classes.avatar}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            width: '100%',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <IconButton
                                            color='primary'
                                            aria-label='upload picture'
                                            component='label'
                                        >
                                            <input
                                                hidden
                                                accept='image/*'
                                                type='file'
                                                name='photoUrl'
                                                onChange={handleChangeAvatar}
                                            />
                                            <PhotoCamera />
                                        </IconButton>
                                    </div>
                                </>
                            )}

                            {!avatar.current && !employeeInfo.photoUrl && (
                                <>
                                    <div className={classes.noImageContainer}>
                                        <IconButton
                                            className={classes.noImageBox}
                                            aria-label='upload picture'
                                            component='label'
                                        >
                                            <input
                                                hidden
                                                accept='image/*'
                                                type='file'
                                                name='photoUrl'
                                                onChange={handleChangeAvatar}
                                            />
                                            <CameraAltOutlinedIcon
                                                className={classes.noImageBox}
                                            />
                                        </IconButton>
                                    </div>
                                    <Typography
                                        variant='body1'
                                        textAlign={'center'}
                                        sx={{ py: 2 }}
                                    >
                                        Chọn ảnh đại diện
                                    </Typography>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <form onSubmit={handleAddCertificate}>
                        <Grid container spacing={2} sx={{ pt: 2 }}>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    focused
                                    error={
                                        errors['certificate_name']
                                            ? true
                                            : false
                                    }
                                    helperText={errors['certificate_name']}
                                    id='certificate_name'
                                    label='Tên văn bằng'
                                    variant='outlined'
                                    size='small'
                                    name='name'
                                    value={
                                        certificate.name !== undefined
                                            ? certificate.name
                                            : ''
                                    }
                                    onChange={handleChangeEmployeeCertificate}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id='certificate_issuance_date'
                                    type='date'
                                    fullWidth
                                    label='Ngày cấp'
                                    variant='outlined'
                                    size='small'
                                    focused
                                    name='issuanceDate'
                                    error={
                                        errors['certificate_issuance_date']
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors['certificate_issuance_date']
                                    }
                                    value={moment(
                                        certificate.issuanceDate
                                    ).format('YYYY-MM-DD')}
                                    onChange={handleChangeEmployeeCertificate}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    focused
                                    error={
                                        errors['certificate_content']
                                            ? true
                                            : false
                                    }
                                    helperText={errors['certificate_content']}
                                    id='certificate_content'
                                    label='Nội dung'
                                    variant='outlined'
                                    size='small'
                                    name='content'
                                    value={
                                        certificate.content !== undefined
                                            ? certificate.content
                                            : ''
                                    }
                                    onChange={handleChangeEmployeeCertificate}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    focused
                                    error={
                                        errors['certificate_field']
                                            ? true
                                            : false
                                    }
                                    helperText={errors['certificate_field']}
                                    id='certificate_field'
                                    label='Lĩnh vực'
                                    variant='outlined'
                                    size='small'
                                    name='field'
                                    value={
                                        certificate.field !== undefined
                                            ? certificate.field
                                            : ''
                                    }
                                    onChange={handleChangeEmployeeCertificate}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                            sx={{ mt: 2 }}
                            justifyContent={'flex-end'}
                        >
                            {' '}
                            {!isEditCertificate && (
                                <Button
                                    disabled={
                                        errorCertificate &&
                                        !isEmptyObject(errors)
                                    }
                                    type='submit'
                                    variant='contained'
                                >
                                    Thêm văn bằng
                                </Button>
                            )}
                            {isEditCertificate && (
                                <Button
                                    disabled={
                                        errorCertificate &&
                                        !isEmptyObject(errors)
                                    }
                                    color='warning'
                                    type='button'
                                    onClick={handleUpdateCertificate}
                                    variant='contained'
                                >
                                    Cập nhật
                                </Button>
                            )}
                        </Grid>
                    </form>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={12}>
                            <ListTemplate
                                maxHeight={250}
                                headerData={headerCertificateData}
                                isDelete={true}
                                isEdit={true}
                                idData={idCertificateData}
                                rowData={rowCertificateData}
                                handleEdit={handleEditCertificateClick}
                                handleDelete={handleDeleteCertificate}
                            />
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <form onSubmit={handleAddFamilyMember}>
                        <Grid container spacing={2} sx={{ pt: 2 }}>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    focused
                                    error={
                                        errors['family_member_name']
                                            ? true
                                            : false
                                    }
                                    helperText={errors['family_member_name']}
                                    id='family_member_name'
                                    label='Họ và tên'
                                    variant='outlined'
                                    size='small'
                                    value={
                                        familyMember.name !== undefined
                                            ? familyMember.name
                                            : ''
                                    }
                                    name='name'
                                    onChange={handleChangeEmployeeFamily}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label='Giới tính'
                                    fullWidth
                                    focused
                                    error={
                                        errors['family_member_sex']
                                            ? true
                                            : false
                                    }
                                    helperText={errors['family_member_sex']}
                                    size='small'
                                    value={
                                        familyMember.gender !== undefined
                                            ? familyMember.gender
                                            : ''
                                    }
                                    name='gender'
                                    id='family_member_sex'
                                    onChange={handleChangeEmployeeFamily}
                                    select
                                    SelectProps={{ native: true }}
                                >
                                    <option value={''}>Chọn giới tính</option>
                                    <option value={1}>Nam</option>
                                    <option value={0}>Nữ</option>
                                </TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id='family_member_date'
                                    type='date'
                                    fullWidth
                                    label='Ngày sinh'
                                    error={
                                        errors['family_member_date']
                                            ? true
                                            : false
                                    }
                                    helperText={errors['family_member_date']}
                                    variant='outlined'
                                    size='small'
                                    focused
                                    value={moment(
                                        familyMember.dateOfBirth
                                    ).format('YYYY-MM-DD')}
                                    name='dateOfBirth'
                                    onChange={handleChangeEmployeeFamily}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    focused
                                    error={
                                        errors['family_member_num']
                                            ? true
                                            : false
                                    }
                                    helperText={errors['family_member_num']}
                                    id='family_member_num'
                                    label='Số CMND/CCCD'
                                    variant='outlined'
                                    size='small'
                                    type='number'
                                    value={
                                        familyMember.citizenId !== undefined
                                            ? familyMember.citizenId
                                            : ''
                                    }
                                    name='citizenId'
                                    onChange={handleChangeEmployeeFamily}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    focused
                                    error={
                                        errors['family_member_relation']
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors['family_member_relation']
                                    }
                                    id='family_member_relation'
                                    label='Mối quan hệ'
                                    variant='outlined'
                                    size='small'
                                    value={
                                        familyMember.relation !== undefined
                                            ? familyMember.relation
                                            : ''
                                    }
                                    name='relation'
                                    onChange={handleChangeEmployeeFamily}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    focused
                                    error={
                                        errors['family_member_address']
                                            ? true
                                            : false
                                    }
                                    helperText={errors['family_member_address']}
                                    id='family_member_address'
                                    label='Địa chỉ'
                                    variant='outlined'
                                    size='small'
                                    value={
                                        familyMember.address !== undefined
                                            ? familyMember.address
                                            : ''
                                    }
                                    name='address'
                                    onChange={handleChangeEmployeeFamily}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                            sx={{ mt: 2 }}
                            justifyContent={'flex-end'}
                        >
                            {' '}
                            {!isEditFamilyMember && (
                                <Button
                                    disabled={
                                        errorFamily && !isEmptyObject(errors)
                                    }
                                    variant='contained'
                                    type='submit'
                                >
                                    Thêm thành viên
                                </Button>
                            )}
                            {isEditFamilyMember && (
                                <Button
                                    disabled={
                                        errorFamily && !isEmptyObject(errors)
                                    }
                                    color='warning'
                                    type='button'
                                    onClick={handleUpdateFamilyMember}
                                    variant='contained'
                                >
                                    Cập nhật
                                </Button>
                            )}
                        </Grid>
                    </form>

                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={12}>
                            <ListTemplate
                                maxHeight={250}
                                headerData={headerFamilyData}
                                isDelete={true}
                                isEdit={true}
                                idData={idFamilyData}
                                rowData={rowFamilyData}
                                handleEdit={handleEditFamilyMemberClick}
                                handleDelete={handleDeleteFamilyMember}
                            />
                        </Grid>
                    </Grid>
                </TabPanel>
            </DialogContent>
            <DialogActions className={classes.dialogActionWrapper}>
                <Button
                    variant='contained'
                    color='error'
                    autoFocus
                    onClick={handleCancel}
                >
                    Hủy
                </Button>
                <Button
                    variant='contained'
                    color='success'
                    disabled={!isValidEmployeeInfo}
                    autoFocus
                    onClick={() => handleSave(employee)}
                >
                    Lưu
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    disabled
                    autoFocus
                    onClick={() => {}}
                >
                    Đăng ký
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
};

export default AddEmployeeModalContainer;
