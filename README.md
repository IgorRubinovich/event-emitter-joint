## EventEmitterJoint

- control any number of underlying event emitters ("broadcasters") via a central joint
- cascade events over chains of joints
- dynamically add/remove broadcasters just like you would do with listeners

#### Note:
- There's currently no way to add a listener to the joint without adding the same listener to the underlying broadcasters, nor do I know
why anyone would want to do this.   

#### How it works
- Listens for its own newListener/removeListener events and adds/removes them to/from broadcasters (ignoring newListener/removeListener themselves).
- When a new broadcaster is added via addBroadcaster(s), it will get all of already existing listeners. 
- Similarly when a broadcaster is removed via removeBroadcaster(s) all of the listeners are removed from it, unless keepListeners is used.

## API

The interface is inherited from native EventEmitter.
You may provide the constructor with a broadcaster or an array thereof.

Extra methods:

- addBroadcaster(EventEmitter ee)
- addBroadcasters([EventEmitter ee])
- removeBroadcaster(EventEmitter ee, bool keepListeners) - when removing a broadcaster, set keepListeners to true if you want the listeners to stay with the broadcaster. Doesn't seem to contribute to consistency but might find its uses.
- removeBroadcasters([EventEmitter ee], bool keepListeners)

## Todo:
- Automate tests