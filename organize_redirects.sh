#!/bin/bash

# Script to move redirect HTML files into proper directory structure

# Array of redirect files (without .html extension)
redirects=(
    "panmetagenomics_protocol"
    "bioinformatics_outline"
    "bioinformatics_install"
    "running_minknow"
    "running_metagenomics_workflow"
    "running_organism_query"
    "mSCAPE_integration"
    "additional_tools"
    "alternative_deployment"
    "clinical_interpretation"
    "validation_outline"
    "faq"
)

# Process each redirect file
for redirect in "${redirects[@]}"; do
    echo "Processing $redirect..."
    
    # Check if the HTML file exists
    if [ -f "${redirect}.html" ]; then
        # Create directory if it doesn't exist
        if [ ! -d "$redirect" ]; then
            mkdir -p "$redirect"
            echo "  Created directory: $redirect/"
        fi
        
        # Move and rename the file
        mv "${redirect}.html" "${redirect}/index.html"
        echo "  Moved ${redirect}.html to ${redirect}/index.html"
    else
        echo "  Warning: ${redirect}.html not found"
    fi
done

echo "Redirect organization complete!"