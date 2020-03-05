
module.exports = (sequelize,type) => {
    return sequelize.define('purchases',{
        direction: type.TEXT
      })
}
