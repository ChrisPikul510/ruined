import React from 'react'

require('styles/radio.scss')
export default class Radio extends React.Component {
	static __id = 0;
	static get id() {
		Radio.__id++
		return 'radio-'+Radio.__id
	};

	static defaultProps = {
		name: null,
		checked: false,
		disabled: false,

		hideText: false,

		properties: null,

		onChange: () => {}
	};

	static propTypes = {
		name: React.PropTypes.string,
		checked: React.PropTypes.bool,
		disabled: React.PropTypes.bool,

		hideText: React.PropTypes.bool,

		properties: React.PropTypes.object,

		onChange: React.PropTypes.func
	}

	constructor(props) {
		super(props)

		this.id = Radio.id
		if(typeof props.id !== 'undefined')
			this.id = props.id

		this.state = {
			focused: false
		}

		this.getId = () => { return this.id }
		this.getValue = () => { return this.refs.radioInput.checked }
		this.setValue = (checked) => { this.refs.radioInput.checked = true }
		this.reset = () => this.setState(initState)

		this.isChecked = () => { return this.state.val }
		this.setChecked = this.setValue

		this.handleChange = this.handleChange.bind(this)
		this.handleFocus = () => this.setState({ focused: true })
		this.handleBlur = () => this.setState({ focused: false })
	}

	handleChange(evt) {
		this.setState({ val: evt.target.value }, () => this.props.onChange(this.state.val))
	}

	render() {
		const { name, hideText, checked } = this.props
		const { val, focused } = this.state

		var classes = 'radio'

		if(focused)
			classes += ' focus'

		if(hideText)
			classes +=' no-text'

		let disabled = this.props.disabled
		if(disabled)
			classes += ' disabled'

		if(this.props.className != null && this.props.className != '')
			classes += ' '+this.props.className

		return <span className={classes}>
			<input type='radio'
				ref='radioInput'
				{...this.props.properties}
				name={name}
				id={this.id}
				defaultChecked={checked}
				disabled={disabled}
				onFocus={this.onFocus}
				onBlur={this.onBlur}
				onChange={this.handleChange}
				/>
			<label htmlFor={this.id}>{this.props.children}</label>
		</span>
	}
}