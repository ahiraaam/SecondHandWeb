module.exports = (sequelize,type) => {
    return sequelize.define('offer',{
        title: Sequelize.TEXT,
        author: Sequelize.TEXT,
        commentary : Sequelize.TEXT,
        place: Sequelize.TEXT,
        state: Sequelize.TEXT,
        photo : Sequelize.TEXT,
        active: Sequelize.TEXT,
        price: Sequelize.INTEGER
      })
}

