function Widget(){

}

var testtext1 = "Bettina Wulff, die Frau des früheren Bundespräsidenten, geht massiv gegen die Verbreitung von Gerüchten und Denunziationen über ihr angebliches Vorleben vor. Am Freitag hat die 38-Jährige Klagen beim Hamburger Landgericht gegen den Fernsehmoderator Günther Jauch und gegen den Google-Konzern eingereicht.";
var testtext1s = "Hamburg — Bettina Wulff geht laut einem Pressebericht massiv gegen die Verbreitung von Gerüchten und Denunziationen über ihr angebliches Vorleben vor. Am Freitag hat die 38-jährige Frau des ehemaligen Bundespräsidenten Christian Wulff Klagen beim Hamburger Landgericht gegen den Fernsehmoderator Günther Jauch und gegen den Suchmaschinenkonzern Google eingereicht. Das berichtet die »Süddeutsche Zeitung« (»SZ«) in ihrer Samstagsausgabe.";

var testtext2 = "In den vergangenen Monaten hatten bereits 34 deutsche und ausländische Blogger und Medien, darunter der Stern, die Mediengruppe Österreich und die Berliner Zeitung Unterlassungserklärungen abgegeben. Mehrere Medienhäuser haben Schmerzensgeld in fünfstelliger Höhe zahlen müssen.";
var testtext2s = "In den vergangenen Monaten hatten demnach bereits 34 deutsche und ausländische Blogger und Medien, darunter die Mediengruppe Österreich, Unterlassungserklärungen abgegeben. Mehrere Medienhäuser haben Schmerzensgeld in fünfstelliger Höhe zahlen müssen.";

var testtext3 = "Nach Recherchen der Süddeutschen Zeitung haben CDU-Kreise in Hannover seit 2006 das Gerücht gestreut, Bettina Wulff habe früher angeblich im Rotlichtmilieu gearbeitet. Die Denunziation sollte offenbar vor allem Christian Wulff treffen, der damals noch CDU-Ministerpräsident in Niedersachsen war. Er hatte in der Partei einige einflussreiche Feinde und auch außerhalb der Partei etliche Gegner.  ";
var testtext3s = "Nach Recherchen der »Süddeutschen Zeitung« haben CDU-Kreise in Hannover seit 2006 das Gerücht gestreut, Bettina Wulff habe früher angeblich im Rotlichtmilieu gearbeitet. Die Denunziation sollte offenbar vor allem Christian Wulff treffen, der damals noch CDU-Ministerpräsident in Niedersachsen war. Er hatte in der Partei demnach einige einflussreiche Feinde und auch außerhalb der Partei etliche Gegner."

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

$(document).ready(function(){
    widget = new Widget();
    $("#reusecontent").append(widget.compare(testtext1, testtext1s));
    /*$("#content").append(widget.compare(testtext2, testtext2s));
    $("#content").append(widget.compare(testtext3, testtext3s));*/
});