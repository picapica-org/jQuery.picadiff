DiffVisualisationWidget.js [![Build Status](https://travis-ci.org/picapica-net/DiffVisualisationWidget.js.png?branch=v0.6.0)](https://travis-ci.org/picapica-net/DiffVisualisationWidget.js)
==========================

## About
A small widget for visualizing text reuse of two texts.

![screenshot](https://dl.dropboxusercontent.com/u/1461704/diff-screenshot.jpg)

## Recent Changes
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

## Installation
1. Download latest javascript (minified version is recommended)
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
2. Download latest CSS
  - [jquery.picadiff-0.7.0.css](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/jquery.picadiff-0.7.0.css) (recommended)
	- [diffvisualisationwidget-0.4.css](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/diffvisualisationwidget-0.4.css) 
	- [diffvisualisationwidget-0.3.css](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/diffvisualisationwidget-0.3.css)
3. Download and include required dependencies:
	- [jQuery](http://jquery.com/)
	- [google-diff-match-patch](https://code.google.com/p/google-diff-match-patch/)
	- [Webfont Loader](https://github.com/typekit/webfontloader) (optional)
4.  Include it:

	```html
	<link rel="stylesheet" type="text/css" href="css/jquery.picadiff-0.7.0.css"/>
	...
	<script src="/js/jquery.picadiff-0.7.0.min.js"></script>
	```

5. Use it in your code:

	```javascript
	$(".picadiff").picadiff(options);
	```

## Usage
### Use of standard DOM structure
```html
<div class="picadiff">
	<div class="title">
		<div class="left">LeftTitle</div>
		<div class="right">RightTitle</div>
	</div>
	<div class="picadiff-content">
		<div class="left">Left content you want do diff</div>
		<div class="right">Right content you want do diff</div>
	</div>
</div>
```

If you use this structure you can apply the widget by calling:
```javascript
$(".picadiff").picadiff();
```

### Options
All these parameters are optional

```
leftContainer	: CSS identificator of the left container (default=".left")
rightContainer	: CSS identificator of the right container (default=".right")
contentContainer: CSS identificator of the content containers.
	Must be inside the right and left container (default=".picadiff-content")
leftContent	: Content to diff as left side. Set this parameter if you don't
	want the widget to search for the content.
rightContent	: Content to diff as right side. Set this parameter if you don't
	want the widget to search for the content.
timeout			: diff_match_patch timeout (default=0)
```
