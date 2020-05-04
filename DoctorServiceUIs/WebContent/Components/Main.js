$(document).ready(function() {
	if ($("#alertSuccess").text().trim() == "") {
		$("#alertSuccess").hide();
	}
	$("#alertError").hide();
	refresh();

});
// SAVE ============================================
$(document)
		.on(
				"click",
				"#btnSave",
				function(event) {
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
					doctor["fname"] = formObj.find("#fName").val()
							.trim()
					doctor["speciality"] = formObj.find("#speciality").val().trim()
					doctor["email"] = formObj.find("#email").val()
							.trim()
					doctor["adline"] = formObj.find("#address").val()
							.trim()
					doctor["charge"] = formObj.find("#charge").val().trim()
					doctor["workinghospital"] = formObj.find("#workingHospital").val()
							.trim()
					doctor["username"] = formObj.find("#username").val().trim()
					doctor["password"] = formObj.find("#password").val().trim()
					
					

					var type = ($("#hidItemIDSave").val() == "") ? "POST"
							: "PUT";
					serviceUrl = "http://localhost:8080/DoctorService/DoctorService/Doctors/"
					if (type == "PUT") {
						serviceUrl = "http://localhost:8080/DoctorService/DoctorService/Doctors/"
								+ $("#hidItemIDSave").val().trim()
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
							onItemSaveComplete(response.responseText, status);
						}
					});
				});
// UPDATE==========================================
$(document)
		.on(
				"click",
				".btnUpdate",
				function(event) {
					$("#heading").text("Update Doctor")
					$("#hidItemIDSave").val(
							$(this).closest("tr").find('#hidItemIDUpdate')
									.val());
					$("#fName").val(
							$(this).closest("tr").find('td:eq(0)').text());
					$("#speciality").val(
							$(this).closest("tr").find('td:eq(9)').text());
					$("#email").val(
							$(this).closest("tr").find('td:eq(4)').text());
					$("#address").val(
							$(this).closest("tr").find('td:eq(5)').text());
					$("#charge").val(
							$(this).closest("tr").find('td:eq(14)').text());
					$("#workingHospital").val(
							$(this).closest("tr").find('td:eq(10)').text());
					$("#username").val(
							$(this).closest("tr").find('td:eq(15)').text());
					$("#password").val(
							$(this).closest("tr").find('td:eq(16)').text());
	
				
				});

$(document)
		.on(
				"click",
				".btnRemove",
				function(event) {
					var r = confirm("Do you want to delete this record");
					if (r == true) {
						serviceUrl = "http://localhost:8080/DoctorService/DoctorService/Doctors/"
				//				+ $(this).data("id")
						$.ajax({
							url : serviceUrl,
							type : "DELETE",
							data : "{ID : " + $(this).data("id") +"}",
							contentType : "application/json",
							beforeSend : function(xhr) {
								xhr.setRequestHeader("Authorization", "Basic "
										+ btoa("admin" + ":" + "admin"));
							},
							complete : function(response, status) {
								onItemDeleteComplete(response.responseText,
										status);
								console.log(status)
							}

						});
					}
				});

// CLIENTMODEL=========================================================================
function validateItemForm() {
	// Full Name
	if ($("#fName").val().trim() == "") {
		return "Insert Name of Doctor.";
	}
	// Email
	if ($("#email").val().trim() == "") {
		return "Insert email Address.";
	}
	// Address
	if ($("#addressLine1").val().trim() == "") {
		return "Insert Address Line 1.";
	}
	// Speciality-------------------------------
	if ($("#speciality").val().trim() == "") {
		return "Insert Special Section of Doctor.";
	}
	
	// Working Hospital
	if ($("#workingHospital").val().trim() == "") {
		return "Insert Current Working Hospital.";
	}
	
	// Charge-------------------------------
	if ($("#charge").val().trim() == "") {
		return "Insert Doctor Charge.";
	}
	
	// Username
	if ($("#username").val().trim() == "") {
		return "Insert Username for authentication.";
	}
	
	// Password
	if ($("#password").val().trim() == "") {
		return "Insert Password for Authentication.";
	}
	

	return true;
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
	} else if (status == "error") {
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	$("#hidItemIDSave").val("");
	$("#formDoctor")[0].reset();
	$("#heading").text("Create Doctor");
	refresh();

}

function onItemDeleteComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
	refresh()
}

function viewDoctors(data) {
	$("#doctorTable tbody").empty();
	var content = ""
	$
			.each(
					data,
					function(index, obj) {
						content += "<tr><td><input id='hidItemIDUpdate' name='hidItemIDUpdate' type='hidden' value='"
								+ obj["id"] + "'>" + obj["fname"] + "</td>";
						content += "<td>" + obj["email"] + "</td>" +
								"	<td>" + obj["speciality"] + "</td>" +
								"<td>" + obj["workinghospital"] + "</td>" +
								"<td>" + obj["charge"] + "</td>";
								
						content += "<td><input name='btnUpdate' type='button' value='Update' class='btnUpdate btn btn-success'></td>"
								+ "<td><input name='btnRemove' type='button' value='Remove' class='btnRemove btn btn-danger' data-id='"
								+ obj["id"] + "'>" + "</td></tr>";
					});

	$("#doctorTable tbody").append(content);
}

function refresh() {

	serviceUrl = "http://localhost:8080/DoctorService/DoctorService/Doctors/"
	$.ajax({
		dataType : 'json',
		url : serviceUrl,
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Authorization", "Basic "
					+ btoa("admin" + ":" + "admin"));
		},
		success : function(data) {
			viewDoctors(data)
		}
	});

}
