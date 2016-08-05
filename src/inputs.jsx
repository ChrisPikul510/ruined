import Input from './input'
import TelInput from './telephone-input'

import Checkbox from './checkbox'
import Radio from './radio'
import Slider from './slider'
import Range from './range'

if(typeof module !== 'undefined') {
	module.exports = {
		Input, TelInput, Checkbox, Radio, Slider, Range
	}
}