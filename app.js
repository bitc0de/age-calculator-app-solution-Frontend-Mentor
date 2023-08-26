document.addEventListener("DOMContentLoaded", function() {
    const click = document.querySelector("#button");

    function calculateTimeElapsed(day, month, year) {
        const startDate = new Date(year, month - 1, day);
        const currentDate = new Date();
    
        let elapsedYears = currentDate.getFullYear() - startDate.getFullYear();
        let elapsedMonths = currentDate.getMonth() - startDate.getMonth();
        let elapsedDays = currentDate.getDate() - startDate.getDate();
    
        if (elapsedDays < 0) {
            elapsedMonths--;
            elapsedDays += new Date(startDate.getFullYear(), startDate.getMonth(), 0).getDate();
        }
    
        if (elapsedMonths < 0) {
            elapsedYears--;
            elapsedMonths += 12;
        }
    
        return {
            years: elapsedYears,
            months: elapsedMonths,
            days: elapsedDays
        };
    }

    click.addEventListener("click", function() {
        const day = document.querySelector("#dayInput").value;
        const month = document.querySelector("#monthInput").value;
        const year = document.querySelector("#yearInput").value;

        const monthCheck = month + 1;

        const date = new Date(year, month, day);

        function sendAlert(idLabel, idInput, idAlert, message) {
            document.querySelector(idLabel).style.color = "red";
            document.querySelector(idInput).style.borderColor = "red";
            document.querySelector(idAlert).textContent = message;
        }

        if (day === "") {
            sendAlert("#dayLabel", "#dayInput", "#dayAlert", "This field is required")
            return;
        } else if (month === "") {
            sendAlert("#monthLabel", "#monthInput", "#monthAlert", "This field is required")
            return;
        } else if (year === "") {
            sendAlert("#yearLabel", "#yearInput", "#yearAlert", "This field is required")
            return;
        } else if (day <= 0 || day > 31) {
            sendAlert("#dayLabel", "#dayInput", "#dayAlert", "Must be a valid day")
            return;
        } else if (month <= 0 || month > 12) {
            sendAlert("#monthLabel", "#monthInput", "#monthAlert", "Must be a valid month")
            return;
        } else if (year <= 0) {
            sendAlert("#yearLabel", "#yearInput", "#yearAlert", "Must be a valid year")
            return;
        } else if (date > new Date()) {
            sendAlert("#dayLabel", "#dayInput", "#dayAlert", "Please enter a date in the past")
            return;
        } else if ((monthCheck === 4 || monthCheck === 6 || monthCheck === 9 || monthCheck === 11) && day === 31) {
            sendAlert("#dayLabel", "#dayInput", "#dayAlert", "Must be a valid date")
            return;
        } else {
            const result = calculateTimeElapsed(day, month, year);
            document.querySelector("#resultDay").textContent = result.days
            document.querySelector("#resultMonth").textContent = result.months
            document.querySelector("#resultYear").textContent = result.years
        }
    });
});