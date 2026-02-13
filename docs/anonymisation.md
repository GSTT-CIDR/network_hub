# Anonymisation

The Platform offers a solution to pseudo-anonymise metadata provided to the launcher. This process transforms any string in the 'Hospital Number' and 'Sample Accession' fields in to a study number with the following structure:

{SITE_ID}\_{FIELD_ID}\_{4_DIGIT_COUNT}

For example: GSTT_SA_0001

Key features of the pseudo-anonymisation framework:

* Repeat-sensitive mapping - the program will produce the same study number for matching input values provided across all runs.
* De-anonymisation lookup - A searchable lookup table is provided for de-anonymisation.
* Password protection - A password is required for any anonymisation operation.
* A 'Force anonymisation' switch, prompting users to anonymise before initiating analysis. 

## Setting up the anonymisation function

Before setting up anonymisation. Check the `./NHS_RMg_platform/configs/metagenomics_config_XXX.yaml` file. Ensure the 'site' field is completed appropriately. 

1. Open the Metagenomics Launcher.

2. Fill out the fields as previously instructed. 

3. Click the 'Anonymise' button. For first use, users will be prompted to create a password.

4. Follow the on-screen instructions.

5. Verify that the study number has been produced correctly.

!!! danger "Warning"
    There is no password recovery function. If the password is lost or the hidden files in the `NHS_RMg_platform/anonymisation` directory are deleted, linkage will be lost.

## De-anonymisation

1. Open the Deanonymisation Tool from the desktop icon.

2. Click on the 'Load Database' button.

3. Enter the password provided when setting up the anonymisation feature.

4. Use the search function to locate sample pairs. 

## Clearing or backing up anonymisation database

The database and the encryption database files are stored in the `NHS_RMg_platform/anonymisation` directory. The files are hidden. (https://help.ubuntu.com/stable/ubuntu-help/files-hidden.html.en)

To permanently delete the anonymisation lookup table, which will prompt reinitialisation  in the launcher, run the following command from inside the `anonymisation` directory:

```
rm .anonymisation_lookup.csv .anonymisation_lookup.csv.salt
```

To back up the anonymisation files, run:

```
cp .anonymisation_lookup.csv .anonymisation_lookup.csv.salt BACKUP_DESTINATION_PATH
```