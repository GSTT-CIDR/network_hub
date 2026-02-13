# CIDR RMg Genome Database (V16 - Agnes)

This page contains a database of all taxa in the primary classification database. It taxa featured here can appear on the main report. The Auto Query database contains everything listed here, plus RefSeq prok and viruses.

<style>
.genome-db {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.genome-db .stats-card {
    border: none;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
    height: 100%;
    background: white;
    margin-bottom: 1rem;
}

.genome-db .stats-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.genome-db .stats-card .card-body {
    padding: 1.5rem;
    display: flex;
    align-items: center;
}

.genome-db .stats-icon {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
    margin-right: 1rem;
}

.genome-db .search-section {
    background: #f8f9fa;
    border-radius: 10px;
    border: 1px solid #dee2e6;
    padding: 1.5rem;
    margin-bottom: 2rem;
}

.genome-db .column-filter {
    margin-bottom: 1rem;
}

.genome-db .column-filter input {
    border-radius: 6px;
    border: 1px solid #ced4da;
    font-size: 0.875rem;
    width: 100%;
    padding: 0.5rem;
}

.genome-db .column-filter input:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    outline: none;
}

.genome-db .table-container {
    background: white;
    border-radius: 10px;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
}

.genome-db #organismTable {
    width: 100% !important;
}

.genome-db #organismTable thead th {
    background-color: #007bff;
    color: white;
    border: none;
    font-weight: 600;
    padding: 1rem 0.75rem;
}

.genome-db #organismTable tbody tr:hover {
    background-color: rgba(0, 123, 255, 0.05);
}

.genome-db .btn-custom {
    border-radius: 6px;
    font-weight: 500;
    margin: 0.25rem;
}

.genome-db .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.genome-db .row {
    display: flex;
    flex-wrap: wrap;
    margin: -0.5rem;
}

.genome-db .col-md-4 {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
    padding: 0.5rem;
}

.genome-db .col-md-6 {
    flex: 0 0 50%;
    max-width: 50%;
    padding: 0.5rem;
}

.genome-db .col-md-8 {
    flex: 0 0 66.666667%;
    max-width: 66.666667%;
    padding: 0.5rem;
}

.genome-db .col-lg-4 {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
}

@media (max-width: 768px) {
    .genome-db .col-md-4,
    .genome-db .col-md-6,
    .genome-db .col-md-8,
    .genome-db .col-lg-4 {
        flex: 0 0 100%;
        max-width: 100%;
    }
}
</style>

<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/dataTables.bootstrap5.min.css">
<link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.4.1/css/buttons.bootstrap5.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<div class="genome-db">
    <!-- Summary Statistics Cards -->
    <div class="row">
        <div class="col-md-6">
            <div class="stats-card">
                <div class="card-body">
                    <div class="stats-icon" style="background-color: #007bff;">
                        <i class="fas fa-list-ol"></i>
                    </div>
                    <div>
                        <h5 style="margin-bottom: 0.5rem;">Total Entries</h5>
                        <h3 style="margin: 0;" id="totalEntries">-</h3>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="stats-card">
                <div class="card-body">
                    <div class="stats-icon" style="background-color: #17a2b8;">
                        <i class="fas fa-ruler"></i>
                    </div>
                    <div>
                        <h5 style="margin-bottom: 0.5rem;">Total Base Pairs</h5>
                        <h3 style="margin: 0;" id="totalBases">-</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Search and Filter Section -->
    <div class="search-section">
        <div class="row">
            <div class="col-md-8">
                <h5 style="margin-bottom: 1rem;">
                    <i class="fas fa-search" style="margin-right: 0.5rem;"></i>
                    Column Filters
                </h5>
                <div class="row" id="columnFilters">
                    <!-- Column filters will be inserted here -->
                </div>
            </div>
            <div class="col-md-4">
                <h5 style="margin-bottom: 1rem;">
                    <i class="fas fa-tools" style="margin-right: 0.5rem;"></i>
                    Controls
                </h5>
                <div>
                    <button id="clearAllFilters" class="btn btn-outline-secondary btn-custom" style="width: 100%; margin-bottom: 0.5rem;">
                        <i class="fas fa-eraser" style="margin-right: 0.5rem;"></i>Clear All Filters
                    </button>
                    <button id="refreshData" class="btn btn-outline-primary btn-custom" style="width: 100%;">
                        <i class="fas fa-sync-alt" style="margin-right: 0.5rem;"></i>Refresh Data
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Data Table -->
    <div class="table-container">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h5 style="margin: 0;">
                <i class="fas fa-table" style="margin-right: 0.5rem;"></i>
                Genome Data
            </h5>
            <div id="tableButtons">
                <!-- Export buttons will be inserted here -->
            </div>
        </div>
        <div style="overflow-x: auto;">
            <table id="organismTable" class="table table-striped table-bordered">
                <thead>
                    <tr id="tableHead">
                        <!-- Headers inserted dynamically -->
                    </tr>
                </thead>
                <tbody id="tableBody">
                    <!-- Data inserted dynamically -->
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Loading Overlay -->
<div id="loadingOverlay" class="loading-overlay">
    <div style="text-align: center;">
        <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
            <span style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;">Loading...</span>
        </div>
        <p style="margin-top: 1rem; color: #6c757d;">Loading genome data...</p>
    </div>
</div>

<!-- Error Modal -->
<div class="modal fade" id="errorModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Error</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <p id="errorMessage"></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js"></script>
<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.4.1/js/dataTables.buttons.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.4.1/js/buttons.bootstrap5.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.4.1/js/buttons.html5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>

<script>
// Column definitions - customize display names and data types here
const columnDefinitions = {
    // Updated mappings for new CSV structure
    'taxon_name': {
        displayName: 'Taxon Name',
        type: 'text',
        description: 'Name of the taxon'
    },
    'total_bases': {
        displayName: 'Total Base Pairs',
        type: 'number',
        thousandsSeparator: true,
        description: 'Total base pairs assigned to taxon'
    },
    'full_lineage': {
        displayName: 'Taxonomic Lineage',
        type: 'text',
        description: 'Full NCBI taxonomic lineage'
    },
    'taxid_lineage': {
        displayName: 'Taxonomic Lineage (TaxIDs)',
        type: 'text',
        thousandsSeparator: false,
        description: 'Full NCBI taxonomic lineage (TaxIDs)'
    },
    'taxid': {
        displayName: 'TaxID',
        type: 'number',
        thousandsSeparator: false,
        description: 'NCBI taxid for the organism'
    }
    // Add more column mappings as needed
    // Supported types: 'text', 'number', 'percentage', 'date'
    // For 'number' type: set thousandsSeparator: true/false
};

let dataTable;
let rawData = [];

$(document).ready(function() {
    loadData();
});

function loadData() {
    showLoading();
    fetch('../taxon_summary_table.csv')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load CSV file. Status: ${response.status}`);
            }
            return response.text();
        })
        .then(csvText => {
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                trimHeaders: true,
                complete: function(results) {
                    if (results.errors.length > 0) {
                        console.warn('CSV parsing warnings:', results.errors);
                    }
                    
                    if (results.data.length === 0) {
                        throw new Error('No data found in CSV file');
                    }
                    
                    rawData = results.data.filter(row => 
                        Object.values(row).some(value => value && value.toString().trim() !== '')
                    );
                    
                    if (rawData.length === 0) {
                        throw new Error('No valid data rows found in CSV file');
                    }
                    
                    initializeTable();
                    updateStatistics();
                    hideLoading();
                },
                error: function(error) {
                    throw new Error('CSV parsing failed: ' + error.message);
                }
            });
        })
        .catch(error => {
            console.error('Error loading data:', error);
            showError('Error loading data: ' + error.message);
            hideLoading();
        });
}

function initializeTable() {
    if (rawData.length === 0) {
        showError('No data to display');
        return;
    }

    const headers = Object.keys(rawData[0]);
    createTableHeaders(headers);
    createColumnFilters(headers);
    populateTableData(headers);
    initializeDataTable();
}

function createTableHeaders(headers) {
    const tableHead = document.getElementById("tableHead");
    tableHead.innerHTML = '';
    
    headers.forEach(header => {
        const th = document.createElement("th");
        const columnDef = columnDefinitions[header];
        const displayName = columnDef ? columnDef.displayName : header;
        
        th.textContent = displayName;
        th.style.whiteSpace = 'nowrap';
        
        // Add tooltip with description if available
        if (columnDef && columnDef.description) {
            th.title = columnDef.description;
            th.style.cursor = 'help';
        }
        
        tableHead.appendChild(th);
    });
}

function createColumnFilters(headers) {
    const filtersContainer = document.getElementById('columnFilters');
    filtersContainer.innerHTML = '';

    headers.forEach((header, index) => {
        const colDiv = document.createElement('div');
        colDiv.className = 'col-md-6 col-lg-4 column-filter';
        
        const label = document.createElement('label');
        label.style.fontWeight = '600';
        label.style.fontSize = '0.875rem';
        label.style.marginBottom = '0.25rem';
        label.style.display = 'block';
        
        const columnDef = columnDefinitions[header];
        const displayName = columnDef ? columnDef.displayName : header;
        label.textContent = displayName;
        
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Search ${displayName}...`;
        input.setAttribute('data-column', index);
        
        input.addEventListener('keyup', function() {
            const columnIndex = this.getAttribute('data-column');
            dataTable.column(columnIndex).search(this.value).draw();
        });

        colDiv.appendChild(label);
        colDiv.appendChild(input);
        filtersContainer.appendChild(colDiv);
    });
}

function populateTableData(headers) {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = '';

    rawData.forEach(row => {
        const tr = document.createElement("tr");
        headers.forEach(header => {
            const td = document.createElement("td");
            const value = row[header] || '';
            const columnDef = columnDefinitions[header];
            
            // Format value based on column type
            if (columnDef && value) {
                switch (columnDef.type) {
                    case 'number':
                        if (!isNaN(value)) {
                            if (columnDef.thousandsSeparator === true) {
                                td.textContent = parseInt(value).toLocaleString();
                            } else {
                                td.textContent = parseInt(value).toString();
                            }
                        } else {
                            td.textContent = value;
                        }
                        break;
                    case 'percentage':
                        if (!isNaN(value)) {
                            td.textContent = parseFloat(value).toFixed(2) + '%';
                        } else {
                            td.textContent = value;
                        }
                        break;
                    case 'date':
                        if (value) {
                            const date = new Date(value);
                            if (!isNaN(date.getTime())) {
                                td.textContent = date.toLocaleDateString();
                            } else {
                                td.textContent = value;
                            }
                        }
                        break;
                    case 'text':
                    default:
                        td.textContent = value;
                        break;
                }
            } else {
                td.textContent = value;
            }
            
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
}

function initializeDataTable() {
    if (dataTable) {
        dataTable.destroy();
    }

    dataTable = $('#organismTable').DataTable({
        paging: true,
        searching: true,
        ordering: true,
        lengthMenu: [[25, 50, 100, 250, -1], [25, 50, 100, 250, "All"]],
        pageLength: 25,
        responsive: true,
        scrollX: true,
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excelHtml5',
                text: '<i class="fas fa-file-excel"></i> Excel',
                className: 'btn btn-success btn-sm btn-custom'
            },
            {
                extend: 'csvHtml5',
                text: '<i class="fas fa-file-csv"></i> CSV',
                className: 'btn btn-info btn-sm btn-custom'
            }
        ],
        language: {
            search: "Global Search:",
            lengthMenu: "Show _MENU_ entries",
            info: "Showing _START_ to _END_ of _TOTAL_ entries",
            infoFiltered: "(filtered from _MAX_ total entries)",
            emptyTable: "No genome data available",
            zeroRecords: "No matching records found"
        }
    });

    $('.dt-buttons').appendTo('#tableButtons');
}

function updateStatistics() {
    const totalEntries = rawData.length;
    
    const totalBases = rawData.reduce((sum, row) => {
        const bases = parseInt(row.total_bases) || 0;
        return sum + bases;
    }, 0);

    document.getElementById('totalEntries').textContent = totalEntries.toLocaleString();
    
    if (totalBases >= 1e12) {
        document.getElementById('totalBases').textContent = (totalBases / 1e12).toFixed(2) + 'T';
    } else if (totalBases >= 1e9) {
        document.getElementById('totalBases').textContent = (totalBases / 1e9).toFixed(2) + 'G';
    } else if (totalBases >= 1e6) {
        document.getElementById('totalBases').textContent = (totalBases / 1e6).toFixed(2) + 'M';
    } else {
        document.getElementById('totalBases').textContent = totalBases.toLocaleString();
    }
}

document.getElementById('clearAllFilters').addEventListener('click', function() {
    if (dataTable) {
        dataTable.search('').columns().search('').draw();
    }
    document.querySelectorAll('.column-filter input').forEach(input => {
        input.value = '';
    });
});

document.getElementById('refreshData').addEventListener('click', function() {
    loadData();
});

function showLoading() {
    document.getElementById('loadingOverlay').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingOverlay').style.display = 'none';
}

function showError(message) {
    document.getElementById('errorMessage').textContent = message;
    const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    errorModal.show();
}
</script>
