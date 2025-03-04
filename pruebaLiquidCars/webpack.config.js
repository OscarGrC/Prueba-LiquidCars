const dotenv = require('dotenv');
const Dotenv = require('dotenv-webpack');

module.exports = {
    plugins: [
        new Dotenv()
    ]
};
