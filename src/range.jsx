import React from 'react'

require('styles/slider.scss')
export default class Range extends React.Component {
	static __id = 0;
	static get id() {
		Range.__id++
		return 'range-'+Range.__id
	};

	static defaultProps = {
		defaultLowValue: 0,
		defaultHighValue: 100,

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
		defaultLowValue: React.PropTypes.number,
		defaultHighValue: React.PropTypes.number,
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

		this.id = Range.id
		if(typeof props.id !== 'undefined')
			this.id = props.id

		let defLowValue = Math.min(Math.max(props.defaultLowValue, props.minValue), props.maxValue)
		let defHighValue = Math.min(Math.max(props.defaultHighValue, props.minValue), props.maxValue)
		const initState = {
			lowVal: defLowValue,
			highVal: defHighValue,
			focused: false,
			lowPosition: 0,
			highPosition: 20,
			draggingLow: false,
			draggingHigh: false,
			movingNum: -1
		}
		this.state = initState

		this.getId = () => { return this.id }
		this.getValue = () => { return [this.state.lowVal, this.state.highVal] }
		this.setValue = (low, high) => this.setState({lowVal: low, highVal: high})
		this.reset = () => this.setState(initState)

		this.handleFocus = () => this.setState({ focused: true })
		this.handleBlur = () => this.setState({ focused: false })

		this.handleMouseDown = this.handleMouseDown.bind(this)
		this.handleMouseUp = this.handleMouseUp.bind(this)
		this.handleMouseMove = this.handleMouseMove.bind(this)
	}

	componentDidUpdate(props, state) {
		if(this.state.draggingLow === true && state.draggingLow === false) {
			document.addEventListener('mouseup', this.handleMouseUp)
			document.addEventListener('mousemove', this.handleMouseMove)
		} else if (this.state.draggingLow === false && state.draggingLow === true) {
			document.removeEventListener('mouseup', this.handleMouseUp)
			document.removeEventListener('mousemove', this.handleMouseMove)
		}

		if(this.state.draggingHigh === true && state.draggingHigh === false) {
			document.addEventListener('mouseup', this.handleMouseUp)
			document.addEventListener('mousemove', this.handleMouseMove)
		} else if (this.state.draggingHigh === false && state.draggingHigh === true) {
			document.removeEventListener('mouseup', this.handleMouseUp)
			document.removeEventListener('mousemove', this.handleMouseMove)
		}
	}

	handleMouseDown(evt, thumbNum) {
		if(evt.button !== 0) return
		evt.preventDefault()

		let thumbNode = thumbNum==0 ? this.refs.thumbL : this.refs.thumbH

		let thumb = thumbNode.getBoundingClientRect()
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

		if(thumbNum === 0) {
			this.setState({
				lowVal: calcVal,
				lowPosition: mousePos,
				draggingLow: true,
				movingNum: 0
			})
		} else {
			this.setState({
				highVal: calcVal,
				highPosition: mousePos,
				draggingHigh: true,
				movingNum: 1
			})
		}
	}

	handleMouseUp(evt) {
		if(this.state.movingNum === 0) {
			this.setState({
				draggingLow: false
			})
		} else {
			this.setState({
				draggingHigh: false
			})
		}
	}

	handleMouseMove(evt) {
		evt.preventDefault()

		let thumbNode = this.state.movingNum==0 ? this.refs.thumbL : this.refs.thumbH

		let thumb = thumbNode.getBoundingClientRect()
		let track = this.refs.track.getBoundingClientRect()
		let trackWidth = track.width - thumb.width
		let mousePos = Math.min(Math.max(evt.pageX, track.left), track.left + trackWidth) - track.left
		if(this.state.movingNum === 0) 
			mousePos = Math.min(mousePos, Math.min(trackWidth, this.state.highPosition - thumb.width) )
		else
			mousePos = Math.max(mousePos, Math.min(trackWidth, this.state.lowPosition + thumb.width) )

		let posProg = (mousePos / trackWidth)
		let valOff = this.props.maxValue - this.props.minValue;
			//valOff = Math.min(this.props.maxValue, this.state.highVal - (this.props.steps!==null? this.props.steps : (1 / (10 * this.props.decimalPlaces)))) - this.props.minValue
		let calcVal = (valOff * posProg) + this.props.minValue

		if(this.props.steps != null) {
			var neededVal = calcVal - (calcVal % this.props.steps)

			calcVal = neededVal
			mousePos = trackWidth * ((neededVal - this.props.minValue) / valOff)
		}

		if(this.state.movingNum === 0) {
			this.setState({
				lowVal: calcVal,
				lowPosition: mousePos,
				draggingLow: true,
				movingNum: 0
			})
		} else {
			this.setState({
				highVal: calcVal,
				highPosition: mousePos,
				draggingHigh: true,
				movingNum: 1
			})
		}
	}

	render() {
		const { hideTitle, hideFillBar, fullWidth, showValue, showValueInThumb, showValueRange } = this.props
		const { lowVal, highVal, focused, lowPosition, highPosition, draggingLow, draggingHigh } = this.state

		var classes = 'slider'
		if(fullWidth)
			classes += ' full-width'

		if(focused)
			classes += ' focus'
		if(draggingLow || draggingHigh)
			classes += ' active'

		var displayLowValue = lowVal
		if(this.props.steps == null)
			displayLowValue = lowVal.toFixed(this.props.decimalPlaces)

		var displayHighValue = highVal
		if(this.props.steps == null)
			displayHighValue = highVal.toFixed(this.props.decimalPlaces)

		return <div 
			ref='track'
			tabIndex='0'
			className={classes}
			onFocus={this.handleFocus}
			onBlur={this.handleBlur}
			>
			{ hideTitle===false && <label className='slider-label'>{this.props.children}</label> }
			{ showValue===true && (<output className='slider-value'>{displayLowValue+' - '+displayHighValue}</output>)}

			<span ref='thumbL' tabIndex='1' className='slider-thumb' style={{left: lowPosition+'px'}} onMouseDown={(evt) => this.handleMouseDown(evt, 0)}>{ showValueInThumb===true && displayLowValue }</span>
			<span ref='thumbH' tabIndex='1' className='slider-thumb' style={{left: highPosition+'px'}} onMouseDown={(evt) => this.handleMouseDown(evt, 1)}>{ showValueInThumb===true && displayHighValue }</span>

			{ hideFillBar===false && <span ref='fill' className='slider-fill' style={{left: lowPosition+'px', width: (highPosition - lowPosition)+'px'}}></span>}
			{ showValueRange===true && <span className='slider-min'>{this.props.minValue}</span> }
			{ showValueRange===true && <span className='slider-max'>{this.props.maxValue}</span> }
			<input type='hidden' id={this.id+'-low'} name={(this.props.name || this.id)+'-low'} value={lowVal} />
			<input type='hidden' id={this.id+'-high'} name={(this.props.name || this.id)+'-high'} value={highVal} />
		</div>
	}
}