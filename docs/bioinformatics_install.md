<!-- HTML imports for lightbox image display -->
<head>
<link href="assets/stylesheets/glightbox.min.css" rel="stylesheet"/><style>
<script src="assets/javascripts/glightbox.min.js"></script>
</head>
# Setting up CIDR Metagenomics bioinformatics workflow

## Overview
Each Network site will receive a GridION sequencing device and a portable SSD containing the software and databases required for analysing metagenomic datasets. The software has been designed such that it will be easy for anybody to set up and use. Follow the instructions below to set up the bioinformatics workflow.

## Install instructions

1. Plug the SSD drive in to the back of the GridION device, ensuring you use one for the blue USB ports.
2. Using the integrated file browser, which can be found on the taskbar on the laf side of the screen, navigate to the **metagenomics** disk, which can be found in the navigation pane inside the file browser.
3. With the prompt to decrypt the disk, use the key provided to you and confirm that you'd like the key remembered.
4. Navigate to the ```scripts``` directory, right click on empty space within the window and select ```Open in terminal```.
5. In to the open terminal window, highlight, right click copy the code block below in its entirety:
```
chmod +x install.sh
./install.sh
```
6. Right click inside the terminal window and select ```paste```. Press Enter ↵ to execute the command.
7. Wait for the install script to run. On completion the script will return "Install complete".

!!! info
    As a security feature, the Linux operating system requires the user to explicitly allow execution of any new/foreign script. The ```chmod +x``` above indicates that you'd like to be able to execute the script. ```./install.sh``` runs the install script.

## Install validation
On successful completion of the install script, two icons should appear on the desktop - Matagenomics Launcher and Organism Query.

1. Double click the Metagenomics Launcher. 
2. Follow the instructions for [Starting the metagenomics workflow](./running_metagenomics_workflow.md). For **Step 2** select 'load existing sample sheet' chosing pipeline_validation.tsv in the file browser dialogue. Select **Launch pipeline** and wait for completion.
4. When the workflow has completed, inspect the ```/metagenomics/results/validation_sample/``` PDF report, it should match the CIDR validation report provided [here](sample_report.pdf).



