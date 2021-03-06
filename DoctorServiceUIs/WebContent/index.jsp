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
<body style="background-color: #f2f2f2">
<header>
	<nav class="navbar fixed-top" style="background-color: #8088ff">
	
	</nav>
</header>
	<div class="container" >
		<div class="row" style="background-color: #fcfcfc">
			<div class="col-md-4" >

				<h1 id="heading">Add Doctor</h1>

				<form id="formDoctor" name="formDoctor">
				
					Full name:<input id="dName" name="dName" type="text"
						class="form-control form-control-sm"> <br>
						
					Specialization: <input id="dSpecialization" name="dSpecialization" type="text"
						class="form-control form-control-sm"> <br>
				
					Address (permanent): <input id="dAddress" name="dAddress" type="text"
						class="form-control form-control-sm"> <br>	
				
					Email: <input id="dEmail" name="dEmail" type="email"
						class="form-control form-control-sm"> <br>
				
					Charge: <input id="dFee" name="dFee" type="number"
						class="form-control form-control-sm"> <br>
					
					Working Hospital (gov): <input id="dWHospital" name="dWHospital" type="text"
						class="form-control form-control-sm"> <br>
		
					 <br> <input id="btnSave" name="btnSave" type="button"
						value="Save" class="btn btn-primary"> <input type="hidden"
						id="hidDoctorIDSave" name="hidDoctorIDSave" value="">
				</form>
				<hr>
				<div id="alertSuccess" class="alert alert-success"></div>
				<div id="alertError" class="alert alert-danger"></div>
				<br>
			</div>
			</div>
			<br>
			<br>
			
			<div class="row" style="background-color: #fcfcfc">
			<div class="col-md-8">

				<div class="container">
					<h2>Doctors Table</h2>
					<p>Available Doctors In The System</p>
					<div id="table">
				
					</div>
				</div>
			</div>
		</div>
	</div>
</body>



</html>