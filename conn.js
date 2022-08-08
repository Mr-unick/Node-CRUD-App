const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/new');
const nameSchema = mongoose.Schema({
    username: '',
    number: '',
    city: '',
    password: '',
    email: ''
});
module.exports = mongoose.model('names', nameSchema);