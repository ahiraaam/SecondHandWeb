
module.exports = (sequelize,type) => {
  return sequelize.define('purchases',{
    street: type.TEXT,
    city: type.TEXT,
    zip : type.TEXT,
    country: type.TEXT
  })
}
