let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let gameSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    photo: {
        type: String,
        default: '/images/nophoto.png'
    },
    thematics: {
        type: [String],
        default: null
    },
    download_link: {
        linux: {
            type: String,
            default: null
        },
        macOS: {
            type: String,
            default: null
        },
        windows: {
            type: String,
            default: null
        },
    },
    genre: {
        type: String,
        enum : ['Ролевая', 'Стратегия', 'Казуальная', 'Экшен', 'Приключение', 'Симулятор', null],
        default: null
    },
    online: {
        type: String,
        enum : ['Кооператив', 'MMO', 'Мультиплеер', null],
        default: null
    }
},
    {
        versionKey: false
    });

module.exports = mongoose.model('games', gameSchema);
