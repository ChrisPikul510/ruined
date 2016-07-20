/**
 * Webpack Roster for Development Testing
 * Since webpack needs an entry, this is it. 
 * It rosters the require imports so that they get picked up by the webserver
 * Also gives us the nice react boilerplate
 */
require("./index.html")			//HTML File
require("./example.scss")	//Dev Stylesheet

import React from 'react'
import ReactDOM from 'react-dom'

import { Button, ConfirmButton, IconButton, Input, Checkbox, Radio, Slider } from '../' //RUInED

class RUInED extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			status: 'idle'
		}
		this.fakeAsync = this.fakeAsync.bind(this)

		//Button.defaultProps.shape = 'rounded' // You could set defaults like this?
	}

	fakeAsync(evt, endStatus = 'success') {
		this.setState({ status: 'fetching' }, () => setTimeout(() => this.setState({ status: endStatus }), 1000) )
	}

	render() {
		const { status } = this.state

		return <div className='wrapper'>
			<h1>RUInED</h1>
			<h2>Buttons</h2>
				<h3>Types</h3>
				<Button>Default</Button>
				<Button type='submit'>Submit</Button>
				<Button type='reset'>Reset</Button>
				<Button type='info'>Info</Button>
				<Button type='success'>Success</Button>
				<Button type='warning'>Warning</Button>
				<Button type='danger'>Danger</Button>
				<IconButton icon='gear'>Tooltip Text</IconButton>
				<ConfirmButton onClick={() => alert("Confirmed and clicked")}>Confirm Button</ConfirmButton>

				<h3>Sizes</h3>
				<Button size="xsmall">Extra Small</Button>
				<Button size="small">Small</Button>
				<Button size="regular">Regular</Button>
				<Button size="large">Large</Button>
				<h3>Shapes</h3>
				<Button shape="rectangle">Reactangle</Button>
				<Button shape="round">Rounded</Button>
				<Button shape="transparent">Transparent</Button>
				<h3>Properties and Statuses</h3>
				<Button disabled={true}>Disabled</Button>
				<Button status={status} onClick={this.fakeAsync}>Status Driven</Button>
			<h2>Inputs</h2>
				<h3>Text</h3>
				<Input type='text'>Basic Text</Input>
				<Input type='email' validate>Validated Email</Input>
				<Input type='password' required>Required Password</Input>
				<Input type='text' disabled>Disabled Input</Input>
				<h3>Checkbox</h3>
				<Checkbox>Standard</Checkbox>
				<Checkbox checked>Defaulted</Checkbox>
				<Checkbox hideText>No Text</Checkbox>
				<Checkbox disabled>Disabled</Checkbox>
				<h3>Radio</h3>
				<Radio name='demo'>Standard</Radio>
				<Radio name='demo' checked>Defaulted</Radio>
				<Radio name='demo' hideText>No Text</Radio>
				<Radio name='demo' disabled>Disabled</Radio>
				<h3>Slider</h3>
				<Slider>Standard</Slider>
				<Slider hideTitle>Standard</Slider>
				<Slider showValue>With Value</Slider>
				<Slider fullWidth showValueRange>Full Width</Slider>
				<Slider fullWidth showValueInThumb minValue={5} maxValue={95} steps={5}>Full Width w/Value</Slider>
		</div>
	}
}

ReactDOM.render(<RUInED />, document.getElementById('content'))