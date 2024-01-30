function submitBooking() {
    const fromStation = document.getElementById("fromStation").value;
    const toStation = document.getElementById("toStation").value;
    const travelDate = document.getElementById("travelDate").value;
    const passengerCount = document.getElementById("passengerCount").value;

    // Validate form fields
    if (fromStation && toStation && travelDate && passengerCount) {
        // Display booking summary
        document.getElementById("summaryFromStation").innerText = fromStation;
        document.getElementById("summaryToStation").innerText = toStation;
        document.getElementById("summaryTravelDate").innerText = travelDate;
        document.getElementById("summaryPassengerCount").innerText = passengerCount;

        // Hide booking form and display summary
        document.getElementById("bookingFormSection").style.display = "none";
        document.getElementById("bookingSummarySection").style.display = "block";
    } else {
        alert("Please fill in all the fields.");
    }
}
