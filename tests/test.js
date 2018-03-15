const 
	EventEmitterJoint = require('..'),
	EventEmitter = require('events');

const
	a = new EventEmitter(),
	b = new EventEmitter(),
	c = new EventEmitter(),
	x = new EventEmitterJoint([a,b]),
	listener = (txt) => console.log("listener 1: " + txt),
	listener2 = (txt) => console.log("listener 2: " + txt);

// basics

console.log();
console.log('Basic event joints:')

x.on('test', listener);

a.emit('test', 'this is emitted from a and delivered via x')
b.emit('test', 'for the sake of completeness, this is emitted from b and delivered via x')

x.addBroadcaster(c)

c.emit('test', 'this is emitted from с which was added after instantiation and delivered via x')

x.removeBroadcaster(b)

b.emit('test', 'this is not going anywhere because b was removed from x')

x.addBroadcaster(b)

b.emit('test', 'this is emitted from b after reconnecting it as a broadcaster')

x.on('test', listener2);

x.removeListener('test', listener)
console.log("Number of listeners for 'test' on 'a' after removing it from event joint: ", a.listeners('test').length)

x.on('test', listener);
console.log("Number of listeners for 'test' on 'a' before adding it to event joint: ", a.listeners('test').length)

x.removeBroadcasters([a,b,c])
console.log("Number of listeners for 'test' after removing all broadcasters", x.listeners('test').length)

a.emit('test', 'this is not going anywhere because all broadcasters were removed from x')

x.addBroadcaster(a);

a.emit('test', "this is going to x again after adding 'a' broadcaster")


// chain

console.log();
console.log('Chaining event joints:')
const y = new EventEmitterJoint(x)
const z = new EventEmitterJoint(y)
const w = new EventEmitterJoint(y)
const t = new EventEmitterJoint([w,z]);

const chainListener = (ev) => (txt) => console.log(ev + " " + txt)

const chainListenerForT = chainListener('chained t <- z, w');

z.on('chained', chainListener('chained z <- y'));
w.on('chained', chainListener('chained w <- y'));
t.on('chained', chainListenerForT);

a.emit("chained", " <- a to the chain")

t.removeListener('chained', chainListenerForT)
console.log("after removing 'chained' listener from t");
a.emit("chained", " <- a to the chain")
