function Widget(){

}

Widget.prototype.compare = function(source, suspicious){
    reference = new Reference();
    reference.set("TextFundstelle" , source);
    reference.set("TextDissertation", suspicious);
    reference.dmp = new DiffHandler();
    reference.set("linelength", 40);

    var compareview = new CompareView({
        model   : reference
    });

    return compareview.$el;
};

