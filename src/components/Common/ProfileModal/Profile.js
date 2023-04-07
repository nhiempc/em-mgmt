import { useState } from 'react';
import {
    Divider,
    FormControl,
    FormLabel,
    Grid,
    TextField,
    Typography
} from '@mui/material';
// styles
import useStyles from './styles';
import { Box } from '@mui/system';
import CakeIcon from '@mui/icons-material/Cake';
import TransgenderIcon from '@mui/icons-material/Transgender';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Call } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const Profile = () => {
    const { classes } = useStyles();
    const src = 'https://i.ibb.co/44RBHzs/avatar1.jpg';

    const initWork = {
        company: '',
        position: '',
        detail: '',
        startDate: '',
        endDate: ''
    };

    const initWorkList = [initWork];

    const [workList, setWorkList] = useState(initWorkList);

    const handlechangeWork = (event, index) => {
        const { name, value } = event.target;
        const newValue = {
            [name]: value
        };
        const updatedArray = [
            ...workList.slice(0, index),
            {
                ...workList[index],
                ...newValue
            },
            ...workList.slice(index + 1)
        ];
        setWorkList(updatedArray);
    };

    const handleAddWork = () => {
        setWorkList([...workList, initWork]);
    };

    console.log(workList);

    return (
        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '90%' }}>
                <Grid
                    container
                    className={classes.cvWrapper}
                    sx={{ marginBottom: '50px', borderRadius: '8px' }}
                >
                    <Grid item xs={4} className={classes.leftWrapper}>
                        <Box className={classes.imageContainer}>
                            {src && (
                                <img
                                    src={src}
                                    alt='Avatar'
                                    className={classes.avatar}
                                />
                            )}
                        </Box>
                        <Box className={classes.header}>
                            <Typography variant='h5' className={classes.name}>
                                Nguyễn Văn Nhiệm
                            </Typography>
                            <Typography
                                variant='h6'
                                className={classes.position}
                            >
                                Front-end
                            </Typography>
                        </Box>
                        <Box className={classes.basicInfo}>
                            <Typography
                                variant='body1'
                                className={classes.titleInfo}
                            >
                                Thông tin cơ bản
                            </Typography>
                            <Box className={classes.basicInfoItem}>
                                <CakeIcon />
                                <Typography variant='body2'>
                                    10/05/1996
                                </Typography>
                            </Box>
                            <Box className={classes.basicInfoItem}>
                                <TransgenderIcon />
                                <Typography variant='body2'>Nam</Typography>
                            </Box>
                            <Box className={classes.basicInfoItem}>
                                <LocationOnIcon />
                                <Typography variant='body2'>
                                    Minh Tiến - Phù Cừ - Hưng Yên
                                </Typography>
                            </Box>
                            <Box className={classes.basicInfoItem}>
                                <Call />
                                <Typography variant='body2'>
                                    0969029224
                                </Typography>
                            </Box>
                            <Box className={classes.basicInfoItem}>
                                <EmailIcon />
                                <Typography variant='body2'>
                                    nhiem10596@gmail.com
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={8} className={classes.rightWrapper}>
                        <Box className={classes.careerGoalWrapper}>
                            <Box className={classes.titleWrapper}>
                                <CrisisAlertIcon fontSize='large' />
                                <Typography
                                    variant='subtitle1'
                                    className={classes.careerGoalTitle}
                                >
                                    Mục tiêu nghề nghiệp
                                </Typography>
                            </Box>
                            <TextField
                                fullWidth
                                id='careerGoal'
                                name='careerGoal'
                                multiline
                                placeholder='Mục tiêu nghề nghiệp'
                                variant='standard'
                            />
                        </Box>

                        <Box className={classes.workExperiencesWrapper}>
                            <Box className={classes.titleWrapper}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px'
                                    }}
                                >
                                    <BusinessCenterIcon fontSize='large' />
                                    <Typography
                                        variant='subtitle1'
                                        className={classes.workExperiencesTitle}
                                    >
                                        Kinh nghiệm làm việc
                                    </Typography>
                                </Box>
                                <ControlPointIcon
                                    fontSize='large'
                                    onClick={handleAddWork}
                                    sx={{
                                        alignSelf: 'flex-end',
                                        cursor: 'pointer'
                                    }}
                                />
                            </Box>
                            {workList.map((work, index) => (
                                <Box className={classes.workItem} key={index}>
                                    <Grid container spacing={2}>
                                        <Grid
                                            item
                                            xs={3}
                                            className={classes.timeWrapper}
                                        >
                                            <Typography
                                                variant='body2'
                                                className={classes.FormLabel}
                                            >
                                                Ngày bắt đầu
                                            </Typography>
                                            <TextField
                                                type='date'
                                                fullWidth
                                                variant='standard'
                                                value={work.startDate}
                                                size='small'
                                                name='startDate'
                                                onChange={(event) =>
                                                    handlechangeWork(
                                                        event,
                                                        index
                                                    )
                                                }
                                            ></TextField>
                                            <Typography
                                                variant='body2'
                                                className={classes.FormLabel}
                                            >
                                                Ngày kết thúc
                                            </Typography>
                                            <TextField
                                                type='date'
                                                fullWidth
                                                variant='standard'
                                                value={work.endDate}
                                                size='small'
                                                name='endDate'
                                                onChange={(event) =>
                                                    handlechangeWork(
                                                        event,
                                                        index
                                                    )
                                                }
                                            ></TextField>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={9}
                                            className={
                                                classes.workDetailWrapper
                                            }
                                        >
                                            <FormControl fullWidth>
                                                <FormLabel
                                                    className={
                                                        classes.FormLabel
                                                    }
                                                >
                                                    <Typography variant='body2'>
                                                        Tên công ty
                                                    </Typography>
                                                </FormLabel>
                                                <TextField
                                                    fullWidth
                                                    id='company'
                                                    name='company'
                                                    multiline
                                                    variant='standard'
                                                    value={work.company}
                                                    onChange={(event) =>
                                                        handlechangeWork(
                                                            event,
                                                            index
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormControl fullWidth>
                                                <FormLabel
                                                    className={
                                                        classes.FormLabel
                                                    }
                                                >
                                                    <Typography variant='body2'>
                                                        Vị trí
                                                    </Typography>
                                                </FormLabel>
                                                <TextField
                                                    fullWidth
                                                    id='position'
                                                    name='position'
                                                    multiline
                                                    variant='standard'
                                                    value={work.position}
                                                    onChange={(event) =>
                                                        handlechangeWork(
                                                            event,
                                                            index
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormControl fullWidth>
                                                <FormLabel
                                                    className={
                                                        classes.FormLabel
                                                    }
                                                >
                                                    <Typography variant='body2'>
                                                        Mô tả công việc
                                                    </Typography>
                                                </FormLabel>
                                                <TextField
                                                    fullWidth
                                                    id='detail'
                                                    name='detail'
                                                    multiline
                                                    variant='standard'
                                                    value={work.detail}
                                                    onChange={(event) =>
                                                        handlechangeWork(
                                                            event,
                                                            index
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ mt: '15px' }} />
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
};

export default Profile;
