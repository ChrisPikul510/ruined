/**
 * Webpack Roster for Development Testing
 * Since webpack needs an entry, this is it. 
 * It rosters the require imports so that they get picked up by the webserver
 * Also gives us the nice react boilerplate
 */
require("./index.html")			//HTML File
require("./development.scss")	//Dev Stylesheet

import React from 'react'
import ReactDOM from 'react-dom'

import { Button } from './' //RUInED

class RUInED extends React.Component {
	render() {
		return <div>
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
				<h3>Sizes</h3>
				<Button size="xsmall">Extra Small</Button>
				<Button size="small">Small</Button>
				<Button size="regular">Regular</Button>
				<Button size="large">Large</Button>
				<h3>Shapes</h3>
				<Button shape="rectangle">Reactangle</Button>
				<Button shape="rounded">Rounded</Button>
				<Button shape="transparent">Transparent</Button>
		</div>
	}
}

ReactDOM.render(<RUInED />, document.getElementById('content'))