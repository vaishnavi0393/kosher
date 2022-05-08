$("#sub").click (function(){
    const urlParams = new URLSearchParams(location.search); 
    var uiid = urlParams.get('id');
    alert(uiid);

    const xhttp = new XMLHttpRequest();
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    xhttp.onload = function() {
        alert(this.responseText);
      }
    xhttp.open("POST","test1");
    xhttp.setRequestHeader("X-CSRFToken",csrftoken);
    xhttp.setRequestHeader("Content-type","application/json");
    xhttp.send(JSON.stringify({'id':"jhshd"}));
});

