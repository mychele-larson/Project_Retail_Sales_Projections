// Function to fetch yearly sales data and plot the graph
function fetchYearlySalesDataAndPlot() {
    // Fetch data from the yearly_sales endpoint
    fetch('/api/v1.0/yearly_sales')
        .then((response) => response.json())
        .then((data) => {
            // Extract the years and sales data from the fetched data
            const years = data.map((entry) => entry.year);
            const sales = data.map((entry) => entry.sales);

            // Create the plotly trace for the line graph
            const trace = {
                x: years,
                y: sales,
                mode: 'lines+markers',
                type: 'scatter',
                name: 'Yearly Sales',
                line: { shape: 'spline' },
            };

            // Define the layout for the plot
            const layout = {
                title: 'Yearly Sales',
                xaxis: {
                    title: 'Year',
                    showgrid: true,
                    zeroline: true,
                    tickvals: years,
                },
                yaxis: {
                    title: 'Sales',
                    showline: true,
                    zeroline: true,
                },
            };

            // Render the plot within a div with the id 'plot-container'
            Plotly.newPlot('plot', [trace], layout);
        })
        .catch((error) => console.error('Error fetching data:', error));
}

// Call the function to fetch data and plot the graph
fetchYearlySalesDataAndPlot();

// Function to fetch monthly sales data and plot the graph
function fetchMonthlySalesDataAndPlot() {
    // Fetch data from the monthly_sales endpoint
    fetch('/api/v1.0/monthly_sales')
        .then((response) => response.json())
        .then((data) => {
            // Sort the data by year and month
            data.sort((a, b) => a.year - b.year || a.month - b.month);

            // Create an array of month-year labels and corresponding sales data
            const monthYearLabels = data.map((entry) => `${entry.month}-${entry.year}`);
            const sales = data.map((entry) => entry.sales);

            // Create the plotly trace for the line graph
            const trace = {
                x: monthYearLabels,
                y: sales,
                mode: 'lines+markers',
                type: 'scatter',
                name: 'Monthly Sales',
                line: { shape: 'spline' },
            };

            // Define the layout for the plot
            const layout = {
                title: 'Monthly Sales Over All the Years',
                xaxis: {
                    title: 'Month-Year',
                    showgrid: true,
                    zeroline: true,
                },
                yaxis: {
                    title: 'Sales',
                    showline: true,
                    zeroline: true,
                },
            };

            // Render the plot within a div with the id 'monthly-sales-plot-container'
            Plotly.newPlot('line', [trace], layout);
        })
        .catch((error) => console.error('Error fetching data:', error));
}

// Call the function to fetch data and plot the graph
fetchMonthlySalesDataAndPlot();

// Function to fetch weekday sales data and plot the graph
function fetchWeekdaySalesDataAndPlot() {
    // Fetch data from the weekday_sales endpoint
    fetch('/api/v1.0/weekday_sales')
        .then((response) => response.json())
        .then((data) => {
            // Sort the data by year and weekday
            data.sort((a, b) => a.year - b.year || a.weekday - b.weekday);

            // Group data by year
            const groupedData = data.reduce((result, entry) => {
                if (!result[entry.year]) {
                    result[entry.year] = [];
                }
                result[entry.year].push(entry);
                return result;
            }, {});

            // Create a separate trace for each year
            const traces = Object.keys(groupedData).map((year) => {
                const yearData = groupedData[year];
                return {
                    x: yearData.map((entry) => entry.weekday_name),
                    y: yearData.map((entry) => entry.sales),
                    mode: 'lines+markers',
                    type: 'scatter',
                    name: `Average Sales ${year}`,
                    line: { shape: 'spline' },
                };
            });

            // Define the layout for the plot
            const layout = {
                title: 'Average Sales by Weekday Over the Years',
                xaxis: {
                    title: 'Weekday',
                    showgrid: true,
                    zeroline: true,
                },
                yaxis: {
                    title: 'Average Sales',
                    showline: true,
                    zeroline: true,
                },
            };

            // Render the plot within a div with the id 'weekday-sales-plot-container'
            Plotly.newPlot('graph', traces, layout);
        })
        .catch((error) => console.error('Error fetching data:', error));
}

// Call the function to fetch data and plot the graph
fetchWeekdaySalesDataAndPlot();

// Function to fetch item sales data and plot the top 10 items as a bar chart
function fetchItemSalesDataAndPlot() {
    // Fetch data from the item_sales endpoint
    fetch('/api/v1.0/item_sales')
        .then((response) => response.json())
        .then((data) => {


            // Extract the item names and sales data from the top 10 items
            const item = data.map((entry) => entry.item);
            const sales = data.map((entry) => entry.sales);

            // Create the plotly trace for the bar chart
            const trace = {
                x: item,
                y: sales,
                type: 'bar',
            };

            // Define the layout for the plot
            const layout = {
                title: 'Top 10 Items by Sales',
                xaxis: {
                    title: 'Item Name',
                    showgrid: true,
                    zeroline: true,
                    tickvals: item,
                    ticktext: item.map((i) => i.toString()),
                    categoryorder: 'array',
                    categoryarray: item,
                },
                yaxis: {
                    title: 'Sales',
                    showline: true,
                    zeroline: true,
                },
            };

            // Render the plot within a div with the id 'top-items-plot-container'
            Plotly.newPlot('bar', [trace], layout);
        })
        .catch((error) => console.error('Error fetching data:', error));
}

// Call the function to fetch data and plot the graph
fetchItemSalesDataAndPlot();

// Function to fetch store sales data and plot the total sales per store as a bar chart
function fetchStoreSalesDataAndPlot() {
    // Fetch data from the store_sales endpoint
    fetch('/api/v1.0/store_sales')
        .then((response) => response.json())
        .then((data) => {
            // Extract the store names and sales data
            const store = data.map((entry) => entry.store);
            const sales = data.map((entry) => entry.sales);

            // Create the plotly trace for the bar chart
            const trace = {
                x: store,
                y: sales,
                type: 'bar',
            };

            // Define the layout for the plot
            const layout = {
                title: 'Total Sales by Store',
                xaxis: {
                    title: 'Store',
                    showgrid: true,
                    zeroline: true,
                    tickvals: store, // Set custom tick values for the x-axis
                    ticktext: store.map((s) => s.toString()), // Set custom tick labels for the x-axis
                },
                yaxis: {
                    title: 'Sales',
                    showline: true,
                    zeroline: true,
                },
            };

            // Render the plot within a div with the id 'store-sales-plot-container'
            Plotly.newPlot('chart', [trace], layout);
        })
        .catch((error) => console.error('Error fetching data:', error));
}

// Call the function to fetch data and plot the graph
fetchStoreSalesDataAndPlot();
