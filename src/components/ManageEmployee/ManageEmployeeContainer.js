import { Box } from '@mui/system';
import React from 'react';
import ListTemplate from '../Common/ListTemplate';

const ManageEmployeeContainer = () => {
    const headerData = [
        'Mã nhân viên',
        'Họ và tên',
        'Ngày sinh',
        'Giới tính',
        'Địa chỉ',
        'Trạng thái',
        'Hành động'
    ];

    const rowData = [
        [
            'NIV2001',
            'huyen anh',
            '23/5/1970',
            'Nữ',
            '985 nguyen xien',
            'đã từ chối'
        ],
        [
            'NIV2001',
            'huyen anh',
            '23/5/1970',
            'Nữ',
            '985 nguyen xien',
            'đã từ chối'
        ],
        [
            'NIV2001',
            'huyen anh',
            '23/5/1970',
            'Nữ',
            '985 nguyen xien',
            'đã từ chối'
        ]
    ];
    return (
        <Box sx={{ padding: '24px' }}>
            <ListTemplate
                isInfo={true}
                isEdit={true}
                isDelete={false}
                headerData={headerData}
                rowData={rowData}
            />
        </Box>
    );
};

export default ManageEmployeeContainer;
