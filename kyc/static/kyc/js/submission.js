
$( "#form_submit" ).click(function( event ) {
    const identity_details = {};
    identity_details.name = $("#name").val();
    identity_details.gender=$("input[name=gender]:checked").val();
    identity_details.marital_status=$("input[name=m_status]:checked").val();
    identity_details.dob = $("#b_date").val();
    identity_details.nationality = $("#nationality").val();
    identity_details.status=$("input[name=status]:checked").val();
    identity_details.PAN_number = $("#pan").val();
    identity_details.aadhar_number = $("#last_aadhar").val();

    
    const address_details = {};
    address_details.permanent_address = $("#permanent_address").val();
    address_details.communication_address = $("#communication_address").val();
    address_details.contact_number = $("#mobile").val();
    address_details.email = $("#last_email").val();

    const other_information={};
    other_information.gross_annual_income = $("input[name=income]:checked").val();
    other_information.occupation = $("input[name=occupation]:checked").val();
    other_information.applicable_type = $("input[name=p_status]:checked").val();
    other_information.KYC_check = $("#last_KYC_check").val();
    
    const investment_profile ={};
    investment_profile.investment_experience_in_security = $("#exp_sec").val();
    investment_profile.investment_goals = $("#goals").val();
    investment_profile.risk_tolerance = $("input[name=tolerance]:checked").val();
    investment_profile.investment_objectives = $("#last_objectives").val();

    const obj = {"identity_details": identity_details, "address_details":address_details, "other_information":other_information,"investment_profile":investment_profile};
    const myJSON = JSON.stringify(obj);
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    //console.log(myJSON); 
    
    const xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
        if(this.responseText=="success"){
            alert("Data Submitted");
            location.href = ""; 
        }
        else if(this.responseText=="failed") {
            alert("PAN/Aadhar No/Email addres already exists");
        }
      }
    xhttp.open("POST","kyc_data");
    xhttp.setRequestHeader("X-CSRFToken",csrftoken);
    xhttp.setRequestHeader("Content-type","application/json");
    xhttp.send(myJSON);   
});
