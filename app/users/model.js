let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    library: {
        type: [String],
        default: null
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('users', userSchema);
