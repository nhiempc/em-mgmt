import { ACTIONS } from '../../common';
export const addCertificate = (data) => {
    return {
        type: ACTIONS.ADD_CERTIFICATE,
        payload: data
    };
};
export const addFamilyMember = (data) => {
    return {
        type: ACTIONS.ADD_FAMILY_MEMBER,
        payload: data
    };
};
export const addEmployInfo = (data) => {
    return {
        type: ACTIONS.ADD_EMPLOYEE_INFO,
        payload: data
    };
};

export const editCertificate = (index, data) => {
    return {
        type: ACTIONS.EDIT_CERTIFICATE,
        payload: data,
        index: index
    };
};

export const deleteCertificate = (id) => {
    return {
        type: ACTIONS.DELETE_CERTIFICATE,
        payload: id
    };
};

export const editFamilyMember = (index, data) => {
    return {
        type: ACTIONS.EDIT_FAMILY_MEMBER,
        payload: data,
        index: index
    };
};

export const deleteFamilyMember = (id) => {
    return {
        type: ACTIONS.DELETE_FAMILY_MEMBER,
        payload: id
    };
};
