# FAQ

## How do I thoroughly check for unclassified reads?

You can use the organism query tool to analyse a subset of unclassified reads. Just search for ‘unclassified’ in the manual. This will analyse a subset of 50 reads using a BLASTn database of your choosing. 

If you’d like to extract all unclassified reads, navigate to the ‘results’ directory for the sample timepoint and run the lines below: 

I’ll give an example using the SeqKit - Ultrafast FASTA/Q kit toolkit:

```
cd ./NHS_RMg_platform/results/{sample_name}/24_hours

zcat centrifuge/centrifuge_raw.tsv.gz | grep unclassified | cut -f1 | seqkit grep -f - microbial/{sample_name}24_hours_hg38_removed.fastq.gz | gzip > {sample_name}_unclassified.fastq.gz
```

## I'm seeing red text on the metagenomics workflow terminal output:

### "directory locked..."

Load the latest sample sheet using the 'Load existing sample sheet' function. Rerun the samples with the 'Force overwrite' function checked on the Metagenomics launcher. This will delete any existing reports matching the Lab IDs provided to the launcher and re-analyse the datasets.

### "Could not locate a Centrifuge index corresponding to basename"

The install script caches the classification databases at `"/data/metagenomics_workflow_databases/`. Check this is present and the size is ~64 GB. If this is not the case, ensure there is adequate space on the target volume and rerun the install script.

You can reconfigure the chance directory by moving this directory and changing the `parameters.centrifuge.index.cmg` and `blast.db` configs. See the 'Technical information -> Metagenomics config parameters' section for more info on configurations.

The config paths are applied inside the container. This means you'll have to update the `./NHS_RMg_platform/launch_metagenomics_workflow_**.sh` apptainer call to bind the new destination and add an appropriate relative path to the config.

## How do I analyse previously run datasets with the workflow

The input format must be the original directory structure as output from ONT sequencing devices [see format here](https://nanoporetech.github.io/ont-output-specifications/latest/minknow/output_structure/). If you have data in this structure available, move it to the /data directory and it will be detected by the launcher. If you don’t want to move it to /data due to space issues etc, you can create a symlink.

You can fudge the structure by moving FASTQ files in the last directory created here. One barcode per sample:

`mkdir -p /data/my_experiment_name/my_experiment_name/test/fastq_pass/barcode01/my_data.fastq.gz`

You can also reconfigure the data directory to another source. Set `data_dir` in the config file to the desired destination. See the 'Technical information -> Metagenomics config parameters' section for more info on configurations.

The config paths are applied inside the container. This means you'll have to update the `./NHS_RMg_platform/launch_metagenomics_workflow_**.sh` apptainer call to bind the new destination and add an appropriate relative path to the config.

## The workflow is taking a while to launch and is running slowly

If using removable storage, the drive should be of a high specification and it should be plugged in to a USB 3.0 or greater port (often blue or red in colour).

We use the [SanDisk Extreme PRO Portable SSD - 4 TB](https://shop.sandisk.com/en-gb/products/ssd/external-ssd/portable-ssd-sandisk-extreme-pro-usb-3-2?sku=SDSSDE81-4T00-G25) which performs well and adds significant storage for analysis on sequencing devices.

## The NHS_RMg_platform disk or directory is using up too much space

Check the `NHS_RMg_platform/recycle_bin` directory is not full of old overwritten analyses. This should be purged periodically. 