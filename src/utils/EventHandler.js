
var __id = 0,
	listeners = {};

/**
 * Singleton class for easier management of event listeners
 */
class EventHandler {
	/**
	 * Adds a new event listener to the element provided
	 * @param {DOMNode} el DOM Element to attach to
	 * @param {string} evt Event string
	 * @param {function} handler Function to call on event
	 * @param {boolean} capture Capture the event
	 * @return {number} EventHandler id for use during removal
	 */
	addListener(el, evt, handler, capture) {
		el.addEventListener(evt, handler, capture);
		listeners[__id] = {
			element: el,
			event: evt,
			handler,
			capture
		}
		return __id++
	}

	/**
	 * Remove a previously created event listener
	 * @param  {number} id Id returned from EventHandler.addListener
	 */
	removeListener(id) {
		if(id in listeners) {
			var hndl = listeners[id]
			hndl.element.removeEventListener(hndl.event, hndl.handler, hndl.capture)
			delete listeners[id]
			return null
		}
	}
}
const instance = new EventHandler()
export default instance