$(document).ready(function() {
	if ($("#alertSuccess").text().trim() == "") {
		$("#alertSuccess").hide();
	}
	$("#alertError").hide();
	refresh();

});

$(document).on("click","#btnSave",function(event) {
	
					// Clear alerts---------------------
					$("#alertSuccess").text("");
					$("#alertSuccess").hide();
					$("#alertError").text("");
					$("#alertError").hide();
					// Form validation-------------------
					var status = validateItemForm();
					if (status != true) {
						$("#alertError").text(status);
						$("#alertError").show();
						return;
					}

					var formObj = $("#formDoctor")
					var doctor = {}
					
					doctor["dName"] = formObj.find("#dName").val().trim()
					doctor["dSpecialization"] = formObj.find("#dSpecialization").val().trim()
					doctor["dAddress"] = formObj.find("#dAddress").val().trim()
					doctor["dEmail"] = formObj.find("#dEmail").val().trim()
					doctor["dFee"] = formObj.find("#dFee").val().trim()
					doctor["dWHospital"] = formObj.find("#dWHospital").val().trim()
					

					var type = ($("#hidItemIDSave").val() == "") ? "POST": "PUT";
					serviceUrl = "http://localhost:8080/DoctorService/DoctorService/Doctors/"
					if (type == "PUT") {
						serviceUrl = "http://localhost:8080/DoctorService/DoctorService/Doctors/"
							doctor["ID"] = $("#hidItemIDSave").val()
					}
					
					$.ajax({
						url : serviceUrl,
						type : type,
						data : JSON.stringify(doctor),
						contentType : "application/json",
						beforeSend : function(xhr) {
							xhr.setRequestHeader("Authorization", "Basic "
									+ btoa("admin" + ":" + "admin"));
						},
						complete : function(response, status) {
							onItemSaveComplete(response.responseText,status);
						}
					});
				});




$(document).on("click",".btnUpdate",function(event) {
	
					$("#heading").text("Update Doctor");
					$("#hidItemIDSave").val($(this).closest("tr").find('#hidItemIDUpdate').val());
					$("#dName").val($(this).closest("tr").find('td:eq(0)').text());
					$("#dSpecialization").val($(this).closest("tr").find('td:eq(1)').text());
					$("#dAddress").val($(this).closest("tr").find('td:eq(2)').text());
					$("#dEmail").val($(this).closest("tr").find('td:eq(3)').text());
					$("#dFee").val($(this).closest("tr").find('td:eq(4)').text());
					$("#dWHospital").val($(this).closest("tr").find('td:eq(5)').text());
					
				});




$(document).on("click",".btnRemove",function(event) {
			
					var r = confirm("Do you want to delete this record");
					if (r == true) {
						
						serviceUrl = "http://localhost:8080/DoctorService/DoctorService/Doctors/"
							
							
						$.ajax({
							url : serviceUrl,
							type : "DELETE",
							data : "{ID: " + $(this).data("itemid") +"}",
							contentType : "application/json",
							beforeSend : function(xhr) {
								xhr.setRequestHeader("Authorization", "Basic "
										+ btoa("admin" + ":" + "admin"));
							},
							complete : function(response, status) {
								onItemDeleteComplete(response.responseText,status);
							}

						});
					}
				});


function validateItemForm() {
	
	if ($("#dName").val().trim() == "") {
		return "Insert Name of Doctor.";
	}
	
	if ($("#dEmail").val().trim() == "") {
		return "Insert email Address.";
	}
	
	var statusemail = validateEmail();	
	if( statusemail != true ){
		return "Invalid Email Address"
	}
	
	
	if ($("#dAddress").val().trim() == "") {
		return "Insert Address.";
	}
	
	
	if ($("#dSpecialization").val().trim() == "") {
		return "Insert Special Section of Doctor.";
	}
	
	
	if ($("#dWHospital").val().trim() == "") {
		return "Insert Current Working Hospital.";
	}
	

	if ($("#dFee").val().trim() == "") {
		return "Insert Doctor Charge.";
	}
	
	var Charge = $("#dFee").val().trim();
	if (!$.isNumeric(Charge)) {
		return "Doctor Charge should be numeric.";
	}

	
	$("#dFee").val(parseFloat(Charge).toFixed(2)); 
	 
	return true;

}

function validateEmail() {
    var emailID = document.formDoctor.dEmail.value;
    atpos = emailID.indexOf("@");
    dotpos = emailID.lastIndexOf(".");
    
    if (atpos < 1 || ( dotpos - atpos < 2 )) {
       document.formDoctor.dEmail.focus() ;
       return false;
    }
    return( true );
 }

function onItemSaveComplete(response, status) {
	
	if (status == "success") {
		
		var resultSet = JSON.parse(response);

		if (resultSet.status.trim() == "success") {
			
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
			
		} else if (resultSet.status.trim() == "error") {
			
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}

	} 
	else if (status == "error") {
		
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	
	}
	else {
		
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}

	$("#hidItemIDSave").val("");
	$("#formDoctor")[0].reset();
	
	refresh();
} 


function onItemDeleteComplete(response, status) {
	
	if (status == "success") {
	
		var resultSet = JSON.parse(response);
		
		if (resultSet.status.trim() == "success") {
		
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#table").html(resultSet.data);
		
		} else if (resultSet.status.trim() == "error") {
			
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} 
	else if (status == "error") {
		
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	
	}
	else {
		
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
	
	refresh()
}



function refresh() {

	serviceUrl = "http://localhost:8080/DoctorService/DoctorService/Doctors/"
	$.ajax({
		dataType : 'html',
		url : serviceUrl,
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Authorization", "Basic "
					+ btoa("admin" + ":" + "admin"));
		},
		success : function(data) {
			
			$("#table").html(data);
			
		}
	});

}
