import React from 'react'

require('styles/button.scss')
export default class Button extends React.Component {
	static defaultProps = {
		type: 'default',
		size: 'regular',
		shape: 'rectangle',
		icon: null,
		hideText: false,

		disabled: false,
		status: 'idle',
		clearAfterSuccess: true,

		properties: null,
		animateClick: false,
		animateHover: false,
		onClick: () => { __DEV__ && console.warn('Button doesn\'t have an onClick event handler')}
	};

	static propTypes = {
		type: React.PropTypes.oneOf(['default','submit','reset', 'info','success','warning','danger']),
		size: React.PropTypes.oneOf(['xsmall','small','regular','large']),
		shape: React.PropTypes.oneOf(['rectangle','round','transparent']),
		icon: React.PropTypes.string,
		hideText: React.PropTypes.bool,
		status: React.PropTypes.string,
		clearAfterSuccess: React.PropTypes.bool,
		properties: React.PropTypes.object,
		onClick: React.PropTypes.func
	};

	constructor(props) {
		super(props)

		let classes = [
			props.type!='default'?props.type:null, 
			props.size!='regular'?props.size:null, 
			props.shape!='rectangle'?props.shape:null, 
			(props.icon != null?'has-icon':null),
			(props.hideText == true?'no-text':null)
		]
		let status = (props.clearAfterSuccess==true && props.status=='success')?'idle':props.status
		this.state = {
			className: classes.join(' ').trim(),
			status
		}

		this.setStatus = this.setStatus.bind(this)
		this.getStatus = () => { return this.state.status }

		this.handleClick = this.handleClick.bind(this)
		this.handleHoverEnter = () => this.setState({animateHover: true})
		this.handleHoverLeave = () => this.setState({animateHover: false})
	}

	setStatus(status) {
		if(this.props.clearAfterSuccess === true && status === 'success')
			setTimeout(() => this.setState({status: 'idle'}), 1000)
		this.setState({status: status})
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.status !== this.state.status) {
			this.setState({status: nextProps.status})

			if(nextProps.clearAfterSuccess === true && nextProps.status === 'success')
				setTimeout(() => this.setState({status: 'idle'}), 1000)
		}
	}

	handleClick(evt) {
		this.setState({animateClick: true}, () => setTimeout(() => this.setState({animateClick: false}), 1000))
		this.props.onClick(evt)
	}

	render() {
		//Translate our type prop into an actual HTML prop
		let type = 'text'
		if(this.props.type == 'submit')
			type = 'submit'
		else if(this.props.type == 'reset')
			type = 'reset'

		let classes = this.state.className
		if(this.props.className != null && this.props.className != '')
			classes = classes + ' ' + this.props.className

		if(this.state.animateClick === true)
			classes += ' click'

		let icon = null
		if(this.props.icon != null)
			icon = <svg className='icon'><use xlinkHref={'#icon-'+this.props.icon}/></svg>
		else {
			if(this.props.type === 'success')
				icon = <svg className='icon'><use xlinkHref='#icon-check'/></svg>
			else if(this.props.type === 'warning')
				icon = <svg className='icon'><use xlinkHref='#icon-warning'/></svg>
			else if(this.props.type === 'danger')
				icon = <svg className='icon'><use xlinkHref='#icon-cross'/></svg>
			else if(this.props.type === 'info')
				icon = <svg className='icon'><use xlinkHref='#icon-info'/></svg>
		}

		let disabled = this.props.disabled
		if(disabled)
			classes += ' disabled'
		if(this.state.status !== 'idle') {
			classes += ' status-'+this.state.status

			if(this.state.status === 'fetching' || (this.state.status === 'success' && this.props.clearAfterSuccess))
				disabled = true
		}

		if(this.state.animateHover === true && disabled === false)
			classes += ' hover'

		return <button type={type} 
						title={this.props.hideText==true?this.props.children:null} 
						{...this.props.properties} 
						className={classes} 
						disabled={disabled} 
						onClick={this.handleClick}
						onMouseEnter={this.handleHoverEnter}
						onMouseLeave={this.handleHoverLeave}
						>{icon}{this.props.children}</button>
	}
}
