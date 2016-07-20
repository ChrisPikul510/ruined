# RUInED
## **R**eact **U**ser **IN**terface for **E**xpediated **D**evelopment
##Currently Implemented Elements
* Button - Standard buttons
  * IconButton - Short hand class for icon only buttons (text content get's turned into the title/tooltip value)
  * ConfirmButton - When clicked presents a tooltip asking for a second click, after the second click it fires the onClick event
* Input - Input that negotiates the autofill values from it's type, also offers validation and required icons.
* Checkbox - Standard checkbox for css styling (so not the native styled checkbox)
* Radio - Same as checkbox
* Slider - Value slider with min/max values, and stepping. Plenty of view options for displaying labels, values, progress, etc.

##Usage
Using it is simple. For code-spliting purposes importing directly from the module will give you access to all the components.
Or, you can import individually if you'd like.

```
import { Button, IconButton, ConfirmButton } from 'ruined'; // Import by cherry-picking the ones you need
import { Button, IconButton } from 'ruined/buttons'; // Also works
import Button from 'ruined/button'; //Individual
```

Once you've imported the ones you want, using them is also dead simple (hence the point of this). Need a form submit button with an svg icon and async status? 
```
<Button type='submit' status={asyncStatusPropert} onClick={this.submit}>Submit</Button>
```
How about a delete icon button that requires two-click confirmation?
```
<ConfirmButton icon='delete' iconOnly={true} onClick={this.delete}>Delete this resource?</ConfirmButton>
```
Review the [docs](https://github.com/ChrisPikul510/ruined/wiki) for more info and the properties you can use.

##Styling
Styling is up to you to implement, I do supply a stylesheet you can use if you'd like. One of the major points of the way I built this was to use css class names instead of hard-coding the inline styles. If your looking for already-themed Bootstrap or Material UI kits, go for [Elemental](https://github.com/elementalui/elemental) or [Material](https://github.com/callemall/material-ui).

I use super simple class names for the css styling, and you should to. Raw components themselves such as button, input, select, etc. don't have classes applied. But sub-properties do, such as `info` for info buttons, or `hover` and `click` classes getting added for those actions. Also available are the `disabled` classes as well as `valid` and `invalid` for validated inputs.