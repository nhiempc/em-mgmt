import { useState } from 'react';
import { isCitizenId, isEmail, isPhoneNumber } from '../helpers/common';

const useValidate = () => {
    const [errors, setErrors] = useState({});
    const validate = (event) => {
        if (event.target.id) {
            const label = event.target.labels[0].textContent.replace('*', '');
            const { name, value, type, id } = event.target;
            if (!value) {
                setErrors({ ...errors, [id]: `${label} không được để trống` });
            } else if (type === 'email') {
                !isEmail(value)
                    ? setErrors({
                          ...errors,
                          [id]: `Định dạng ${label.toLowerCase()} không chính xác`
                      })
                    : delete errors[id];
            } else if (type === 'tel') {
                !isPhoneNumber(value)
                    ? setErrors({
                          ...errors,
                          [id]: `Định dạng ${label.toLowerCase()} không chính xác`
                      })
                    : delete errors[id];
            } else if (name === 'citizenId') {
                !isCitizenId(value)
                    ? setErrors({
                          ...errors,
                          [id]: `Định dạng ${
                              label.charAt(0).toLowerCase() + label.slice(1)
                          } không chính xác. Nhập đủ 12 kí tự số bắt đầu từ số 0`
                      })
                    : delete errors[id];
            } else {
                delete errors[id];
            }
        }
    };
    return { errors, validate };
};
export default useValidate;
