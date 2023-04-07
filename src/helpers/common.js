export const isEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
export const isEmptyObject = (obj) => {
    for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            return false;
        }
    }
    return JSON.stringify(obj) === JSON.stringify({});
};
export const isPhoneNumber = (phone) => {
    return String(phone)
        .toLowerCase()
        .match(/((09|03|07|08|05)+([0-9]{8})\b)/g);
};
export const isCitizenId = (citizenId) => {
    return String(citizenId)
        .toLowerCase()
        .match(/((0)+([0-9]{11})\b)/g);
};
