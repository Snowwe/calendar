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
    let eventDay = document.getElementById('event-day');
    let closeBtn = document.getElementById('close-btn');
    let okBtn = document.getElementById('ok-btn');
    let deleteBtn = document.getElementById('delete-btn');
    let today = new Date();
    let currYear = today.getFullYear();
    let currMonth = today.getMonth();
    const todayDay = today.getDate();
    const todayMonth = currMonth;
    let currMonthIndex = 0;

    createOptionTwin(years, months, dateSel);
    createMonth(currYear, currMonth);

    const dateOptions = document.querySelectorAll('#date-sel option');
    let dateOption = document.getElementById('date-sel');

    prev.addEventListener('click', function (e) {
        e.preventDefault();
        changeMonth(-1);
    }, true);
    next.addEventListener('click', function (e) {
        e.preventDefault();
        changeMonth(1);
    }, true);

    prevY.addEventListener('click', function (e) {
        e.preventDefault();
        changeMonth(-12);
    }, true);

    nextY.addEventListener('click', function (e) {
        e.preventDefault();
        changeMonth(12);
    }, true);

    addEventBtn.addEventListener('click', function (e) {
        e.preventDefault();
        displayOnEvent();
    }, true);

    updEventBtn.addEventListener('click', function (e) {
        e.preventDefault();
        displayOnEvent();
    }, true);

    searchBtn.addEventListener('click', function (e) {
        e.preventDefault();
        search();
    }, true);

    todayBtn.addEventListener('click', function (e) {
        e.preventDefault();
        setCurrMonth();
    }, true);

    dateSel.addEventListener('change', function (e) {
        e.preventDefault();
        dateSel[dateOption.selectedIndex].selected = 'selected';
    }, true);

    todayBtn.addEventListener('click', function (e) {
        e.preventDefault();
        setCurrMonth();
    }, true);

    let GLOB = null;
    tableMonth.addEventListener("click", function (e) {
        e.preventDefault();
        if (e.target.nodeName === "TD" && GLOB !== e.target) {
            e.target.style.background = '#edf9bd';
            e.target.style.outline = '2px solid #92f39b';
            e.target.style.outlineOffset = '-1px';
        }
        if (GLOB && GLOB !== e.target) {
            GLOB.style.background = '';
            GLOB.style.outline = '';
            GLOB.style.outlineOffset = '';
        }
        GLOB = e.target;
    });

    closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        this.parentNode.style.display = 'none';
    }, true);

    okBtn.addEventListener('click', function (e) {
        e.preventDefault();
        createEvent();
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

    function displayOnEvent() {
        eventDay.style.display = 'block';
    }

    function search() {

    }

    function createEvent() {
        let eventName = document.getElementsByClassName('event-name')[0].value;
        let eventDate = document.getElementsByClassName('event-date')[0].value;
        eventDate = eventDate.split('-');
        let eventDay = eventDate[2];
        let eventMonth = eventDate[1] - 1;
        let eventYear = eventDate[0];
        let eventMember = document.getElementsByClassName('event-member')[0].value;
        let eventText = document.getElementsByClassName('event-text')[0].value;
        if (eventDate[0]) {
            let index = eventMonth - currMonth + 12 * (eventYear - currYear);
            changeMonth(index);
        }

        console.log(eventDate, eventDay, eventMonth, eventYear);

    }

    function setCurrMonth() {
        dateOption.selectedIndex = currMonthIndex;
        changeMonth(0);
    }

    function createMonth(currYear, currMonth) {
        let weekStart = new Date(currYear, currMonth, 1).getDay();
        let currDayInMonth = 33 - new Date(currYear, currMonth, 33).getDate();
        let prevDayInMonthStart;
        prevDayInMonthStart = (currMonth === 11) ?
            33 - new Date(currYear - 1, currMonth - 1, 33).getDate() - weekStart + 2
            : 33 - new Date(currYear, currMonth - 1, 33).getDate() - weekStart + 2;

        tableMonth.innerHTML = '';
        let dayMonth = 1;
        let week = 0;
        let monday = 7;
        let table = document.createElement('table');
        let header = table.createTHead();
        let row = header.insertRow(0);
        let cell;

        //add day prev month
        for (let day in daysWeek) {
            if (+day !== (weekStart - 1)) {
                cell = row.insertCell(+day);
                cell.innerHTML = daysWeek[day] + ', ' + (prevDayInMonthStart++);
            } else { //create current month - headDay+dayWeek
                cell = row.insertCell(+day);
                cell.innerHTML = daysWeek[day] + ', ' + (dayMonth++);
                ++weekStart;
                if (todayDay === dayMonth && todayMonth === currMonth) {
                    cell.style.background = '#F4F4F4';
                }
            }
        }
        //create current month - day
        let bodyTable = table.createTBody();
        for (let i = dayMonth, len = currDayInMonth; i <= len; ++i) {
            if (monday === 7) {
                row = bodyTable.insertRow(week++);
                monday = 0;
            }
            let cell = row.insertCell(monday++);
            if (todayDay === dayMonth && todayMonth === currMonth) {
                cell.style.background = '#F4F4F4';
            }
            cell.innerHTML = (dayMonth++);
        }
        //add day next month
        if (monday < 7) {
            dayMonth = 1;
            for (let i = monday; i < 7; ++i) {
                cell = row.insertCell(monday++);
                cell.innerHTML = (dayMonth++);
            }
        }
        tableMonth.appendChild(table);
    }
};
