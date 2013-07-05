DiffVisualisationWidget.js
==========================

## About
A small widget for visualizing the diff of two texts.

## Installation
1. Download latest version (minified version is recommended)
	- [diffvisualisationwidget-0.3.min.js](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/diffvisualisationwidget-0.3.min.js) (recommended)
	- [diffvisualisationwidget-0.3.js](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/diffvisualisationwidget-0.3.js)
	- [diffvisualisationwidget-0.2.min.js](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/diffvisualisationwidget-0.2.min.js)
	- [diffvisualisationwidget-0.2.js](https://s3-eu-west-1.amazonaws.com/diffvisualisationwidget.js/diffvisualisationwidget-0.2.js)
2. Download and include required dependencies: 
	- [jQuery](http://jquery.com/)
	- [Webfont Loader](https://github.com/typekit/webfontloader)
	- [Underscore.js](http://underscorejs.org/)
	- [Backbone.js](http://backbonejs.org/)
	- [google-diff-match-patch](https://code.google.com/p/google-diff-match-patch/)
	- Html entity decode ??
3.  Include it:
	
	```html
	<script src="/js/diffvisualisationwidget-0.3.min.js"></script>
	```

4. Use it in your code:

	```javascript
	$(".diffVisualisation").applyDiffWidget(options);
	```

## Usage
### Use of standard DOM structure
```html
<div class="diffVisualisation">
	<div class="left">
		<div class="title">LeftTitle</div>
		<div class="diffvisualisation-content">Left content you want do diff</div>
	</div>
	<div class="right">
		<div class="title">RightTitle</div>
		<div class="diffvisualisation-content">Right content you want do diff</div>
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
