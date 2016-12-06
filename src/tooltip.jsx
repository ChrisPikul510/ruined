import React, {Component, PropTypes} from 'react'

var _tooltipSpacing = 16

require('styles/tooltip.scss')
export default class Tooltip extends Component {
	static __ID = 0;
	static get id() { return Tooltip.__ID++; };

	static propTypes = {
		mousePosition: PropTypes.object
	};
	static defaultProps = {
		mousePosition: null
	};

	elId = Tooltip.id

	componentDidMount() {
		this.el = document.getElementById(this.elId)
	}

	render() {
		let style = {
			position: 'fixed',
			top: 0,
			left: 0
		}

		if(this.props.mousePosition) {
			style.top = (this.props.mousePosition.y + _tooltipSpacing)+'px'
			style.left = (this.props.mousePosition.x + _tooltipSpacing)+'px'
		}

		return <span id={this.elId} className='tooltip' style={style}>
			{ this.props.children }
		</span>
	}
}