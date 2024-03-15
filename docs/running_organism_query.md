<!-- HTML imports for lightbox image display -->
<head>
<link href="assets/stylesheets/glightbox.min.css" rel="stylesheet"/><style>
<script src="assets/javascripts/glightbox.min.js"></script>
</head>

# Bioinformatics - Running metagenomics

![alt text](./img/organism_query_blank.png)


# Defaults
singularity exec --bind /tmp/.X11-unix:/tmp/.X11-unix --env DISPLAY=$DISPLAY organism_query_v1.3.sif  /bin/bash -c 'cd /organism_query/ ;source /opt/conda/etc/profile.d/conda.sh && conda activate organism_query && python launcher_defaults.py'