import { Box } from '@mui/material';
import React from 'react';
import ListTemplate from '../Common/ListTemplate';

const ApprovedContainer = () => {
    const headerData = [
        'Họ Tên',
        'Email',
        'Số điện thoại',
        'Trạng thái',
        'Hành động'
    ];

    const rowData = [
        ['steve roger', 'niv2001@gmail.com', '0126594874', 'Yêu cầu bổ sung'],
        ['steve roger', 'niv2001@gmail.com', '0126594874', 'Từ chối'],
        ['steve roger', 'niv2001@gmail.com', '0126594874', 'Duyệt']
    ];
    return (
        <Box sx={{ padding: '24px' }}>
            <ListTemplate
                isInfo={true}
                isEdit={false}
                isDelete={false}
                headerData={headerData}
                rowData={rowData}
            />
        </Box>
    );
};

export default ApprovedContainer;
