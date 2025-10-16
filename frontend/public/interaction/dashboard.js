const tableRows = document.querySelectorAll("#tripsTable tbody tr");
const filterSelect = document.getElementById("categoryFilter");
const ctx = document.getElementById("speedChart").getContext("2d");

const tripsData = Array.from(tableRows).map(row => {
    const cells = row.querySelectorAll("td");
    return {
        id: cells[0].textContent,
        distance: parseFloat(cells[1].textContent),
        speed: parseFloat(cells[2].textContent),
        category: cells[3].textContent,
        duration: parseInt(cells[4].textContent)
    };
});


filterSelect.addEventListener("change", () => {
    const selectCategory = filterSelect.value;

    tableRows.forEach(row => {
        const category = row.cells[3].textContent;

        if (selectCategory === "all" || category === selectCategory) {
            row.style.display = "";
        
        } else {
            row.style.display = "none";
        }
    
    });

    updateChart(selectedCategory);
});
// this function is to update the chart 
let chart;

function updateChart(category) {
    const filteredData = category === "All"//fliter the data
    ? tripsData
    : tripsData.filter(t => t.category === category);

    if (chart) chart.destroy();// destroy the previous chart

    // Create a new chart  
    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: filteredData.map(t => t.id),
            datasets: [{
                label: "Speed (km/h)",
                data: filteredData.map(t => t.speed),
                backgroundColor:"#ffcc00",
                borderColor:"#000",
                borderWidth:1
            }]
        },
        options: {
            responsive:true,
            scales: {
                y: { beginAtZero:true}
            }
        }
    });

}


// Initial chart rendering
updateChart("All");



