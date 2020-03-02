const Sequelize = require('sequelize')
const AccountModel = require('./models/account')
const OfferModel = require('./models/offer')
const PetitionModel = require('./models/petition')

const sequelize = new Sequelize('webAppDatabase','root','theRootPassword',{
    host: 'postgres',
    dialect: 'postgres',

})

const Account = AccountModel(sequelize,Sequelize)
const Offer = OfferModel(sequelize,Sequelize)
const Petition = PetitionModel(sequelize,Sequelize)

Petition.belongsTo(Account,{foreignKey: 'accountId'})
Offer.belongsTo(Account,{foreignKey: 'accountId'})
Offer.belongsTo(Petition,{foreignKey: 'petitionId'})

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  account: Account,
  offer: Offer,
  petition: Petition 
}

