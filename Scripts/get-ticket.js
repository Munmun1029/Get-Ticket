// Function to handle seat selection
function selectSeatByClick(event) {
    const seatElement = event.target;
    const selectedSeats = document.querySelectorAll('.kbd.bg-green-500').length;

    // Check if less than 4 seats are selected or the clicked seat is already selected
    if (selectedSeats < 4 || seatElement.classList.contains('bg-green-500')) {
        // Toggle seat selection
        seatElement.classList.toggle('bg-green-500');
        seatElement.classList.toggle('text-white');

        // Update selected seat count
        updateSeatCounts();

        // Show selected seats in table
        updateSelectedSeatsTable();
    }
}

// selected seat count and available seat count
function updateSeatCounts() {
    const selectedSeats = document.querySelectorAll('.kbd.bg-green-500').length;
    const availableSeats = 40 - selectedSeats; // Assuming there are 40 seats available
    const selectedSeatElement = document.getElementById('selected-seat');
    const availableSeatElement = document.getElementById('seat-left');
    selectedSeatElement.innerText = selectedSeats;
    availableSeatElement.innerText = availableSeats;
}

//  update the selected seats table
function updateSelectedSeatsTable() {
    const selectedSeats = document.querySelectorAll('.kbd.bg-green-500');
    const selectedSeatsTableBody = document.getElementById('selected-seats-table-body');
    selectedSeatsTableBody.innerHTML = ''; // Clear previous entries

    selectedSeats.forEach(seat => {
        const row = document.createElement('tr');

        // Seat number
        const seatNumber = document.createElement('td');
        seatNumber.textContent = seat.textContent;
        row.appendChild(seatNumber);

        // Seat class
        const seatClass = document.createElement('td');
        seatClass.textContent = "ECONOMIC";
        row.appendChild(seatClass);

        // Seat price
        const seatPrice = document.createElement('td');
        seatPrice.textContent = "550 TK";
        row.appendChild(seatPrice);

        selectedSeatsTableBody.appendChild(row);
    });

    calculateTotalPayment();
}

// calculate total payment
function calculateTotalPayment() {
    const selectedSeats = document.querySelectorAll('.kbd.bg-green-500');
    const seatPrice = 550; // Assuming the price per seat is 550 TK
    const totalPaymentElement = document.getElementById('total-payment');

    let totalPayment = selectedSeats.length * seatPrice;
    totalPaymentElement.textContent = totalPayment + ' TK';
}

//calculate total payment after applying coupon
function calculateGrandPayment(couponCode) {
    const selectedSeats = document.querySelectorAll('.kbd.bg-green-500');
    const seatPrice = 550;
    let totalPayment = selectedSeats.length * seatPrice;

    // Apply coupon discounts if applicable
    if (couponCode === 'NEW15') {
        totalPayment *= 0.85;
    } else if (couponCode === 'Couple 20') {
        totalPayment *= 0.80;
    }

    return totalPayment;
}

//coupon apply
function applyCoupon() {
    const couponInput = document.getElementById('coupon-input');
    const couponBox = document.getElementById('coupon-box');
    const couponCode = couponInput.value;

    const grandPayment = calculateGrandPayment(couponCode);

    const grandPaymentElement = document.getElementById('grand-payment');
    grandPaymentElement.textContent = grandPayment + ' TK';

    // Hide the coupon box
    couponBox.style.display = 'none';
}


const seatElements = document.querySelectorAll('.kbd');
seatElements.forEach(seat => {
    seat.addEventListener('click', selectSeatByClick);
});


updateSeatCounts();
updateSelectedSeatsTable();

