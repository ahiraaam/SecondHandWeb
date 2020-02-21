const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

  class User extends Model {}
  Account.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password : DataTypes.STRING
  }, { sequelize, modelName: 'account' });
  
  class User extends Model {}
  Petition.init({
    title: DataTypes.STRING,
    autor: DataTypes.STRING,
    comentary : DataTypes.STRING,
    place: DataTypes.STRING,
    state: DataTypes.STRING,
    photo : DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, { sequelize, modelName: 'petition' });
  
  class User extends Model {}
  Offer.init({
    title: DataTypes.STRING,
    autor: DataTypes.STRING,
    comentary : DataTypes.STRING,
    place: DataTypes.STRING,
    state: DataTypes.STRING,
    photo : DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    price: DataTypes.INT 
  }, { sequelize, modelName: 'offer' });

 

  sequelize.sync()
    .then(() => User.create({
      username: 'janedoe',
      birthday: new Date(1980, 6, 20)
    }))
    .then(jane => {
      console.log(jane.toJSON());
    });