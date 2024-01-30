# Project specification structure

## Overview

All projects on CLIMB-TRE are specified in the same way.

## Files to be provided

These are the files that must be uploaded (usually some sequencing reads and a metadata file).
All the files must be provided for a sample to be processed.
Submissions without exactly the correct number of files will be considered incomplete and will not be processed.

## File naming convention

This is the convention to which the provided files must adhere.
It is usually several fields separated by full stops/periods (`.`).

Each of the files to be provided will use the same basename followed
by specified extensions (e.g. for data versus metadata).

The set of valid characters is usually limited to letters, numbers,
hyphens (`-`) and underscores (`_`) but this will be specified.
Submissions in which files haves names with forbidden characters or extensions
will not be processed.
Because `.` is usually the separator in the file naming convention,
it must only appear the number of times specified in the convention.

Other than a sample ID, no patient identifying information must appear
in the file names.

## File processing requirements

### FASTQ

* Must be gzipped.
* Must adhere fully to the FASTQ format.

### CSV

* Must be a plain text file with comma-delimited data.
* Must contain two rows: the first will contain the column names and the second will contain the data.
* Must have column names that match the specification exactly.
* Must not have missing data for required fields.
* Must not have invalid data (e.g. "N/A") to circumvent missing data checks.
* Must not contain metadata that contradicts the file name.
* Must use the latest version of the metadata specification.
* Must not use the sample ID in any field other than `sample_id`.

## Metadata specification

The metadata for each project is specified in tables detailing
required fields (which must not be empty) and optional fields (which
can be left empty).

## Project upload buckets

Files should be uploaded in S3 buckets specific to the combination of

* project (e.g. `pathsafe`),
* sequencing provider code (usually `sequencing_org` in the metadata),
* platform (e.g. `illumina`) and
* a flag to indicate a test (`test`) or production (`prod`) submission.

hosted on the S3 endpoint `s3.climb.ac.uk`.

All files must be placed in the root directory of the submission buckets.
Any S3 URI containing a directory will be ignored.