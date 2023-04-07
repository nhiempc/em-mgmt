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
            }
        },
        dialogActionWrapper: {
            display: 'flex',
            justifyContent: 'center'
        }
    }),
    { index: 1 }
);

export default useStyles;
