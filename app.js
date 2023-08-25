// Load the Visualization API and the corechart package.
google.charts.load('current', { 'packages': ['corechart'] });

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

const loanAmount = document.querySelector("#loanAmount");
const interestRate = document.querySelector("#interestRate");
const loanTenure = document.querySelector("#loanTenure");

let la = parseFloat(loanAmount.value);
let ir = parseFloat(interestRate.value);
let lt = parseFloat(loanTenure.value);

console.log(la, ir, lt);
const emiDisp = document.querySelector(".emi h3");
const inter = document.querySelector(".interest h3");
const pay = document.querySelector(".payment h3")

const laRange = document.querySelector("#laRange");
const irRange = document.querySelector("#irRange");
const ltRange = document.querySelector("#ltRange");

laRange.addEventListener("input", e => {
    loanAmount.value = e.target.value;
});

loanAmount.addEventListener('input', function (e) {
    laRange.value = e.target.value;
});
interestRate.addEventListener('input', function (e) {
    irRange.value = e.target.value;
});
irRange.addEventListener("input", e => {
    interestRate.value = e.target.value;
});
ltRange.addEventListener("input", e => {
    loanTenure.value = e.target.value;
});
loanTenure.addEventListener('input', function (e) {
    ltRange.value = e.target.value;
});


const form = document.querySelector('form');


const calculateEmi = () => {
    let r = (ir / 12 / 100);
    let emi = la * r * ((Math.pow((1 + r), (lt * 12))) / (Math.pow((1 + r), (lt * 12)) - 1));
    return emi;
}

const dispEmi = (emi) => {
    emiDisp.innerText = Math.round(emi);
    let totalAmount = Math.round(lt * 12 * emi);
    pay.innerText = totalAmount;
    let totalInterestPayable = Math.round(totalAmount - la);
    inter.innerText = totalInterestPayable;
}

const refreshValues = () => {
    la = parseFloat(loanAmount.value);
    ir = parseFloat(interestRate.value);
    lt = parseFloat(loanTenure.value);


}
function drawChart(emi, total) {
    let totalInterest = Math.round(lt * 12 * emi);
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
        ["Principal amount", total],
        ["Total Interest", totalInterest - la],
    ]);

    // Set chart options
    var options = {
        'title': 'Break-up of Total Payment',
        'width': 400,
        'height': 400
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

// const init=()=>{
//     let em=calculateEmi();
//     dispEmi(em);
//     drawChart(em,la);
// }

// init();


form.addEventListener("click", () => {
    refreshValues();
    let em = calculateEmi();
    dispEmi(em);
    drawChart(em, la);
});