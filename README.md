jQuery.picadiff [![Build Status](https://travis-ci.org/picapica-net/jQuery.picadiff.png?branch=v0.7.1)](https://travis-ci.org/picapica-net/jQuery.picadiff)
==========================

## About
A small widget for visualizing text reuse on two texts.

![screenshot](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/Bildschirmfoto+2014-03-20+um+09.59.55.png)

## Demo
Try the interactive [demo](http://picapica-net.github.io/jQuery.picadiff/usage/)!

## Getting Started
Download the [production version][min] or the [development version][max] and the [CSS file][css]. 

Dependencies are the [diff_match_patch library][diff_match_patch] and the [Webfont Loader][webfont_loader] (which is optional).

[min]:https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/jquery.picadiff-0.7.1.min.js
[max]:https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/jquery.picadiff-0.7.1.js
[css]:https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/jquery.picadiff-0.7.1.css
[diff_match_patch]:https://code.google.com/p/google-diff-match-patch/
[webfont_loader]:https://github.com/typekit/webfontloader

In your web page:
```html
  ...
  <link rel="stylesheet" type="text/css" href="css/jquery.picadiff-0.7.1.css"/>
</head>
<body>
...

  <div class="picadiff">
    <div class="picadiff-title">
      <div class="left">LeftTitle</div>
      <div class="right">RightTitle</div>
    </div>
    <div class="picadiff-content">
      <div class="left">Left content you want do diff</div>
      <div class="right">Right content you want do diff</div>
    </div>
  </div>


  <script src="jquery.js"></script>
  <script src="diff_match_patch.js"></script>
  <script src="webfont.js"></script>
  <script src="jquery.picadiff-0.7.1.min.js"></script> 
  <script>
      $(".picadiff").picadiff();
  </script>
  ...
```

## Documentation

### Options
You can add options when calling ```picadiff```.

```javascript
$(".picadiff").picadiff(options)
```

All these parameters are optional:

```
leftContainer : CSS identificator of the left container (default=".left")
rightContainer  : CSS identificator of the right container (default=".right")
contentContainer: CSS identificator of the content containers.
  Must be inside the right and left container (default=".picadiff-content")
leftContent : Content to diff as left side. Set this parameter if you don't
  want the widget to search for the content.
rightContent  : Content to diff as right side. Set this parameter if you don't
  want the widget to search for the content.
lineLength  : maxmimum number of chars per line (default=40)
timeout     : diff_match_patch timeout (default=0)
wrap        : if true lines will always wrap on lineLength. Ignoring words and wihtespaces (default=false)
```

### All Versions
Javascript
- [jquery.picadiff-0.7.1.min.js](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/jquery.picadiff-0.7.1.min.js)
- [jquery.picadiff-0.7.1.js](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/jquery.picadiff-0.7.1.js)
- [jquery.picadiff-0.7.0.min.js](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/jquery.picadiff-0.7.0.min.js)
- [jquery.picadiff-0.7.0.js](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/jquery.picadiff-0.7.0.js)
- [jquery.diffvisualisationwidget-0.6.0.min.js](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/jquery.diffvisualisationwidget-0.6.0.min.js)
- [jquery.diffvisualisationwidget-0.6.0.js](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/jquery.diffvisualisationwidget-0.6.0.js)
- [diffvisualisationwidget-0.5.1.min.js](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/diffvisualisationwidget-0.5.1.min.js)
- [diffvisualisationwidget-0.5.1.js](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/diffvisualisationwidget-0.5.1.js)
- [diffvisualisationwidget-0.5.min.js](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/diffvisualisationwidget-0.5.min.js)
- [diffvisualisationwidget-0.5.js](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/diffvisualisationwidget-0.5.js)
- [diffvisualisationwidget-0.4.min.js](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/diffvisualisationwidget-0.4.min.js)
- [diffvisualisationwidget-0.4.js](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/diffvisualisationwidget-0.4.js)
- [diffvisualisationwidget-0.3.min.js](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/diffvisualisationwidget-0.3.min.js)
- [diffvisualisationwidget-0.3.js](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/diffvisualisationwidget-0.3.js)
- [diffvisualisationwidget-0.2.min.js](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/diffvisualisationwidget-0.2.min.js)
- [diffvisualisationwidget-0.2.js](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/diffvisualisationwidget-0.2.js)


CSS
- [jquery.picadiff-0.7.1.css](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/jquery.picadiff-0.7.1.css)
- [jquery.picadiff-0.7.0.css](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/jquery.picadiff-0.7.0.css)
- [diffvisualisationwidget-0.4.css](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/diffvisualisationwidget-0.4.css) 
- [diffvisualisationwidget-0.3.css](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/diffvisualisationwidget-0.3.css)

## Examples
An example can be found in ```/usage/index.html```

## Release History
v0.7.3
- fix jquery.plugin registration

v0.7.2
- updated demo
- update package info

v0.7.1
- renamed title to .picadiff-title
- added options for character wrapping and line length
- added and tested normalize_word function to diff_match_patch extension


v0.7.0
- renamed project to jQuery.picadiff
- added tests
- js consists only of two scripts now
- updated css class names
- updated usage example
- removed unused functions
- removed html_entitiy_decode

v0.6.0
- refactored to a yeoman app
- removed backbone.js and underscore.js dependencies

v0.5.2
- fixed issue #6: Identische Worte werden nicht gematcht

v0.5.1
- fixed issue #5: Words do not match if one ends with a special character and the other does not

v0.5
- set default diff_match_patch timeout to 0
- added timeout property
- using Webfont API is optional

v0.4
- changed standard DOM structure
- fixed issue #1: Special characters should be ignored from diff
- fixed issue #2: Diff-Matches should be case-insensitive
- fixed issue #3: Diff-Matches should be trimmed
- fixed issue #4: Title elements with different height

v0.3
- content can be submitted in options

v0.2
- changed API to use jQuery
- data is now read from structured html
