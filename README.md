## EventEmitterJoint

- control any number of underlying event emitters ("broadcasters") via a central joint
- cascaade events over chains of event emitters
- dynamically add/remove broadcasters just like you would do with listeners

### How it works
Internally the joint is listening for newListener/removeListener events and adds/removes the listener that caused them to/from broadcasters.

### Note:
- It's not the events that propagate up the chain, rather the addition and removal of listeners propagates down. When a listener is added
to a joint, it's propagated down the joints chain to the base joint or non-joint event emitter. When an event is emitted from the base
event emitter the listener is triggered directly, thust there's no overhead implied by the chain.
- There's currently no way to add a listener to the joint without adding the same listener to the underlying broadcasters, nor I know
why anyone would want to do this.   

## API

The interface is inherited from native [EventEmitter](https://nodejs.org/api/events.html).
You may provide the constructor with a broadcaster or an array of broadcasters.

Extra methods:

- addBroadcaster(<EventEmitter>)
- addBroadcasters([<EventEmitter>])
- removeBroadcaster([<EventEmitter>], <bool> keepListeners) - when removing a broadcaster, set keepListeners to true if you want to keep listening to the broadcaster after removal. Does not sound safe or consistent but could find its purpose.
- removeBroadcasters([<EventEmitter>], <bool> keepListeners)

## Usage
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

## Contributing
Open an issue or make a pull request.

## License
MIT