var data;

$("#client_data").on('click',(function(){

  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;                                                                                                                              
  const xhttp = new XMLHttpRequest();
  
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4) {
      if(!$.trim(this.responseText)){
      }
      else{
        data = JSON.parse(this.responseText);
        show_client_data(data);
       
        
      }
    }
  }

  xhttp.open("GET","client_data",false);
  xhttp.setRequestHeader("X-CSRFToken",csrftoken);
  xhttp.send();
 
  
  
}));


function show_client_data(dt){
  var i = Object.keys(dt).length;
  var j;
  var data1 =[];
  var columns1= {'cid':'Client Id', 'name':'Client Name','mob':'Mobile No','email':'Email'};
  for(j=0;j<i;j++){
    data1.push({'cid': dt[j.toString()]['pk'],
    'name': "<button type='button' class='btn btn-link' name='g' id='"+j+"' data-bs-toggle='modal' title='Click to view details' data-bs-target='#myModal'>"+ dt[j.toString()]['fields']['name']+"</button>",
    'mob': dt[j.toString()]['fields']['contact_no'],
    'email' : dt[j.toString()]['fields']['email_ad']});
  } 

  var table1 = $('.table-sortable1').tableSortable({
    data: data1,
    columns: columns1,
    rowsPerPage: 5,
    pagination: true,
    searchField: $('#searchField1'),
    responsive: [
      {
          maxWidth: 768,
          minWidth: 0,
          columns: ['name'],
          pagination: true,
          paginationLength: 3
      },
    ]
  });

  table1.getData();

  table1.setData(data1, columns1);

  $("button[name=g]").on("click",function(){
    var id = $(this).attr('id');
    var keys = Object.keys(dt[id.toString()]['fields']);
    var val = Object.values(dt[id.toString()]['fields']);
    var p,v,txt="";
    var arr = ['permanent_address','communication_address','kyc_check','experience','goals','objective'];
    for(p=0,v=0;p<keys.length,v<val.length;p++,v++){
      if($.trim(val[v])!=''){ 
        if(arr.includes(keys[p])==true){
          txt += "<div class='row'><div class='col-sm'><lable class='fw-bold'>"+ keys[p].toUpperCase()+"</lable><br><textarea class='form-control fw-bold' value='' readonly>"+ val[v]+"</textarea></div></div><br>";
        }
        else{
          txt += "<div class='row'><div class='col-sm'><lable class='fw-bold'>"+ keys[p].toUpperCase()+"</lable><br><input type='text' class='form-control fw-bold' value='"+ val[v]+"' readonly></div></div><br>" ;
        }
      }
    }
    document.getElementById("det").innerHTML = txt;
  });
   
}


  

