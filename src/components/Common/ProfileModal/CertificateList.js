import { Grid } from '@mui/material';
import React from 'react';
import ListTemplate from '../ListTemplate/ListTemplate';
import { headerCertificateData } from '../../../common';

const CertificateList = () => {
    const idCertificateData = [];
    const rowCertificateData = [];
    return (
        <Grid
            container
            spacing={2}
            sx={{ display: 'flex', justifyContent: 'center' }}
        >
            <Grid item xs={10} paddingBottom={'50px'}>
                <ListTemplate
                    maxHeight={250}
                    headerData={headerCertificateData}
                    isDelete={true}
                    isEdit={true}
                    idData={idCertificateData}
                    rowData={rowCertificateData}
                />
            </Grid>
        </Grid>
    );
};

export default CertificateList;
