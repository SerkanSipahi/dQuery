dQuery
===================

dQuery is my jQuery rewrite, jQuery was all too heavy and included support for the things that I didn't want to. I only targeted the `latest` browsers. Because the People running latest browsers shouldn't suffer because of some people who still use older browsers.
it's written in CoffeeScript.

## What's not Supported?
 * Older Browsers (wontfix)
 * Element Creation ( see [bug#1][1])
 * Plugins (see [bug #2][2])
 * .click , .submit (use .on, might change in the future)
 * Ajax (see [bug #3][3])

## What's the gain of this?
### - Speed
Lower dQuery size means faster page load times!
### - Performance
Because dQuery just rewrites user input to built-in commands, It's way faster than the jQuery itself.
### - Size

| jQuery                | dQuery                   |
|-----------------------|--------------------------|
| 247KB Uncompressed    | 8.3KB Uncompressed       |
| 84.3KB Minified       | 4.1KB Minified           |
| 29 KB Minified & Gzip | 1.3KB Minified & Gzipped |

## List of Supported Functions
 * dQuery.ready
 * dQuery.on
 * dQuery.off
 * dQuery.trigger
 * dQuery.attr
 * dQuery.parent
 * dQuery.closest
 * dQuery.find
 * dQuery.hasClass
 * dQuery.addClass
 * dQuery.removeClass
 * dQuery.toggleClass
 * dQuery.each
 * dQuery.html
 * dQuery.text
 * dQuery.prepend
 * dQuery.append
 * dQuery.replaceWith
 * dQuery.first
 * dQuery.last
 * dQuery.val
 * $.extend
 * $.each

## License

[MIT](http://opensource.org/licenses/MIT) © steelbrain

[1]:https://github.com/steelbrain/dquery/issues/1
[2]:https://github.com/steelbrain/dquery/issues/2
[3]:https://github.com/steelbrain/dquery/issues/3
