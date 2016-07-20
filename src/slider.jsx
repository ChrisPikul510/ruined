import React from 'react'

require('styles/slider.scss')
export default class Slider extends React.Component {
	static __id = 0;
	static get id() {
		Slider.__id++
		return 'slider-'+Slider.__id
	};

	static defaultProps = {
		defaultValue: 0,
		hideTitle: false,
		hideFillBar: false,
		showValueInThumb: false,
		showValue: false,
		showValueRange: false,
		fullWidth: false,

		minValue: 0,
		maxValue: 100,
		decimalPlaces: 2,
		steps: null
	};

	static propTypes = {
		defaultValue: React.PropTypes.number,
		hideTitle: React.PropTypes.bool,
		hideFillBar: React.PropTypes.bool,
		showValueInThumb: React.PropTypes.bool,
		showValue: React.PropTypes.bool,
		showValueRange: React.PropTypes.bool,
		fullWidth: React.PropTypes.bool,
		minValue: React.PropTypes.number,
		maxValue: React.PropTypes.number,
		decimalPlaces: React.PropTypes.number
	};

	constructor(props) {
		super(props)

		this.id = Slider.id
		if(typeof props.id !== 'undefined')
			this.id = props.id

		let defValue = Math.min(Math.max(props.defaultValue, props.minValue), props.maxValue)
		const initState = {
			val: defValue,
			focused: false,
			position: 0,
			dragging: false
		}
		this.state = initState

		this.getId = () => { return this.id }
		this.getValue = () => { return this.state.val }
		this.setValue = (val) => this.setState({val})
		this.reset = () => this.setState(initState)

		this.handleFocus = () => this.setState({ focused: true })
		this.handleBlur = () => this.setState({ focused: false })

		this.handleMouseDown = this.handleMouseDown.bind(this)
		this.handleMouseUp = this.handleMouseUp.bind(this)
		this.handleMouseMove = this.handleMouseMove.bind(this)
	}

	componentDidUpdate(props, state) {
		if(this.state.dragging === true && state.dragging === false) {
			document.addEventListener('mouseup', this.handleMouseUp)
			document.addEventListener('mousemove', this.handleMouseMove)
		} else if (this.state.dragging === false && state.dragging === true) {
			document.removeEventListener('mouseup', this.handleMouseUp)
			document.removeEventListener('mousemove', this.handleMouseMove)
		}
	}

	handleMouseDown(evt) {
		if(evt.button !== 0) return
		evt.preventDefault()

		let thumb = this.refs.thumb.getBoundingClientRect()
		let track = this.refs.track.getBoundingClientRect()
		let trackWidth = track.width - thumb.width
		let mousePos = Math.min(Math.max(evt.pageX, track.left), track.left + trackWidth) - track.left

		let posProg = (mousePos / trackWidth)
		let valOff = this.props.maxValue - this.props.minValue
		let calcVal = (valOff * posProg) + this.props.minValue

		if(this.props.steps != null) {
			var neededVal = calcVal - (calcVal % this.props.steps)

			calcVal = neededVal
			mousePos = trackWidth * ((neededVal - this.props.minValue) / valOff)
		}

		this.setState({
			val: calcVal,
			position: mousePos,
			dragging: true
		})
	}

	handleMouseUp(evt) {
		this.setState({
			dragging: false
		})
	}

	handleMouseMove(evt) {
		evt.preventDefault()

		let thumb = this.refs.thumb.getBoundingClientRect()
		let track = this.refs.track.getBoundingClientRect()
		let trackWidth = track.width - thumb.width
		let mousePos = Math.min(Math.max(evt.pageX, track.left), track.left + trackWidth) - track.left

		let posProg = (mousePos / trackWidth)
		let valOff = this.props.maxValue - this.props.minValue
		let calcVal = (valOff * posProg) + this.props.minValue

		if(this.props.steps != null) {
			var neededVal = calcVal - (calcVal % this.props.steps)

			calcVal = neededVal
			mousePos = trackWidth * ((neededVal - this.props.minValue) / valOff)
		}

		this.setState({
			val: calcVal,
			position: mousePos,
			dragging: true
		})
	}

	render() {
		const { hideTitle, hideFillBar, fullWidth, showValue, showValueInThumb, showValueRange } = this.props
		const { val, focused, position, dragging } = this.state

		var classes = 'slider'
		if(fullWidth)
			classes += ' full-width'

		if(focused)
			classes += ' focus'
		if(dragging)
			classes += ' active'

		var displayValue = val
		if(this.props.steps == null)
			displayValue = val.toFixed(this.props.decimalPlaces)

		return <div 
			ref='track'
			tabIndex='0'
			className={classes}
			onFocus={this.handleFocus}
			onBlur={this.handleBlur}
			>
			{ hideTitle===false && <label className='slider-label'>{this.props.children}</label> }
			{ showValue===true && (<output className='slider-value'>{displayValue}</output>)}
			<span ref='thumb' tabIndex='1' className='slider-thumb' style={{left: position+'px'}} onMouseDown={this.handleMouseDown}>{ showValueInThumb===true && displayValue }</span>
			{ hideFillBar===false && <span ref='fill' className='slider-fill' style={{width: position+'px'}}></span>}
			{ showValueRange===true && <span className='slider-min'>{this.props.minValue}</span> }
			{ showValueRange===true && <span className='slider-max'>{this.props.maxValue}</span> }
			<input type='hidden' id={this.id} name={this.props.name} value={val} />
		</div>
	}
}