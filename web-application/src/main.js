////////////////////////////////////Awilix
const awilix = require('awilix')
const container = awilix.createContainer()

//const db = require('./data-access-layer/account-repository')
const accountRepository = require('./data-access-layer/account-repository')
const petitionRepository = require('./data-access-layer/petition-repository')
const offerRepository = require('./data-access-layer/offer-repository')
const purchaseRepository = require('./data-access-layer/purchase-repository')
const accountValidator = require('./business-logic-layer/account-validator')
const accountManager = require('./business-logic-layer/account-manager')
const petitionManager = require('./business-logic-layer/petition-manager')
const offerManager = require('./business-logic-layer/offer-manager')
const purchaseManager = require('./business-logic-layer/purchase-manager')
const accountRouter = require('./presentation-layer/routers/account-router')
const accountRouterAPI = require('./presentation-layer-API/routers/account-router')
const variousRouter = require('./presentation-layer/routers/various-router')
const petitionRouter = require('./presentation-layer/routers/petition-router')
const petitionRouterAPI = require('./presentation-layer-API/routers/petition-router')
const offerRouter = require('./presentation-layer/routers/offer-router')
const offerRouterAPI = require('./presentation-layer-API/routers/offer-router')
const purchaseRouter = require('./presentation-layer/routers/purchase-router')
const purchaseRouterAPI = require('./presentation-layer-API/routers/purchase-router')
const app = require('./app')
const appNormal = require('./presentation-layer/app')
const appAPI = require('./presentation-layer-API/app')


//container.register("db", awilix.asFunction(db))
container.register("accountRepository",awilix.asFunction(accountRepository))
container.register("petitionRepository",awilix.asFunction(petitionRepository))
container.register("offerRepository",awilix.asFunction(offerRepository))
container.register("purchaseRepository", awilix.asFunction(purchaseRepository))
container.register("accountValidator",awilix.asFunction(accountValidator))
container.register("accountManager",awilix.asFunction(accountManager))
container.register("petitionManager",awilix.asFunction(petitionManager))
container.register("offerManager",awilix.asFunction(offerManager))
container.register("purchaseManager",awilix.asFunction(purchaseManager))
container.register("accountRouter",awilix.asFunction(accountRouter))
container.register("accountRouterAPI",awilix.asFunction(accountRouterAPI))
container.register("variousRouter",awilix.asFunction(variousRouter))
container.register("petitionRouter", awilix.asFunction(petitionRouter))
container.register("petitionRouterAPI", awilix.asFunction(petitionRouterAPI))
container.register("offerRouterAPI",awilix.asFunction(offerRouterAPI))
container.register("offerRouter",awilix.asFunction(offerRouter))
container.register("appNormal",awilix.asFunction(appNormal))
container.register("appAPI",awilix.asFunction(appAPI))
container.register("purchaseRouter", awilix.asFunction(purchaseRouter))
container.register("purchaseRouterAPI", awilix.asFunction(purchaseRouterAPI))
container.register("app",awilix.asFunction(app))

const main = container.resolve('app')
main.listen(8080, ()=> console.log("app is running at port 8080"))

////////////////////////////////////Awilix Ends

