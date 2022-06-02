var kyc_data;

var clipboard = new ClipboardJS('button[id^=btn]');

$("#success-alert").hide();

clipboard.on('success', function (e) {
  $('#overlay').modal('show');
  setTimeout(function() {
      $('#overlay').modal('hide');
  }, 1000);
});


/* 
      clipboard.on('success', function (e) {
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);
      });

      clipboard.on('error', function (e) {
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);
      }); */



$("#kyc_url").on('click',(function(){

  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;                                                                                                                              
  const xhttp = new XMLHttpRequest();
  
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4) {
      if(!$.trim(this.responseText)){
      }
      else{
        kyc_data = JSON.parse(this.responseText);
        table_data(kyc_data);    
        }
      }
    }
  

  xhttp.open("GET","kyc_url",false);
  xhttp.setRequestHeader("X-CSRFToken",csrftoken);
  xhttp.send();
  
  
})());

function table_data(kyc_dt){
  var i = Object.keys(kyc_dt).length;
        var j;
        var table = document.getElementById('mytab1');
        $("#mytab1 tr").remove();
        for(j=0;j<i;j++){
          var row = table.insertRow(-1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          cell1.innerHTML = "<input class='form-check-input' type='checkbox' name='del_url'  value='"+kyc_dt[j.toString()]['fields']['url']+"'>";
          cell2.innerHTML = "<div class='input-group mb-3'>"+
          "<input class='form-control' id='foo"+j+"' type='text' value='"+kyc_dt[j.toString()]['fields']['url']+
          "'readonly><button name='copy' class='btn btn-outline-primary btn-clipboard' data-toggle='tooltip'"+
          "data-placement='bottom' id='btn"+j+"' data-clipboard-target='#foo"+j+"' title='Copy link'>Copy</button></div>";
          cell3.innerHTML = ((kyc_dt[j.toString()]['fields']['is_active']).toString()).toUpperCase();
          if((kyc_dt[j.toString()]['fields']['is_active'])==false){
            var bt = document.getElementById("btn"+j);
            bt.disabled = true;
            bt.setAttribute("class","btn btn-outline-secondary");
            document.getElementById("foo"+j).disabled = true;
            
          
          }
        }
}

/* $("button[name='copy']").on('click',function(){
  var url = this.value;
  alert(url);
}) */

$("#gen_kyc_url").on('click',function(){

  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;                                                                                                                              
  const xhttp = new XMLHttpRequest();
  
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4) {
      if(!$.trim(this.responseText)){
      }
      else{
        kyc_data = JSON.parse(this.responseText);
        table_data(kyc_data);
        $('#generated').modal('show');
        setTimeout(function() {
          $('#generated').modal('hide');
        }, 1000);
      }
    }
  }
  xhttp.open("GET","gen_kyc_url",false);
  xhttp.setRequestHeader("X-CSRFToken",csrftoken);
  xhttp.send();

});

