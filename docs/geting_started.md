# Uploading data

## Overview

Data in CLIMB-TRE is managed through a database called Onyx.
To upload data into Onyx, you must deposit the appropriate files
(including the metadata) into the relevant S3 bucket on CLIMB.
We recommend doing this using the AWS or `s3cmd` command-line tools.
For general information about how to upload data to CLIMB,
see the CLIMB docs on
[setting up `s3cmd` locally](https://docs.climb.ac.uk/storage/upload-local-to-s3/#using-s3cmd-on-the-command-line)
and [running `s3cmd` locally or on Bryn](https://docs.climb.ac.uk/storage/fetch-s3-to-notebook/).
You may also wish to review the overall
[CLIMB storage documentation](https://docs.climb.ac.uk/storage/).

Each CLIMB-TRE project requires data (e.g. FASTQ sequencing
reads) and metadata (e.g. a CSV file).  These must match
the relevant specification ("spec") and be uploaded to the appropriate
S3 bucket.  Doing so will trigger the ingest process.  Data that doesn't
meet the spec will not be ingested.

Lines starting with `$` indicate commands to be entered at a terminal.
The `$` represents the prompt, which might be different on your system.

## Preparing example FASTQ files

As an example, let's imagine we want to upload the two example files
in [Conor Meehan's Pathogen genomics course](https://conmeehan.github.io/PathogenDataCourse/Worksheets/GenomeAssembly_SPAdes)
as part of the mSCAPE project.
The two files are from [Hikichi et al. (2019)](https://journals.asm.org/doi/10.1128/MRA.01212-19),
`DRR187559_1.fastqsanger.bz2` and `DRR187559_2.fastqsanger.bz2`, available in
[this Zenodo archive](https://zenodo.org/records/4534098).  You can download the files
either by clicking on them in the Zenodo interface or with the common command line tools
`wget`:
```
$ wget https://zenodo.org/record/4534098/files/DRR187559_1.fastqsanger.bz2
$ wget https://zenodo.org/record/4534098/files/DRR187559_2.fastqsanger.bz2
```
or `curl`:
```
$ curl -L https://zenodo.org/record/4534098/files/DRR187559_1.fastqsanger.bz2 -O
$ curl -L https://zenodo.org/record/4534098/files/DRR187559_2.fastqsanger.bz2 -O
```

These two files are bzip2 files, not gzip, which is what we need.  We can convert
them by piping the output from `bzcat` (which decompresses the files) to `gzip -c`
(which compresses the stream and writes it to `STDOUT`) and then to new files:
```
$ bzcat DRR187559_1.fastqsanger.bz2 | gzip -c > DRR187559_1.fastq.gz
$ bzcat DRR187559_2.fastqsanger.bz2 | gzip -c > DRR187559_2.fastq.gz
```

The [mSCAPE specification](../mscape/) says that our files must have
names like `mscape.[sample_id].[run_name].[extension]`, where the
extension is `1.fastq.gz` or `2.fastq.gz`.  The `sample_id` and
`run_name` can in principle contain any alphanumeric characters,
underscores (`_`) or hyphens ('-'), so you can rename the FASTQ files
to whatever meets those requirements.
At the command line, this means moving the files with something like:
```
$ mv DRR187559_1.fastq.gz mscape.test-sample-id-01.test-run-01.1.fastq.gz
$ mv DRR187559_2.fastq.gz mscape.test-sample-id-01.test-run-01.2.fastq.gz
```

## Creating a metadata CSV file

Data uploads require that the FASTQ files are accompanied by a CSV file
with the metadata (e.g. when the sample was taken, what type of sample it is).
This CSV file must have two rows:

1. the headers, as in the project metadata specification; and
2. the actual metadata.

It's filename must match the FASTQ files but with the extension `csv` instead
of `1.fastq.gz` or `2.fastq.gz` (or `fastq.gz` if you're trying a single read
upload.

For the sake of our test and getting to know the system, you should try to
create such a file by hand by referring to the relevant metadata spec.
The columns are documented in alphabetical order but can be given in
any order.
The optional columns can be omitted entirely.
<!-- Is this true? -->
Note that the `sample_id` and `run_name` must *exactly* match the values
implied by the FASTQ filenames.  E.g., in my example above

* the `sample_id` is `test-sample-id-01` and
* the `run_name` is `test-run-01`.

The first few columns of your metadata CSV file might look like
```
sample_id,run_name,sample_site,sample_type,...
test-sample-id-01,test-run-01,other,other,...
```
with no extra spaces separating the fields.

## Uploading files to S3 buckets

You're now ready to upload your data to one of the buckets,
which we'll do using the `s3cmd` tool.
There's more information about using `s3cmd` with Bryn in the
[CLIMB-BIG-DATA documentation on storage](https://docs.climb.ac.uk/storage/upload-local-to-s3/#using-s3cmd-on-the-command-line).

You can download
`s3cmd` from the [`s3cmd` download pages](https://s3tools.org/download)
or install it using `pip` (perhaps in a virtual or Conda environment) with
```
$ python3 -m pip install s3cmd
```
To set `s3cmd` up to communicate with the buckets, you'll need your
API keys from Bryn.  You can find them by logging in to Bryn,
selecting the S3 Buckets tab on the left and click the Show API Keys
button that appears below the list of buckets.

You can then set up `s3cmd` with
```
$ s3cmd --configure
```
When asked for the following, you should give these answers:

* Access Key: value of `AWS_ACCESS_KEY_ID` displayed on Bryn.
* Secret Key: value of `AWS_SECRET_ACCESS_KEY` displayed on Bryn.
* Default Region [US]: leave blank.
* S3 Endpoint: `s3.climb.ac.uk`
* DNS-style bucket+hostname:port template for accessing a bucket: `%(bucket)s.s3.climb.ac.uk`

You now should be ready to upload the data.  But where?
The names of the S3 buckets for each project are given
in the metadata specs but are usually of the form
```
[project]-[sequencing_org]-[platform]-[test_flag]
```
We'll use `mscape-public-illumina-test`, so the command to "put"
the three files in the bucket would be
```
$ s3cmd put mscape.test-sample-id-01.test-run-01.csv mscape.test-sample-id-01.test-run-01.1.fastq.gz mscape.test-sample-id-01.test-run-01.2.fastq.gz s3://mscape-public-illumina-test
```
You should then see the progress of your upload (the files might be split into parts),
after which you're back at the terminal.

Now what?

## Finding the result of your upload

You won't get any feedback from `s3cmd` about the progress of your
data into Onyx.  When the data is received in the bucket, it announces
the files to whoever is listening, which includes a program called
Roz.  It then starts to check the data: Are all the files present? Are
they named correctly?  Is the metadata well-formed?  If so, the data
is copied into internal project buckets and a record is added to
the database, Onyx.

At this point, you can interact with your data through Onyx, which is
described in the page on [analysing data in Onyx](analyse.md).
