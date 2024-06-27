# Setting up CIDR Metagenomics bioinformatics workflow

## Overview
Each Network site will receive an ONT GridION sequencing platform and an external SSD containing the software and databases required for analysing metagenomic datasets. The software has been designed such that it will be easy for anybody to set up and use. Follow the instructions below to install the bioinformatics workflow.

## Install instructions

1. Insert the USB SSD in to one of the blue USB ports at the rear of the GridION. Try to place the disk away from the warm exhaust as this may lead to overheating.
<br><br>
2. After logging in to the GridION Ubuntu operating system, modify the file browser setting by following the video below. This is to enable the running of scripts without using the terminal.

![type:video](./videos/run_on_click.mkv)

3. Using the file browser, on the taskbar on the left side of the screen, navigate to the **metagenomics** disk, which can be found in the navigation pane inside the file browser.
!!! info
    As a security feature, the removable SSD has been encrypted. Enter the encyrption key provided to you and confirm that you'd like the key remembered.

4. Navigate to the ```metagenomics``` disk in the file explorer and double-click ```launch_installer.sh```, selecting to 'Run in terminal'. When prompted to do so, type the password for the GridION device (not the encryption key). See below for a video guide.
!!! info
    As you type, no lettering or symbols will appear. This is normal. If you mistype, press enter and try again.
    <br><br>
    There may be additional outputs in you terminal window compared to the video.

![type:video](./videos/./install_script.mkv)

5. Some icons should appear on the desktop linking to each app. You will need right click on the icons and select ```Allow launching``` before continuing with the next stage.

!!! tip "Success!"
    We have now installed the CIDR metagenomics workflow. The next step will be to run through a control dataset to test the workflow has run sucessfully.

## Install validation

Included with the software is a small dataset based on the Zymo community standard. In this step we will validate the function of the workflow with this dataset and generate a report.

1. Double click the Metagenomics Launcher icon on the desktop.
<br><br>
2. Fill out the fields, as indicated in the video below. More information on how to fill the fields and run the launcher can be found in the [Starting the metagenomics workflow](./running_metagenomics_workflow.md) section.

![type:video](./videos/./launching_metagenomics.mkv)

3. Wait ~10 minutes for the workflow to complete. Open up the PDF report which can be found in the ```reports``` folder on the metagenomics disk in a folder corresponding to the name of the sample provided in the launcher eg. gstt_control_1. See video below for further information.

![type:video](./videos/./opening_report.mkv)

4. Inspect the ```/metagenomics/reports/validation_sample/``` PDF report at the **0.5 hr timepoint**, it should match the CIDR validation report provided [here](sample_report.pdf).

!!! tip "Success!"
    We have now tested the CIDR metagenomics workflow. The next step will be to run a sequencing experiment, running the workflow in real-time.