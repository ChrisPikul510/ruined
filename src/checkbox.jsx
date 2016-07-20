import React from 'react'

require('styles/checkbox.scss')
export default class Checkbox extends React.Component {
	static __id = 0;
	static get id() {
		Checkbox.__id++
		return 'checkbox-'+Checkbox.__id
	};

	static defaultProps = {
		checked: false,
		disabled: false,

		hideText: false,

		properties: null
	};

	static propTypes = {
		checked: React.PropTypes.bool,
		disabled: React.PropTypes.bool,

		hideText: React.PropTypes.bool,

		properties: React.PropTypes.object,
	}

	constructor(props) {
		super(props)

		this.id = Checkbox.id
		if(typeof props.id !== 'undefined')
			this.id = props.id

		this.state = {
			val: props.checked,
			focused: false
		}

		this.getId = () => { return this.id }
		this.getValue = () => { return this.state.val }
		this.setValue = (val) => this.setState({val})
		this.reset = () => this.setState(initState)

		this.isChecked = () => { return this.state.val }
		this.setChecked = (checked) => this.setState({val: checked})

		this.handleClick = this.handleClick.bind(this)
		this.handleFocus = () => this.setState({ focused: true })
		this.handleBlur = () => this.setState({ focused: false })
	}

	handleClick(evt) {
		this.setState({ val: !this.state.val })
	}

	render() {
		const { hideText } = this.props
		const { val, focused } = this.state

		var classes = 'checkbox '+(val===true?'checked':'unchecked')

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
			<input type='checkbox' 
				id={this.id}
				{...this.props.properties}
				checked={val}
				disabled={disabled}
				onFocus={this.onFocus}
				onBlur={this.onBlur}
				onClick={this.handleClick}
				onChange={this.handleClick}
				/>
			<label htmlFor={this.id}>{this.props.children}</label>
		</span>
	}
}