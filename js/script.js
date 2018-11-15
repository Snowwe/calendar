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
    const tableMonth = document.getElementById('month');

    let today = new Date();
    let currYear = today.getFullYear();
    let currMonth = today.getMonth();
    let weekStart = new Date(currYear, currMonth, 1).getDay();
    // let currDayInMonth = today.daysInMonth;
    let currDayInMonth = 33 - new Date(currYear, currMonth, 33).getDate();
    let prevDayInMonth = 33 - new Date(currYear, currMonth - 1, 33).getDate();
    console.log(currDayInMonth);

    createOptionTwin(years, months, dateSel);
    createMonth();

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
                }
            }
        }
    }

    function changeMonth(index) {
        goToMonth(dateOption.selectedIndex + index);
        createMonth();
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

    function createMonth() {
        let prevDays = prevDayInMonth - weekStart + 2;
        let dayMonth = 1;
        let weekStartTemp = weekStart;
        let week = 0;
        let monday=0;
        let header = tableMonth.createTHead();
        let row;
        row = header.insertRow(week++);
        for (let day in daysWeek) {
            if (+day !== (weekStartTemp - 1)) {
                let cell = row.insertCell(day);
                cell.innerHTML = daysWeek[day] + ', ' + (prevDays++);
            } else {
                let cell = row.insertCell(day);
                cell.innerHTML = daysWeek[day] + ', ' + (dayMonth++);
                ++weekStartTemp;
            }
        }
        row = header.insertRow(week++);
        for (let i = 0, len = currDayInMonth; i < len; ++i) {
            if (monday===7) {
                row = header.insertRow(week++);
                monday=0;
                continue;
            }
            let cell = row.insertCell(monday++);
            cell.innerHTML = (dayMonth++);
            ++weekStartTemp;
        }
        for (let i=monday;i<7;++i){
            dayMonth=1;
            if(monday!==7){
                let cell = row.insertCell(monday++);
                cell.innerHTML = (dayMonth++);
            }
        }

    }
};
