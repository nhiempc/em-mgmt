import { Box } from '@mui/system';
import React from 'react';
import ListTemplate from '../Common/ListTemplate';

const PendingContainer = () => {
    const headerData = ['Họ Tên', 'Email', 'Số điện thoại', 'Hành động'];

    const rowData = [
        ['Nguyễn Văn Nhiệm', 'email@gmail.com', '0126594874'],
        ['Nguyễn Văn Nhiệm', 'email@gmail.com', '0126594874'],
        ['Nguyễn Văn Nhiệm', 'email@gmail.com', '0126594874']
    ];
    return (
        <Box sx={{ padding: '24px' }}>
            <ListTemplate
                isInfo={true}
                isEdit={true}
                isDelete={true}
                headerData={headerData}
                rowData={rowData}
            />
        </Box>
    );
};

export default PendingContainer;
