// JavaScript Document
var shiftId = 0;
var popData = "";
var empDtlData = "";
var userName = "super";
var password = "password";
var server = "192.168.1.121:4800";
var warehouseId = "PC";
var empIndirect = "";
var empVariance = "";
var lastLocTxt = "";
var empNameTxt = "28004 - Ramirez, Maria";

function empListClick(){
	console.log("I clicked a button");
	console.log("This will take you to: file:///C:/Users/Zuiss_Edward/Desktop/POPPro%20Redesign/POPProAllShiftEmps.html");
}

function getShiftData() {
	shiftId = document.getElementById("shiftList");
	var shift = shiftId.options[shiftId.selectedIndex].value;
	var countNbr = popData.shifts[shift].userPerformances.length;
	var empIndCount = document.createTextNode("View all " + countNbr + "...");
	var empVarCount = document.createTextNode("View all " + countNbr + "...");
	var empIndCountBttn = document.createElement("button");
	var empVarCountBttn	= document.createElement("button");
	
	var viewAllIndEmp = document.getElementById("shiftAllIndEmp");
	var viewAllIndDiv = document.createElement("div");
	var viewAllVarEmp = document.getElementById("shiftAllVarEmp");
	var viewAllVarDiv = document.createElement("div");
	
	var shiftIndirect = document.createElement("div");
	var shiftVariance = document.createElement("div");
	
	var indMtrcNbr = popData.shifts[shift].totalPerformance.indirect;
	var indMtrcTxt = document.createTextNode("\u00A0 " + indMtrcNbr + "% \u00A0");
	var shiftIndLbl = document.createTextNode("Indirect");
	var shiftInd = document.createElement("div");
	var shiftIndDiv = document.createElement("div");
	var shiftIndMtrcHead = document.getElementById("indirectMtrcHead");
	
	var varMtrcNbr = popData.shifts[shift].totalPerformance.performance;
	var varMtrcTxt = document.createTextNode("\u00A0" + varMtrcNbr + "\u00A0");
	var shiftVarLbl = document.createTextNode("Variance");
	var shiftVar = document.createElement("div");
	var shiftVarDiv = document.createElement("div");
	var shiftVarMtrcHead = document.getElementById("varianceMtrcHead");
	
	var oldShiftIndDiv = document.getElementById("indDiv");
	var oldShiftIndirect = document.getElementById("indirect");
	var oldViewAllInd = document.getElementById("shiftAllIndBttn");
	var oldShiftVarDiv = document.getElementById("varDiv");
	var oldShiftVariance = document.getElementById("variance");
	var oldViewAllVar = document.getElementById("shiftAllVarBttn");
	
	var badVarCount = 0;
	var badIndCount = 0;
	
	var indEmpSorted = [];
	var varEmpSorted = [];

	var excessInd = document.createElement("div");
	var subparVar = document.createElement("div");
	var excessHead = document.getElementById("excessIndHead");
	var subparHead = document.getElementById("subparVarHead");
	var oldSubparVar = document.getElementById("subparVar");
	var oldExcessInd = document.getElementById("excessInd");
		
	try {
		oldShiftIndDiv.remove();
		oldShiftIndirect.remove();
		oldShiftVarDiv.remove();
		oldShiftVariance.remove();
		oldViewAllInd.remove();
		oldViewAllVar.remove();
		oldSubparVar.remove();
		oldExcessInd.remove();
	}
	catch(err) {
		console.log("nothing to remove");
	}
	finally {
		shiftInd.className = "metric-bad"
		if (indMtrcNbr <= 20) {shiftInd.className = "metric-good"};
		shiftInd.append(indMtrcTxt);
		shiftIndDiv.append(shiftInd);
		shiftIndDiv.id = "indDiv";
		shiftIndirect.append(shiftIndLbl);
		shiftIndirect.id = "indirect";
		//console.log(shiftIndDiv);
		//console.log(shiftIndirect);
		shiftIndMtrcHead.append(shiftIndDiv);
		shiftIndMtrcHead.append(shiftIndirect);
		
		empIndCountBttn.className = "view-all-link";
		empIndCountBttn.id = "shiftAllIndBttn"
		empIndCountBttn.append(empIndCount);
		viewAllIndEmp.append(empIndCountBttn);
	
		shiftVar.className = "metric-bad"
		if (varMtrcNbr >= 0) {shiftVar.className = "metric-good"};
		shiftVar.append(varMtrcTxt);
		shiftVarDiv.append(shiftVar);
		shiftVarDiv.id = "varDiv";
		shiftVariance.append(shiftVarLbl);
		shiftVariance.id = "variance";
		//console.log(shiftVarDiv);
		//console.log(shiftVariance);
		shiftVarMtrcHead.append(shiftVarDiv);
		shiftVarMtrcHead.append(shiftVariance);
		
		empVarCountBttn.className = "view-all-link";
		empVarCountBttn.id = "shiftAllVarBttn"
		empVarCountBttn.append(empVarCount);
		viewAllVarEmp.append(empVarCountBttn);
			
		for (i = 0; i < popData.shifts[shift].userPerformances.length; i++) { 
			if (popData.shifts[shift].userPerformances[i].performance < 0) {badVarCount += 1};
			if (popData.shifts[shift].userPerformances[i].indirect > 20) {badIndCount += 1};
		}
		
		var excessText = document.createTextNode(badIndCount + " Excessive");
		var subparText = document.createTextNode(badVarCount + " Sub-Par");
		
		excessInd.append(excessText);
		excessInd.id = "excessInd"
		excessInd.className = "shift-metric-summary";
		excessHead.append(excessInd);
		subparVar.append(subparText);
		subparVar.id = "subparVar"
		subparVar.className = "shift-metric-summary"	
		subparHead.append(subparVar);
		
	}
	
	for (i = 0; i < popData.shifts[shift].userPerformances.length; i++) {
		indEmpSorted.push(popData.shifts[shift].userPerformances[i])
	}
	for (i = 0; i < popData.shifts[shift].userPerformances.length; i++) {
		varEmpSorted.push(popData.shifts[shift].userPerformances[i])
	}
	
	for (i=0; i < indEmpSorted.length; i++) {
		indEmpSorted.sort(function(a,b){return b.indirect - a.indirect})		
	}
	console.log(indEmpSorted);
	
	for (i=0; i < varEmpSorted.length; i++) {
		varEmpSorted.sort(function(a,b){return a.performance - b.performance})		
	}
	console.log(varEmpSorted);
	
	//Populate Employee Indirect Time
	for (i = 0; i < Math.min(10, indEmpSorted.length); i++) { 
		var empIndBttn = document.createElement("button");
		var empName = document.createElement("div");
		var empStatLbl = document.createElement("div");
		var empStatNbr = document.createElement("span");
		var box = document.getElementById("boxInd");
		var nameTxt = document.createTextNode(indEmpSorted[i].name);
		var perfNbr = indEmpSorted[i].indirect;
		var statNbr = document.createTextNode(perfNbr + "%");
		var statLbl = document.createTextNode("Indirect");
		var old = document.getElementById("employeeInd" + i);
		
		try {
			old.remove();
		}
		catch(err) {
			console.log("old is null");
		}
		finally {		
		empStatNbr.className = "metric-bad"
		if (perfNbr <= 20) {empStatNbr.className = "metric-good"}				
		empStatNbr.append(statNbr);
	
		empStatLbl.className = "emp-stats"
		empStatLbl.append(empStatNbr);
		empStatLbl.append(statLbl);
	
		empName.className = "emp-name"
		empName.append(nameTxt);
	
		empIndBttn.className = "emp-button"
		empIndBttn.append(empName);
		empIndBttn.append(empStatLbl);
		empIndBttn.id = "employeeInd" + i;
		
		box.append(empIndBttn);
		}
	}
	
	//Populate Employee Variance
	for (i = 0; i < Math.min(10, varEmpSorted.length); i++) { 
		var empVarBttn = document.createElement("button");
		var empName = document.createElement("div");
		var empStatLbl = document.createElement("div");
		var empStatNbr = document.createElement("span");
		var box = document.getElementById("boxVar");
		var nameTxt = document.createTextNode(varEmpSorted[i].name);
		var perfNbr = varEmpSorted[i].performance;
		var statNbr = document.createTextNode(perfNbr);
		var statLbl = document.createTextNode("Variance");
		var old = document.getElementById("employeeVar" + i);
		
		try {
			old.remove();
		}
		catch(err) {
			console.log("old is null");
		}
		finally {
		empStatNbr.className = "metric-bad"
		if (perfNbr >= 0) {empStatNbr.className = "metric-good"}
		empStatNbr.append(statNbr);
	
		empStatLbl.className = "emp-stats"
		empStatLbl.append(empStatNbr);
		empStatLbl.append(statLbl);
	
		empName.className = "emp-name"
		empName.append(nameTxt);
	
		empVarBttn.className = "emp-button"
		empVarBttn.append(empName);
		empVarBttn.append(empStatLbl);
		empVarBttn.id = "employeeVar" + i;
		
		box.append(empVarBttn);
		}
	}
	//console.log(popData);
	//console.log(badVarCount);
	//console.log(badIndCount);	
};


function getDashData() {
	var userName = "super";
	var password = "password";
	var server = "192.168.1.121:4800";
	var postBody = "{\"server\":\"" + server +"\",\"userName\":\"" + userName + "\",\"password\":\"" + password + "\"}";
	var endPoint = "http://dscpopproprod:8080/poppro/dashboard";
	//var endPoint = "http://192.168.43.135:8080/test";
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', endPoint, true);
	xhr.setRequestHeader('content-type', 'application/json');
	xhr.responseType = "text";
	xhr.send(postBody);
	xhr.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
			popData = JSON.parse(this.responseText);
			
			//Identify Logistics Center
			document.getElementById("lc").innerHTML = "Logistics Center: " + popData.warehouseId;
			
			//Populate Shift List drop-down (select) options
			for (i = 0; i < popData.shifts.length; i++) { 
				var shiftName = document.createElement("option");
				shiftName.text = popData.shifts[i].name;
				shiftName.value = i;
				var select = document.getElementById("shiftList");
				select.append(shiftName);
			}
			getShiftData();
		}
	};
};

//////Employee Detail JavaScript

function empDetailLoad() {
	var employeeName = document.getElementById("employeeName");
	var indirectHead = document.getElementById("indirectMtrcHead");
	var empIndTxt = empIndirect + "%";
	var varianceHead = document.getElementById("varianceMtrcHead"); 
	var empVarTxt = empVariance;
	
	document.getElementById("lc").innerHTML = "Logistics Center: " + warehouseId;
	employeeName.append(empNameTxt);
	
	indirectHead.append(empIndTxt);
	indirectHead.className = "metric-bad";
	if (empIndirect <= 20) {indirectHead.className = "metric-good"};
	
	varianceHead.append(empVarTxt);
	varianceHead.className = "metric-bad";
	if (empIndirect >= 0) {varianceHead.className = "metric-good"};
	
	
	
	getDetailData();
}

function formatTime(dateTime){
 	var time = new Date(dateTime);
  	var hour = time.getHours();
  	var minute = time.getMinutes();
  	var second = time.getSeconds();
  	var temp = '' + ((hour > 12) ? hour - 12 : hour);
  	if (hour == 0)
    	temp = '12';
  	temp += ((minute < 10) ? ':0' : ':') + minute;
  	temp += ((second < 10) ? ':0' : ':') + second;
  	temp += (hour >= 12) ? ' PM' : ' AM';
  	return temp;
}

function getDetailData() {
	var postBody = "{\"server\":\"" + server +"\",\"userName\":\"" + userName + "\",\"password\":\"" + password + "\",\"employeeName\":\"" + empNameTxt + "\",\"warehouseId\":\"" + warehouseId + "\"}";
	var endPoint = "http://dscpopproprod:8080/poppro/employeeProfile";
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', endPoint, true);
	xhr.setRequestHeader('content-type', 'application/json');
	xhr.responseType = "text";
	xhr.send(postBody);
	xhr.onreadystatechange = function() {
   		if (this.readyState == 4 && this.status == 200) {
			empDtlData = JSON.parse(this.responseText);
			console.log(empDtlData);
					
			lastLocTxt = "Last Location:" + "\u00A0" + empDtlData.lastLocation;
			var lastLocation = document.getElementById("lastLocation");
			lastLocation.append(lastLocTxt);
			
			for (i = 0; i < empDtlData.activities.length; i++) {
				var detailSection = document.getElementById("employee-detail");
				var detailRow = document.createElement("div");
				
				var divJobCodWrkCatGroup = document.createElement("div");
				divJobCodWrkCatGroup.className = "jobcod-wrkcat-group";
				
				var jobCode = document.createElement("div");
				var jobCodeTxt = document.createTextNode(empDtlData.activities[i].jobCode);
				jobCode.append(jobCodeTxt);
				jobCode.className = "emp-data-column job-code-margin";
				
				var category = document.createElement("div");
				var categoryTxt = document.createTextNode(empDtlData.activities[i].category);
				category.append(categoryTxt);
				category.className = "emp-data-column wrk-cat-margin";
				
				divJobCodWrkCatGroup.append(jobCode);
				divJobCodWrkCatGroup.append(category);
				
				var divStartStopGroup = document.createElement("div");
				divStartStopGroup.className = "start-stop-group";
				
				var startTime = document.createElement("div");
				var startTimeTxt = formatTime(empDtlData.activities[i].startTime);
				//var startTimeTxt = document.createTextNode(formatTime(empDtlData.activities[i].startTime));
				startTime.append(startTimeTxt);
				startTime.className = "emp-data-column task-start-margin";
				
				var stopTime = document.createElement("div");
				var stopTimeTxt = formatTime(empDtlData.activities[i].stopTime);
				//var stopTimeTxt = document.createTextNode(empDtlData.activities[i].stopTime);
				stopTime.append(stopTimeTxt);
				stopTime.className = "emp-data-column task-end-margin";
				
				divStartStopGroup.append(startTime);
				divStartStopGroup.append(stopTime);
				
				var divActualGoalGroup = document.createElement("div");
				divActualGoalGroup.className = "actual-goal-group";
				
				var actual = document.createElement("div");
				var actualTxt = document.createTextNode(empDtlData.activities[i].actual);
				actual.append(actualTxt);
				actual.className = "emp-data-column actual-margin";
				
				var goal = document.createElement("div");
				var goalTxt = document.createTextNode(empDtlData.activities[i].goal);
				goal.append(goalTxt);
				goal.className = "emp-data-column goal-margin";
				
				divActualGoalGroup.append(actual);
				divActualGoalGroup.append(goal);
				
				var performance = document.createElement("div");
				var performanceTxt = document.createTextNode(empDtlData.activities[i].performance);
				performance.append(performanceTxt);
				performance.className = "emp-data-column var-margin";
				
				detailRow.className = "emp-detail-section";
				detailRow.append(divJobCodWrkCatGroup);
				detailRow.append(divStartStopGroup);
				detailRow.append(divActualGoalGroup);
				detailRow.append(performance);
				
				detailSection.append(detailRow);
			
				console.log(detailRow);
			}
			
		
			
		}
	}	
}

////////Shift Employee List JavaScript

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


