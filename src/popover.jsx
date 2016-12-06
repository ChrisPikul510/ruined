import React, {Component, PropTypes} from 'react'
import EventHandler from './utils/EventHandler'
import { getAbsoluteBoundingRect, getAbsolutePosition } from './utils/HelperFunctions'

require('styles/popover.scss')
export default class Popover extends Component {
	static __ID = 0;
	static get id() { return Popover.__ID++; };

	static propTypes = {
		horizontalAlignment: PropTypes.oneOf(['left', 'center', 'right']),
		verticalAlignment: PropTypes.oneOf(['top', 'center', 'bottom']),
		closeByToggle: PropTypes.bool,
		spacing: PropTypes.number
	};
	static defaultProps = {
		horizontalAlignment: 'left',
		verticalAlignment: 'bottom',
		closeByToggle: false,
		spacing: 0
	};

	state = {
		visible: false,
		parent: null,
		style: null
	};
	
	el = null
	elId = this.props.id || 'popover-'+Popover.id
	evtDocumentClick = null;
	evtEscape = null

	componentDidMount() {
		this.el = document.getElementById(this.elId)
	}

	componentWillUnmount() {
		if(this.evtDocumentClick)
			EventHandler.removeListener(this.evtDocumentClick)
		if(this.evtEscape)
			EventHandler.removeListener(this.evtEscape)
	}

	render() {
		if(!this.state.visible)
			return <div id={this.elId}/>

		const { origin, style } = this.state

		return <div id={this.elId} ref='container' className='popover' style={style}>
			{ this.props.children }
		</div>
	}

	toggle = (evt) => {
		if(this.props.closeByToggle) {
			if(this.state.visible)
				this.close()
			else
				this.open(evt)
		} else
			this.open(evt)
	}

	open = (evt) => {
		let parent = null
		if(evt && evt.target) {
			//We use the event target if available to dictate the position
			parent = evt.target
		}

		if(!this.props.closeByToggle) {
			this.el = document.getElementById(this.elId)
			this.evtDocumentClick = EventHandler.addListener(document.body, 'click', (evt) => {
				var target = evt.target || evt.srcElement
				if( target != this.el && !this.el.contains(target) )
					this.close()
			}, false)
			this.evtEscape = EventHandler.addListener(document, 'keydown', (evt) => {
				let esc = false
				if(evt.key)
					esc = (evt.key == 'Escape' || evt.key == 'Esc')
				else
					esc = (evt.keyCode == 27)

				if(esc)
					this.close()
			})
		}

		this.setState({
			visible: true,
			parent
		}, () => {
			this.calculateOrigin()
			if(window.requestAnimationFrame)
				window.requestAnimationFrame(this.calculateOrigin)
			else 
				setTimeout(this.calculateOrigin, 10)
		})
	}

	close = () => {
		if(this.evtDocumentClick)
			EventHandler.removeListener(this.evtDocumentClick)
		if(this.evtEscape)
			EventHandler.removeListener(this.evtEscape)

		this.setState({
			visible: false
		})
	}

	calculateOrigin = () => {
		if(!this.state.visible || !this.state.parent) {
			console.warn('Popover attempted to recalculate origin without being visible, or without a parent element to target')
			return false
		}

		const { horizontalAlignment, verticalAlignment } = this.props
		const { parent } = this.state

		const parentBounds = getAbsoluteBoundingRect(parent)
		const bounds = getAbsoluteBoundingRect(this.refs.container)

		let newOrigin = { x: 0, y: 0 }

		switch(horizontalAlignment) {
			case 'left':
				newOrigin.x = parentBounds.left
				break;
			case 'center':
				newOrigin.x = (parentBounds.left + parentBounds.width*0.5) - bounds.width*0.5
				break;
			case 'right':
				newOrigin.x = parentBounds.right - bounds.width
				break;
			default:
				newOrigin.x = parentBounds.left
		}

		switch(verticalAlignment) {
			case 'top':
				newOrigin.y = (parentBounds.top - bounds.height) - this.props.spacing
				break;
			case 'bottom':
				newOrigin.y = parentBounds.bottom + this.props.spacing
				break;
			case 'center':
				newOrigin.y = (parentBounds.top + parentBounds.height*0.5) - bounds.height*0.5
				if(horizontalAlignment === 'left')
					newOrigin.x = (parentBounds.left - bounds.width) - this.props.spacing
				else if(horizontalAlignment === 'right')
					newOrigin.x = parentBounds.right + this.props.spacing
				break;
		}
		
		//console.log('Calculating Origin (parent, container, calculated)', parentBounds, bounds, newOrigin)

		this.setState({
			style: {
				position: 'absolute',
				left: newOrigin.x+'px',
				top: newOrigin.y+'px'
			}
		})
	}
}