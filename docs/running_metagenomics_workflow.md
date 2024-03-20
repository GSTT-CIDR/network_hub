<!-- HTML imports for lightbox image display -->
<head>
<link href="assets/stylesheets/glightbox.min.css" rel="stylesheet"/><style>
<script src="assets/javascripts/glightbox.min.js"></script>
</head>

# Running the metagenomics workflow

## Before starting
* You can start the CIDR metagenomics workflow during a sequencing experiment or after a sequencing experiment has completed. The pipeline must not be activated before a sequencing experiment has started in MinKNOW and has started producing reads (See MinKNOW setup - Lab Protocol).

* Ensure the portable SSD is inserted in to one of the rear USB 3.1 ports, has been mounted and the encryption key has been entered successfully. Test the disk has been mounted by navigating to it in the Ubuntu file explorer.

## Starting a metagenomics analysis run

1. Double click the **Metagenomics Launcher** icon on the GridION desktop, the CIDR Metagenomics Launcher should appear alongside a terminal window.

![The desktop of the GridION operating system after executing the metagenomics_launcher](./img/metagenomics_pipeline_clean.png){ data-title="GridION desktop screenshot" data-description="The desktop of the GridION operating system after executing the metagenomics launcher" }

!!! info

    The ```'geocryptfs error not found...'``` error can be ignored as it is not essential to the workflow.

2. Through the Launcher, the workflow can be started in two ways: 
    * Fill out the fields on the form for each sample to be analysed.
    * Loading a pre-existing TSV [see example](https://raw.githubusercontent.com/GSTT-CIDR/network_hub/main/example_sample_sheet.tsv?token=GHSAT0AAAAAACMKGNRRLREYQKUOWOVJMRBWZPLABFA)

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

**Notes about the patientID hashing etc**

Extra points:
Remote mounting of data directories


# Configuration

Reference databases
List for name swapping