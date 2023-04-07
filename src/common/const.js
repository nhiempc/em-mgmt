export const GET_EMPLOYEES = 'employees';
export const GET_TOTAL_RECORD = 'total';
export const GET_TOKEN = 'oauth/token';

export const STATUS = {
    // 1 - 14: Employee Status
    // 15 - 19: Cập nhật diễn biến Status
    1: 'Lưu mới',
    2: 'Chờ xử lý',
    3: 'Chờ duyệt',
    4: 'Yêu cầu bổ sung',
    5: 'Đã duyệt',
    6: 'Đã từ chối',
    8: 'Chờ duyệt kết thúc',
    9: 'Yêu cầu bổ sung đối với kết thúc',
    10: 'Đã duyệt kết thúc',
    11: 'Đã từ chối kết thúc',
    12: 'Đã kết thúc',
    13: 'Đã lưu hồ sơ',
    14: 'Đã xóa',
    15: 'Lưu mới',
    16: 'Chờ duyệt',
    17: 'Yêu cầu bổ sung',
    18: 'Đã duyệt',
    19: 'Đã từ chối'
};

export const GENDER = {
    0: 'Nữ',
    1: 'Nam'
};

export const ACTIONS = {
    ADD_CERTIFICATE: 'ADD_CERTIFICATE',
    ADD_FAMILY_MEMBER: 'ADD_FAMILY_MEMBER',
    ADD_EMPLOYEE_INFO: 'ADD_EMPLOYEE_INFO',
    EDIT_CERTIFICATE: 'EDIT_CERTIFICATE',
    DELETE_CERTIFICATE: 'DELETE_CERTIFICATE',
    EDIT_FAMILY_MEMBER: 'EDIT_FAMILY_MEMBER',
    DELETE_FAMILY_MEMBER: 'DELETE_FAMILY_MEMBER'
};

export const headerFamilyData = [
    'Họ và tên',
    'Giới tính',
    'Ngày sinh',
    'Số CCCD',
    'Mối quan hệ',
    'Địa chỉ',
    'Hành động'
];

export const headerCertificateData = [
    'Tên văn bằng',
    'Ngày cấp',
    'Nội dung',
    'Lĩnh vực',
    'Hành động'
];
