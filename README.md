dQuery
===================

dQuery is a lightweight jQuery alternative. It aims to be API compatible with jQuery as much as possible.
It's very lightweight. Because dQuery uses Native aka Vanilla APIs to do the difficult part, It's extremely fast,
See the performance section of [VanillaJS][1].

dQuery uses Object.observe, which is not yet natively supported in all browsers. Therefore, We use the shim from [jdarling][2].
The `build/main-with-shim.js` includes the shim as well.

## What's not Supported?
 * Older Browsers (wontfix)
 * Element Creation (wontfix)
 * Methods such as click and submit, use on instead
 * Ajax (see [bug #3][3])

## What's the gain of this?
Speed, A lot of speed, in both page loading and execution. See the VanillaJS link above for performance graphs.

## List of Supported Functions
A list of supported functions can be found [here](https://github.com/dQuery/dQuery/issues/12)

## License

MIT © steelbrain

[1]:http://vanilla-js.com/
[2]:https://github.com/jdarling/Object.observe
[3]:https://github.com/dQuery/dQuery/issues/3
