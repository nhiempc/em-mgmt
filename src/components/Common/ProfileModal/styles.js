import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(
    () => ({
        modalContent: {
            '&::-webkit-scrollbar': {
                width: '0.4em'
            },
            '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                borderRadius: '8px'
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,.1)',
                borderRadius: '8px'
            },
            paddingTop: 0
        },
        dialogActionWrapper: {
            display: 'flex',
            justifyContent: 'center'
        },
        leftWrapper: {
            backgroundColor: `${process.env.REACT_APP_THEME_COLOR}`,
            color: 'white'
        },
        FormLabel: {
            color: `${process.env.REACT_APP_THEME_COLOR}`
        },
        imageContainer: {
            position: 'relative',
            width: '100%',
            '&::after': {
                content: '""',
                display: 'block',
                paddingBottom: '100%'
            }
        },
        avatar: {
            position: 'absolute',
            top: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            right: 0,
            bottom: 0,
            width: '90%',
            height: '90%',
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: '50%'
        },
        header: {
            textAlign: 'center'
        },
        position: {
            fontWeight: 'normal'
        },
        basicInfo: {
            padding: 16
        },
        titleInfo: {
            textTransform: 'uppercase',
            fontWeight: 'normal',
            padding: '10px 0'
        },
        basicInfoItem: {
            display: 'flex',
            gap: '10px',
            padding: '10px 0',
            alignItems: 'center'
        },
        rightWrapper: {
            padding: 16
        },
        titleWrapper: {
            textTransform: 'uppercase',
            display: 'flex',
            gap: '10px',
            padding: '5px 0',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: `${process.env.REACT_APP_THEME_COLOR}`
        },
        careerGoalTitle: {
            fontWeight: 'bold'
        },
        workExperiencesTitle: {
            fontWeight: 'bold'
        },
        careerGoalWrapper: {
            paddingBottom: '20px'
        },
        timeWrapper: {
            display: 'flex',
            flexDirection: 'column',
            gap: 15
        },
        workItem: {
            padding: '15px 0'
        },
        workDetailWrapper: {
            display: 'flex',
            flexDirection: 'column',
            gap: 15
        },
        resumeHeader: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        resumeTitle: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: '30px'
        },
        resumeWrapper: {
            padding: 16,
            paddingTop: 0,
            boxShadow: '1px 5px 5px #d0d0d0',
            borderLeft: '2px solid #d0d0d0'
        },
        cvWrapper: {
            boxShadow: '1px 5px 5px #d0d0d0'
        },
        resumeAvatar: {
            width: '150px',
            height: '200px',
            border: '1px solid black',
            marginTop: '20px',
            marginBottom: '20px',
            marginLeft: '50px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
        },
        fieldItem: {
            display: 'flex',
            alignItems: 'end',
            gap: '10px'
        }
    }),
    { index: 1 }
);

export const InputProps = {
    sx: {
        borderBottom: '3px dotted black',
        outline: 'none',
        paddingBottom: '0px',
        marginBottom: '5px',
        textTransform: 'uppercase',
        '&::after': {
            borderBottom: 'none'
        },
        '&::before': {
            position: 'unset',
            display: 'none'
        }
    }
};

export default useStyles;
