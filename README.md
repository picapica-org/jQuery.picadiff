DiffVisualisationWidget.js
==========================

## About
A small widget for visualizing the diff of two texts.

## Recent Changes
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
	- [diffvisualisationwidget-0.4.min.js](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/diffvisualisationwidget-0.4.min.js) (recommended)
	- [diffvisualisationwidget-0.4.js](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/diffvisualisationwidget-0.4.js)
	- [diffvisualisationwidget-0.3.min.js](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/diffvisualisationwidget-0.3.min.js) (recommended)
	- [diffvisualisationwidget-0.3.js](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/diffvisualisationwidget-0.3.js)
	- [diffvisualisationwidget-0.2.min.js](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/diffvisualisationwidget-0.2.min.js)
	- [diffvisualisationwidget-0.2.js](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/diffvisualisationwidget-0.2.js)
2. Download CSS of the same version
	- [diffvisualisationwidget-0.4.css](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/diffvisualisationwidget-0.4.css)
	- [diffvisualisationwidget-0.3.css](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/diffvisualisationwidget-0.3.css)
3. Download and include required dependencies: 
	- [jQuery](http://jquery.com/)
	- [Webfont Loader](https://github.com/typekit/webfontloader)
	- [Underscore.js](http://underscorejs.org/)
	- [Backbone.js](http://backbonejs.org/)
	- [google-diff-match-patch](https://code.google.com/p/google-diff-match-patch/)
	- Html entity decode ??
4.  Include it:
	
	```html
	<link rel="stylesheet" type="text/css" href="css/diffvisualisationwidget-0.4.css"/>
	...
	<script src="/js/diffvisualisationwidget-0.4.min.js"></script>
	```

5. Use it in your code:

	```javascript
	$(".diffVisualisation").applyDiffWidget(options);
	```

## Usage
### Use of standard DOM structure
```html
<div class="diffVisualisation">
	<div class="title">
		<div class="left">LeftTitle</div>
		<div class="right">RightTitle</div>
	</div>
	<div class="diffvisualisation-content">
		<div class="left">Left content you want do diff</div>
		<div class="right">Right content you want do diff</div>
	</div>
</div>
```

If you use this structure you can apply the widget by calling:
```javascript
$(".diffVisualisation").applyDiffWidget();
```

### Options
All these parameters are optional

```
leftContainer	: CSS identificator of the left container (default=".left")
rightContainer	: CSS identificator of the right container (default=".right")
contentContainer: CSS identificator of the content containers. 
	Must be inside the right and left container (default=".diffvisualisation-content")
leftContent	: Content to diff as left side. Set this parameter if you don't 
	want the widget to search for the content.
rightContent	: Content to diff as right side. Set this parameter if you don't 
	want the widget to search for the content.
```
