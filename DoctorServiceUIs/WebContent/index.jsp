<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Health Care System</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.3.1.min.js"></script>
<script src="Components/Main.js"></script>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-md-4">

				<h1 id="heading">Insert Doctor</h1>

				<form id="formDoctor" name="formDoctor">
				
					Full name:<input id="fName" name="fName" type="text"
						class="form-control form-control-sm"> <br>
						
					Speciality: <input id="speciality" name="speciality" type="text"
						class="form-control form-control-sm"> <br>
				
					Address (permanent): <input id="address" name="address" type="text"
						class="form-control form-control-sm"> <br>	
				
					Email: <input id="email" name="email" type="email"
						class="form-control form-control-sm"> <br>
				
					Charge: <input id="charge" name="charge" type="number"
						class="form-control form-control-sm"> <br>
					
					Working Hospital (gov): <input id="workingHospital" name="workingHospital" type="text"
						class="form-control form-control-sm"> <br>
						
					Username: <input id="username" name="username" type="text"
						class="form-control form-control-sm"> <br>
					
					Password: <input id="password" name="password" type="password"
						class="form-control form-control-sm"> <br>
					

					</select> <br> <input id="btnSave" name="btnSave" type="button"
						value="Save" class="btn btn-primary"> <input type="hidden"
						id="hidItemIDSave" name="hidItemIDSave" value="">
				</form>
				<div id="alertSuccess" class="alert alert-success"></div>
				<div id="alertError" class="alert alert-danger"></div>
				<br>



			</div>
			<div class="col-md-8">

				<div class="container">
					<h2>Doctors Table</h2>
					<p>Available Doctors In The System</p>
					<table class="table table-striped" id="doctorTable">
						<thead>
							<tr>
								<th>Full Name</th>
								<th>Speciality</th>
								<th>Email</th>
								<th>Address</th>
								<th>Charge</th>
								<th>Working Hospital</th>
								<th>Update</th>
								<th>Remove</th>
							</tr>
						</thead>
						<tbody>
							
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</body>



</html>