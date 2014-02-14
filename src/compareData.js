/** @module */
/* global html_entity_decode */
/**
 * @class Represents a single reference.
 */
function CompareData(referenceData){
	/* global DiffHandler */
	this.dmp =  new DiffHandler();

	for(var key in referenceData){
		this[key] = referenceData[key];
	}
}

CompareData.prototype = {
	/**
	 * initializes and sets diff timeout to infinit
	 */
	initialize: function(data, options) {
		this.dmp.Diff_Timeout = options ? options.timeout || 0 : 0;
	},

	/**
	 * Wordbased diff with
	 * @return {Array}  EXPLAIN_PROTOCOL
	 */
	getDiff :function(){
		//lazy loading diffs
		if(!this.diff){
			var left = this.left;
			var right = this.right;
			this.diff = this.dmp.diff_wordbased(left, right,false);
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
			this.data_line = this.dmp.data_line(diff);
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
			this.diffhtml =  this.dmp.diff_html(diff);
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
			var prettyhtml = this.dmp.diff_prettyHtml(diff);
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
			this.equal_line =  this.dmp.equal_line(diff, intervalLength);
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
		return this.dmp.alligned_texts(diff, maxchars);
	},
	/**
	 * Diff as strict aligned html
	 * @param  {Number} maxchars line length
	 * @return {String}
	 */
	getHtmlTextStrict : function(maxchars){
		var diff = this.getDiff();
		return this.dmp.alligned_texts_strict(diff, maxchars);

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
	}
};
