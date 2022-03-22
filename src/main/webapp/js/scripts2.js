// ---------------------------
// Event Handlers for Buttons
// ---------------------------
document.getElementById("getAllClaims").addEventListener("click", Button1);
document.getElementById("approvalByAgeBtn").addEventListener("click", Button2);
document.getElementById("agentsAndApprovalsBtn").addEventListener("click", Button3);


function Button1(){ window.location.href = "http://localhost:8080/Button1.html";}
function Button2(){ window.location.href = "http://localhost:8080/Button2.html";}
function Button3(){ window.location.href = "http://localhost:8080/Button3.html";}

if(window.location.href == "http://localhost:8080/Button1.html"){
window.onload = getAllClaims;
}
if(window.location.href == "http://localhost:8080/Button2.html"){
window.onload = getClaimsByCountry;
}
if(window.location.href == "http://localhost:8080/Button3.html"){
window.onload = getClaimsByReason;
}


// ---------------------------
// Get all claims first button
// ---------------------------
function getAllClaims() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let response = JSON.parse(xhr.responseText);

            document.getElementById("numClaimsDiv").innerHTML = `<b>Total # Claims:</b> ${response.length}`;
            document.getElementById("leftChart").innerHTML = "Claims per Month";
            document.getElementById("rightChart").innerHTML = "Average Claims filed by Hour";

            let x = document.getElementById("claimsTable");
            x.remove();

            let table = document.createElement("table");
            table.setAttribute("id", "claimsTable");
            table.setAttribute("class", "table table-striped table-bordered table-sort sortable");

            let thead = document.createElement("thead");
            thead.setAttribute("id", "thead");
            let tbody = document.createElement("tbody");
            tbody.setAttribute("id", "tbody");
            table.appendChild(thead);
            table.appendChild(tbody);

            document.getElementById("claimsDiv").appendChild(table);

            // Create table header array
            let header = [
                "Claim ID",
                "Insurance Type",
                "Claim Amount",
                "Date/Time",
                "Customer Name",
                "Customer Age",
                "Agent Name",
                "Agent Rating",
                "Country",
                "View"
            ];

            // Create table header row
            let headerRow = document.createElement("tr");
            header.forEach(function (header) {
                let th = document.createElement("th");
                th.setAttribute("style", "cursor: pointer");
                th.innerHTML = header;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);

            // claimArray to hold all the claims
            let claimArray = [];
            for (let i = 0; i < response.length; i++) {
                let claim = response[i];
                claimArray.push(claim);
            }

            // push all the claims into the table
            for (let i = 0; i < claimArray.length; i++) {
                let claim = claimArray[i];
                let row = document.createElement("tr");
                let claimId = document.createElement("td");
                let reason = document.createElement("td");
                let amount = document.createElement("td");
                let datetime = document.createElement("td");
                let customerName = document.createElement("td");
                let customerAge = document.createElement("td");
                let agentName = document.createElement("td");
                let agentRating = document.createElement("td");
                let country = document.createElement("td");
                let view = document.createElement("td");

                claimId.innerHTML = claim.claimId;
                reason.innerHTML = claim.reason;
                amount.innerHTML = `$${claim.amount}`;
                datetime.innerHTML = claim.datetime;
                customerName.innerHTML = claim.customerName;
                customerAge.innerHTML = claim.customerAge;
                agentName.innerHTML = claim.agentName;
                agentRating.innerHTML = claim.agentRating;
                country.innerHTML = claim.country;
                view.innerHTML = `<button id="viewButtons" type="button" class="btn btn-secondary" onclick="viewClaim(${claim.claimId})">View</button>`;

                row.appendChild(claimId);
                row.appendChild(reason);
                row.appendChild(amount);
                row.appendChild(datetime);
                row.appendChild(customerName);
                row.appendChild(customerAge);
                row.appendChild(agentName);
                row.appendChild(agentRating);
                row.appendChild(country);
                row.appendChild(view);

                document.getElementById("tbody").appendChild(row);
            }
            sorttable.makeSortable(table);
        }
    }
    xhr.open("GET", "http://localhost:8080/claims", true);
    xhr.send();
    getMonthChartData();
    getClaimsByTime();
}

// ---------------------------
// View Claim Button Alert
// ---------------------------
var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

function viewClaim(id) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let response = JSON.parse(xhr.responseText);

            document.getElementById("modalHeader").innerHTML = `Claim ID: ${response.claimId}`;
            document.getElementById("customerIdP").innerHTML = `Customer ID: ${response.customerId}`;
            document.getElementById("customerNameP").innerHTML = `Customer Name: ${response.customerName}`;
            document.getElementById("customerAgeP").innerHTML = `Customer Age: ${response.customerAge}`;
            document.getElementById("insuranceTypeP").innerHTML = `Insurance Reason: ${response.reason}`;
            document.getElementById("agentIdP").innerHTML = `Agent ID: ${response.agentId}`;
            document.getElementById("agentNameP").innerHTML = `Agent Name: ${response.agentName}`;
            document.getElementById("agentRatingP").innerHTML = `Agent Rating: ${response.agentRating}/10`;
            document.getElementById("countryP").innerHTML = `Country: ${response.country}`;
            document.getElementById("datetimeP").innerHTML = `Date/Time: ${response.datetime}`;
            document.getElementById("claimAmountP").innerHTML = `Claim Amount: $${response.amount}`;
            document.getElementById("approvalP").innerHTML = `Approval: ${(response.approval == "Y") ? "Approved" : "Denied"}`;
        }
    };
    xhr.open("GET", `http://localhost:8080/claims/${id}`, true);
    xhr.send();

  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// ---------------------------
// Bar Chart for Claim Months
// ---------------------------

function getMonthChartData() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let response = JSON.parse(xhr.responseText);


                var labels = response.map(function(e) {
                   return e.months;
                });
                var mom = response.map(function(e) {
                   return e.claim_count;
                });;



            let ctx = document.getElementById('barChart').getContext('2d');

            let myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Claims per Month',
                        data: mom,
                        backgroundColor: 'rgba(0, 40, 255, 0.59)',
                        borderColor: 'rgba(0, 40, 255, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }
    xhr.open("GET", "http://localhost:8080/monthdata", true);
    xhr.send();
}


// ---------------------------
// Bar Chart for Common times for claims to get filed
// ---------------------------

function getClaimsByTime() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let response = JSON.parse(xhr.responseText);


                var labels = response.map(function(e) {
                   return e.hour;
                });
                var mom = response.map(function(e) {
                   return e.claims;
                });;



            let ctx = document.getElementById('pieChart').getContext('2d');

            let myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Average Claims filed by Hour',
                        data: mom,
                        backgroundColor: 'rgba(0, 40, 255, 0.59)',
                        borderColor: 'rgba(0, 40, 255, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }
    xhr.open("GET", "http://localhost:8080/comtime", true);
    xhr.send();
}


// ---------------------------
// Get Country Data 2nd Button
// ---------------------------
function getClaimsByCountry() {

    let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let response = JSON.parse(xhr.responseText);

                document.getElementById("numClaimsDiv").innerHTML = `<b>Total # Claims:</b> ${response.length}`;
                document.getElementById("leftChart").innerHTML = "Average Rating of Claims Agent By Age Group";
                document.getElementById("rightChart").innerHTML = "Average Claim Amount By Age Group";

                let x = document.getElementById("claimsTable");
                x.remove();

                let table = document.createElement("table");
                table.setAttribute("id", "claimsTable");
                table.setAttribute("class", "table table-striped table-bordered table-sort sortable");

                let thead = document.createElement("thead");
                thead.setAttribute("id", "thead");
                let tbody = document.createElement("tbody");
                tbody.setAttribute("id", "tbody");
                table.appendChild(thead);
                table.appendChild(tbody);

                document.getElementById("claimsDiv").appendChild(table);

                // Create table header array
                let header = [
                    "Claim ID",
                    "Insurance Type",
                    "Claim Amount",
                    "Date/Time",
                    "Customer Name",
                    "Customer Age",
                    "Agent Name",
                    "Agent Rating",
                    "Country",
                    "View"
                ];

                // Create table header row
                let headerRow = document.createElement("tr");
                header.forEach(function (header) {
                    let th = document.createElement("th");
                    th.setAttribute("style", "cursor: pointer");
                    th.innerHTML = header;
                    headerRow.appendChild(th);
                });
                thead.appendChild(headerRow);

                // claimArray to hold all the claims
                let claimArray = [];
                for (let i = 0; i < response.length; i++) {
                    let claim = response[i];
                    claimArray.push(claim);
                }

                // push all the claims into the table
                for (let i = 0; i < claimArray.length; i++) {
                    let claim = claimArray[i];
                    let row = document.createElement("tr");
                    let claimId = document.createElement("td");
                    let reason = document.createElement("td");
                    let amount = document.createElement("td");
                    let datetime = document.createElement("td");
                    let customerName = document.createElement("td");
                    let customerAge = document.createElement("td");
                    let agentName = document.createElement("td");
                    let agentRating = document.createElement("td");
                    let country = document.createElement("td");
                    let view = document.createElement("td");

                    claimId.innerHTML = claim.claimId;
                    reason.innerHTML = claim.reason;
                    amount.innerHTML = `$${claim.amount}`;
                    datetime.innerHTML = claim.datetime;
                    customerName.innerHTML = claim.customerName;
                    customerAge.innerHTML = claim.customerAge;
                    agentName.innerHTML = claim.agentName;
                    agentRating.innerHTML = claim.agentRating;
                    country.innerHTML = claim.country;
                    view.innerHTML = `<button id="viewButtons" type="button" class="btn btn-secondary" onclick="viewClaim(${claim.claimId})">View</button>`;

                    row.appendChild(claimId);
                    row.appendChild(reason);
                    row.appendChild(amount);
                    row.appendChild(datetime);
                    row.appendChild(customerName);
                    row.appendChild(customerAge);
                    row.appendChild(agentName);
                    row.appendChild(agentRating);
                    row.appendChild(country);
                    row.appendChild(view);

                    document.getElementById("tbody").appendChild(row);
                }
                sorttable.makeSortable(table);
            }
        }

    xhr.open("GET", "http://localhost:8080/claims", true);
    xhr.send();
    getRatingChart();
    getClaimAgeChart();

}

// ---------------------------
// Pie Chart for Average Agent Rating by Age
// ---------------------------

function getRatingChart() {



            let ctx = document.getElementById('barChart').getContext('2d');
            let myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ["Junior 18-25", "Middle 26-50","Senior 51+"],
                    datasets: [{
                        label: 'Agent Rating by Age',
                        data: [5.85, 5.34, 5.63],
                        backgroundColor: ['rgba(0, 255, 247, 0.74)', 'rgba(226, 1, 1, 0.73)', 'rgba(166, 0, 255, 0.79)'],
                        borderColor: 'rgba(0, 0, 0, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            display: false,
                            beginAtZero: true
                        }
                    },
                }
            });

 }


// ---------------------------
// Pie Chart for Average Claims by Age
// ---------------------------

function getClaimAgeChart() {

  //$('.pieChart').remove(); // this is my <canvas> element
  //$('.bong').append('<canvas id="pieChart"><canvas>');
  //canvas = document.querySelector('.pieChart'); // why use jQuery?
  //ctx = canvas.getContext('2d');
  //ctx.canvas.width = $('#graph').width(); // resize to parent width
 // ctx.canvas.height = $('#graph').height(); // resize to parent height

         // x=document.getElementById('pieChart');
         // x.removeData();


            let ctx = document.getElementById('pieChart').getContext('2d');
            let myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ["Junior 18-25", "Middle 26-50","Senior 51+"],
                    datasets: [{
                        label: 'Average Claims by Age',
                        data: [27566.71, 27338.88, 26336.38],
                        backgroundColor: ['rgba(0, 182, 0, .75)', 'rgba(255, 226, 39, 1)', 'rgba(102, 62, 29, 1)'],
                        borderColor: 'rgba(0, 0, 0, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            display: false,
                            beginAtZero: true
                        }
                    },
                }
            });

 }

// ---------------------------
// Reason Table 3rd Button
// ---------------------------
function getClaimsByReason() {
    let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let response = JSON.parse(xhr.responseText);

                document.getElementById("numClaimsDiv").innerHTML = `<b>Total # Claims:</b> ${response.length}`;
                document.getElementById("leftChart").innerHTML = "Average Reimbursement Amount per Quarter";
                document.getElementById("rightChart").innerHTML = "Average Amount of Claims filed per Quarter";

                let x = document.getElementById("claimsTable");
                x.remove();

                let table = document.createElement("table");
                table.setAttribute("id", "claimsTable");
                table.setAttribute("class", "table table-striped table-bordered table-sort sortable");

                let thead = document.createElement("thead");
                thead.setAttribute("id", "thead");
                let tbody = document.createElement("tbody");
                tbody.setAttribute("id", "tbody");
                table.appendChild(thead);
                table.appendChild(tbody);

                document.getElementById("claimsDiv").appendChild(table);

                // Create table header array
                let header = [
                    "Claim ID",
                    "Insurance Type",
                    "Claim Amount",
                    "Date/Time",
                    "Customer Name",
                    "Customer Age",
                    "Agent Name",
                    "Agent Rating",
                    "Country",
                    "View"
                ];

                // Create table header row
                let headerRow = document.createElement("tr");
                header.forEach(function (header) {
                    let th = document.createElement("th");
                    th.setAttribute("style", "cursor: pointer");
                    th.innerHTML = header;
                    headerRow.appendChild(th);
                });
                thead.appendChild(headerRow);

                // claimArray to hold all the claims
                let claimArray = [];
                for (let i = 0; i < response.length; i++) {
                    let claim = response[i];
                    claimArray.push(claim);
                }

                // push all the claims into the table
                for (let i = 0; i < claimArray.length; i++) {
                    let claim = claimArray[i];
                    let row = document.createElement("tr");
                    let claimId = document.createElement("td");
                    let reason = document.createElement("td");
                    let amount = document.createElement("td");
                    let datetime = document.createElement("td");
                    let customerName = document.createElement("td");
                    let customerAge = document.createElement("td");
                    let agentName = document.createElement("td");
                    let agentRating = document.createElement("td");
                    let country = document.createElement("td");
                    let view = document.createElement("td");

                    claimId.innerHTML = claim.claimId;
                    reason.innerHTML = claim.reason;
                    amount.innerHTML = `$${claim.amount}`;
                    datetime.innerHTML = claim.datetime;
                    customerName.innerHTML = claim.customerName;
                    customerAge.innerHTML = claim.customerAge;
                    agentName.innerHTML = claim.agentName;
                    agentRating.innerHTML = claim.agentRating;
                    country.innerHTML = claim.country;
                    view.innerHTML = `<button id="viewButtons" type="button" class="btn btn-secondary" onclick="viewClaim(${claim.claimId})">View</button>`;

                    row.appendChild(claimId);
                    row.appendChild(reason);
                    row.appendChild(amount);
                    row.appendChild(datetime);
                    row.appendChild(customerName);
                    row.appendChild(customerAge);
                    row.appendChild(agentName);
                    row.appendChild(agentRating);
                    row.appendChild(country);
                    row.appendChild(view);

                    document.getElementById("tbody").appendChild(row);
                }
                sorttable.makeSortable(table);
            }
        }

    xhr.open("GET", "http://localhost:8080/claims", true);
    xhr.send();
    getQuarterHighest();
    getQuarterFrequent()
}


   // ---------------------------
   // Bar Chart for Quarter Reimbursement
   // ---------------------------

   function getQuarterHighest() {

               let ctx = document.getElementById('barChart').getContext('2d');

               let myChart = new Chart(ctx, {
                   type: 'bar',
                   data: {
                       labels: ["Q1","Q2","Q3","Q4"],
                       datasets: [{
                           label: 'Reimbursement Amount per Quarter',
                           data: [35080.18,36367.44, 33369, 36532.67],
                           backgroundColor: 'rgba(0, 40, 255, 0.59)',
                           borderColor: 'rgba(0, 40, 255, 1)',
                           borderWidth: 1
                       }]
                   },
                   options: {
                       scales: {
                           y: {
                               beginAtZero: true
                           }
                       }
                   }
               });
   }


// ---------------------------
   // Bar Chart for Quarter Claim Amount
   // ---------------------------

function getQuarterFrequent() {

            let ctx = document.getElementById('pieChart').getContext('2d');
            let myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Q1","Q2","Q3","Q4"],
                    datasets: [{
                        label: 'Amount of Claims per Quarter',
                        data: [84.25, 109, 116.33, 98.33],
                        backgroundColor: 'rgba(0, 40, 255, 0.59)',
                        borderColor: 'rgba(0, 40, 255, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        y: {
                            display: true,
                            beginAtZero: true
                        }
                    },
                }
            });

 }






