flatpickr("#date", {
    dateFormat: "d/m/Y",
});

document.getElementById("getHistory").addEventListener("click", async () => {
    const dateInput = document.getElementById("date").value;
    if (!dateInput) return alert("Please select a date.");

    const [day, month, year] = dateInput.split('/');
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "<p>Loading...</p>";

    try {
        const res = await fetch(`http://localhost:5505/history/wikipedia/${month}/${day}`);
        if (!res.ok) throw new Error(`Wikipedia HTTP error! status: ${res.status}`);

        const data = await res.json();

        // Look for the exact year
        let showEvent = data.events.find(event => event.year == year);

        // If not found, show a message instead of fallback
        if (!showEvent) {
            resultDiv.innerHTML = `<p>No events found for ${dateInput}. Please try another date.</p>`;
            return;
        }

        const page = showEvent.pages[0];
        const title = page?.titles?.normalized || "";
        const image = page?.thumbnail?.source || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png";
        const link = title ? `https://en.wikipedia.org/wiki/${title}` : "#";

        resultDiv.innerHTML = `
            <div class="card">
                <img src="${image}" alt="Event Image">
                <div class="card-content">
                    <h2>${showEvent.year}</h2>
                    <p>${showEvent.text}</p>
                    <a href="${link}" target="_blank" class="read-more">Read More</a>
                </div>
            </div>
        `;
    } catch (error) {
        resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        console.error("Fetch failed:", error);
    }
});
