// JavaScript Document
var shiftId = 0;
var popData = "";
var userName = "super";
var password = "password";
var server = "192.168.1.121:4800";

function getEmpData() {
	var postBody = "{\"server\":\"" + server +"\",\"userName\":\"" + userName + "\",\"password\":\"" + password + "\"}";
	var endPoint = "http://dscpopproprod:8080/poppro/dashboard";
	//var endPoint = "http://192.168.43.135:8080/test";
	var xhr = new XMLHttpRequest();
	var empList = document.getElementById("employeeList");
	
	xhr.open('POST', endPoint, true);
	xhr.setRequestHeader('content-type', 'application/json');
	xhr.responseType = "text";
	xhr.send(postBody);
	xhr.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
			popData = JSON.parse(this.responseText);
			console.log(popData);
			
			//Identify Logistics Center
			document.getElementById("lc").innerHTML = "Logistics Center: " + popData.warehouseId;
			
			//Populate Employee List
			for (i = 0; i < popData.shifts[shiftId].userPerformances.length; i++) {
				var empNameTxt = document.createTextNode(popData.shifts[shiftId].userPerformances[i].name);
				var empName = document.createElement("div");
				var empIndTxt = document.createTextNode(popData.shifts[shiftId].userPerformances[i].indirect+"%");
				var empInd = document.createElement("div");
				var empVarTxt = document.createTextNode(popData.shifts[shiftId].userPerformances[i].performance);
				var empVar = document.createElement("div");
				
				var empRow = document.createElement("div");
				
				empName.append(empNameTxt);
				empName.className = "emp-name-col";
				
				empInd.className = "metric-bad emp-ind-col"
				if (popData.shifts[shiftId].userPerformances[i].indirect <= 20) {empInd.className = "metric-good emp-ind-col"}					
				empInd.append(empIndTxt);

				empVar.className = "metric-bad emp-var-col"
				if (popData.shifts[shiftId].userPerformances[i].performance >= 0) {empVar.className = "metric-good emp-var-col"}
				empVar.append(empVarTxt);
				
				empRow.append(empName);
				empRow.append(empInd);
				empRow.append(empVar);
				empRow.className = "emp-row";
				
				empList.append(empRow);
				console.log(empRow);
				
			}
			
		}
	};
}

