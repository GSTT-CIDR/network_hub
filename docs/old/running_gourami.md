# Starting a sequencing experiment in Gourami

## Introduction
!!! danger "Important"
    This section applies only to users with GridION version 1.1 or greater. For users with MinION or GridION RUO/1.0 platforms, please refer to the MinKNOW sections.

This document instructs users on how to use the Goruami interface. These tools are used to initialise and control sequencing experiments on the GridION device. Following completion of the relevant section, proceed to the [Running the metagenomics workflow](./running_metagenomics_workflow.md) section to start the metagenomics analysis.


## Launching a sequencing experiment using Gourami

1. Open the Sequencing Software by selecting the icon on the taskbar to the right as shown in the screenshot below.

![image](./img/gourami/taskbar.png){data-title="GridION taskbar" data-description=""}

2. From assay selection, select “RPB004 prerelease” and press continue.

![image](./img/gourami/protocol.png){data-title="Selecting a protocol on Gourami" data-description=""}

3. Select the position of the flow cell on the interface. If you have not already run a flow cell check, you will have to run that now by selecting “Check flow cell”. After it is complete you can press continue.

![image](./img/gourami/flow_cell.png){data-title="Flow cell dashboard" data-description=""}

!!! tip
    The sample sheet step is only necessary if you are using the 'Gourami' software.

4. Open the Metagenomics launcher application and enter: 
    1. Number of samples (rows)
    2. Experiment ID
    3. 'ONT barcode' (for each sample in the library)
    4. 'Lab/Sample ID' (for each sample in the library)

After filling out the above fields, click **Generate Gourami sample sheet (5)**. This will create a sample sheet in the 'sample_sheet' directory in 'metagenomics'. The sample sheet will be named with the date/time and the text in the Experiment ID field. 

![image](./img/gourami/sample_sheet.png){data-title="CIDR metagenomics launcher - building a sample sheet" data-description=""}

5. Switching back to the Gourami sequencing software, select “Import” on the select sample sheet screen and import the sample sheet you have just created. Then make sure it is selected and the validation status says “Pass”, then press continue.

![image](./img/gourami/running_dashboard.png){data-title="Sample sheet loading screen" data-description=""}

6. On the “Prime and load” screen ensure flow cell is correctly loaded as per SOP and press continue.

7. On the final “Review and start” screen, select “Run assay” to begin the run. Please wait all the sample barcodes to appear as found before starting the metagenomics pipeline. 

8. Proceed to the [Running the metagenomics workflow](./running_metagenomics_workflow.md) section to start the analysis.

!!! tip "Success!"
    After reads start to appear on the barcoding screen you can advance to [Starting the metagenomics workflow](./running_metagenomics_workflow.md).