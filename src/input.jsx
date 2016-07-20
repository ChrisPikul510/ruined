import React from 'react'

require('styles/input.scss')
export default class Input extends React.Component {
	static __id = 0;
	static get id() {
		Input.__id++
		return 'input-'+Input.__id
	};

	static defaultProps = {
		properties: null,
		type: 'text',
		role: 'none',
		icon: null,
		autocomplete: true,
		validate: false,
		required: false,
		minLength: 2,
		maxLength: 32,

		onValidate: () => { __DEV__ && console.warn('Input has validate option set, but no onValidate handler'); return true }
	};

	static propTypes = {
		type: React.PropTypes.oneOf(['text', 'password', 'email', 'search', 'url', 'tel', 'number', 'range', 'date', 'month', 'week', 'time', 'datetime', 'datetime-local', 'color']),
		role: React.PropTypes.oneOf(['none', 'username', 'new-password', 'name', 'homepage']),
		icon: React.PropTypes.string,
		validate: React.PropTypes.bool,
		required: React.PropTypes.bool,
		minLength: React.PropTypes.number,
		maxLength: React.PropTypes.number
	}

	constructor(props) {
		super(props)

		this.id = Input.id
		if(typeof props.id !== 'undefined')
			this.id = props.id

		const initState = {
			val: '',
			valid: !(props.validate || props.required),
			focused: false
		}
		this.state = initState

		this.getId = () => { return this.id }
		this.getValue = () => { return this.state.val }
		this.setValue = (val) => this.setState({val})
		this.reset = () => this.setState(initState)
		this.isValid = () => { return this.state.valid }

		this.handleChange = this.handleChange.bind(this)
		this.handleFocus = () => this.setState({ focused: true })
		this.handleBlur = () => this.setState({ focused: false })

		this.validate = this.validate.bind(this)
		this.getAutofill = this.getAutofill.bind(this)
	}

	handleChange(evt) {
		const val = evt.target.value
		if( this.props.validate || this.props.required || this.props.type !== 'text' )
			this.setState({ val, valid: this.validate(val) })
		else
			this.setState({ val })
	}

	validate(val) {
		if(val.length < this.props.minLength)
			return false

		if(val.length > this.props.maxLength)
			return false

		return this.props.onValidate(val)
	}

	getAutofill() {
		let autofill = 'off'
		switch(this.props.type) {
			case 'password':
				autofill = 'current-password'
				break
			case 'email':
				autofill = 'email'
				break
			case 'tel':
				autofill = 'tel'
		}
		switch(this.props.role) {
			case 'username':
				autofill = 'username'
				break
			case 'new-password':
				autofill = 'new-password'
				break
			case 'name':
				autofill = 'name'
				break
			case 'homepage':
				autofill = 'url'
				break
		}
		return autofill
	}

	render() {
		const { type, role, icon, autocomplete, validate, required } = this.props
		const { val, valid, focused } = this.state

		var classes = 'input '+type
		if(required === true)
			classes += ' required'
		if(focused === true)
			classes += ' focus'
		if(validate === true || required === true)
			classes += (valid===true ? ' valid' : ' invalid')
		if(val.length == 0)
			classes += ' placeholder'
		if(icon !== null)
			classes += ' iconed'

		let autofill = 'off'
		if(autocomplete === true) {
			autofill = this.getAutofill()
		} else if(typeof autocomplete === 'String')
			autofill = autocomplete

		return <span className={classes} onClick={() => {document.getElementById(this.id).focus()} }>
			{ icon !== null && ( <svg className='icon prefix-icon'><use xlinkHref={'#icon-'+icon}/></svg> )}
			<input type={type} 
					id={this.id} 
					onChange={this.handleChange} 
					onFocus={this.handleFocus}
					onBlur={this.handleBlur}
					{...this.props.properties}
					autoComplete={autofill}
					required={required}
					/>
			<label htmlFor={this.id}>{this.props.children}</label>
			{ (validate===true || required===true) && ( <svg className='icon validation-icon'><use xlinkHref={valid===true?'#icon-check':'#icon-cross'}/></svg> )}
		</span>
	}
}