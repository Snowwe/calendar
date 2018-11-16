window.onload = function () {

    let dateSel = document.getElementById('date-sel');
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const daysWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    let years = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const prevY = document.getElementById('prevY');
    const nextY = document.getElementById('nextY');
    const addEventBtn = document.getElementById('add-event-btn');
    const updEventBtn = document.getElementById('upd-event-btn');
    const searchBtn = document.getElementById('search-btn');
    const todayBtn = document.getElementById('today-btn');
    const tableMonth = document.getElementById('month');
    let today = new Date();
    let currYear = today.getFullYear();
    let currMonth = today.getMonth();
    let currMonthIndex = 0;

    createOptionTwin(years, months, dateSel);
    createMonth(currYear, currMonth);

    const dateOptions = document.querySelectorAll('#date-sel option');
    let dateOption = document.getElementById('date-sel');

    prev.addEventListener('click', function (e) {
        e.preventDefault();
        changeMonth(-1);
    });
    next.addEventListener('click', function (e) {
        e.preventDefault();
        changeMonth(1);
    });
    prevY.addEventListener('click', function (e) {
        e.preventDefault();
        changeMonth(-12);
    });
    nextY.addEventListener('click', function (e) {
        e.preventDefault();
        changeMonth(12);
    });

    addEventBtn.addEventListener('click', function (e) {
        e.preventDefault();
        addEvent();
    });
    updEventBtn.addEventListener('click', function (e) {
        e.preventDefault();
        updEvent();
    });
    searchBtn.addEventListener('click', function (e) {
        e.preventDefault();
        search();
    });
    todayBtn.addEventListener('click', function (e) {
        e.preventDefault();
        setCurrMonth();
    });
    dateSel.addEventListener('change', function (e) {
        e.preventDefault();
        dateSel[dateOption.selectedIndex].selected = 'selected';
    });

    function createOptionTwin(arrY, arrM, select) {
        let value = 0;
        for (let i = 0, len = arrY.length; i < len; ++i) {
            for (let j = 0, len = arrM.length; j < len; ++j) {
                const option = document.createElement("option");
                option.text = arrM[j] + ' ' + arrY[i];
                option.value = value++;
                select.add(option);
                if (currMonth === j && currYear === arrY[i]) {
                    option.selected = 'selected';
                    currMonthIndex = option.value;
                }
            }
        }
    }

    function changeMonth(index) {
        goToMonth(dateOption.selectedIndex + index);
        let currOpt = dateOption.options[dateOption.selectedIndex].text.split(' ');
        currYear = currOpt[1];

        for (let monthInd in months) {
            if (months[monthInd] === currOpt[0]) {
                currMonth = monthInd;
                break;
            }
        }

        createMonth(+currYear, +currMonth);
    }

    function goToMonth(n) {
        dateOption.selectedIndex = (n + dateOptions.length) % dateOptions.length;
        dateSel[dateOption.selectedIndex].selected = 'selected';
    }

    function addEvent() {

    }

    function updEvent() {

    }

    function search() {

    }

    function setCurrMonth() {
        dateOption.selectedIndex = currMonthIndex;
        changeMonth(0);
    }

    function createMonth(currYear, currMonth) {
        let weekStart = new Date(currYear, currMonth, 1).getDay();
        let currDayInMonth = 33 - new Date(currYear, currMonth, 33).getDate();

        let prevDayInMonthStart;
        if (currMonth === 11) {
            prevDayInMonthStart = 33 - new Date(currYear - 1, currMonth - 1, 33).getDate() - weekStart + 2;
        } else {
            prevDayInMonthStart = 33 - new Date(currYear, currMonth - 1, 33).getDate() - weekStart + 2;
        }
        tableMonth.innerHTML = '';
        let dayMonth = 1;
        let week = 0;
        let monday = 7;
        let header = tableMonth.createTHead();
        let row = header.insertRow(0);

        //add day prev month
        for (let day in daysWeek) {
            if (+day !== (weekStart - 1)) {
                let cell = row.insertCell(day);
                cell.innerHTML = daysWeek[day] + ', ' + (prevDayInMonthStart++);
            } else { //create current month - headDay+dayWeek
                let cell = row.insertCell(day);
                cell.innerHTML = daysWeek[day] + ', ' + (dayMonth++);
                ++weekStart;
            }
        }
        //create current month - day
        let bodyTable = tableMonth.createTBody();
        for (let i = dayMonth, len = currDayInMonth; i <= len; ++i) {
            if (monday === 7) {
                row = bodyTable.insertRow(week++);
                monday = 0;
            }
            let cell = row.insertCell(monday++);
            cell.innerHTML = (dayMonth++);
        }

        //add day next month
        if (monday < 7) {
            dayMonth = 1;
            for (let i = monday; i < 7; ++i) {
                let cell = row.insertCell(monday++);
                cell.innerHTML = (dayMonth++);

            }
        }
    }
};
