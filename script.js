function calculateInterest() {
    // Get input values and ensure they are valid numbers
    const principal = parseFloat(document.getElementById('principal').value) || 0;
    const rate = parseFloat(document.getElementById('rate').value) || 0; // Assume this is in paisa
    const years = parseFloat(document.getElementById('years').value) || 0;
    const months = parseFloat(document.getElementById('months').value) || 0;
    const days = parseFloat(document.getElementById('days').value) || 0;

    // Check if the principal or rate is missing, then show an alert
    if (principal <= 0 || rate <= 0) {
        alert("ଦୟାକରି ଏକ ମୂଳ ଧନ ଓ ସଠିକ ସୁଧ ହାର (କେତେ ପଇସା) ଦିଅନ୍ତୁ।");
        return;
    }

    // Convert rate from paisa to rupees
    const rateInRupees = rate / 100;

    // Step 1: Calculate interest for 1 month
    const interestPerMonth = principal * rateInRupees;

    // Step 2: Calculate total interest for the given years, months, and days
    const totalMonths = (years * 12) + months + (days / 30); // Convert everything to months
    const totalInterest = interestPerMonth * totalMonths;

    // Step 3: Calculate the total amount
    const totalAmount = principal + totalInterest;

    // Display the results
    document.getElementById('displayPrincipal').innerText = formatCurrency(principal.toFixed(2)) + " ଟଙ୍କା";
    document.getElementById('displayInterest').innerText = formatCurrency(totalInterest.toFixed(2)) + " ଟଙ୍କା";
    document.getElementById('displayYearlyInterest').innerText = formatCurrency((interestPerMonth * 12).toFixed(2)) + " ଟଙ୍କା";
    document.getElementById('displayMonthlyInterest').innerText = formatCurrency(interestPerMonth.toFixed(2)) + " ଟଙ୍କା";
    document.getElementById('displayDailyInterest').innerText = formatCurrency((interestPerMonth / 30).toFixed(2)) + " ଟଙ୍କା";
    document.getElementById('displayTotal').innerText = formatCurrency(totalAmount.toFixed(2)) + " ଟଙ୍କା";
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