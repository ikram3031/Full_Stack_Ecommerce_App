const User = require("../../model/user/User");
const CustomError = require('../../errors')

//-------------------------------------
//Register
//-------------------------------------

const userRegisterCtrl = async (req, res) => {
  //Check if user Exist
  const userExists = await User.findOne({ email: req.body.email });

  if (userExists) {
    throw new CustomError.BadRequestError("Email Already Exists");
  }
    //Register user
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(StatusCodes.CREATED).json({ user })
};

module.exports = { userRegisterCtrl };
