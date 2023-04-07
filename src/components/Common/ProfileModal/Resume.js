import { Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
// styles
import useStyles from './styles';
import { InputProps } from './styles';
import ListTemplate from '../ListTemplate/ListTemplate';
import { headerFamilyData } from '../../../common';

const Resume = () => {
    const { classes } = useStyles();
    const idFamilyData = [];
    const rowFamilyData = [];
    return (
        <Box>
            <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid
                    item
                    xs={10}
                    className={classes.resumeWrapper}
                    sx={{ marginBottom: '50px', borderRadius: '8px' }}
                >
                    <Box className={classes.resumeHeader}>
                        <Typography
                            variant='h6'
                            sx={{
                                textTransform: 'uppercase',
                                paddingTop: '16px'
                            }}
                        >
                            Cộng hòa xã hội chủ nghĩa Việt Nam
                        </Typography>
                        <Typography
                            variant='h6'
                            sx={{
                                px: '15px',
                                borderBottom: '2px solid black',
                                width: 'fit-content'
                            }}
                        >
                            Độc lập - Tự do - Hạnh phúc
                        </Typography>
                    </Box>
                    <Box className={classes.resumeAvatar}>
                        <Typography
                            variant='body1'
                            sx={{
                                color: 'black',
                                padding: '15px'
                            }}
                        >
                            Ảnh màu 4x6cm (có đóng dấu giáp lai của của cơ quan
                            xác nhận lý lịch)
                        </Typography>
                    </Box>
                    <Box className={classes.resumeTitle}>
                        <Typography
                            variant='h4'
                            sx={{
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                paddingTop: '16px'
                            }}
                        >
                            Sơ yếu lý lịch
                        </Typography>
                        <Typography
                            variant='h6'
                            sx={{
                                width: 'fit-content',
                                fontStyle: 'italic',
                                textTransform: 'uppercase'
                            }}
                        >
                            Tự thuật
                        </Typography>
                    </Box>
                    <Box className={classes.personalInfo}>
                        <Typography
                            variant='h5'
                            sx={{
                                textTransform: 'uppercase',
                                fontWeight: 'bold'
                            }}
                        >
                            1. Bản thân
                        </Typography>
                    </Box>
                    <Grid container spacing={1} sx={{ padding: '10px 0' }}>
                        <Grid item xs={9} className={classes.fieldItem}>
                            <Typography variant='body1' sx={{ flexShrink: 0 }}>
                                Họ và tên(Chữ in hoa)
                            </Typography>
                            <TextField
                                variant='standard'
                                size='small'
                                fullWidth
                                InputProps={InputProps}
                            ></TextField>
                        </Grid>
                        <Grid item xs={3} className={classes.fieldItem}>
                            <Typography variant='body1' sx={{ flexShrink: 0 }}>
                                Giới tính
                            </Typography>
                            <TextField
                                variant='standard'
                                size='small'
                                fullWidth
                                InputProps={InputProps}
                                select
                                SelectProps={{ native: true }}
                            >
                                <option value={''}>Chọn giới tính</option>
                                <option value={1}>Nam</option>
                                <option value={0}>Nữ</option>
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} sx={{ padding: '10px 0' }}>
                        <Grid item xs={12} className={classes.fieldItem}>
                            <Typography variant='body1' sx={{ flexShrink: 0 }}>
                                Ngày sinh
                            </Typography>
                            <TextField
                                variant='standard'
                                size='small'
                                fullWidth
                                type='date'
                                InputProps={InputProps}
                            ></TextField>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} sx={{ padding: '10px 0' }}>
                        <Grid item xs={12} className={classes.fieldItem}>
                            <Typography variant='body1' sx={{ flexShrink: 0 }}>
                                Chỗ ở hiện nay
                            </Typography>
                            <TextField
                                variant='standard'
                                size='small'
                                fullWidth
                                InputProps={InputProps}
                            ></TextField>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} sx={{ padding: '10px 0' }}>
                        <Grid item xs={6} className={classes.fieldItem}>
                            <Typography variant='body1' sx={{ flexShrink: 0 }}>
                                Điện thoại
                            </Typography>
                            <TextField
                                variant='standard'
                                size='small'
                                fullWidth
                                InputProps={InputProps}
                            ></TextField>
                        </Grid>
                        <Grid item xs={6} className={classes.fieldItem}>
                            <Typography variant='body1' sx={{ flexShrink: 0 }}>
                                Email
                            </Typography>
                            <TextField
                                variant='standard'
                                size='small'
                                fullWidth
                                InputProps={InputProps}
                            ></TextField>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} sx={{ padding: '10px 0' }}>
                        <Grid item xs={6} className={classes.fieldItem}>
                            <Typography variant='body1' sx={{ flexShrink: 0 }}>
                                Dân tộc
                            </Typography>
                            <TextField
                                variant='standard'
                                size='small'
                                fullWidth
                                InputProps={InputProps}
                            ></TextField>
                        </Grid>
                        <Grid item xs={6} className={classes.fieldItem}>
                            <Typography variant='body1' sx={{ flexShrink: 0 }}>
                                Tôn giáo
                            </Typography>
                            <TextField
                                variant='standard'
                                size='small'
                                fullWidth
                                InputProps={InputProps}
                            ></TextField>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} sx={{ padding: '10px 0' }}>
                        <Grid item xs={6} className={classes.fieldItem}>
                            <Typography variant='body1' sx={{ flexShrink: 0 }}>
                                Số căn cước công dân
                            </Typography>
                            <TextField
                                variant='standard'
                                size='small'
                                fullWidth
                                InputProps={InputProps}
                            ></TextField>
                        </Grid>
                        <Grid item xs={6} className={classes.fieldItem}>
                            <Typography variant='body1' sx={{ flexShrink: 0 }}>
                                Cấp ngày
                            </Typography>
                            <TextField
                                variant='standard'
                                size='small'
                                fullWidth
                                type='date'
                                InputProps={InputProps}
                            ></TextField>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} sx={{ padding: '10px 0' }}>
                        <Grid item xs={12} className={classes.fieldItem}>
                            <Typography variant='body1' sx={{ flexShrink: 0 }}>
                                Nơi cấp
                            </Typography>
                            <TextField
                                variant='standard'
                                size='small'
                                fullWidth
                                InputProps={InputProps}
                            ></TextField>
                        </Grid>
                    </Grid>
                    <Box
                        className={classes.personalInfo}
                        sx={{ marginTop: '20px' }}
                    >
                        <Typography
                            variant='h5'
                            sx={{
                                textTransform: 'uppercase',
                                fontWeight: 'bold'
                            }}
                        >
                            2. Quan hệ gia đình
                        </Typography>
                    </Box>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={12}>
                            <ListTemplate
                                maxHeight={250}
                                headerData={headerFamilyData}
                                isDelete={true}
                                isEdit={true}
                                idData={idFamilyData}
                                rowData={rowFamilyData}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sx={{ padding: '30px 0' }}>
                            <Typography
                                variant='body1'
                                fontSize={'24px'}
                                textTransform={'uppercase'}
                                textAlign={'center'}
                                fontWeight={'bold'}
                            >
                                Lời cam đoan
                            </Typography>
                            <Typography
                                variant='body1'
                                sx={{ paddingTop: '10px' }}
                            >
                                Tôi xin cam đoan những lời khai trên là đúng sự
                                thực và chịu trách nhiệm về những lời khai đó.
                                Nếu sau này cơ quan có thẩm quyền phát hiện vấn
                                đề gì không đúng. Tôi xin chấp hành biện pháp xử
                                lý theo quy định.
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={8}></Grid>
                        <Grid
                            item
                            xs={4}
                            sx={{
                                padding: '20px 0',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            <Typography variant='body1'>
                                Hà Nội......Ngày....tháng.....năm.....
                            </Typography>
                            <Typography
                                variant='body1'
                                fontWeight={'bold'}
                                paddingTop={'10px'}
                            >
                                Người khai ký tên
                            </Typography>
                            <Typography variant='body1' paddingTop={'10px'}>
                                Nhiệm
                            </Typography>
                            <Typography variant='body1' paddingTop={'10px'}>
                                Nguyễn Văn Nhiệm
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Resume;
