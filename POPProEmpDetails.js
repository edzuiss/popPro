// JavaScript Document
var shiftId = 0;
var empDtlData = "";
var userName = "super";
var password = "password";
var server = "192.168.1.121:4800";
var warehouseId = "PC";
var empIndirect = "";
var empVariance = "";
var lastLocTxt = "";
var empNameTxt = "28004 - Ramirez, Maria";



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

