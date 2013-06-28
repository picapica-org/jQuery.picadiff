/** @module */
/**
 * @class Represents a single reference.
 */
var Reference = Backbone.Model.extend(
/** @lends Reference.prototype */
{
	defaults : {
		active 		: false,
		open 		: false,
		comparison	: true,
		wrap 		: false,
		alignment	: true,
		linelength 	: 42,
	},
	/**
	 * Name of category
	 * @return {String}
	 */
	getCategorie : function(){
		return this.get("categorie") ||  "nocategory";
	},

	/**
	 * Wordbased diff with
	 * @return {Array}  EXPLAIN_PROTOCOL
	 */
	getDiff :function(){
		//lazy loading diffs
		if(!this.diff){
			var dmp = this.dmp;
			var source = this.get("source");
			var suspicious = this.get("suspicious");
			this.diff = dmp.diff_wordbased(source, suspicious,false);
			//dmp.diff_cleanupSemantic(this.diff);
		}
		return this.diff;
	},
	/**
	 * Diff edit lines
	 * @return {Array}
	 */
	getEditlineValues: function(){

		if(!this.data_line){
			var diff = this.getDiff();
			var dmp = this.dmp;
			this.data_line =  dmp.data_line(diff);
		}
		return this.data_line;
	},
	/**
	 * Diff HTML
	 * @return {String}
	 */
	getDiffHTML : function(){

		if(!this.diffhtml){
			var diff = this.getDiff();
			var dmp = this.dmp;
			this.diffhtml =  dmp.diff_html(diff);
		}

		return html_entity_decode (this.diffhtml);
	},
	/**
	 * Diff as pretty HTML
	 * @return {String}
	 */
	getPrettyHTML : function(){
		if(!this.prettyhtml){
			var diff = this.getDiff();
			var dmp = this.dmp;
			var prettyhtml = dmp.diff_prettyHtml(diff);
			this.prettyhtml = html_entity_decode (prettyhtml);
		}
		return this.prettyhtml;
	},
	/**
	 * Diff as equalline
	 * @param  {Number} intervalLength Length of scan window
	 * @return {Array}
	 */
	getEqualline : function(intervalLength){
		if(!this.equal_line){
			var diff = this.getDiff();
			var dmp = this.dmp;
			this.equal_line =  dmp.equal_line(diff, intervalLength);
		}
		return this.equal_line;
	},
	/**
	 * Diff as aligned html
	 * @param  {Number} maxchars Max line length
	 * @return {String}
	 */
	getHtmlTexts : function(maxchars){
		var diff = this.getDiff();
		var dmp = this.dmp;
		return dmp.alligned_texts(diff, maxchars);
	},
	/**
	 * Diff as strict aligned html
	 * @param  {Number} maxchars line length
	 * @return {String}
	 */
	getHtmlTextStrict : function(maxchars){
		var diff = this.getDiff();
		var dmp = this.dmp;
		return dmp.alligned_texts_strict(diff, maxchars);

	},
	/**
	 * Length of reference
	 * @return {Number}
	 */
	getLength : function(){
		return Math.max(this.getDissText().length, this.getSourceText().length);
	},

    /**
     * Max length + length difference of source and edited text
     * @returns {number}
     */
    getTotalLength : function(){
        return Math.max(this.getDissText().length, this.getSourceText().length) + Math.abs(this.getDissText().length -this.getSourceText().length);
    },

    /**
     * Length of reference
     * @return {Number}
     */
//    getLongerText : function(){
//        // return Math.max(this.getDissText().length, this.getSourceText().length);
//        if (this.getSourceText().length > this.getDissText().length)
//            return  this.getSourceText().length;
//        else
//            return this.getDissText().length;
//    },
});
