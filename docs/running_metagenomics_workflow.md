# Starting Metagenomics Experiments

The NHS RMg platform runs separately to the ONT sequencing software. Users should perform steps in the following order:

1. Run a flow cell check.
2. Start the sequencing experiment using the relevant ONT software.
3. Launch the NHS RMg platform analysis.
4. Check the `NHS_RMg_platform/results` directory for reports.

!!! danger "Warning"
    Please read the 'Limitations' section before interpreting outputs.

    On a GridION device, only 2 instances of the workflow can be run simultaneously. See the Limitations section for mitigation.

## Running a flow cell check <span class="badge-minknow">MinKNOW</span>

A flow cell check should always be performed before starting a run. Starting a run with sub-optimal pore availability can produce invalid results. Oxford Nanopore Technologies will replace any flow cell that falls below the warranty number of active pores within three months of purchase, provided that you report the results within two days of performing the flow cell check and you have followed the storage recommendations. A MinION flow cell (used also in the GridION) should have \> 800 active pores.

1.  Select 'Flow Cell Check' from the MinKNOW 'Start' screen. 

![MinKNOW landing screen](img/minknow_landing.png)

2. Indicate the corresponding sequencing positions/flow cells you'd like to check by selecting the square icons below the 'Flow Cell Check' title.

![MinKNOW flow cell check screen](img/minknow_flowcell_selection.png)

3. Click on the green Start button and wait for the flow cell check to complete.

!!! note "Note"
    If the pore count is < 800 and the flow cell is still in warranty, contact ONT for a replacement within two days of completing the check.

## Starting a sequencing experiment using <span class="badge-minknow">MinKNOW</span>

1. From the Start screen in MinKNOW select 'Start Sequencing'.

![MinKNOW landing screen](img/minknow_landing.png)

2. Select the position occupied by the flow cell loaded for the sequencing experiment, enter the Experiment and Sample IDs.

!!! note "Note"
    We recommend setting the ONT 'Experiment' ID and the 'Sample' ID as identical values. This id must be unique and contain no spaces. We recommend the following scheme:

    `{date yymmdd}_{device}_{service}_{ascending run count}`

    For example:

    Experiment: 250131_QLINE3_RMG_0001
    Sample ID: 250131_QLINE3_RMG_0001

    In scenarios where the run is set up to supplement or resume the same library/experiment, use the same Experiment ID and append the Sample ID with an appropriate string:

    Experiment: 250131_QLINE3_RMG_0001
    Sample ID: 250131_QLINE3_RMG_0001_REPEAT


3. Select 'Continue to kit selection' at the bottom of the screen.

4. Select the SQK-RPB004 kit from the Kit selection screen. Click 'Continue to run options' at the bottom of the window.

5. In the run options screen, set the sequencing experiment to last for 24 hours. Leave the read length at 200 bp and select 'Continue to analysis' at the bottom of the window.

![MinKNOW run setup](img/minknow_run_setup.png)

6. On the Analysis window, under barcoding, select 'Edit options'. In the popup window, select ‘Trim Barcodes’ and 'Barcode at both ends'. Select the 'Continue to output' button at the bottom of the window.

7. On the Output window, deselect the FAST5 option. Where the FASTQ checkbox is selected, click the gear icon and set 'Reads per file' to 100. 

![MinKNOW run setup FASTQ Options](img/minknow_run_setup_2.png)

8. Continue to the 'final review' section and confirm the parameters match the table below:

| Parameter | Value |
| --- | --- |
| **Selected Kit** | SQK-RPB004 |
| **Run length** | 24 hours |
| **Minimum read length** | 200 bp |
| **Adaptive sampling** | Off |
| **Basecalling** | On (High accuracy basecalling) |
| **Barcoding** | On |
| **Require both ends** | On |
| **Detect mid-read barcodes** | On |
| **Alignment** | Off |
| **Location** | /data |
| **FAST5** | Off |
| **FASTQ** | On (Gzip, 100 reads per file) |
| **Read filtering** | Qscore:10 Readlength: unfiltered, Read splitting: Disabled |


9. Start the sequencing experiment. After the flow cell reaches temperature, navigate to the barcodes screen to verify data output. 

!!! note "Note"
    For aborted runs, crashes, mislabelling, use the 'Force overwrite' (18) function on the Launcher to delete and replace analysis outputs (results and reports) with a new run. Use this also if a "directory locked" error is observed. Any data deleted by this function will be stored in the `./NHS_RMg_platform/recycle_bin` directory.

\pagebreak

## Running the Metagenomics Workflow <span class="badge-minknow">MinKNOW</span>

The Metagenomics Launcher is a tool designed to acquire sample metadata and initiate the analysis of sequencing data to populate PDF/HTML reports. Reports are generated every 0.5, 1, 2, 16 and 24 hours, stored in the `./NHS_RMg_platform/reports/{Lab/SampleID}` directory.

!!! note "Note"
    Before starting:
    
    1.  Visit the 'Limitations' section below and FAQs on the Network Hub for an up-to-date description of issues and solutions affecting the workflow results.

    2. Functions referred to in this section will have numeric tag in brackets matching its location on the diagram below. A diagram mapping features is available in the Technical Information section.

    3. For <span class="badge-minknow">MinKNOW</span> installations, it is essential that the experiment for analysis has been started and has generated data. If the interface has been launched before data outputs, select Refresh Directories (21) to load new experiments.

1. Double click the Metagenomics Launcher icon on the GridION desktop, the CIDR Metagenomics Launcher should appear alongside a terminal window.

![Metagenomics Worklfow GUI Diagram](img/metagenomics_interface_diagram.png)

2. Select the number of samples to be analysed from the ‘Select number of rows’ dropdown (2).

3. Fill out the ‘Experiment ID’ field (3) with an appropriate identifier for the batch of samples. This field will be used to ease the identification runs in downstream analyses.

4. Populate the launcher fields by either loading an existing sample sheet (see Additional Information for guide), or manually populate fields 4 to 14.

!!! tip "Quick Tip"
    Clicking the black triangle to the right of selected column headers will clone the value in row 1 to all below.

5. Where appropriate, run the Anonymisation Functions (15). See the 'Anonymisation' section for more details on set up and usage.

6. Click on Launch pipeline and click ‘OK to start the analysis’. The window will then freeze until the workflow process has completed. After a minute, the terminal window accompanying the workflow launcher should start displaying log outputs from the workflow. 

7. Approximately 10-15 minutes after the sequencing timepoint, reports will be published to \
`./NHS_RMg_platform/reports/{Lab/SampleID}/`

!!! note "Note"
    * Reports usually take between 10 - 20 minutes to publish after data acquisition timepoints elapse.
    * The workflow generates reports at five timepoints: 0.5, 1, 2, 16, and 24 hours.
    * For real-time sequencing runs, the workflow waits for each timepoint to elapse before publishing the corresponding report, spanning a 24-hour period.
    * For retrospective analysis of existing datasets, reports are generated immediately for the same timepoints based on when the data was originally acquired, without waiting between timepoints.

![A screenshot of the terminal after successful completion of the workflow.](img/snakemake_terminal_complete.png)

8. For any errors, missing reports or queries, please go to the Troubleshooting section.

!!! danger "Warning"

    Do not close the terminal or the Launcher window until all reports have been published or the pipeline has stopped operation.

!!! note "Note"

    For aborted runs, crashes, mislabelling, use the 'Force overwrite' (18) function on the Launcher to delete and replace analysis outputs (results and reports) with a new run. Use this also if a "directory locked" error is observed.

    Any data deleted by this function will be stored in the `./NHS_RMg_platform/recycle_bin` directory.




## Running a flow cell check <span class="badge-gourami">Gourami</span>

A flow cell check should always be performed before starting a run. Starting a run with sub-optimal pore availability can produce invalid results. Oxford Nanopore Technologies will replace any flow cell that falls below the warranty number of active pores within three months of purchase, provided that you report the results within two days of performing the flow cell check and you have followed the storage recommendations. A MinION flow cell (used also in the GridION) should have > 800 active pores.

1. From the Gourami ‘Overview’ page, select ‘View Flow Cell’ at the appropriate flow cell position.

2. From the flow cell information screen, select ‘Run flow cell check’ on the right-hand side (see Figure 3).

3. If the pore count is < 800 and the flow cell is still in warranty, contact ONT for a replacement within two days of completing the check.

![Gourami flow cell check button](img/gourami_landing_2.png)


\pagebreak


## Starting a sequencing experiment and initiating metagenomics analysis <span class="badge-gourami">Gourami</span>

!!! tip "Quick Tip"

  1. A video guide is available on the Network Hub website for this procedure.

  2.  Visit the 'Limitations' section below and FAQs on the Network Hub for an up-to-date description of issues and solutions affecting the workflow results.

  3. Functions referred to in this section will have numeric tag in brackets matching its location on the diagram below. A diagram mapping features is available in the Technical Information section.

1. Open Gourami by clicking on the ONT icon in the taskbar to the left of the screen or on the desktop.

2. In the ‘Run Setup’ section, select “RPB004 prerelease” and press continue.

![Selecting an experiment in Gourami](img/gourami_experiment_selection.png)

3. Select the position of the flow cell intended for the sequencing experiment. A flow cell check will be required if not completed already. 

!!! tip "Quick Tip"

  The 'RPB004-prerelease' option may appear differently on your device. Consult with an ONT rep if this option is missing from your device.

![Selecting a flow cell for sequencing](img/gourami_sequencing_flowcell_checked.png)

4. Switching applications, open the Metagenomics Launcher from the desktop icon. Fill out the the fields on the launcher in the order listed below:

* Number of rows (2)
* Experiment ID (3)
* ONT Barcode (6)
* Lab/Sample ID (7)

![Metagenomics Worklfow GUI Diagram](img/metagenomics_interface_diagram.png)

5. Click on the 'Generate Gourami sample sheet' button (17). 

![Generating a Gourami sample sheet](img/gourami_shample_sheet_build.png)

6. Switching back to Gourami, import the generated sample sheet. This can be found within the NHS RMg Metagenomics Platform environment at the following path: `NHS_RMg_platform/sample_sheets/gourami/{yyyy_mm_dd@hh_mm_ss_{Experiment ID}`. Validate the entries and click 'Continue'.

![Imported sample sheet view in Gourami](img/gourami_sample_sheet_view.png)

7. Prime and load the flow cell as per the relevant laboratory SOP and commence the sequencing experiment. 

8. Wait until the the sequencing experiment has started and at least one barcode/sample status has switched to the green 'Found' status.

\pagebreak

9. Switch back to the Metagenomics Launcher, click on the 'Refresh Directories' button (21) and populate the remaining fields 8-14.

!!! tip "Quick Tip"

  Clicking the black triangle to the right of selected column headers will clone the value in row 1 to all below.

10. Where appropriate, run the Anonymisation Functions (15). See the Anonymisation section for more details on set up and usage.

11. Click on Launch pipeline and click ‘OK to start the analysis’. The window will then freeze until the workflow process has completed. After a minute, the terminal window accompanying the workflow launcher should start displaying log outputs from the workflow. 

12. Approximately 10-15 minutes after the sequencing timepoint, reports will be published to \
`./NHS_RMg_platform/reports/{Lab/SampleID}/`

!!! note "Note"

  * Reports usually take between 10 - 20 minutes to publish after data acquisition timepoints elapse.
  * The workflow generates reports at five timepoints: 0.5, 1, 2, 16, and 24 hours.
  * For real-time sequencing runs, the workflow waits for each timepoint to elapse before publishing the corresponding report, spanning a 24-hour period.
  * For retrospective analysis of existing datasets, reports are generated immediately for the same timepoints based on when the data was originally acquired, without waiting between timepoints.

![A screenshot of the terminal after successful completion of the workflow.](img/snakemake_terminal_complete.png)

!!! note "Note"

  For aborted runs, crashes, mislabelling, use the 'Force overwrite' (18) function on the Launcher to delete and replace analysis outputs (results and reports) with a new run. Use this also if a "directory locked" error is observed.

  Any data deleted by this function will be stored in the `./NHS_RMg_platform/recycle_bin` directory.

!!! danger "Warning"

  Do not close the terminal or the Launcher window until all reports have been published or the pipeline has stopped operation.

  For any errors, missing reports or queries, please go to the Troubleshooting section.