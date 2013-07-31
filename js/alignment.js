/**
 * Class for controling the alignment (number of linebreaks) of a text and the
 * wrapping of a text.
 * @module lib/Alignment
 */
function Allignment(){
	this.linecount = 0;
	this.wordcount = 0;
	this.charcount = 0;
	this.maxchars = 10;
	this.line = "";
}


/**
 * Appends a text with word wrapping after specified number of characters
*/

Allignment.prototype.append = function(text, classname){
	var textsplit = text.split(" ");
	if(classname)
		this.line += '<span class="'+classname+'">';
	for(var i in textsplit){
		this.charcount += textsplit[i].length + 1;
		this.wordcount += 1;
		if(this.charcount> this.maxchars){
			this.line += "<br>";
			this.linecount += 1;
			this.charcount = textsplit[i].length;
			this.wordcount = 1;
		}

		this.line += textsplit[i] + " ";

	}
	this.line = this.line.trim();
	if(classname)
		this.line += "</span> ";
};

/**
 * Appends a text with character wrapping after specified number of characters
*/
Allignment.prototype.appendStrict = function(text, classname){
	var textsplit = text.split("");
	if(classname)
		this.line += '<span class="'+classname+'">';
	for(var i in textsplit){
		if(this.charcount > 0 && this.charcount % this.maxchars === 0){
			this.line += "<br>";
			this.linecount += 1;
			this.charcount = 0;
		}
		if(!(/^\s/g.test(textsplit[i]) && this.charcount === 0)){
			this.charcount += 1;
		}
		this.line += textsplit[i];
	}
	if(classname)
		this.line += "</span>";
};


/**
 * Sets the specified linecount. Corresponding to the linecount, linebreaks are
 * added to the text.
*/
Allignment.prototype.setLineCountTo = function(linecount){
	if(linecount === 0)
		return;
	while(this.linecount <= linecount){
		this.line += "<br>";
		this.wordcount = 0;
		this.charcount = 0;
		this.linecount += 1;
	}
};


/**
 * Sets the charactercount of the current line to a specified number.
 * Corresponding to the number of characters, nonbreaking spaces are added to
 * the current line.
*/
Allignment.prototype.setCharCountTo = function(charcount){
	while(this.charcount <= charcount){
		this.line += "&nbsp;";
		this.charcount +=1;
	}
};