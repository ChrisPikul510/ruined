import React, {Component, PropTypes} from 'react'

require('styles/progressbar.scss')
export default class ProgressBar extends Component {
	static propTypes = {
		indeterminate: PropTypes.bool,
		progress: PropTypes.number,
		activityOnProgress: PropTypes.bool,
		activityMargin: PropTypes.number
	};
	static defaultProps = {
		indeterminate: false,
		progress: 0.0,
		activityOnProgress: true,
		activityMargin: 0.01
	};

	state = {
		activity: false,
		progress: parseFloat(this.props.progress)
	}
	activityWait = null
	lastActivityProgress = parseFloat(this.props.progress)

	componentWillReceiveProps(nextProps) {
		this.setProgress(nextProps.progress)
	}

	render() {
		let className = 'progress-bar'
		if(this.props.indeterminate)
			className += ' indeterminate'
		else
			className += ' determinate'

		if(this.state.activity)
			className += ' activity'

		return <div className={className}>
			{ this.props.indeterminate===false && (
				<div className='progress-bar-fill' style={{width: (this.state.progress * 100)+'%'}} />
			)}
		</div>
	}

	get value() { return this.state.progress; }

	activity = () => {
		this.setState({
			activity: true
		})

		if(this.activityWait)
			clearTimeout(this.activityWait)

		this.activityWait = setTimeout(() => this.setState({ activity: false }), 1000)
	}

	setProgress = (val) => {
		this.setState({
			progress: Math.min(val, 1.0)
		})

		if(this.props.activityOnProgress && Math.abs(val - this.lastActivityProgress) >= this.props.activityMargin) {
			this.activity()
			this.lastActivityProgress = val
		}
	}

	increment = (val) => {
		let newVal = this.state.progress + val
		if(newVal > 1.0)
			newVal = 1.0

		this.setProgress(newVal)

		return newVal >= 1.0
	}

	reset = () => {
		this.setState({ progress: 0.0 })
		this.lastActivityProgress = 0.0
	}
}