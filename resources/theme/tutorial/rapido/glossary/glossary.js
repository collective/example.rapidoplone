require(['jquery'], function($) {
    if($('.template-edit').length > 0) {
        return
    }
    // $.getJSON('/tutorial/@@rapido/glossary/records', function(data) {
    $.getJSON('../@@rapido/glossary/records', function(data) {
        var keys = [];
        var values = {};
        for(var i=0; i<data.length; i++) {
            term = data[i].items.term;
            definition = data[i].items.definition;
            keys.push(term);
            values[term] = definition;
        }
        var re = RegExp("(\\W)(" + keys.join("|") + ")(\\W)", "g");
        function replaceNodeText() {
         if (this.nodeType === 3) {
                var parent = $(this).parent();
                var html = parent.html();
                if(html) {
                    var newvalue = html.replace(re, function(){
                        var term = arguments[2],
                            before = arguments[1],
                            after = arguments[3];
                        term = '<abbr title="'+values[term]+'">'+term+'</abbr>';
                        return before + term + after;
                    });
                    parent.html(newvalue);
                }
         } else {
             $(this).contents().each(replaceNodeText);
         }
        }
        $("#content-core").contents().each(replaceNodeText);
    });
});