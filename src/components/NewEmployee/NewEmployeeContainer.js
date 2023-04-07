import { Button } from '@mui/material';
import { Box } from '@mui/system';
import useSWR from 'swr';
import { useState } from 'react';
import AddEmployeeModal from '../Common/AddEmployeeModal';
import ListTemplate from '../Common/ListTemplate';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { HttpMethod, protectedFetcher } from '../../helpers/fetchHelper';
import { GET_EMPLOYEES, GET_TOTAL_RECORD } from '../../common';
import usePagination from '../../hooks/usePagination';
import { STATUS } from '../../common';
import PaginationBase from '../Common/Pagination/Pagination';
import { useStyles } from './style';
import { isEmptyObject } from '../../helpers/common';
import CustomizedSnackbars from '../Common/Snackbar/Snackbar';
import DeleteModal from '../Common/DeleteModal/DeleteModal';
import ProfileModal from '../Common/ProfileModal/ProfileModal';

const NewEmployeeContainer = () => {
    const { classes } = useStyles();

    const { page, perPage, _changePage, _changePerPage } = usePagination({
        pageCount: 10
    });

    const { data: dataEmployees, mutate: mutateDataEmployee } = useSWR(
        [
            `${GET_EMPLOYEES}?statuses=1,2,3,4&page=${page}&size=${perPage}`,
            HttpMethod.GET
        ],
        ([url, method]) => protectedFetcher(url, method)
    );

    const { data: dataTotalRecord } = useSWR(
        [
            `${GET_EMPLOYEES}/${GET_TOTAL_RECORD}?statuses=1,2,3,4`,
            HttpMethod.GET
        ],
        ([url, method]) => protectedFetcher(url, method)
    );

    let totalPageNum = 0;
    if (dataTotalRecord) {
        totalPageNum = Math.floor(dataTotalRecord.data / perPage + 1);
    }

    const headerData = [
        'Mã nhân viên',
        'Tên nhân viên',
        'Email',
        'Số điện thoại',
        'Mã CCCD/CMT',
        'Trạng thái',
        'Thao tác'
    ];
    const rowData = [];

    const idData = [];

    if (dataEmployees !== undefined) {
        if (dataEmployees.data) {
            dataEmployees.data.map((employee) => {
                rowData.push([
                    employee.code,
                    employee.fullName,
                    employee.email,
                    employee.phone,
                    employee.citizenId,
                    STATUS[employee.status]
                ]);
                idData.push(Number(employee.employeeId));
                return rowData;
            });
        }
    }

    const [openInfoModal, setOpenInfoModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [employeeToEdit, setEmployeeToEdit] = useState({});
    const [severity, setSeverity] = useState('success');
    const [alertContent, setAlertContent] = useState('');
    const [open, setOpen] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState();

    const handleShowEmployeeInfo = () => {
        setOpenInfoModal(!openInfoModal);
    };

    // const handleHideEmployeeInfo = () => {
    //     setOpenInfoModal(!openInfoModal);
    // };

    const handleShowAddEmployeeInfo = () => {
        setOpenAddModal(!openAddModal);
    };

    const handleHideAddEmployeeInfo = () => {
        setOpenAddModal(!openAddModal);
    };

    const handleEditEmployee = (id) => {
        setOpenEditModal(!openEditModal);
        protectedFetcher(`${GET_EMPLOYEES}/${id}`, HttpMethod.GET).then(
            (respone) => {
                if (respone) {
                    setEmployeeToEdit(respone.data);
                }
            }
        );
    };

    const handleHideEditEmployeeInfo = () => {
        setOpenEditModal(!openEditModal);
        setEmployeeToEdit({});
    };

    const handleSaveEmployeeInfo = (employee) => {
        protectedFetcher(
            `${GET_EMPLOYEES}`,
            HttpMethod.POST,
            JSON.stringify(employee)
        )
            .then((respone) => {
                if (respone) {
                    if (respone.code === 200) {
                        setSeverity('success');
                        setAlertContent('Lưu thông tin thành công');
                        setOpen(true);
                    } else {
                        setSeverity('warning');
                        setAlertContent(respone.message);
                        setOpen(true);
                    }
                } else {
                    setSeverity('warning');
                    setAlertContent(respone.message);
                    setOpen(true);
                    setOpenAddModal(false);
                }
            })
            .catch((err) => {
                setSeverity('error');
                setAlertContent(
                    'Chúng tôi đang gặp một số vấn đề. Vui lòng thử lại sau'
                );
                setOpen(true);
                setOpenAddModal(false);
            });
    };

    const handleDeleteEmployeeClick = (id) => {
        setDeleteId(id);
        setIsOpenDeleteModal(true);
    };
    const handleDeleteEmployee = () => {
        protectedFetcher(
            `${GET_EMPLOYEES}/${deleteId}/status`,
            HttpMethod.PUT,
            JSON.stringify({
                status: 14
            })
        )
            .then((respone) => {
                if (respone) {
                    if (respone.code === 200) {
                        setSeverity('success');
                        setAlertContent('Xóa nhân viên thành công');

                        setOpen(true);
                        setIsOpenDeleteModal(false);
                    } else {
                        setSeverity('warning');
                        setAlertContent(respone.message);
                        setOpen(true);
                        setIsOpenDeleteModal(false);
                    }
                } else {
                    setSeverity('warning');
                    setAlertContent(respone.message);
                    setOpen(true);
                    setIsOpenDeleteModal(false);
                }
            })
            .catch((err) => {
                setSeverity('error');
                setAlertContent(
                    'Chúng tôi đang gặp một số vấn đề. Vui lòng thử lại sau'
                );
                setOpen(true);
                setIsOpenDeleteModal(false);
            });
    };

    const handleCloseDeleteModal = () => {
        setIsOpenDeleteModal(false);
    };

    return (
        <>
            <Box sx={{ padding: '24px' }}>
                <Button
                    type='button'
                    variant='contained'
                    startIcon={<PersonAddAltIcon />}
                    className={classes.btn}
                    sx={{
                        marginBottom: '12px',
                        backgroundColor: `${process.env.REACT_APP_THEME_COLOR}`
                    }}
                    onClick={handleShowAddEmployeeInfo}
                >
                    Tạo mới
                </Button>
                <ListTemplate
                    maxHeight={550}
                    isInfo={true}
                    handleShowInfo={handleShowEmployeeInfo}
                    isEdit={true}
                    idData={idData}
                    handleEdit={handleEditEmployee}
                    isDelete={true}
                    handleDelete={handleDeleteEmployeeClick}
                    headerData={headerData}
                    rowData={rowData}
                />

                <PaginationBase
                    perPage={perPage}
                    totalPage={totalPageNum}
                    pageIndex={page}
                    changePage={_changePage}
                    changePerPage={_changePerPage}
                />
            </Box>
            <AddEmployeeModal
                title={'Tạo mới nhân viên'}
                isOpen={openAddModal}
                isEdit={false}
                handleClose={handleHideAddEmployeeInfo}
                handleSave={handleSaveEmployeeInfo}
            />

            <DeleteModal
                isOpen={isOpenDeleteModal}
                title={'Bạn có muốn xóa?'}
                handleDelete={handleDeleteEmployee}
                handleClose={handleCloseDeleteModal}
            />

            <ProfileModal isOpen={true} title={'Thông tin hồ sơ'} />

            {!isEmptyObject(employeeToEdit) && employeeToEdit && (
                <AddEmployeeModal
                    title={'Chỉnh sửa nhân viên'}
                    isOpen={openEditModal}
                    isEdit={true}
                    editData={employeeToEdit}
                    handleClose={handleHideEditEmployeeInfo}
                />
            )}
            <CustomizedSnackbars
                contentSnack={alertContent}
                severity={severity}
                open={open}
                setOpen={setOpen}
            />
        </>
    );
};

export default NewEmployeeContainer;
