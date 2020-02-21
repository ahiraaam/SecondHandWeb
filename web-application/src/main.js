////////////////////////////////////Awilix
const awilix = require('awilix')
const container = awilix.createContainer()

container.register(
	"db",
	awilix.asFunction(require('./data-access-layer/db'))
)

container.register(
	"accountRepository",
	awilix.asFunction(require('./data-access-layer/account-repository'))
)

container.register(
	"accountValidator",
	awilix.asFunction(require('./business-logic-layer/account-validator'))
)

container.register(
	"accountManager",
	awilix.asFunction(require('./business-logic-layer/account-manager'))
)

container.register(
	"accountRouter",
	awilix.asFunction(require('./presentation-layer/routers/account-router'))
)

container.register(
	"variousRouter",
	awilix.asFunction(require('./presentation-layer/routers/various-router'))
)

container.register(
	"app",
	awilix.asFunction(require('./presentation-layer/app'))
)

const accountRepository = container.resolve('accountRepository')
const accountValidator = container.resolve('accountValidator')
const accountManager = container.resolve('accountManager')
const accountRouter = container.resolve('accountRouter')
const variousRouter = container.resolve('variosRouter')
const app = container.resolve('app')

////////////////////////////////////Awilix Ends