import React from 'react'
import Button from './button'

export default class IconButton extends Button {
	static defaultProps = {
		type: 'default',
		size: 'regular',
		shape: 'transparent',
		icon: null,
		hideText: true,

		status: 'idle',
		clearAfterSuccess: true,

		properties: null,
		animateClick: false,
		animateHover: false,
		onClick: () => { __DEV__ && console.warn('Button doesn\'t have an onClick event handler')}
	};

	render() {
		let type = 'text'
		if(this.props.type == 'submit')
			type = 'submit'

		let classes = this.state.className
		if(this.props.className != null && this.props.className != '')
			classes = classes + ' ' + this.props.className

		if(this.state.animateClick === true)
			classes += ' animate-click'

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
		if(this.state.status !== 'idle') {
			classes += ' status-'+this.state.status

			if(this.state.status === 'fetching' || (this.state.status === 'success' && this.props.clearAfterSuccess))
				disabled = true
		}

		return <button type={type}
					 	title={this.props.children} 
					 	{...this.props.properties} 
					 	className={classes} 
					 	disabled={disabled} 
					 	onClick={this.handleClick}
					 >{icon}</button>
	}
}