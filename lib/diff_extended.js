/**
 * Class that extends the diff_match_patch class of the google framework with a
 * wordbased approach and
 * @module lib/DiffHandler
*/

function DiffHandler(){
	diff_match_patch.call(this);
}

DiffHandler.prototype = Object.create(diff_match_patch.prototype);
DiffHandler.prototype.constructor = DiffHandler;


/**
 * Returns a HTML representation of the diff where the two texts are represented
 * in one.
 * @return {String} containing the html representation of the diff
*/
DiffHandler.prototype.diff_html = function(diffs){
	var html = [];
	var pattern_amp = /&/g;
	var pattern_lt = /</g;
	var pattern_gt = />/g;
	var pattern_para = /\n/g;
	var editopen=false;
	for (var x = 0; x < diffs.length; x++) {
	var op = diffs[x][0];    // Operation (insert, delete, equal)
	var data = diffs[x][1];  // Text of change.
	var text = data.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;')
	    .replace(pattern_gt, '&gt;').replace(pattern_para, '&para;<br>');
	var html_string = "";
	switch (op) {
	  case DIFF_INSERT:
		if(!editopen)
			html_string += '<span class="edit">';

		html_string += '<span class="insertion">' + text + '</span>';

		if(editopen){
	    	html_string += '</span>';
	    	editopen = false;
	    } else{
	    	editopen = true;
	    }
	    break;

	  case DIFF_DELETE:
		if(!editopen)
			html_string += '<span class="edit">';

		html_string += '<span class="deletion">' + text + '</span>';

		if(editopen){
	    	html_string += '</span>';
	    	editopen = false;
	    } else{
	    	editopen = true;
	    }
	    break;

	      case DIFF_EQUAL:
	    	if(editopen){
	        	html_string += '</span>';
	        	editopen = false;
	        }
	        html_string += '<span class="equal">' + text + '</span>';
	        break;
	    }

	    html[x] = html_string;
	  }
	  return html.join('');
};


/**
 * Constructs an array that indicates, which parts (influenced by intervalllength)
 * are equal in respect to the diff.
 * @return {Array} representation of the diff, indicating the equal parts
*/
DiffHandler.prototype.equal_line = function(diffs, intervalLength){
	var dataline = [];
	var index = 0;
	var currentvalue = 0;
	for(var x = 0; x < diffs.length; x++){
		var op = diffs[x][0];
		var data = diffs[x][1];
        console.log(typeof data);
		for (var i = 0; i < data.length; i++){
			index++;
			if(op == DIFF_EQUAL)
				currentvalue++;

			if(index%intervalLength===0){
				dataline[index/intervalLength-1]=(currentvalue===0)?0:currentvalue;

				currentvalue = 0;
			}
		}


	}
	return dataline;
};


/**
 * Constructs a HTML representation of the diff with alignment of the equal
 * source and dissertation lines. Linebreaks are set after the specified number
 * of characters, with word wrapping-
 * @return {Object} aligned dissertation text and source text
*/
DiffHandler.prototype.alligned_texts = function(diffs, maxchars){
	var source_line = new Allignment();
	var diss_line = new Allignment();

	source_line.maxchars=maxchars;
	diss_line.maxchars=maxchars;

	for(var x = 0; x < diffs.length; x++){
		var op = diffs[x][0];
		var data = diffs[x][1];

		switch(op){
			case DIFF_INSERT:
				diss_line.append(data, "insertion");
				break;
			case DIFF_DELETE:
				source_line.append(data, "deletion");
				break;
			case DIFF_EQUAL:
				if(data.length>10){
					maximumLines = Math.max(source_line.linecount, diss_line.linecount);
					source_line.setLineCountTo(maximumLines);
					diss_line.setLineCountTo(maximumLines);
					source_line.append(data, "equal");
					diss_line.append(data, "equal");
				} else{
					diss_line.append(data, "insertion");
					source_line.append(data, "deletion");
				}

				break;
		}
	}

	return {"diss_html":diss_line.line, "source_html":source_line.line};

};


/**
 * Constructs a HTML representation of the diff with alignment of the equal
 * source and dissertation lines. Linebreaks are set after the specified number
 * of characters, strict, with character wrapping.-
 * @return {Object} aligned dissertation text and source text
*/
DiffHandler.prototype.alligned_texts_strict = function(diffs, maxchars){
	var source_line = new Allignment();
	var diss_line = new Allignment();

	source_line.maxchars = maxchars;
	diss_line.maxchars = maxchars;

	for(var x = 0; x < diffs.length; x++){
		var op = diffs[x][0];
		var data = diffs[x][1];

		switch(op){
			case DIFF_INSERT:
				//diss_line.append(data, "insertion");
				diss_line.appendStrict(data, "insertion");
				break;
			case DIFF_DELETE:
				//source_line.append(data, "deletion");
				source_line.appendStrict(data, "deletion");
				break;
			case DIFF_EQUAL:
				if(data.length>10){
					maximumLines = Math.max(source_line.linecount, diss_line.linecount);
					source_line.setLineCountTo(maximumLines);
					diss_line.setLineCountTo(maximumLines);
					source_line.appendStrict(data, "equal");
					diss_line.appendStrict(data, "equal");
				} else{
					source_line.appendStrict(data, "deletion");
					diss_line.appendStrict(data, "insertion");
				}

				break;
		}
	}

	return {"diss_html":diss_line.line, "source_html":source_line.line};
};

/**
 * Computes the diff on wordbase. This is an extention of the character based
 * diff computation of the google_diff_match_patch framework.
 * @return {Array} word based diff consisting of arrays, in which the first
 * element represents the operation (-1: DIFF_DELETE, 1: DIFF_INSERT,
 * 0:DIFF_EQUAL) and the second element the text of that was applied by this
 * operation.
*/
diff_match_patch.prototype.diff_wordbased = function(text1, text2, lebool){
	text1 = text1.replace(/\r|\n/g, " ");
	text2 = text2.replace(/\r|\n/g, " ");
	textarr1 = text1.split(/\s/);
	textarr2 = text2.split(/\s/);
	textchars1 = "";
	textchars2 = "";
	var word_dict = {};
	var charcode = 21;

	for(var i in textarr1){
		var word = textarr1[i];
		if(word_dict.hasOwnProperty(word)){
			textchars1 += word_dict[word];
			continue;
		}

		var character = String.fromCharCode(charcode);
		word_dict[word] = character;
		charcode += 1;
		textchars1 += character;
	}

	for(var i in textarr2){
		var word = textarr2[i];
		if(word_dict.hasOwnProperty(word)){
			textchars2 += word_dict[word];
			continue;
		}
		var character = String.fromCharCode(charcode);
		word_dict[word] = character;
		charcode += 1;
		textchars2 += character;
	}

	var char_dict= {};
	for (var i in word_dict){
		char_dict[word_dict[i]] = i;
	}

	var diffs = this.diff_main(textchars1, textchars2, lebool);
	var result = [];
	for(var x = 0; x < diffs.length; x++){
		var op = diffs[x][0];
		var data = diffs[x][1];
		var encodedstring = "";
		var datarr = data.split("");
		for(var i in datarr){
		encodedstring += char_dict[datarr[i]] + " ";
		}
		result.push([op,encodedstring]);
	}

	return result;
};


/*

DiffHandler.prototype.abstract_script = function(diffs){
	var editscript = [];
	for (var x = 0; x < diffs.length; x++) {
		var op = diffs[x][0];    // Operation (insert, delete, equal)
		var data = diffs[x][1];  // Text of change.
		switch (op) {
			case DIFF_INSERT:
				editscript[x] = ['I',data.length];
				break;
			case DIFF_DELETE:
				editscript[x] = ['D',data.length];
				break;
			case DIFF_EQUAL:
				editscript[x] = ['E',data.length];
				break;
		}
	}
	return editscript;
};

DiffHandler.prototype.edit_symbols = function(diffs){
	var symbolstring = "";

	for(var x = 0; x < diffs.length; x++){
		var op = diffs[x][0];
		var data = diffs[x][1];
		switch(op){
			case DIFF_INSERT:
				symbolstring += "<span class='sparkline_plus'>"+data.length+"+</span>";
				break;
			case DIFF_DELETE:
				symbolstring += "<span class='sparkline_minus'>"+data.length+"-</span>";
				break;
			case DIFF_EQUAL:
				symbolstring += "<span class='sparkline_equal'>"+data.length+"=</span>";
				break;
		}

	}
	return symbolstring;
}

DiffHandler.prototype.data_line = function(diffs){
	var dataline = [];
	var index = 0;
    var currentvalue = 0;
	for (var x = 0; x < diffs.length; x++) {
	    var op = diffs[x][0];    // Operation (insert, delete, equal)
	    var data = diffs[x][1];  // Text of change.
	    switch (op) {
	      case DIFF_INSERT:
	    	for(var i = 0; i<data.length; i++){
	    		currentvalue += 1;
	    		dataline[index] = currentvalue;
	    		index += 1;
	    	}
	        break;
	      case DIFF_DELETE:
	    	  for(var i = 0; i<data.length; i++){
		    		currentvalue -= 1;
		    		dataline[index] = currentvalue;
		    		index += 1;
		    	}
	    	  break;
	      case DIFF_EQUAL:
	    	  for(var i = 0; i<data.length; i++){
	    		  	dataline[index] = currentvalue;
		    		index += 1;
		    	}
	    	  break;
	    }
	  }
	return dataline;
}

DiffHandler.prototype.equal_sum_line = function(diffs){
	var dataline = [];
	var index = 0;
	var currentvalue = 0;
	for(var x = 0; x < diffs.length; x++){
		var op = diffs[x][0];
		var data = diffs[x][1];


		switch(op){
			case DIFF_INSERT:
					dataline[index]=currentvalue;
					index++;

				break;
			case DIFF_DELETE:
				for (var i = 0; i < data.length; i++){
					dataline[index]=currentvalue;
					index++;
				}
				break;
			case DIFF_EQUAL:
				for (var i = 0; i < data.length; i++){
					currentvalue++;
					dataline[index]=currentvalue;
					index++;
				}
				break;
		}

	}
	return dataline;
}

DiffHandler.prototype.html_texts = function(diffs){
	var source_html = "";
	var diss_html = "";

	for(var x = 0; x < diffs.length; x++){
		var op = diffs[x][0];
		var data = diffs[x][1];

		switch(op){
			case DIFF_INSERT:
				diss_html += data;
				break;
			case DIFF_DELETE:
				source_html += data;
				break;
			case DIFF_EQUAL:
				var addstring = "<span class='equal'>" + data + "</span>"
				diss_html += addstring;
				source_html += addstring;
				break;
		}
	}

	return {"diss_html":diss_html, "source_html":source_html};
}

*/
