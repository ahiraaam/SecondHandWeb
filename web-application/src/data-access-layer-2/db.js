const Sequelize = require('sequelize')


const sequelize = new Sequelize('webAppDatabase','root','theRootPassword',{
    dialect: 'postgres',
    host: 'database'
})

module.exports = sequelize