async function fetchHistory() {
    const dateInput = document.getElementById("date").value;
    if (!dateInput) {
        alert("Please select a date");
        return;
    }

    const month = dateInput.slice(5, 7); // Extract MM
    const day = dateInput.slice(8, 10);  // Extract DD

    const historyList = document.getElementById("history-list");
    historyList.innerHTML = "Loading...";

    try {
        const response = await fetch(`http://localhost:5503/history/${month}/${day}`);
        const data = await response.json();

        historyList.innerHTML = ""; // Clear previous results

        if (data.events && data.events.length > 0) {
            data.events.forEach(event => {
                const li = document.createElement("li");
                const link = document.createElement("a");

                link.textContent = event.text;
                link.href = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(event.text)}`;
                link.target = "_blank"; // Open in a new tab
                link.style.color = "#ffeb3b"; // Highlight color
                link.style.textDecoration = "none"; // Remove underline

                li.appendChild(link);
                historyList.appendChild(li);
            });
        } else {
            historyList.innerHTML = "No events found for this date.";
        }
    } catch (error) {
        historyList.innerHTML = "Error fetching history data.";
        console.error(error);
    }
}
