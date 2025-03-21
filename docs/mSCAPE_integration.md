# mSCAPE upload tool

## Introduction

With on-boarding to the mSCAPE programme, users are encouraged to upload samples to mSCAPE using the mSCAPE Launcher. This tool incorporates sample metadata inputted when using the Metagenomics Launcher, with some additional user inputs. The tool then packages human-scrubbed FASTQ data, producing metadata outputs in the required format for an mSCAPE submission.

## Installation

The mSCAPE on-boarding team will provide all of the credentials required to make a test submission. These credentials should be stored in ```~/.aws/``` on the host machine. Contact the bioinformatics lead at GSTT for activation of the mSCAPE Uploader.

## Uploading samples

Following the successful completion of the CIDR Metagenomics Workflow, users can double click the 'mSCAPE Launcher' on the desktop. The tool reads the sample information from the sample sheet saved when a workflow run is started and parses it in to the correct format ready for upload.

!!! note
    Using the 'filename suffix' field on the Metagenomics Launcher appends the sample sheet filename with a string of your choosing, making it easier to find during audits or mSCAPE uploads.

*Check out the [video at the bottom of the page](#video-tutorial) for a visual guide on how to run the uploader*

1. From the 'Dropdown Options' section, select the parameters appropriate for the samples to be uploaded. Some addition fields for mSCAPE are inferred from the sample sheet, the data in the dropdowns or the sequencing reads themselves. See the table below for more details.

!!! note
    For more details on how to fill the metadata fields associate with the samples, for example 'Study description', [see the additional information section](#additional-information) at the bottom of the page.

| Parameter     | Description                          |
| ----------- | ------------------------------------ |
|**StudySite**|The RMg Network site the sequencing took place. |
|**Extraction Method**|the nucleic acid extraction methodology used.|
|**Spike-in**|The spike-in control used.|
|**ISOCountry**|Country/nation.|
|**Sequencing Protocol**|The methodology used for sample preparation.|
|**Library Protocol**|the sequencing kit used for library preparation.|
|**Bioinformatics protocol**|The version of the CIDR Metagenomics bioinformatics workflow.|
|**Clinical or research**|mSCAPE clinical or research.|
|**Human scrubbing**|mSCAPE informatic Human Scrubbing protocol used.|
|**Study description**|Code provided by mSCAPE team.|

2. Load a sample sheet by clicking the 'Load sample sheet' button at the bottom of the interface. The file browser takes you to the 'sample sheet' directory. Find the date/time corresponding to your run (or the sheet identified by the filename suffix) and open it. With this, the Main Table section should be populated with the samples from the corresponding sequencing run. 

3. From the 'FASTQ Selection', select the dataset and the timepoint to be uploaded.

!!! note
    Sample which are not intended for upload can be checked in the 'Main Table' and removed by clicking the 'Delete Selected rows' button at the bottom of the interface.

4. Once you have selected all of the timepoints for upload, choose the 'Update DataFrame' button at the bottom of the interface. 

5. Review the data in the 'Main Table' panel ensuring it is suitable for upload.

6. Select 'Upload to S3'. You can check the terminal window for outputs confirming successful upload. A status indicator is also present in the FASTQ selection window. 

### Video tutorial
*Video demonstration of using mSCAPE Uploader features*
![type:video](./videos/./mscape_video.mp4)

## Additional information

### Study description

Once onboarded by the CLIMB team, the site will be provided with a predetermined [study_centre_id] and three [study_id’s].

A study_centre_id is an abbreviation of the site name e.g. name of the NHS trust. Each site will have one ID.

A study_id will be used to identify if samples are from a particular research study, or an NHS residual sample. Every NHS trust will have one Study ID related to their clinical samples, and a separate verification Study ID. This is to clearly differentiate between their verification stage and clinical service. Additional study_ids can be added as desired to differentiate any research studies.

A list of the predetermined site and study codes can be found here: (Link to be added soon)

**See Table 1 for example of a study_centre_id, study_id and their purposes for GSTT.**

Table 1. Example of a study centre ID and study ID:

|study_centre_id     | study_id                        | Purpose|
| ----------- | ------------------------------------ |-----|
|GSTT|GSTT-CLI-01 |Clinical service samples|
|GSTT|GSTT-VER-01|Verification|
|GSTT|GSTT- RES-01|Research – outside of network of excellence protocol|