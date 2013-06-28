;(function ( $ ) {
	var applyDiffWidget = function(options){
		var $this = $(this);

		var referenceData = {
			leftTitle 	: $this.find(".left h5").text(),
			left 		: $this.find(".left .content").text(),
			rightTitle 	: $this.find(".right h5").text(),
			right 		: $this.find(".right .content").text(),
		}

		var reference = new Reference(referenceData);
		var compareView = new CompareView({
			model   : reference,
			el 		: this,
		});
	}

	$.fn.applyDiffWidget = function(options){
		WebFont.load({google: {families: ['Source Code Pro']}});
		return this.each(function(){
			applyDiffWidget.call(this, options);
		});
	}

})( jQuery );

