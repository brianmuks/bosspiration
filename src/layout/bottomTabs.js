import TABS from './tabs'
import { TABS_IDS } from '../init/constants';


const bottomTabs = {
  id: 'BOTTOM_TABS_LAYOUT',
  children: TABS.bottomTabs.map(tab => (tab))
}

export default bottomTabs;