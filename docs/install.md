# PATH-SAFE specifications

## Files to be provided

* A FASTQ 1 file containing the forward sequencing reads.
* A FASTQ 2 file containing the reverse sequencing reads.
* A CSV file containing the metadata associated with sequencing the sample.

## File naming convention

The base filenames should be of the form

```
pathsafe.[sample_id].[run_name].[extension]
```

where

* `[sample_id]` is the sample identifier assigned by the provider,
* `[run_name]` is the name of the sequencing run as given by the supplier's sequencing instrument (not an internal identifier assigned by the supplier),
* `[extension]` is the file extension indicating the file type.

## File name extensions

The extensions (`[extension]`) should be

* `1.fastq.gz` for the forward FASTQ file,
* `2.fastq.gz` for the reverse FASTQ file, and
* `csv` for the CSV metadata file.

## Valid characters

The `[sample_id]`, `[run_name]` and `[extension]` must contain only

* letters (`A-Z`, `a-z`),
* numbers (`0-9`),
* hyphens (`-`) or
* underscores (`_`).

## Buckets

Bucket names follow the general convention

```
pathsafe-[sequencing_org]-[platform]-[test_flag]
```

## Metadata specification

