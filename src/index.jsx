/**
 * RUInED - React User Interface for Expediated Development
 */
require('styles/index.scss') //Master Stylesheet since this is the index

import * as Buttons from './buttons'
import * as Inputs from './inputs'

if(typeof module !== 'undefined') {
	module.exports = {
		...Buttons,
		...Inputs
	}
}