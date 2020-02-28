
module.exports = (sequelize,type) => {
    return sequelize.define('accounts',{
        email: type.TEXT,
        username: type.TEXT,
        password : type.TEXT
    
      })
}

