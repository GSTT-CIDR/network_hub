<!-- HTML imports for lightbox image display -->
<head>
<link href="assets/stylesheets/glightbox.min.css" rel="stylesheet"/><style>
<script src="assets/javascripts/glightbox.min.js"></script>
</head>
# Clinical metagenomics bioinformatics

## Overview
The principal output of the CIDR Metagenomics workflow is a PDF report listing organisms with detectable nucleic acids (RNA/DNA) and some additional information on AMR associated sequence data. The solution packages two applications - CIDR Metagenomics Workflow and [Organism Query](running_organism_query.md) alongside a few scripts to help manage and analyse outputs. The Metagenomics Workflow runs ontop of MinKNOW, analysing sequencing data in real time producing easily digested report. [Organism Query](running_organism_query.md) can be used to scrutinise classifications contained within a report. It leverages the full NCBI nt and RefSeq databases producing a report similar to NCBI BLAST in ~15 minutes. The Organism Query report is designed to provide the user with appropriate information to scrutinise a significant taxanomic classification. 

### mSCAPE
Users can opt in to [mSCAPE](mSCAPE_integration.md) on an per-experiment basis for an automatic upload of sequencing data to UKHSA mSCAPE. 

### Technical facets
After loading a metagenomic library on to an ONT sequencing device and launching the sequencing experiment in ONT MinKNOW the pipeline is initialised by the user through the Metagenomics Launcher graphical user interface (GUI). The software periodically ingests base called FASTQ data from the GridION ```/data/``` directory at set intervals - 0.5, 1, 2, 16 and 24 hours. At each interval, the pipeline performs human scrubbing, taxanomic classification, AMR detection and MLST which is then consolidated in to a PDF reports which are saved in the ```/media/grid/metagenomics/results/``` directory. The diagram below illustrates further details of how the pipeline works:  

![image](./img/pipeline%20digram.drawio.svg){data-title="Diagram of the metagenomics software package" data-description=""}
#### Taxanomic classification
At its core, the pipeline leverages a taxanomic classification tool called [Centrifuge](https://ccb.jhu.edu/software/centrifuge/manual.shtml). There a numerous alternatives, the most common being Kraken. We chose centrifuge namely because of its smaller memory footprint and existing deployment in ONT's WIMP. Each read in the raw data is aligned against an index, and is assigned a confidence score and a taxonomy. Our index is an optimised database of curated eukrayotic, prokaryotic, and viral reference sequences formed primarily from [NCBI RefSeq](https://en.wikipedia.org/wiki/RefSeq) and [FDA-ARGOS](https://www.fda.gov/medical-devices/science-and-research-medical-devices/database-reference-grade-microbial-sequences-fda-argos) databases. This is provided on the SSD sent to each site.

The index was built from the following [sequences](https://raw.githubusercontent.com/GSTT-CIDR/metagenomics_workflow/main/ref/centrifuge_db_v4.map) - this map file contains the accession number for each sequence in the database and the accompanying taxa ID. This file is required to assemble the Centrifuge index alongside the sequences in FASTA format. Before building the index, the sequences were masked using [BBmask](https://jgi.doe.gov/data-and-tools/software-tools/bbtools/bb-tools-user-guide/bbmask-guide/). This tool is applied primarily to prevent false-positive matches in highly-conserved or low-complexity regions of genomes. 


## Related code snippets
#### Masking a FASTA database using BBmask
```
bbmask.sh in=unmasked.fasta out=masked.fasta entropy=0.7 -Xmx80g  maskrepeats=t
```
#### Building a centrifuge index -
```
# --bmax needs tuning based on available memory.
centrifuge-build -p 10 --conversion-table accession2taxid.map --taxonomy-tree ./taxdump/nodes.dmp --name-table ./taxdump/names.dmp  masked.fasta centrifuge_index_v2 --bmax 1042177280
```