dQuery
===================

dQuery is a jQuery rewrite. It aims to be API compatible with jQuery as much as possible.
It's very lightweight. Because dQuery uses Native aka Vanilla APIs to do the difficult part, It's extremely fast,
See the performance section of [VanillaJS][1].

Vanilla JS uses Object.observe, which is not yet natively supported in all browsers. Therefore, We use the shim from [KapIT][2].
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

[QuickPress License](https://raw.githubusercontent.com/raeesiqbal/QuickPress/master/license.txt) © steelbrain

[1]:http://vanilla-js.com/
[2]:https://github.com/KapIT/observe-shim
[3]:https://github.com/dQuery/dQuery/issues/3