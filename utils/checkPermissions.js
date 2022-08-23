const CustomError = require('../errors')

const checkPermissions = (requestUser, resourceUserId) => {
    //console.log(requestUser);
    //console.log(resourceUserId);
    //console.log(typeof resourceUserId);

    //check if the user is admin, admin can access all
    if(requestUser.role === 'admin') return;

    // check if the user is requesting to acces his own property
    if(requestUser.userId === resourceUserId.toString()) return
    throw new CustomError.UnauthorizedError(
        "Not authorized to access"
    );
};

module.exports = checkPermissions