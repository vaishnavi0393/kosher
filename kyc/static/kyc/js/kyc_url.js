

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



const data_g=[];


function table_data(kyc_dt){
  var i = Object.keys(kyc_dt).length;
        var j;
        var data = [];
        
        var columns = {
          url: "URL",
          used_by:"Used By"
        };
        
        for(j=0;j<i;j++){
          if((kyc_dt[j.toString()]['fields']['is_active'])==false){
            data.push({ url: "<div class='input-group mb-3'>"+
            "<input class='form-control' size='10' id='foo"+j+"' type='text' value='"+kyc_dt[j.toString()]['fields']['url']+
            "'disabled><button name='copy' class='btn btn-outline-secondary btn-clipboard' data-toggle='tooltip'"+
            "data-placement='bottom' data-clipboard-target='#foo"+j+"' title='Copy link' disabled>Copy</button></div>",
            used_by : kyc_dt[j.toString()]['fields']['used_by'] });
          }
          else {
            data.push({ url : "<div class='input-group mb-3'>"+
            "<input class='form-control' size='10' id='foo"+j+"' type='text' value='"+kyc_dt[j.toString()]['fields']['url']+
            "'readonly><button name='copy' class='btn btn-outline-dark btn-clipboard' data-toggle='tooltip'"+
            "data-placement='bottom' data-clipboard-target='#foo"+j+"' title='Copy link'>Copy</button></div>",
            used_by : kyc_dt[j.toString()]['fields']['used_by'] });
          }
         
        }
        
        var table = $('.table-sortable').tableSortable({
          data: data,
          columns: columns,
          rowsPerPage: 5,
          pagination: true,
          searchField: $('#searchField'),
        });

        

        table.getData();

        table.setData(data, columns);
        console.log(data);
        
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





