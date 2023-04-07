import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(
    (theme) => ({
        rootPanigation: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: theme.spacing(2)
        },
        selectEmpty: {
            marginLeft: theme.spacing(2),
            minWidth: 75,
            '& > div': {
                paddingLeft: 10
            }
        },
        pagination: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        textPage: {
            width: 70,
            textAlign: 'center',
            marginRight: 10,
            '& input': {
                textAlign: 'center'
            }
        },
        pageNumber: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: '10px'
        }
    }),
    { index: 1 }
);

export default useStyles;
