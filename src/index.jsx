/**
 * RUInED - React User Interface for Expediated Development
 */
require('styles/index.scss') //Master Stylesheet since this is the index

import * as Buttons from './buttons'
import * as Inputs from './inputs'
import Icon from './icon'

import Containers from './containers'
import Feedback from './feedback'

if(typeof module !== 'undefined') {
	module.exports = {
		...Buttons,
		...Inputs,
		Icon,
		...Containers,
		...Feedback
	}
}