/**
 * RUInED - React User Interface for Expediated Development
 */
require('styles/index.scss') //Master Stylesheet since this is the index

import * as Buttons from './buttons'
import * as Inputs from './inputs'
import Icon from './icon'

if(typeof module !== 'undefined') {
	module.exports = {
		...Buttons,
		...Inputs,
		Icon
	}
}