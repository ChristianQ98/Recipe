const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [ true, 'Please enter your first name' ],
        minlength: [ 2, 'First name must be at minimum 2 characters long' ]
    },
    lastName: {
        type: String,
        required: [ true, 'Please enter your last name' ],
        minlength: [ 2, 'Last name must be at minimum 2 characters long' ]
    },
    email: {
        type: String,
        required: [ true, 'Please enter your email' ],
        // Used to describe how the schema type will be validated
        validate: {
            // Regex will be used to validate the email
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            // Message if the email does not align with the regex validation
            message: 'Please enter a valid email'
        }
    },
    password: {
        type: String,
        required: [ true, 'Password is required' ],
        minlength: [ 8, 'Password must be 8 characters or longer' ]
    },
}, { timestamps: true });

// Adds an additional schema type, which will not be saved in the database
UserSchema.virtual('confirmPassword')
    // Adds a getter so that we can retrieve this schema type's value
    .get( () => this._confirmPassword )
    // Adds a setter so that we can set the value of this schema type's value
    .set( value => this._confirmPassword = value );

// Hook that defines how the passwords will be validated
UserSchema.pre('validate', function(next) {
    // If the user types in a password and it DOES NOT match the 'confirm password' field...
    if(this.password != this._confirmPassword) {
        // Validation fails and an error message will be returned
        this.invalidate('confirmPassword', 'Passwords do not match!')
    }
    // The 'next' function will allow the other validations to run after the password has finished being validated
    next();
});

// Hook that defines how the password will be saved in the database
UserSchema.pre('save', function(next) {
    // The "10" inside the bcrypt.hash() function refers to the number of salt rounds that Bcrypt will use when generating a salt
    bcrypt.hash(this.password, 10)
        .then(hash => {
            // The password gets stored in the database as a hashed string
            this.password = hash;
            next();
        });
});

module.exports.User = mongoose.model('User', UserSchema);