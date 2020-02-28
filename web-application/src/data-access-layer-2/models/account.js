
module.exports = (sequelize,type) => {
    return sequelize.define('accounts',{
        email: Sequelize.TEXT,
        username: Sequelize.TEXT,
        password : Sequelize.TEXT
    
      })
}

