$(function(){
    $(".upload").change(function(){
       $("#avator").submit();
    });

    /*$("#uploadIframe").load(function(){
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
*/
    $("#submit").click(function(){
        $.ajax({
            url:"../upload.haj",
            callback:function(a){
                console.log(a)
            },
            error:function(e){
                console.log(e)
            }
        })
    });

    $("#submit2").click(function(){
        var myHeaders = new Headers({
            "Set-Cookie":"12"
        });

var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };
        fetch("../upload.haj",{credentials: 'include'}).then(function(e){
            console.log(e)
            return e.blob();
        }).then(function(myBlob) {
          console.log(myBlob)
        });
    })

     $("#submit3").click(function(){

        fetch("../upload.haj").then(function(e){
            console.log(e)
            return e.blob();
        }).then(function(myBlob) {
          console.log(myBlob)
        });
    })
});