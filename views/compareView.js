/** @module  */

/**
 * @class  View that holds and controls the comparison presentation of a representation.
*/
var comparetemplate = "<div class='comparisoncontrol'><div class='controlButtons'><button class='over' >Überlagerung</button><button class='align'>Zeilenangleichung</button><button class='wrap'>Wortumbruch</button></div><div class='slidercontainer'><button class='slider_button_text'>Fundstelle</button><div class='slider'></div><button class='slider_button_source'>Quelle</button></div><div class='sliderstrictcontainer'><div class='strictslider'></div></div></div><div class='refcontainer'><div class='citation'><h5>Fundstelle:</h5><div class='content'></div></div><div class='separator'></div><div class='source'><h5>Quelle:</h5><div class='content'></div></div></div></div>";
var CompareView = Backbone.View.extend(

/** @lends CompareView.prototype */{
	events : {
		"click .over" 					: "switchCompareMode",
		"click .align"					: "switchAlignment",
		"click .wrap"					: "switchWrap",
		"mouseover .equal"				: "hoverEqual",
		"mouseout .equal"				: "unhoverEqual",
		"click .slider_button_text" 	: "showSliderText",
		"click .slider_button_source"	: "showSliderSource"
	},
	/**
	* Called on object construction. Binds events, assigns the data of the diff
	* and calls render()
	*/
	initialize : function(options){
		//this.model.bind("change", this.render, this);

		this.$el.empty().addClass("compareView");


		var templatestring = "";

		var template = _.template(comparetemplate);
		this.$el.append(template);

		this.$("button").button();
		this.$(".align").addClass("active");

		//this.$(".citation").addClass(this.model.getKategorie().toLowerCase());
		this.$(".wrap").addClass("active");

		this.render();
		this.renderSlider();
		this.renderCutSlider();

	},
	/**
	* Draws the comparison of the reference matching to the current state of
	* the model (depending on linelength, comparison, alignment and wrapping
	* mode).
	*/
	render : function(){
		var reference = this.model;
		var linelength = reference.get("linelength");

		var html_texts;
		if(reference.get("wrap"))
			html_texts = reference.getHtmlTextStrict(linelength);
		else
			html_texts = reference.getHtmlTexts(linelength);

		var sourcetext = html_texts.source_html;
        var disstext = html_texts.diss_html;

        this.$(".source .content").html(sourcetext);
        this.$(".citation .content").html(disstext);

        //comparison
        if(reference.get("comparison")){
        	this.$(".source").removeClass("overlayed")
        		.addClass("compareview")
        		.css('opacity', 1);

			this.$(".citation").css('opacity', 1);
			this.$(".slidercontainer").hide();
        }
        //overlay
        else{
        	this.$(".source").removeClass("compareview")
				.addClass("overlayed");
			this.$(".slidercontainer").show();
        }


        //alignment
        if(this.model.get("alignment")){
			this.$(".align").addClass("active");
			this.$(".source br, .citation br").show();
		}else{
			this.$(".align").removeClass("active");
			this.$(".source br, .citation br").hide();
		}

		//wrap
		if(this.model.get("wrap")) this.$(".wrap").addClass("active");
		else this.$(".wrap").removeClass("active");


	},
	/**
	* Draws the slider for the overlay mode.
	*/
	renderSlider : function(){
		var self = this;
		this.$(".slider").slider({
			value : 50,
			range: "min",
			animate: true,
			slide: function(event, ui){
				opacity = (ui.value+1)/100;
				if(opacity > 1)
					opacity=1;
				self.$(".source").css('opacity', 1-opacity);
				self.$(".citation").css('opacity', opacity);
			}
		});
	},
	/**
	* Callback function of the source button in the Overlay slider. The source
	* text is set to full opacity and the reference text is faded out.
	*/
	showSliderSource : function(){
		this.$(".slider").slider('value', 100);
		this.$(".citation").css('opacity', 0);
		this.$(".source").css('opacity', 1);
	},
	/**
	* Callback function of the reference button in the Overlay slider. The
	* reference text is set to full opacity and the source text is faded out.
	*/
	showSliderText : function(){
		this.$(".slider").slider('value', 0);
		this.$(".citation").css('opacity', 1);
		this.$(".source").css('opacity', 0);
	},
	/**
	* Draws and controlls the slider that separates the reference and source
	* text and also sets the current linelength (in number of characters).
	*/
	renderCutSlider : function(){
		var self = this;

		var separator = this.$(".separator");
		var height = this.$(".citation").height();
		if(height === 0)
			height = 100;
		separator.height(height);
		separator.draggable({
			axis : "x",
			drag : function(event, ui){
				var length = (360 + ui.position.left)*42 / 360;
				var newLinelength = Math.max(Math.ceil(length), 1);
				self.$(".source").css("margin-left", ui.position.left);
				self.model.set("linelength", newLinelength);
				separator.height(self.$(".citation").height());
			},
			containment: this.$(".citation")
		});
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