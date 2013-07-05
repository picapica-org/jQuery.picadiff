;(function ( $ ) {
	var applyDiffWidget = function(options){
		var $this = $(this);

		var settings = {
			leftContainer		: ".left",
			rightContainer		: ".right",
			titleContainer		: ".title",
			contentContainer	: ".diffvisualisation-content"
		};
		// If options exist, lets merge them
		// with our default settings
		if ( options ) { 
			$.extend( settings, options );
		}

		var referenceData = {
			leftTitle	: settings.leftTitle 	|| $this.find(settings.leftContainer+" "+settings.titleContainer).text(),
			left		: settings.leftContent	|| $this.find(settings.leftContainer+" "+settings.contentContainer).text(),
			rightTitle	: settings.rightTitle	|| $this.find(settings.rightContainer+" "+settings.titleContainer).text(),
			right		: settings.rightContent || $this.find(settings.rightContainer+" "+settings.contentContainer).text()
		}

		var compareData = new CompareData(referenceData);

		$.extend(settings, {
			model   : compareData,
			el		: this
		});
		var compareView = new CompareView(settings);
	}

	$.fn.applyDiffWidget = function(options){
		WebFont.load({google: {families: ['Source Code Pro']}});
		return this.each(function(){
			applyDiffWidget.call(this, options);
		});
	}

})( jQuery );

