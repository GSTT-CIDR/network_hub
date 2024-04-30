<!-- HTML imports for lightbox image display -->
<head>
<link href="assets/stylesheets/glightbox.min.css" rel="stylesheet"/><style>
<script src="assets/javascripts/glightbox.min.js"></script>
</head>

# Running the metagenomics workflow

!!! warning
    **Before starting**
    
    1. The CIDR metagenomics workflow must be started during a sequencing experiment or after a sequencing experiment has completed. The pipeline must not be activated before a sequencing experiment has started in MinKNOW and has **started producing reads** (See MinKNOW setup - Lab Protocol).
    
    2. Ensure the SSD is inserted in to one of the rear USB 3.1 ports, has been mounted and the encryption key has been entered successfully. Test the disk has been mounted by navigating to it in the Ubuntu file explorer.
#### Starting a run
1. Double click the **Metagenomics Launcher** icon on the GridION desktop, the CIDR Metagenomics Launcher should appear alongside a terminal window.

![The desktop of the GridION operating system after executing the metagenomics_launcher](./img/metagenomics_pipeline_clean.png){ data-title="GridION desktop screenshot" data-description="The desktop of the GridION operating system after executing the metagenomics launcher" }

!!! bug

    The ```'geocryptfs error not found...'``` error can be ignored as it is not essential to the workflow.


2. Start the launcher using one of the below methods
    * Fill out the fields on the form for each sample to be analysed.
    * Loading a pre-existing TSV [see example](https://raw.githubusercontent.com/GSTT-CIDR/network_hub/main/example_sample_sheet.tsv?token=GHSAT0AAAAAACMKGNRRLREYQKUOWOVJMRBWZPLABFA).


#### The field descriptions are as follow:

| Field      | Description                          |
| ----------- | ------------------------------------ |
|**LabID**|The exact name matching the experiment name on MinKNOW. This is case sensitive. |
|**Experiment**|Update resource.|
|**SampleID**|Delete resource.|
|**Barcode**|The ONT RBP-004 barcode number corresponding to each sample. Input barcode 12/12a are interpreted the same.|
|**SampleType**|Can be positive_control, negative_control, community_standard or (clinical) sample.|
|**SampleSource**|Can be nose_and_throat, upper_respiratory, lower_respiratory, faecal, tissue, stool, blood, plasma, urine, environment or other.|
|**PatientID**|The MRE number from the LIMS/EPIC (UPDATE WITH ENCRYPTION)|
|**Operator**|The initials of the person initialising the workflow.|

!!! note
    * Option 1 will generate a sample sheet stored in the ```metagenomics/sample_sheets``` directory. This can be reused if a repeat run is required - or quick edits need to be made to a set of samples without having to fill out the fields again.
    
    * Patient IDs are not stored - on launching the workflow they are encrypted.

3. With the metadata completed, select whether the read data should be uploaded to the UK-HSA mSCAPE network, the select **Launch pipeline**.

