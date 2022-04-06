var dt;

$(window).on('load',function(){
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;                                                                                                                              
  const xhttp = new XMLHttpRequest();
  
  xhttp.onreadystatechange = function() {
    if(!$.trim(this.responseText)){
    }
    else{
      dt = JSON.parse(this.responseText);
      var i = Object.keys(dt).length;
      var j;
      var table = document.getElementById('mytab');
      for(j=0;j<i;j++){
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = dt[j.toString()]['pk'];
        cell2.innerHTML = "<button type='button' class='btn btn-link' name='g' id='"+j+"' data-bs-toggle='modal' data-bs-target='#myModal'>"+ dt[j.toString()]['fields']['name']+"</button>";
        cell3.innerHTML = dt[j.toString()]['fields']['contact_no'];
        cell4.innerHTML = dt[j.toString()]['fields']['email_ad'];      
      }
      $("button[name=g]").on("click",function(){
        var id = $(this).attr('id');
        var keys = Object.keys(dt[id.toString()]['fields']);
        var val = Object.values(dt[id.toString()]['fields']);
        var p,v,txt="";
        for(p=0,v=0;p<keys.length,v<val.length;p++,v++){
            txt += "<tr><td>"+ keys[p].toUpperCase()+"</td><td>" + val[v] +"</td></tr>";
        }
        document.getElementById("det").innerHTML = txt;
      });
    }
  }

  xhttp.open("GET","client_data",false);
  xhttp.setRequestHeader("X-CSRFToken",csrftoken);
  xhttp.send();
  
  
});





  

