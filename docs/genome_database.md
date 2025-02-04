<html>
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/dataTables.bootstrap5.min.css">
<body class="container mt-4">

    <h2 class="mb-3 text-center">CIDR RMg genome database</h2>

    <div class="table-responsive">
        <table id="organismTable" class="table table-striped table-bordered">
            <thead>
                <tr id="tableHead">
                    <!-- Table headers will be inserted dynamically -->
                </tr>
            </thead>
            <tbody id="tableBody">
                <!-- Table data will be inserted dynamically -->
            </tbody>
        </table>
    </div>

    <!-- jQuery & DataTables JS -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"></script>

    <script>
        $(document).ready(function () {
            fetch('../CIDR_v8.csv')
                .then(response => response.text())
                .then(data => {
                    // Split data into rows and clean up potential trailing whitespace
                    let rows = data.trim().split('\n').map(row => row.split(',').map(cell => cell.trim()));

                    if (rows.length < 2) {
                        console.error("CSV file is empty or invalid.");
                        return;
                    }

                    const headers = rows[0]; // First row is the header
                    const tableHead = document.getElementById("tableHead");
                    const tableBody = document.getElementById("tableBody");

                    // Insert headers dynamically
                    headers.forEach(header => {
                        let th = document.createElement("th");
                        th.textContent = header;
                        tableHead.appendChild(th);
                    });

                    // Insert data rows dynamically
                    rows.slice(1).forEach(row => {
                        let tr = document.createElement("tr");
                        row.forEach(cell => {
                            let td = document.createElement("td");
                            td.textContent = cell;
                            tr.appendChild(td);
                        });
                        tableBody.appendChild(tr);
                    });

                    // Initialize DataTable
                    $('#organismTable').DataTable({
                        paging: true,
                        searching: true,
                        ordering: true,
                        lengthMenu: [25, 50, 100],
                        language: { search: "Search all columns:" }
                    });
                })
                .catch(error => console.error('Error loading CSV:', error));
        });
    </script>

</body>
</html>
