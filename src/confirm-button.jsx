import React from 'react'
import Button from './button'

export default class ConfirmButton extends Button {
	constructor(props) {
		super(props)

		this.state.confirming = false

		this.handleClick = this.handleClick.bind(this)
		this.handleBlur = () => this.setState({confirming: false})
	}

	handleClick(evt) {
		if(this.state.confirming === true) {
			this.setState({animateClick: true, confirming: false}, () => setTimeout(() => this.setState({animateClick: false}), 1000))
			this.props.onClick(evt)
		} else {
			this.setState({confirming: true}, () => setTimeout(() => {
				if(this.state.confirming === true)
					this.setState({confirming: false})
			}, 5000))
		}

		return true
	}

	render() {
		let type = 'text'
		if(this.props.type == 'submit')
			type = 'submit'
		else if(this.props.type == 'reset')
			type = 'reset'

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

		if(this.state.animateHover === true && disabled === false)
			classes += ' animate-hover'

		const confirming = this.state.confirming
		if(confirming)
			classes += ' confirming'

		return <button type={type} 
						title={this.props.hideText==true?this.props.children:null} 
						{...this.props.properties} 
						className={classes} 
						disabled={disabled} 
						onClick={this.handleClick}
						onMouseEnter={this.handleHoverEnter}
						onMouseLeave={this.handleHoverLeave}
						>{icon}{this.props.children}{confirming==true && (<span className='tooltip top'>Are you sure?</span>)}</button>
	}
}