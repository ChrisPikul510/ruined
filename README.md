# RUInED
## **R**eact **U**ser **IN**terface for **E**xpediated **D**evelopment

##Usage
Using it is simple. For code-spliting purposes importing directly from the module will give you access to all the components.
Or, you can import individually if you'd like.

```
import { Button, IconButton, ConfirmButton } from 'ruined'; // Import by cherry-picking the ones you need
import { Button, IconButton } from 'ruined/buttons'; // Also works
import Button from 'ruined/button'; //Individual
```

Once you've imported the one's you want, using them is also dead simple (hence the point of this). Need an form submit button with an svg icon and async status? 
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
