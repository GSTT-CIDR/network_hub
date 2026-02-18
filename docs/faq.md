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

## Our site has a firewall - how do I know I can upload to mSCAPE

Configure 

`apptainer exec  --bind ./:/mnt --bind ~/.aws:/root/.aws   ./containers/mSCAPE_uploader_v0.5.sif bash -c 'source /opt/conda/etc/profile.d/conda.sh && conda activate cmg  ; aws --profile climb --endpoint https://s3.climb.ac.uk s3 ls'`

## Organism Query is not able to find my 'Unclassified' reads

Reach out to the team at GSTT and request a fixed version of the container. To update, make the two following changes:

1. copy `organism_query_v1.7.2.sif` in to `NHS_RMg_platform/containers`
2. Replace `launch_organism_query_agnes.sh` with the updated version, or edit it to point to the updated v1.7.2 container version.

## The summary report tool is not launching

Try starting the `launcher` from the terminal in the NHS_RMg_platform directory. The output error might look something like this:

```
./launch_summary_report_agnes.sh 
Starting Summary Report...
WARNING: skipping mount of /home/username/.aws: stat /home/username/.aws: no such file or directory
INFO:    Terminating squashfuse_ll after timeout
INFO:    Timeouts can be caused by a running background process
FATAL:   container creation failed: mount hook function failure: mount /home/username/.aws->/root/.aws error: while mounting /home/username/.aws: mount source /home/username/.aws doesn't exist
```

If this is the case, you can fix it using one of the two methods:

1.	Create a dummy directory in your gru home directory called .aws running the command `mkdir ~/.aws` in the terminal.
2.	Edit the launch_summary_report_agnes.sh script in the NHS_RMg_platform folder and remove the `--bind ~/.aws:/root/.aws` section in the apptainer call.

## Can I run multiple instances of the Organism Query to sample more than 50 reads?

Yes, Organism Query uses a randomisation function. Entering the same taxon (or unclassified) in multiple query fields will increase the data sampled, providing there are sufficient reads. Importantly, being randomised, there may be overlap in samples depending on number of available reads. 