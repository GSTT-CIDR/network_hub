<!-- HTML imports for lightbox image display -->
<head>
<link href="assets/stylesheets/glightbox.min.css" rel="stylesheet"/><style>
<script src="assets/javascripts/glightbox.min.js"></script>
</head>
# Setting up CIDR Metagenomics bioinformatics workflow - alternative deployment

!!! Note
    **The tools and documentation described here and on the CIDR GitHub are not validated for diagnostic use and are for research and evaluation purposes only.**

## Overview
For collaborators outside of the Network, an alternative configuration can be provided. This will bypass the GUI allowing users to provide a ```sample_sheet.csv``` through a CLI. Organism query will not be available to headless users as this tools is heavily reliant on GUI I/O.

## Install instructions

1. Decompress CIDR_metagenomics_vX.X.tar.gz: 
```
tar -xvzf CIDR_metagenomics_vX.X.tar.gz
```
2. Install conda/[mamba](https://mamba.readthedocs.io/en/latest/installation/mamba-installation.html).
3. Build the appropriate environment for running the CIDR metagenomics containers. 
```
wget https://raw.githubusercontent.com/GSTT-CIDR/metagenomics_container/main/conda/apptainer.yml
conda env create -f apptainer.yml

```
4. Allocate a directory for MinKNOW data outputs. This will be mounted to the ```/data``` directory in the container in a later step.
!!! Note
    The directory structure of data for ingest must be maintained as in standard MinKNOW outputs eg.

    ```
    # Example for control sample
    [minknow_outputs_directory]/GSTT_control_sample_01/GSTT_control_sample_01/20240424_1408_X4_FAY88387_d3868a4f/fastq_pass/barcode11
    # Naming schema
    [minknow_outputs_directory]/[experiemnt]/[sample_id]/[*]/fastq_pass/barcodeXX
    
    ```


## Install validation
5. Navigate to the root of the ```CIDR_metagenomics_vX.X``` directory.
6. Move ```CIDR_metagenomics_vX.X/GSTT_control_sample_XX``` to the allocated directory for MinKNOW data outputs (from Install instructions: Step 4).
7. activate the apptainer conder environment:
```conda activate apptainer```
7. Initiate the run for analysing the control dataset:
```
apptainer exec --bind ./:/mnt  --bind ./data:/data  ./containers/cidr_metagenomics_v3.6.sif bash -c 'cd /workflow ; source /opt/conda/etc/profile.d/conda.sh && conda activate cmg && for t in 0.5; do snakemake --directory /mnt --cores 20 -k --config time=$t samples=/mnt/sample_sheets/CIDR_control_1.csv --latency-wait 15; done'

```
8. When the workflow has completed, inspect the ```CIDR_metagenomics_vX.X/reports/CIDR_control_1``` PDF report, it should match the CIDR validation report provided [here](./CIDR_control_1_0.5_hours_report.pdf).

!!! Info
    Variables to change in step 3<br>
    **--bind ./:/mnt** - Binding the workflow root directory to the container /mnt.<br>
    **--bind ./data:/data** - binding the allocated directory for MinKNOW data outputs to /data.<br>
    **./containers/cidr_metagenomics_v3.6.sif** -  launching the metagenomics container.<br>
    **for t in 0.5 1 2 16 24** - time-points for analysis.<br>
    **--cores 20** - number of samples to be processed simultaneously - not the same as threads.<br>
    **samples=/mnt/sample_sheets/CIDR_control_1.csv** - the mounted path for the sample sheet - remember this is the relative mounted path, so ```/mnt/sample_sheets``` corresponds to ```CIDR_metagenomics_vX.X/sample_sheets``` on the host machine.<br>

## Implementation
9. Build a **sample sheet** copying the structure of the example in ```CIDR_metagenomics_vX.X/sample_sheets```. Importantly, 'Experiment', 'SampleID' and 'Barcode' must be correct and correspond to the ```[minknow_outputs_directory]/[experiemnt]/[sample_id]/[*]/fastq_pass/barcodeXX``` scheme.
7. activate the apptainer conder environment:
```conda activate apptainer```
10. Run the container, changing the flags explained in the validation step:
```
apptainer exec --bind ./:/mnt  --bind ./data:/data  ./containers/cidr_metagenomics_v3.6.sif bash -c 'cd /workflow ; source /opt/conda/etc/profile.d/conda.sh && conda activate cmg && for t in 0.5 1 2 16 24; do snakemake --directory /mnt --cores 20 -k --config time=$t samples=/mnt/sample_sheets/[**sample_sheet**] --latency-wait 15; done'

```
11. PDF outputs should be found in ```CIDR_metagenomics_vX.X/reports/``` corresponding to each LabID in the **sample sheet** loaded.




