module.exports = (sequelize,type) => {
    return sequelize.define('offer',{
        title: type.TEXT,
        author: type.TEXT,
        commentary : type.TEXT,
        place: type.TEXT,
        state: type.TEXT,
        photo : type.TEXT,
        active: type.BOOLEAN,
        price: type.INTEGER
      })
}

