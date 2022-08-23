const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, 'Please Provide Firstname'],
        minlength: 2,
        maxlength: 50,
    },
    lastName:{
        type: String,
        required: [true, 'Please Provide Lastname'],
        minlength: 2,
        maxlength: 50,
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'Please Provide email'],
        //mongoose email validator
        validate:{
            validator: validator.isEmail,
            message: 'Please provide a valid Email',
        }
    },
    password:{
        type: String,
        required: [true, 'Please Provide email'],
        minlength: 6,
    },
    profilePhoto: {
        type: String,
        default:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    role:{
        type:String,
        enum:['admin', 'user', 'contributor'],
        default: 'user',
    },
    bio: {
        type: String,
    },
    postCount: {
        type: Number,
        default: 0,
    },
}, {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  });

UserSchema.pre('save', async function(){
    // don't hash the password again if its not modified
    if(!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch
}

module.exports = mongoose.model('User', UserSchema)