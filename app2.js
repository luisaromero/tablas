let today = new Date();
console.log(today);
let currentMonth = today.getMonth();

let currentYear = today.getFullYear();
console.log(currentYear, currentMonth);

let months = ["jan", "febr", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dic"];

let monthAndYear = document.getElementById("monthAndYear");





function showCalendar(month, year) {
    console.log(year + " " + month)

    let firstDay = new Date(year, month).getDay();
    console.log(firstDay);
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    console.log(daysInMonth);



    let tbl = document.getElementById("calendar-body");
    tbl.innerHTML = "";
    monthAndYear.innerHTML = months[month] + " " + year;
    console.log(months[month] + " " + year)

    let date = 1;

    for (let i = 0; i < 6; i++) {
        let row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {

            if (i === 0 && j < firstDay) {
                console.log(firstDay)

                let cell = document.createElement('td');
                let cellText = document.createTextNode(date);
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth) {
                break;
            } else {
                let cell = document.createElement('td');
                let cellText = document.createTextNode(date);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }

            date++
        }


        tbl.appendChild(row);


    }



}


showCalendar(currentMonth, currentYear);