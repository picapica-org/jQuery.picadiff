/** @module  */

/**
 * @class  View contains that represents a single reference
 */
var ReferenceView = Backbone.View.extend({
	events 	: {
		"click .headline" 			: "open",
		"click .comparison_button"	: "showCompareView",
		"click .pretty_button"		: "showPrettyDiffView",
		"click .blending_button"	: "showBlendingView"

	},
	/**
	 * Called from constructor
	 */
	initialize : function(){
		var reference = this.model;

		reference.bind("change:active", this.changeActive, this);
		reference.bind("change:open", this.toggle, this);
		_.bindAll(this, "toggle", "render");
		// this.quelltext = reference.getSourceText();
		// this.disstext = reference.getDissText();
		this.render();
	},
	/**
	 * Renders view
	 */
	render : function(){
		var reference = this.model;
		var categoryclass = reference.getKategorie().toLowerCase();
		this.$el.addClass("referenceEntry").addClass(categoryclass);


        var html_texts = reference.getHtmlTexts();
        this.quelltext = html_texts["source_html"];
        this.disstext = html_texts["diss_html"];

        var variables = {
			citationType:	reference.getKategorie(),
			citationClass:	reference.getKategorie().toLowerCase(),
			citationPage:	reference.getDissPage(),
			sourceTitle:	reference.get("Quelle"),
			sourcePage:		reference.get("SeiteFundstelle"),
        };


        var self = this;
        $.get("/templates/referenceview.html?"+Math.random(), function(text){
		var template = _.template( text, variables );

			self.$el.append( template );

			self.$(".toggle_btn").click(function(){

				self.$(".deletion").toggle();
				self.$(".insertion").toggle();
			});

			var hheight = self.$el.children(".headline").height();
			self.$el.height(hheight);
			self.closed = true;

			self.$(".diffcontent").addClass(categoryclass);
			$.get("/js/views/sparklineView.js", function(){
				new SparklineView({model: reference, el:self.$(".sparkline")[0]});
			});
			

			self.$(".tabs button").button();

        });
	},
	/**
	 * Loads a new instance of CompareView adds it into the view
	 */
	showCompareView 	: function(){
		if(this.$(".comparison_button").hasClass("active")) return;

		var self = this;
		$.getScript("/js/views/compareView.js", function(){
			var $comparison = self.$(".comparison").attr("class", "comparison");
			var compareview = new CompareView({
				model 	: self.model, 
				el 		:  $comparison[0]
			});
			self.$(".tabs .ui-button").removeClass("active");
			self.$(".comparison_button").addClass("active");
		});
		
	},
	/**
	 * Loads a new instance of BlendingView adds it into the view
	 */
	showBlendingView 	: function(){
		if(this.$(".blending_button").hasClass("active")) return;

		var self = this;
		$.getScript("/js/views/blendingView.js", function(){
			var $comparison = self.$(".comparison").attr("class", "comparison");
			var blendingView = new BlendingView({
				model 	: self.model, 
				el 		:  $comparison[0]
			});
			blendingView.render();
			self.$(".tabs .ui-button").removeClass("active");
			self.$(".blending_button").addClass("active");
		});
	},
	/**
	 * Loads a new instance of PrettyDiffView adds it into the view
	 */
	showPrettyDiffView	: function(){
		if(this.$(".pretty_button").hasClass("active")) return;

		var self = this;
		$.getScript("/js/views/prettyDiffView.js", function(){
			var $comparison = self.$(".comparison").attr("class", "comparison");
			var prettyDiffView = new PrettyDiffView({
				model 	: self.model, 
				el 		:  $comparison[0]
			});
			prettyDiffView.render();
			self.$(".tabs .ui-button").removeClass("active");
			self.$(".pretty_button").addClass("active");
		});
	},
	/**
	 * Called if open parameter in reference is changed. Opens or closes the view
	 */
	toggle : function(){
		if(this.model.get("open")){
			this.showCompareView();
			this.$el.css("height", "");
			this.$el.find(".arrow").addClass("opened");

		}
		else{
			var hheight = this.$el.children(".headline").height();
			this.$el.height(hheight);
			this.$el.find(".arrow").removeClass("opened");
		}
	},
	/**
	 * Called if .headline is clicked.
	 */
	open 			: function(){
		var open = this.model.get("open");
		this.model.set("open", !open);
	},
	/**
	 * Called if active state of reference changes. 
	 * Elements get if they get marked by the up or down arrow in the controlView.
	 */
	changeActive 	: function(){
		if(this.model.get("active")){
			var activeRefs = this.model.collection.activeRefs;
			this.$el.addClass("active");
			// var height = this.$el.height()+2;
			// var prevNum = this.$el.prevAll().length;
			var height = 46;
			var i = activeRefs.indexOf(this.model);
			// this.model.set("open", true);
			var self = this;
			var scrollTop = $("body").scrollTop();
			var newScrollTop = height*i;
			$("body").animate({scrollTop : newScrollTop}, {
				duration : newScrollTop > scrollTop ? 0 : 100, 
				complete : function(){self.model.set("open", true);}
			});
					
		}			
		else{
			this.$el.removeClass("active");
			this.model.set("open", false);
		}
	}
});
