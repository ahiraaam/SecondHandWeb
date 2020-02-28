const Sequelize = require('sequelize')

const sequelize = new Sequelize('webAppDatabase','root','theRootPassword',{
    dialect: 'mysql',
    host: 'database'
})

module.exports = sequelize