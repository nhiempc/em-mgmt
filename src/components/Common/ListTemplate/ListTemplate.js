import {
    capitalize,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React from 'react';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

// styles

import useStyles from './styles';

const ListTemplate = ({
    headerData,
    rowData,
    idData,
    isInfo,
    isEdit,
    isDelete,
    handleRequestSort,
    handleShowInfo,
    handleEdit,
    handleDelete,
    order,
    orderBy,
    maxHeight
}) => {
    const { classes } = useStyles();
    const headers = headerData ? headerData : [];
    const rows = rowData ? rowData : [];
    const _isInfo = isInfo ? isInfo : false;
    const _isEdit = isEdit ? isEdit : false;
    const _isDelete = isDelete ? isDelete : false;
    const ids = idData ? idData : [];
    const _handleShowInfo = handleShowInfo ? handleShowInfo : (id) => {};
    const _handleEdit = handleEdit ? handleEdit : (id) => {};
    const _handleDelete = handleDelete ? handleDelete : (id) => {};
    const _handleRequestSort = handleRequestSort
        ? handleRequestSort
        : (event, sortBy) => {};
    const sorting = order ? order : 'asc';
    const sortBy = orderBy ? orderBy : '';

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: `${process.env.REACT_APP_THEME_COLOR}`,
            color: theme.palette.common.white
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14
        },
        '&:last-child': {
            width: '1%',
            whiteSpace: 'nowrap',
            textAlign: 'center'
        }
    }));
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        },
        '&:last-child td, &:last-child th': {
            border: 0
        }
    }));
    return (
        <>
            <TableContainer
                component={Paper}
                sx={{ maxHeight: maxHeight }}
                className={classes.tableContainer}
            >
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <StyledTableRow>
                            {headers &&
                                headers.map((h, i) =>
                                    sortBy === h ? (
                                        <StyledTableCell
                                            key={'h-' + i}
                                            align='left'
                                        >
                                            <TableSortLabel
                                                active={sortBy === h}
                                                direction={
                                                    sorting !== 'asc'
                                                        ? 'desc'
                                                        : 'asc'
                                                }
                                                onClick={
                                                    _handleRequestSort
                                                        ? (event) =>
                                                              _handleRequestSort(
                                                                  event,
                                                                  h
                                                              )
                                                        : () => {}
                                                }
                                            >
                                                {' '}
                                                {capitalize(h)}{' '}
                                            </TableSortLabel>
                                        </StyledTableCell>
                                    ) : (
                                        <StyledTableCell
                                            key={'h-' + i}
                                            align='left'
                                        >
                                            {capitalize(h)}
                                        </StyledTableCell>
                                    )
                                )}
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {rows &&
                            rows.map((r, i) => (
                                <StyledTableRow key={'r-' + i}>
                                    {r.map((c, k) => (
                                        <StyledTableCell
                                            key={'c-' + i + '-' + k}
                                            align='left'
                                        >
                                            {c}
                                        </StyledTableCell>
                                    ))}

                                    <StyledTableCell
                                        key={'c-' + i + '-action'}
                                        align='right'
                                    >
                                        {_isEdit && ids && (
                                            <EditIcon
                                                color='info'
                                                onClick={() =>
                                                    _handleEdit(ids[i])
                                                }
                                                sx={{
                                                    cursor: 'pointer',

                                                    padding: '0 2px'
                                                }}
                                            />
                                        )}

                                        {_isInfo && (
                                            <VisibilityIcon
                                                color='success'
                                                onClick={_handleShowInfo}
                                                sx={{
                                                    cursor: 'pointer',
                                                    padding: '0 2px'
                                                }}
                                            />
                                        )}
                                        {_isDelete && ids && (
                                            <DeleteIcon
                                                color='primary'
                                                onClick={() =>
                                                    _handleDelete(ids[i])
                                                }
                                                sx={{
                                                    cursor: 'pointer',
                                                    color: '#ff1943',
                                                    padding: '0 2px'
                                                }}
                                            />
                                        )}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                    </TableBody>
                </Table>
                {rows.length === 0 && (
                    <div
                        style={{
                            height: 150,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Typography sx={{ textAlign: 'center', color: 'gray' }}>
                            Không có dữ liệu
                        </Typography>
                    </div>
                )}
            </TableContainer>
        </>
    );
};

export default ListTemplate;
