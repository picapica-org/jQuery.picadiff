function Widget(){

}

Widget.compare = function(leftTitle, left, rightTitle, right){
	WebFont.load({
	    google: {
	      families: ['Source Code Pro']
	    }
	  });



    reference = new Reference();
    reference.set("leftTitle", leftTitle)
    reference.set("left", left);
    reference.set("rightTitle", rightTitle);
    reference.set("right" , right);    
    reference.dmp = new DiffHandler();
    reference.set("linelength", 40);

    var compareview = new CompareView({
        model   : reference
    });

    return compareview.$el;
};

