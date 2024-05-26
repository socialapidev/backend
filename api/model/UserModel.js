const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// Define User Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required.'],
        unique: [true, 'Username is already taken.']
    },
    displayName: {
        type: String,
        required: [true, 'Display Name is required.']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: [true, 'Email is already registred.'],
        required: [true, 'Email is required.']
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minlength: [6, 'Password hash must be at least 6 characters long.']
    },
    role: {
        type: String,
        required: [true, 'Role is required (admin/user/support)'],
        enum: ['admin', 'user', 'support'],
        default: 'admin'
    },
    status: {
        type: String,
        required: [true, 'Status is required. (Active/Blocked)'],
        enum: ['active', 'blocked'],
        default: 'active'
    }
})

// Pre-Save Hook
UserSchema.pre("save", async function (next) {
    try{
        // Generate Salt
        const salt = await bcrypt.genSaltSync(parseFloat(process.env.BCRYPT_SALT_ROUNDS))

        // Hash Password
        this.password = await bcrypt.hashSync(this.password, salt)

        //Next
        next();

    }catch(err){
        //Next
        next(err);     
    }
})

// Create User Model
const User = mongoose.model('User', UserSchema);

// Export User Model
module.exports = User;
