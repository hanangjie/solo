$(function(){
    $(".upload").change(function(){
       $("#avator").submit();
    });

    $("#uploadIframe").load(function(){
        var io = document.getElementById("uploadIframe");
        var xml = {};
        if(io.contentWindow)
        {
            xml.responseText = io.contentWindow.document.body?io.contentWindow.document.body.innerHTML:null;
            xml.responseXML = io.contentWindow.document.XMLDocument?io.contentWindow.document.XMLDocument:io.contentWindow.document;

        }else if(io.contentDocument)
        {
            xml.responseText = io.contentDocument.document.body?io.contentDocument.document.body.innerHTML:null;
            xml.responseXML = io.contentDocument.document.XMLDocument?io.contentDocument.document.XMLDocument:io.contentDocument.document;
        }
        var html="<li><img src='"+xml.responseText.slice(xml.responseText.indexOf(">")+1,xml.responseText.indexOf("</"))+"'  onload='imgLoad(this)' /></li>";
        $("#img_list").append(html);
        $("[rel='up_img']").val("");
    });

});