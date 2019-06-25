import { router as firstPage } from '../modules/firstPage'
import { router as sacilitiedAndStaff } from '../modules/facilitiesAndStaff'
import { router as environment } from '../modules/environment'
import { router as safety } from '../modules/safety'
import { router as energyConsumption } from '../modules/energyConsumption'
import { router as performance } from '../modules/performance'

const moduleRouters = [].concat(firstPage, sacilitiedAndStaff, environment, safety, energyConsumption, performance)

export default moduleRouters
