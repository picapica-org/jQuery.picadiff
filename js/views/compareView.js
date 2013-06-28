/** @module  */

/**
 * @class  View that holds and controls the comparison presentation of a representation.
*/
var CompareView = Backbone.View.extend(

/** @lends CompareView.prototype */{
	events : {
		"click .over" 					: "switchCompareMode",
		"click .align"					: "switchAlignment",
		"click .wrap"					: "switchWrap",
		//"mouseover .equal"			: "hoverEqual",
		//"mouseout .equal"				: "unhoverEqual",
	},
	/**
	* Called on object construction. Binds events, assigns the data of the diff
	* and calls render()
	*/
	initialize : function(options){
		this.model.bind("change", this.render, this);

		this.$el.addClass("diffVisualisation");
		this.render();

	},
	/**
	* Draws the comparison of the reference matching to the current state of
	* the model (depending on linelength, comparison, alignment and wrapping
	* mode).
	*/
	render : function(){
		var reference = this.model;
		var linelength = reference.get("linelength");

		var leftHeight = this.$(".left h5").height();
		var rightHeight = this.$(".left h5").height();
		var newHeight = Math.max(leftHeight, rightHeight);
		this.$("h5").height(newHeight);

		var html_texts;
		if(reference.get("wrap"))
			html_texts = reference.getHtmlTextStrict(linelength);
		else
			html_texts = reference.getHtmlTexts(linelength);

		var right = html_texts.source_html;
        var left = html_texts.diss_html;

        this.$(".left .content").html(left);
        this.$(".right .content").html(right);
	},
	
	/**
	* Callback of the button that controls the compare mode. The comparemode is
	* toggled.
	*/
	switchCompareMode : function(){
		var comparison = this.model.get("comparison");
		this.model.set("comparison", !comparison);
	},
	/**
	* Callback of the button that controls the alignment. The alignment is
	* toggled.
	*/
	switchAlignment : function(){
		var alignment = this.model.get("alignment");
		this.model.set("alignment", !alignment);
	},
	/**
	* Callback of the button that controls the wrapping. The wrapping is
	* toggled.
	*/
	switchWrap : function(){
		var wrap = this.model.get("wrap");
		this.model.set("wrap", !wrap);
	},
	/**
	* Callback, that is called, when a equal span element is hovered. The
	* matching element is highlighted.
	*/
	hoverEqual : function(event){
		var self = this;
		var i = $(event.target).prevAll(".equal").length;
		this.hoverElement(i, "#333");
	},
	/**
	* Callback, that is called, when the cursor left the equal span element. The
	* matching elements' highlightig is removed.
	*/
	unhoverEqual : function(event){
		var self = this;
		var i = $(event.target).prevAll(".equal").length;
		this.hoverElement(i, "#666");
	},
	/**
	* Draws the equal span element at the specified index in the specified
	* color. This change is applied on the source and the citation text.
	*/
	hoverElement : function(index, color){
		var element = this.$(".source .equal")[index];
		$(element).css("background-color", color);
		var corresponding = this.$(".citation .equal")[index];
		$(corresponding).css("background-color", color);
	}
});