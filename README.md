dQuery
===================

dQuery is a lightweight jQuery alternative. It aims to be API compatible with jQuery as much as possible.
It's very lightweight. Because dQuery uses Native aka Vanilla APIs to do the difficult part, It's extremely fast,
say the [Benchmarks][1].

dQuery uses Object.observe, which is not yet natively supported in all browsers. Therefore, We use the shim from [jdarling][2].
The `build/main-with-shim.js` includes the shim as well.

## What's not Supported?
 * Older Browsers (wontfix)

## What's the gain of this?
Speed, A lot of speed, in both page loading and execution. See the Benchmarks link above for performance graphs.

## List of Supported Functions
A list of supported functions can be found [here](https://github.com/dQuery/dQuery/issues/12)

## License

MIT © steelbrain

[1]:https://github.com/dQuery/dQuery/wiki/Benchmarks
[2]:https://github.com/jdarling/Object.observe
[3]:https://github.com/dQuery/dQuery/issues/3
