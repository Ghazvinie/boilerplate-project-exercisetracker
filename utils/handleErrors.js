function handleErrors(error) {
    const errorObject = { message: '' };
    console.log(error.name);

    if (error.code === 11000) {
        errorObject.message = 'Username is already taken';
        return errorObject;
    }

    if (error.message.includes('`userName` is required')){
        errorObject.message = 'Username field is empty, please enter a username';
        return errorObject;
    }
}

module.exports = handleErrors;