import React from 'react'

require('styles/icon.scss')
export default class Icon extends React.Component {
	static _globalProps = {
		prefix: 'icon-',
		useSVG: true
	};
	static set globalProps(props) {
		for(prop in props) {
			if(Icon._globalProps.hasOwnProperty(prop))
				Icon._globalProps[prop] = props[prop]
		}
	};
	static get globalProps() { 
		return Icon._globalProps; 
	};

	static defaultProps = {
		type: 'inherit',
		size: 'regular'
	};

	static propTypes = {
		icon: React.PropTypes.string.isRequired,
		type: React.PropTypes.oneOf(['inherit', 'default','primary','secondary', 'info','success','warning','danger']),
		size: React.PropTypes.oneOf(['xsmall','small','regular','large'])
	};

	constructor(props) {
		super(props)
	}

	render() {
		const { prefix, useSVG } = Icon.globalProps
		const { icon, type, size } = this.props

		let classes = 'icon'
		if(type !== 'inherit')
			classes += ' '+type
		if(size !== 'regular')
			classes += ' '+size
		if(typeof this.props.className !== 'undefined')
			classes += ' '+this.props.className

		const title = this.props.title || this.props.tooltip || this.props.children

		if(useSVG) {
			return <svg className={classes} title={this.props.title || this.props.tooltip || this.props.children}>
				<use xlinkHref={'#'+prefix+icon} />
			</svg>
		} else {
			return <img className={classes} src={prefix+icon} title={title} alt={title}/>
		}
	}
}