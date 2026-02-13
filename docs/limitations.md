# Known Limitations

See below a list of limitations identified during testing. This is not an exhaustive list. Classification results should always be scrutinised by a trained bioinformaticican. Always defer to internal governance and _in-vitro_ reflex testing. 

## Organism database representation

The workflow will not detect organisms which are not represented in the classification databases. For a list of taxa included in the database, visit the Network Hub 'Genome Database' section.

## Misclassification

All taxonomic classification tools are prone to misclassifying reads. In cases where low accuracy is suspected, run an Organism Query and perform reflex lab testing following internal governance. We flag three common causes for misclassification below. Consider these when analysing report data.

1. **Closely related species**, conserved genes across related species, sometimes across genera, confound k-mer based analyses. As with MALDI-TOF or 16S, genera like *Streptococcus* prove difficult to differentiate. Multiple occurrences of species from the same genus or closely related genera may be shown on reports, which are often from a single or fewer source species.

2. **Mobile genetic elements**: Plasmids and phage genomes are present in the reference database. When a plasmid sequence is associated with a specific reference taxon, detection of that plasmid in an unrelated organism can result in misclassification to the original reference taxon. Two prominent examples of this are:

    1. *Bacillus anthracis* - Sometimes indicated green on Auto Query. Elements of a plasmid associated with the reference sequence of *B.anthracis* found in both the CIDR and BLAST databases which can originate from Non-_Bacillus_ spp.. 
    2. *Klebsiella pneumoniae* (seen regularly in the Negative Control) - A plasmid derived from the kit-ome, classified incorrectly as _Klebsiella pneumoniae_ or E._coli_ detections.
    3. *Neisseria gonorrhoeae* -  A plasmid commonly found across commensal *Neisseria* spp. falsely identified as *Neisseria gonorrhoeae* in reports. Run Organism Query to verify non-plasmid reads.

3. **Low complexity regions**: Homopolymers, repeats, GC rich/poor sequences. For suspected spurious classifications, check the BLAST alignment section of the Organism Report. Disregard detections featuring consistently low quality sequence data. 

4. **Limited or no representation in the classification database**. Reads originating from taxa without sufficient representation in the database will often find *the next best match*. Inspect the Organism Report plot for % identity to better understand the *fit* of the alignment subject sequence. Reads originating from species without adequate representation may also appear in the 'Unclassified' section on the report.

**Other noteworthy systematic misclassifications:**
Aspergillus, Pneumocystis, Candida and other common fungi - low quality reference sequences and conserved genes result in frequent misclassification, confounding both primary and orthogonal analysis  

## Human metapneumovirus sensitivity

Version 16 of the classification database (bundled with Agnes) has exhibited a decline in read count for HPMV detections. We have not observed any false-negatives because of this, but there is a possibility this may happen.

## Report transmission

Metagenomics HTML reports must be bundled with the `automated_queries` directory and its contents in the same relative path as published for the 'Open report' function to operate on the primary Metagenomics Report page. When transmitting reports outside of the NHS RMg platform environment, we suggest zipping the relevant report directory (including HTML/PDF reports and automated_queries) in place.

The Organism Query reports are fully portable with interactive plots.

## Eukaryotic binning

In cases where there is an abundance of eukaryotic rRNA/mitochondrial material reads, low-abundance fungal detections comprised only of rRNA read data may be missed through a 'smokescreen' effect. For example, there may be 80 eukaryotic rRNA/mitochondrial material reads originating from the _Nicotiana tabacum_ often introduced to the library by the TMV spike-in. There may be a single read of *Aspergillus* spp. which may not appear in the Auto Query report which will only automatically query a subsample of 25 reads. This scenario has not been observed throughout validation.

## Divergent sequence detection

Divergent sequences, those which differ significantly from their representatives in our databases, are less likely to be detected by k-mer classification tools which are featured in this workflow. For example, virus strains with limited representation in the database may not be detected. Consider alternative analyses employing larger databases or more appropriate alignment techniques where novel pathogens or divergeant strains are suspected.

## Unclassified reads

Users should check the 'Unclassified' count in the 'Quality Control' section on Metagenomics Reports. Abnormal rates of unclassified reads are indicative of either low quality read data or the presence of a taxon not well represented in the Centrifuge database. 

Organism Query is capable of analysing a small subset (50) of reads from the unclassified bin, however, this may not be sufficient to make low abundance detections in large sets of unclassified reads. Consider alternative analyses employing larger databases or more appropriate alignment techniques if consequential unclassified reads are suspected. 

## Database changes

New versions of the classification database yield different results compared to previous versions of the workflow. In some cases, virus read counts can be diminished, and in some cases, detections may be lost. 

See the GSTT/Synnovis change control document for more information.

## Running concurrent instances of the workflow

This workflow version consumes significantly more computational resources than previous releases. To prevent system instability and workflow crashes, **do not run more than two concurrent workflow instances simultaneously** on a GridION device.

To mitigate this limitation, users should:

* Stage and group analysis runs to launch together from a single Metagenomics Launcher instance. Analyse multiple flow cells or libraries simultaneously by populating all samples in one Launcher window before initiating the workflow.

Multiple parallel experiments in MinKNOW/Gourami can be launched at any point. This section refers only to the Metagenomics Launcher.

Changing the `blast_slots` count and `mem_slots` in the configuration file can adapt performance to machines with fewer or more resources. See 'Technical Information -> Metagenomics config parameters' For example:

**For devices with 128 GB memory and 64 CPI threads:**

|Parameter| Value |
|-|-|
|parallel_instances| 16 |
|mem_slots | 5 |
|blast_slots| 5 |

**For devices < 64 GB memory and < 18 CPU threads:**

|Parameter| Value |
|-|-|
|parallel_instances | 8 |
|mem_slots|  1 |
|blast_slots |1 |

## Software bugs

1. The Auto Query traffic light tooltips will not appear if there is insifficient room on the browser window. Increase the size of the window, scroll up/down or zoom out if the tooltip is not appearing.

2. Auto Query reports are overwritten at each timepoint and only the latest is kept. For example: an Auto Query report linked to the Metagenomics Report at 0.5 hours shortly after the 0.5 hour publication timepoint will change when the next timepoint's Auto Query reports are generated. Note: This will only affect the Organism Report, not the 'traffic light' or the information on the traffic light popup.

3. If the 'FullPath' header is present in a sample sheet, the workflow will use the content of that field only to find input data. Ensure the header is not present if legacy data ingest is required. See 'Technical Information -> Metagenomics Workflow ->  Q-line raw data storage and Force legacy ingest' for more info.

4. When only human reads are present in the sequencing dataset '*Homo sapiens*' will be shown in the 'above threshold' section of the report. This is intended behaviour. However, the 'microbial' count on the report will erroneously show the count of human reads.
