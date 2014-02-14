;(function ( $ ) {
	var applyDiffWidget = function(options){
		var $this = $(this).addClass('diffVisualisation');

		var settings = {
			leftContainer		: '.left',
			rightContainer		: '.right',
			titleContainer		: '.title',
			contentContainer	: '.diffvisualisation-content',

		};
		// If options exist, lets merge them
		// with our default settings
		if ( options ) { 
			$.extend( settings, options );
		}

		var referenceData = {
			leftTitle	: settings.leftTitle	|| $this.find(settings.titleContainer+' '+settings.leftContainer).text(),
			left		: settings.leftContent	|| $this.find(settings.contentContainer+' '+settings.leftContainer).text(),
			rightTitle	: settings.rightTitle	|| $this.find(settings.titleContainer+' '+settings.rightContainer).text(),
			right		: settings.rightContent || $this.find(settings.contentContainer+' '+settings.rightContainer).text()
		};

		/* global CompareData */
		var compareData = new CompareData(referenceData);

		var lineLength = 40;
		var html_texts = compareData.wrap ? compareData.getHtmlTextStrict(lineLength) : 
			compareData.getHtmlTexts(lineLength);

		var left = html_texts.source_html;
        var right = html_texts.diss_html;

        $(settings.contentContainer+" "+settings.leftContainer).html(left);
        $(settings.contentContainer+" "+settings.rightContainer).html(right);
        $(settings.titleContainer+" "+settings.leftContainer).html(compareData.leftTitle);
        $(settings.titleContainer+" "+settings.rightContainer).html(compareData.rightTitle);

	};

	$.fn.applyDiffWidget = function(options){
		//check if WebFont API is present
		if(window['WebFont'] !== undefined) { 
			/* global WebFont */
			WebFont.load({google: {families: ['Source Code Pro']}});
		}
		return this.each(function(){
			applyDiffWidget.call(this, options);
		});
	};

})( jQuery );

