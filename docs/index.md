<!-- Include jQuery directly -->
<script src="assets/js/jquery-1.8.2.js"></script>

# Metagenomics network hub

**The Network Hub is a resource for users of the CIDR clinical metagenomics workflow. Here, you can find SOPs, technical and FAQ/troubleshooting information regarding the implementation of metagenomics in a clinical evaluation/research setting.**

## Network Sites

<div class="card-body">
    <div id="ukMap" style="width: 100%; height: 500px; overflow: hidden;"></div>
</div>

<script>
    $(document).ready(function(){
        $('#ukMap').vectorMap({
            map: 'uk_mill',
            backgroundColor: "none",
            zoomOnScroll: false,
            zoomButtons: false,
            regionStyle: {initial: {fill: "lightgrey"}},
            markerStyle: {initial: {fill: '#005EB8', stroke: '#FFFFFF'}},
            focusOn: {
                scale: 1, // Adjust this value to set the zoom level
                x: 0.7, // X coordinate (0 to 1, left to right)
                y: 0.7, // Y coordinate (0 to 1, top to bottom)
                animate: false
            },
            markers: [
                {latLng: [51.4995, -0.1248], name: 'St. Thomas\' Hospital'},
                {latLng: [52.4862, -1.8904], name: 'University Hospitals Birmingham'},
                {latLng: [54.9783, -1.6178], name: 'Royal Victoria Infirmary - Newcastle'},
                {latLng: [51.752022, -1.257677], name: 'Oxford University Hospitals (OUH)'},
                {latLng: [50.9097, -1.4044], name: 'University Hospital Southampton'},
                {latLng: [51.5413, -0.1433], name: 'Great Ormond Street Hospital'},
                {latLng: [52.2053, 0.1218], name: 'Cambridge University Hospitals NHS Foundation Trust'},
                {latLng: [53.4839, -2.2446], name: 'Manchester University NHS Foundation Trust'},
                {latLng: [51.5558, -0.1398], name: 'University Collage London Hospital'},
            ],
            onRegionTipShow: function (e, label, code) {
                e.preventDefault();
            },
            onMarkerLabelShow: function(e, label, markerIndex){
                var markerName = this.markers[markerIndex].name;
                switch (markerName) {
                    case 'London':
                        label.html('Custom text for London');
                        break;
                    case 'Birmingham':
                        label.html('<b>Birmingham</b><br><p>Custom HTML content here...</p>');
                        break;
                    case 'Newcastle':
                        label.html('Custom text for Newcastle');
                        break;
                    case 'Sheffield':
                        label.html('Custom text for Sheffield');
                        break;
                    default:
                        label.html(markerName); // Fallback to default marker name
                        break;
                }
            }
        });
    });
</script>


### Lab protocols
The lab protocol is a same-day DNA/RNA extraction, host-depletion and ONT library preparation workflow for delivery of preliminary sequencing results in < 6 hours.

### Informatics workflow
The workflow covers the end-to-end processing of respiratory samples sequencing data, delivering a metageonomic report describing the microbial communities within them. The workflow leverages ONT Nanopore sequencing at its core to produce real-time sequencing data on the GridION platform. The informatics workflow runs locally alongside the sequencing experiment, producing reports as early as 30 minutes after commencing sequencing. 

### Reporting framework 
This SOP is followed to parse results from the informatics workflow for application in a clinical evaluation service setting.