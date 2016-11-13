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

import { Button, ConfirmButton, IconButton,
		Input, TelInput, 
		Toggle, Checkbox, Radio, 
		Slider, Range, 
		Icon } from '../' //RUInED

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
				<IconButton icon='info'>Tooltip Text</IconButton>
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
				<TelInput>Telephone Number</TelInput>
				<h3>Toggle / Switch</h3>
				<Toggle>Standard</Toggle>
				<Toggle checked>Defaulted</Toggle>
				<Toggle hideText>No Text</Toggle>
				<Toggle disabled>Disabled</Toggle>
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
				<h3>Range</h3>
				<Range>Standard</Range>
				<Range hideTitle>No Title</Range>
				<Range showValue>With Value</Range>
				<Range fullWidth showValueRange>Full Width w/Range</Range>
				<Range fullWidth showValueInThumb minValue={5} maxValue={95} steps={5}>Complex</Range>
			<h2>Miscellaneous</h2>
				<h3>Icons</h3>
				<p>Icons work inline
					<Icon icon='check' />
					<Icon icon='check' type='default' />
					<Icon icon='check' type='primary' title='This one uses title property'/>
					<Icon icon='check' type='secondary'>This one uses children</Icon>
					<Icon icon='check' type='info' tooltip='This one uses tooltip property'/>
					<Icon icon='check' type='success' />
					<Icon icon='cross' type='warning' />
					<Icon icon='cross' type='danger' />
					for easier typography</p>
		</div>
	}
}

ReactDOM.render(<RUInED />, document.getElementById('content'))