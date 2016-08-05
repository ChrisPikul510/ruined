# RUInED
## **R**eact **U**ser **IN**terface for **E**xpediated **D**evelopment
##Currently Implemented Elements
* __Button__ - Standard buttons
  * __IconButton__ - Short hand class for icon only buttons (text content get's turned into the title/tooltip value)
  * __ConfirmButton__ - When clicked presents a tooltip asking for a second click, after the second click it fires the onClick event
* __Input__ - Input that negotiates the autofill values from it's type, also offers validation and required icons.
  * __TelInput__ - Telephone input that opens a popover allowing a more familiar input style. Has input restriction to only allow valid characters.
* __Checkbox__ - Standard checkbox for css styling (so not the native styled checkbox)
* __Radio__ - Same as checkbox
* __Slider__ - Value slider with min/max values, and stepping. Plenty of view options for displaying labels, values, progress, etc.
* __Range__ - Like slider, but has a low value and high value thumb. Same view properties as Slider
* __Icon__ - Simple icon class that templates the SVG code to place. Has global properties so you can set once and forget about it.

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