'use strict'

// Constructor for each object location
function Location(location, minCust, maxCust, avgCookie, hours, sales, daily){
    this.location = location;
    this.minCust = minCust;
    this.maxCust = maxCust;
    this.avgCookie = avgCookie;
    this.hours = hours;
    this.sales = sales;
    this.daily = daily;
    // Methods created in constructor to run through all objects 

    this.ranCust = function () {
        return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
    };
    this.salesPerHour = function () {
        for (let i = 0; i < this.hours.length; i ++) {
            this.sales.push(Math.floor(this.ranCust() * this.avgCookie)); 
        }
    };
    this.totalSales = function () {
        let dailySales = 0;
        for (let i = 0; i < this.sales.length; i ++){
            dailySales += this.sales[i];
        }
        this.daily = dailySales;
    };
    // Calling methods in all objects 
    this.ranCust();
    this.salesPerHour();
    this.totalSales();
}

// Array for store hours
let hoursArr = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
let allTotals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,];
// Array(hoursArr.length).fill(0); 

// Creating new location objects using constructor 
let seattle = new Location ('Seattle', 23, 65, 6.3, hoursArr, [], 0);
console.log(seattle);

let tokyo = new Location ('Tokyo', 3, 24, 1.2, hoursArr, [], 0);
console.log(tokyo);

let dubai = new Location ('Dubai', 11, 38, 3.7, hoursArr, [], 0);
console.log(dubai);

let paris = new Location ('Paris', 20, 38, 2.3, hoursArr, [], 0);
console.log(paris);

let lima = new Location ('Lima', 2, 16, 4.6, hoursArr, [], 0);
console.log(lima);

// Store array 
let storeLocations = [seattle, tokyo, dubai, paris, lima];

let table = document.getElementById('data'); 

// Create headers for table using hours array 
function renderHeaders() {
    let row = document.createElement('tr');
    let head = document.createElement('th');

    head.innerText = '';
    row.appendChild(head);

    for (let i = 0; i < hoursArr.length; i++) {
      head = document.createElement('th');
      head.innerText = hoursArr[i];
      row.appendChild(head);
    };
    head = document.createElement('th');
    head.innerText = 'Total';

    row.appendChild(head);
    table.appendChild(row);
  }

renderHeaders();

// Create location and data cells
Location.prototype.render = function () {
    let row = document.createElement('tr');
    let cell = document.createElement('td');
    cell.innerText = this.location;
    row.appendChild(cell);

    for (let i = 0; i < hoursArr.length; i ++){
        cell = document.createElement('td');
        cell.innerText = this.sales[i];
        row.appendChild(cell);
    }

    cell = document.createElement('td');
    cell.innerText = this.daily;
    row.appendChild(cell);
    table.appendChild(row);
}

 seattle.render();
 tokyo.render();
 dubai.render();
 paris.render();
 lima.render();

function renderFooter() {
    let row = document.createElement('tr');
    let cell = document.createElement('td');
    cell.innerText = ('Totals');
    row.appendChild(cell);
    table.appendChild(row);

    for (let i = 0; i < allTotals.length; i++){
        cell = document.createElement('td');
        cell.innerText = allTotals[i];
        row.appendChild(cell);
    }
    table.appendChild(row);
}

calcTotalSales();
renderFooter();

// Help from Manuch!
function calcTotalSales(i) {
    let hourlyTotal = 0;
    let dailyTotal = 0;


    for (let i = 0; i < storeLocations.length; i++){
        for (let j = 0; j < hoursArr.length; j++){
            hourlyTotal += storeLocations[i].sales[j];
            allTotals[j] += storeLocations[i].sales[j];
        }

        dailyTotal += storeLocations[i].daily;
    }
    allTotals.push(dailyTotal);
}

console.log(allTotals);