import React from 'react'

require('styles/toggle.scss')
/**
 * Toggles have the same properties as Checkbox
 * The main diference is how they are rendered.
 * Checkbox uses a <Input /> and <Label /> pair, where
 * Toggles render the input as hidden and provide a separate block elements for the actual input
 */
export default class Toggle extends React.Component {
	static __id = 0;
	static get id() {
		Toggle.__id++
		return 'toggle-'+Toggle.__id
	};

	static defaultProps = {
		checked: false,
		disabled: false,

		hideText: false,

		properties: null,

		onChange: () => {},
	};

	static propTypes = {
		checked: React.PropTypes.bool,
		disabled: React.PropTypes.bool,

		hideText: React.PropTypes.bool,

		properties: React.PropTypes.object,

		onChange: React.PropTypes.func
	}

	constructor(props) {
		super(props)

		this.id = Toggle.id
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
		if(this.props.disabled)
			return false;
		this.setState({ val: !this.state.val }, () => this.props.onChange(this.state.val))
	}

	render() {
		const { hideText } = this.props
		const { val, focused } = this.state

		var classes = 'toggle '+(val===true?'checked':'unchecked')

		if(focused)
			classes += ' focus'

		if(hideText)
			classes +=' no-text'

		let disabled = this.props.disabled
		if(disabled)
			classes += ' disabled'

		if(this.props.className != null && this.props.className != '')
			classes += ' '+this.props.className

		return <span className={classes}
				onClick={this.handleClick} 
				onFocus={this.handleFocus} 
				onBlur={this.handleBlur}
				disabled={disabled}>
			<input type='hidden' 
				id={this.id}
				{...this.props.properties}
				name={(this.props.name || this.id)}
				value={val}
				/>
			<div className='toggle-button'>
				<span className='toggle-button-thumb' />
			</div>
			<label htmlFor={this.id}>{this.props.children}</label>
		</span>
	}
}