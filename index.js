/*
	## EventEmitterJoint

	See README.md
*/

const EventEmitter = require('events');
const SPECIAL_EVENTS = ['newListener','removeListener'];
const SPECIAL_EVENT = (e) => SPECIAL_EVENTS.includes(e);
const not = (f) => (...args) => !f(...args);

class EventEmitterJoint extends EventEmitter
{
	constructor(broadcasters) {
		super();

		if(broadcasters && !(broadcasters instanceof Array)) broadcasters = [broadcasters];

		this._broadcasters = broadcasters || [];

		this.on('newListener', this._addListenerToBroadcasters.bind(this));
		this.on('removeListener', this._removeListenerFromBroadcasters.bind(this));
	}

	addBroadcasters(b) {
		(typeof b ? b : [b]).forEach(b => this.addBroadcaster(b))
	}

	addBroadcaster(b) {
		if(this._broadcasters.filter(_b => b == _b).length)
			return; // add only once

		this._broadcasters.push(b);
		this._forAllEventsAndListeners(b.on.bind(b))

		this.emit("newBroadcaster", b);
	}

	removeBroadcasters(b, keepListeners) {
		(typeof b ? b : [b]).forEach(b => this.removeBroadcaster(b, keepListeners))
	}

	removeBroadcaster(b, keepListeners = false) {
		this._broadcasters = this._broadcasters.filter(_b => _b != b);
		if(!keepListeners)
			this._forAllEventsAndListeners((e,l) => b.removeListener(e, l));		

		this.emit("removeBroadcaster", b);
	}

	_addListenerToBroadcasters(ev, listener) {
		if(SPECIAL_EVENT(ev))
			return;

		this._forAllBroadcasters(b => b.on(ev, listener));
	}

	_removeListenerFromBroadcasters(ev, listener) {
		if(SPECIAL_EVENT(ev))
			return;

		this._forAllBroadcasters(b => b.removeListener(ev, listener));
	}

	_forAllBroadcasters(f) {
		return this._broadcasters.map(f);
	}

	_forAllEventsAndListeners(f) {
	   return this.eventNames()
				.filter(not(SPECIAL_EVENT))
				.map(ev =>
					this.listeners(ev)
						.forEach(l => f(ev, l)));
	}

	getBroadcasters () {
		return [...this._broadcasters];
	}
}


module.exports = EventEmitterJoint;