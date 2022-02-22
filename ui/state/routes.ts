import { includeState, route } from 'saus'
import config from './config'

includeState([config])

route('/', () => import('../pages/PagesOverview'))

route(() => import('../pages/PageDebug'))
