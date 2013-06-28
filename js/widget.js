function Widget(){

}

Widget.compare = function(source, suspicious){
    reference = new Reference();
    reference.set("source" , source);
    reference.set("suspicious", suspicious);
    reference.dmp = new DiffHandler();
    reference.set("linelength", 40);

    var compareview = new CompareView({
        model   : reference
    });

    return compareview.$el;
};

