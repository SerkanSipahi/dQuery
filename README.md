dQuery
===================

dQuery is my jQuery rewrite, jQuery was all too heavy and included support for the things that I didn't want to. I only targeted the `latest` browsers. Because the People running latest browsers shouldn't suffer because of some people who still use older browsers.

It's written in JSX harmony, the transpiled version can be found in build/main.js

## What's not Supported?
 * Older Browsers (wontfix)
 * Element Creation (wontfix)
 * Plugins (see bug #2)
 * dQuery.click , dQuery.submit etc (use .on instead)
 * Ajax (see bug #3)

## What's the gain of this?
### - Speed
Lower dQuery size means faster page load times!
### - Performance
Because dQuery just rewrites user input to built-in commands, It's way faster than the jQuery itself.

## List of Supported Functions
See [this bug][https://github.com/steelbrain/dQuery/issues/12]

## License

[QuickPress License](https://raw.githubusercontent.com/raeesiqbal/QuickPress/master/license.txt) © steelbrain
