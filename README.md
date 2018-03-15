## EventEmitterJoint

- control any number of underlying event emitters ("broadcasters") via a central joint
- cascade events over chains of joints
- dynamically add/remove broadcasters just like you would do with listeners

### Note:
- There's currently no way to add a listener to the joint without adding the same listener to the underlying broadcasters, nor I know
why anyone would want to do this.   

How it works: Internally the joint is listening for newListener/removeListener events and adds/removes them to/from broadcasters.

## API

The interface is inherited from native EventEmitter.
You may provide the constructor with a broadcaster or an array of broadcasters.

Extra methods:

- addBroadcaster(<EventEmitter>)
- addBroadcasters([<EventEmitter>])
- removeBroadcaster([<EventEmitter>], <bool> keepListeners) - when removing a broadcaster, set keepListeners to true if you 
- removeBroadcasters([<EventEmitter>], <bool> keepListeners)

## Todo:
- Automate tests