function calculateInterest() {
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);

    if (isNaN(principal) || isNaN(rate) || !startDate || !endDate) {
        alert("ଦୟାକରି ସମସ୍ତ ତଥ୍ୟ ଭଲଭାବରେ ଭରଣ କରନ୍ତୁ।");
        return;
    }

    if (startDate > endDate) {
        alert("ଆରମ୍ଭ ତାରିଖ, ସେଷ ତାରିଖରୁ ଶେଷ ହେବ ନାହିଁ।");
        return;
    }

    // Calculate the time difference in days
    const timeDifference = Math.abs(endDate - startDate);
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    // Calculate the difference in years, months, and days
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    let days = endDate.getDate() - startDate.getDate();

    if (days < 0) {
        months -= 1;
        days += new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years -= 1;
        months += 12; 
    }

    const dateDifferenceText = `${years} ବର୍ଷ  ${months} ମାସ ${days} ଦିନ`;

    // Convert rate from paisa to rupees
    const rateInRupees = rate / 100;

    // Step 1: Calculate interest for 1 month
    const interestPerMonth = principal * rateInRupees;

    // Step 2: Calculate total interest for the given years, months, and days
    const totalMonths = (years * 12) + months + (days / 30); // Convert everything to months
    const totalInterest = interestPerMonth * totalMonths;

    // Step 3: Calculate the total amount
    const totalAmount = principal + totalInterest;

    const principalText = formatCurrency(principal.toFixed(2));
    const totalInterestText = formatCurrency(totalInterest.toFixed(2))

    const allText = `ମୂଳ ଧନ: ${principalText} | ସରଳ ସୁଧ: ${totalInterestText} | ଦିନ: ${daysDifference}`;


    // Display the results
    
    document.getElementById('displayDateDifference').innerText = dateDifferenceText;
    document.getElementById('displayAllText').innerText = allText;


    //document.getElementById('displayYears').innerText = years;
    //document.getElementById('displayMonths').innerText = months;
    //document.getElementById('displayDays').innerText = days;
    document.getElementById('displayTotal').innerText = formatCurrency(totalAmount.toFixed(2));
}

function resetFields() {
    // Clear all input fields
    document.getElementById('principal').value = '';
    document.getElementById('rate').value = '';
    document.getElementById('years').value = '';
    document.getElementById('months').value = '';
    document.getElementById('days').value = '';
    
    // Clear all result fields
    document.getElementById('displayPrincipal').innerText = '0 ଟଙ୍କା';
    document.getElementById('displayInterest').innerText = '0 ଟଙ୍କା';
    document.getElementById('displayYearlyInterest').innerText = '0 ଟଙ୍କା';
    document.getElementById('displayMonthlyInterest').innerText = '0 ଟଙ୍କା';
    document.getElementById('displayDailyInterest').innerText = '0 ଟଙ୍କା';
    document.getElementById('displayTotal').innerText = '0 ଟଙ୍କା';
}

function formatCurrency(amount) {
    // Convert amount to a string
    let [integerPart, decimalPart] = amount.toString().split('.');

    // Format the integer part with Indian number system
    const lastThree = integerPart.slice(-3);
    const otherNumbers = integerPart.slice(0, -3);
    if (otherNumbers !== '') {
        integerPart = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
    } else {
        integerPart = lastThree;
    }

    // Combine integer and decimal parts
    return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
}