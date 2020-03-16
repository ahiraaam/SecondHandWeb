const Sequelize = require('sequelize')
const AccountModel = require('./models/account')
const OfferModel = require('./models/offer')
const PetitionModel = require('./models/petition')
const PurchaseModel = require('./models/purchases')

const db = {};

const sequelize = new Sequelize('webAppDatabase','root','theRootPassword',{
    host: 'postgres',
    dialect: 'postgres',
})



const Account = AccountModel(sequelize,Sequelize)
const Offer = OfferModel(sequelize,Sequelize)
const Petition = PetitionModel(sequelize,Sequelize)
const Purchase = PurchaseModel(sequelize,Sequelize)

Petition.belongsTo(Account,{foreignKey: 'account_id'})
Offer.belongsTo(Account,{foreignKey: 'account_id'})
Offer.belongsTo(Petition,{foreignKey: 'petition_id'})

Purchase.belongsTo(Account,{foreignKey: 'account_id'})
Purchase.belongsTo(Petition,{foreignKey: 'petition_id'})
Purchase.belongsTo(Offer,{foreignKey: 'offer_id'})

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  account: Account,
  offer: Offer,
  petition: Petition,
  purchase: Purchase 
}

