window.onload = function () {

    let dateSel = document.getElementById('date-sel');
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let years = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const prevY = document.getElementById('prevY');
    const nextY = document.getElementById('nextY');

    createOptionTwin(years, months, dateSel);

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
            }
        }
    }

    function changeMonth(index) {
        goToMonth(dateOption.selectedIndex + index);
    }

    function goToMonth(n) {
        dateOption.selectedIndex = (n + dateOptions.length) % dateOptions.length;
        dateSel[dateOption.selectedIndex].selected = 'selected';
    }

};
