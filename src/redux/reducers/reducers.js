import { ACTIONS } from '../../common';

const initState = {
    newEmployee: {
        employeeInfo: { status: 1 },
        certificates: [],
        familyRelations: []
    }
};

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case ACTIONS.ADD_CERTIFICATE:
            return {
                ...state,
                newEmployee: {
                    ...state.newEmployee,
                    certificates: [
                        ...state.newEmployee.certificates,
                        action.payload
                    ]
                }
            };
        case ACTIONS.ADD_FAMILY_MEMBER:
            return {
                ...state,
                newEmployee: {
                    ...state.newEmployee,
                    familyRelations: [
                        ...state.newEmployee.familyRelations,
                        action.payload
                    ]
                }
            };
        case ACTIONS.ADD_EMPLOYEE_INFO:
            return {
                ...state,
                newEmployee: {
                    ...state.newEmployee,
                    employeeInfo: {
                        ...action.payload,
                        status: 1
                    }
                }
            };
        case ACTIONS.EDIT_CERTIFICATE:
            const newArr = [...state.newEmployee.certificates];
            newArr[action.index] = action.payload;
            return {
                ...state,
                newEmployee: {
                    ...state.newEmployee,
                    certificates: [...newArr]
                }
            };
        case ACTIONS.DELETE_CERTIFICATE:
            const certificateRest = state.newEmployee.certificates.filter(
                (item) => item.certificateId !== action.payload
            );
            return {
                ...state,
                newEmployee: {
                    ...state.newEmployee,
                    certificates: [...certificateRest]
                }
            };
        case ACTIONS.EDIT_FAMILY_MEMBER:
            const newArray = [...state.newEmployee.familyRelations];
            newArray[action.index] = action.payload;
            return {
                ...state,
                newEmployee: {
                    ...state.newEmployee,
                    familyRelations: [...newArray]
                }
            };
        case ACTIONS.DELETE_FAMILY_MEMBER:
            const familyRest = state.newEmployee.familyRelations.filter(
                (item) => item.familyId !== action.payload
            );
            return {
                ...state,
                newEmployee: {
                    ...state.newEmployee,
                    familyRelations: [...familyRest]
                }
            };
        default:
            return state;
    }
};

export default rootReducer;
