function handleErrors(error) {
    const errorObject = { message: '' };

    if (error.code === 11000) {
        errorObject.message = 'Username is already taken';
        return errorObject;
    }

    if (error.message.includes('`userName` is required')) {
        errorObject.message = 'Username field is empty, please enter a username';
        return errorObject;
    }

    if (error.message === 'GET user error') {
        errorObject.message = 'There was an error finding the user, please try again';
        return errorObject;
    }

    if (error.message === 'update user error') {
        errorObject.message = 'There was an error updating the user, please try again';
        return errorObject;
    }

}

module.exports = handleErrors;