// function to validate email
const validateEmail = (email: string) => {
    if (!email) return false;
    return true;
};


const validatePassword = (password: string) => {
    if (password.length < 8) return false;
    return true;
};

const verifyPhoneNumber = (phone: string) => {
    if (phone.length < 11) return false;
    return true;
}

export {
    validateEmail,
    validatePassword,
    verifyPhoneNumber,
}