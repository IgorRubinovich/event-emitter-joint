## EventEmitterJoint
- control any number of underlying event emitters ("broadcasters") via a central joint
- cascade events over chains of event emitters
- dynamically add/remove broadcasters just like you would do with listeners
- extends the standard EventEmitter retaining its interface
- no overhead during events emission

### How it works
Internally the joint is listening for newListener/removeListener events and adds/removes the listener that caused them to/from broadcasters.

### Note:
- It's not the events that propagate up the chain, rather the addition and removal of listeners propagates down. When a listener is added
to a joint, it's propagated down the joints chain to the base joint or non-joint event emitter. When an event is emitted from the base
event emitter the listener is triggered directly, thus there's no overhead implied by the chain.
- There's currently no way to add a listener to the joint without adding the same listener to the underlying broadcasters, nor I know
why anyone would want to do this.   

## API

The interface is inherited from native [EventEmitter](https://nodejs.org/api/events.html).

Extra methods:

- constructor(broadcasters) - provide the constructor with a broadcaster or an array thereof
- addBroadcaster(EventEmitter ee)
- addBroadcasters([EventEmitter ee])
- removeBroadcaster(EventEmitter ee, bool keepListeners)) - when removing a broadcaster, set keepListeners to true if you want to keep listening to the broadcaster after removal. Does not sound safe or consistent but could find its purpose.
- removeBroadcasters([EventEmitter ee], bool keepListeners)
- getBroadcasters() - returns a copy of the list of broadcasters.

Events

- newBroadcaster - like newListener, fired when broadcaster is added, the listener receives the broadcaster as first argument
- removeBroadcaster - like removeListener, see above

## Usage
	npm install --save event-emitter-joint

Then

	const 
		EventEmitterJoint = require('event-emitter-joint'),
		EventEmitter = require('events');

	const
		a = new EventEmitter(),
		b = new EventEmitter(),
		c = new EventEmitter(),
		x = new EventEmitterJoint([a,b]),
		listener = (txt) => console.log("listener 1: " + txt),
		listener2 = (txt) => console.log("listener 2: " + txt);

    x.on('test', listener);
    
    a.emit('test', 'this is emitted from a and delivered via x')
    b.emit('test', 'for the sake of completeness, this is emitted from b and delivered via x')    
    
    x.addBroadcaster(c)
    
    c.emit('test', 'this is emitted from с which was added after instantiation and delivered via x')
    
    x.removeBroadcaster(b)
    
    b.emit('test', 'this is not going anywhere because b was removed from x')
    
    x.addBroadcaster(b)
    
    b.emit('test', 'this is emitted from b after reconnecting it as a broadcaster')

You'll find a chaining example in `test` directory.

## Todo
- Automate tests
- Add custom base class to support usage in browsers

## Contributing
Open an issue or make a pull request. 

## Changelog:
Mar 29, 2018 v0.9.3: 

- emitting newBroadcaster/removeBroadcaster events
- .getBroadcasters() returns a reference to a copy of the internal _broadcasters property
- addBroadcaster(s) now makes sure the broadcaster is not added more than once using plain object equality

Mar 15, 2018 v0.9.1:

- All basic features implemented

## License
MIT