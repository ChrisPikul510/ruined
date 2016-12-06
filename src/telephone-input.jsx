import React from 'react'

import Input from './input'

require('styles/input.scss')
export default class TelInput extends React.Component {
	static defaultProps = {
		defaultValue: '',
		properties: null,
		icon: null,
		autocomplete: true,
		validate: false,
		required: false,
		disabled: false,

		showPopover: true,
		restrictInput: true,
		stripBare: true,

		onValidate: () => { __DEV__ && console.warn('Input has validate option set, but no onValidate handler'); return true },
		onChange: () => {}
	};

	static propTypes = {
		icon: React.PropTypes.string,
		validate: React.PropTypes.bool,
		required: React.PropTypes.bool,
		minLength: React.PropTypes.number,
		maxLength: React.PropTypes.number,
		disabled: React.PropTypes.bool,
		restrictInput: React.PropTypes.bool,
		stripBare: React.PropTypes.bool,

		onValidate: React.PropTypes.func,
		onChange: React.PropTypes.func
	}

	constructor(props) {
		super(props)

		this.id = Input.id
		if(typeof props.id !== 'undefined')
			this.id = props.id

		const initState = {
			val: props.defaultValue,
			valid: !(props.validate || props.required),
			focused: false,
			showingPopover: false,
			mouseOver: false,
			tempMouseOver: false
		}
		this.state = initState

		this.getId = () => { return this.id }
		this.getValue = () => { 
			if(this.props.stripBare)
				return this.state.val.replace(/[^x\d]/g, '')
			else
				return this.state.val
		}
		this.setValue = (val) => this.setState({val})
		this.reset = () => this.setState(initState)
		this.isValid = () => { return this.state.valid }

		this.handleChange = this.handleChange.bind(this)
		this.handleFocus = () => this.setState({ focused: true, showingPopover: this.props.showPopover })
		this.handleBlur = () => this.setState({ focused: false })
		this.handleKeyPress = this.handleKeyPress.bind(this)
		this.handleButtonPush = this.handleButtonPush.bind(this)
		this.handleMouseEntry = this.handleMouseEntry.bind(this)
		this.handleMouseLeft = this.handleMouseLeft.bind(this)

		this.validate = this.validate.bind(this)
	}

	handleChange(evt) {
		const val = evt.target.value
		if( this.props.validate || this.props.required )
			this.setState({ val, valid: this.validate(val) }, () => this.props.onChange(this.state.val, this.state.valid))
		else
			this.setState({ val }, () => this.props.onChange(this.state.val))
	}

	handleKeyPress(evt) {
		if(this.props.restrictInput) {
			const keyChar = String.fromCharCode(evt.which || evt.keyCode)
			if(keyChar.search(/^[\d\+\*\(\)\-\ x]*$/) == -1) {
				evt.preventDefault()
				return false;
			}
		}
	}

	handleButtonPush(evt, char) {
		console.log('Button pushed', char)
		this.setState({
			val: (this.state.val+char)
		})
	}

	handleMouseEntry(evt) {
		this.setState({ mouseOver: true , tempMouseOver: true})
	}

	handleMouseLeft(evt) {
		this.setState({tempMouseOver: false}, () => {
			const check = setTimeout(() => {
				if(this.state.tempMouseOver == false) {
					this.setState({ mouseOver: false, showingPopover: false })
				}
			}, 1500)
		})	
	}

	validate(val) {
		if(val.length < 7)
			return false

		return this.props.onValidate(val)
	}

	render() {
		const {icon, autocomplete, validate, required } = this.props
		const { val, valid, focused, showingPopover } = this.state

		var classes = 'input tel'
		if(required === true)
			classes += ' required'
		if(focused === true || showingPopover)
			classes += ' focus'
		if(validate === true || required === true)
			classes += (valid===true ? ' valid' : ' invalid')
		if(val.length == 0)
			classes += ' placeholder'
		if(icon !== null)
			classes += ' iconed'

		let autofill = 'off'
		if(autocomplete === true) {
			autofill = 'tel'
		} else if(typeof autocomplete === 'String')
			autofill = autocomplete

		let disabled = this.props.disabled
		if(disabled)
			classes += ' disabled'

		return <span className={classes} id={this.id+'-wrapper'} onClick={() => {
				if(!showingPopover)
					document.getElementById(this.id).focus()} 
			} onMouseEnter={this.handleMouseEntry} onMouseLeave={this.handleMouseLeft}>
			{ icon !== null && ( <svg className='icon prefix-icon'><use xlinkHref={'#icon-'+icon}/></svg> )}
			<input type='tel' 
					id={this.id} 
					{...this.props.properties}
					name={this.props.name || this.id}
					disabled={disabled}
					value={val}
					onChange={this.handleChange}
					onKeyPress={this.handleKeyPress}
					onFocus={this.handleFocus}
					onBlur={this.handleBlur}
					autoComplete={autofill}
					required={required}
					/>
			<label htmlFor={this.id}>{this.props.children}</label>
			{ (validate===true || required===true) && ( <svg className='icon validation-icon'><use xlinkHref={valid===true?'#icon-check':'#icon-cross'}/></svg> )}
			{ showingPopover===true && (
				<div className='tel-popover' onMouseEnter={this.handleMouseEntry} onMouseLeave={this.handleMouseLeft}>
					<button type='button' onClick={(evt) => this.handleButtonPush(evt,'1')}>1</button>
					<button type='button' onClick={(evt) => this.handleButtonPush(evt,'2')}>2</button>
					<button type='button' onClick={(evt) => this.handleButtonPush(evt,'3')}>3</button>
					<button type='button' onClick={(evt) => this.handleButtonPush(evt,'4')}>4</button>
					<button type='button' onClick={(evt) => this.handleButtonPush(evt,'5')}>5</button>
					<button type='button' onClick={(evt) => this.handleButtonPush(evt,'6')}>6</button>
					<button type='button' onClick={(evt) => this.handleButtonPush(evt,'7')}>7</button>
					<button type='button' onClick={(evt) => this.handleButtonPush(evt,'8')}>8</button>
					<button type='button' onClick={(evt) => this.handleButtonPush(evt,'9')}>9</button>
					<button type='button' onClick={(evt) => this.handleButtonPush(evt,'#')}>#</button>
					<button type='button' onClick={(evt) => this.handleButtonPush(evt,'0')}>0</button>
					<button type='button' onClick={(evt) => this.handleButtonPush(evt,'*')}>*</button>
				</div>
			)}
		</span>
	}
}