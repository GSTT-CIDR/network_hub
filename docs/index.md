<!-- Include jQuery directly -->
<script src="assets/js/jquery-1.8.2.js"></script>

# Respiratory Metagenomics Network Hub

The NHS Respiratory Metagenomics platform is a collection of software tools designed to enable rapid on-premises informatic analysis of metagenomic sequencing data on Oxford Nanopore Technologies (ONT) sequencing devices. All elements of setup and use are designed to be accessible to non-bioinformatician audiences. The software environment is set up for intuitive operation through graphical user interfaces with extensive workflow automation, yielding concise and actionable reports. 

Visit our new website for more information on the programme: [https://metagenomics.nhs.uk/](https://metagenomics.nhs.uk/)

## Network Sites

<style>
.map-outer {
    overflow: hidden;
    margin-left: -200px;
    width: calc(100% + 200px);
}

.map-container {
    position: relative;
    display: flex;
    align-items: stretch;
    width: 100%;
    height: 600px;
    margin: 20px 0;
}

.annotation-column {
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 0;
    flex-shrink: 0;
}

.annotation-column.left { padding-right: 10px; }
.annotation-column.right { padding-left: 10px; }

.annotation-slot {
    flex: 1;
    display: flex;
    align-items: center;
    min-height: 50px;
}

.annotation-slot.left { justify-content: flex-end; }
.annotation-slot.right { justify-content: flex-start; }

.annotation-card {
    background: transparent;
    border: none;
    border-radius: 6px;
    padding: -1px;
    text-align: center;
    box-shadow: none;
    max-width: 300px;
}

.annotation-card img {
    width: 230px;
    height: 80px;
    object-fit: contain;
    margin-bottom: 5px;
}

.annotation-card .site-name {
    font-size: 11px;
    font-weight: 600;
    color: #333;
    line-height: 1.2;
}

.map-wrapper {
    flex: 1;
    position: relative;
    min-width: 300px;
}

#ukMap {
    width: 100%;
    height: 100%;
}

.connector-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 100;
}

.connector-line {
    stroke: #005EB8;
    stroke-width: 1.5;
    stroke-dasharray: 5, 3;
    stroke-opacity: 0.5;
    fill: none;
}

.connector-dot {
    fill: #005EB8;
    fill-opacity: 0.5;
}
</style>

<div class="map-outer">
<div class="map-container" id="mapContainer">

    <svg class="connector-svg" id="connectorSvg"></svg>
    <div class="annotation-column left" id="leftColumn"></div>
    <div class="map-wrapper">
        <div id="ukMap"></div>
    </div>
    <div class="annotation-column right" id="rightColumn"></div>
</div>
</div>

<script>
$(document).ready(function(){
    // Configuration: 10 slots per side (1-10), null for empty slot
    // side: 'left' or 'right', slot: 1-10 (top to bottom)
    // imageWidth/imageHeight: dimensions in pixels for each logo
    // lineOffsetX/lineOffsetY: adjust where line connects to card (positive/negative pixels)
    var siteConfig = [
        {
            id: 'newcastle',
            name: '',
            latLng: [54.9783, -1.6178],
            image: 'img/logos/newcastle.svg',
            side: 'right',
            slot: 2,
            imageWidth: 230,
            imageHeight: 80,
            lineOffsetX: 0,
            lineOffsetY: 0
        },
        {
            id: 'manchester',
            name: '',
            latLng: [53.4839, -2.2446],
            image: 'img/logos/manchester.png',
            side: 'left',
            slot: 3,
            imageWidth: 180,
            imageHeight: 60,
            lineOffsetX: 0,
            lineOffsetY: 0
        },
        {
            id: 'cambridge',
            name: '',
            latLng: [52.2053, 0.1218],
            image: 'img/logos/cambridge.png',
            side: 'right',
            slot: 5,
            imageWidth: 180,
            imageHeight: 60,
            lineOffsetX: 20,
            lineOffsetY: 10
        },
                {
            id: 'belfast',
            name: '',
            latLng: [54.5973, -5.9301],
            image: 'img/logos/belfast.png',
            side: 'left',
            slot: 5,
            imageWidth: 180,
            imageHeight: 60,
            lineOffsetX: 0,
            lineOffsetY: 0
        },
        {
            id: 'bristol',
            name: '',
            latLng: [51.4545, -2.5879],
            image: 'img/logos/bristol.jpg',
            side: 'left',
            slot: 9,
            imageWidth: 180,
            imageHeight: 60,
            lineOffsetX: -40,
            lineOffsetY: 0
        },
        {
            id: 'cardiff',
            name: '',
            latLng: [51.4837, -3.1681],
            image: 'img/logos/cardiff.png',
            side: 'left',
            slot: 7,
            imageWidth: 230,
            imageHeight: 80,
            lineOffsetX: 0,
            lineOffsetY: 0
        },
                {
            id: 'barts',
            name: '',
            latLng: [51.5174, -0.0685],
            image: 'img/logos/barts.svg',
            side: 'right',
            slot: 6,
            imageWidth: 180,
            imageHeight: 50,
            lineOffsetX: 40,
            lineOffsetY: 0
        },
        {
            id: 'uclh',
            name: '',
            latLng: [51.5558, -0.1398],
            image: 'img/logos/uclh.jpg',
            side: 'right',
            slot: 8,
            imageWidth: 200,
            imageHeight: 80,
            lineOffsetX: -5,
            lineOffsetY: 0
        },
        {
            id: 'gosh',
            name: '',
            latLng: [51.5413, -0.1433],
            image: 'img/logos/gosh.png',
            side: 'right',
            slot: 9,
            imageWidth: 160,
            imageHeight: 50,
            lineOffsetX: 20,
            lineOffsetY: 0
        },
        {
            id: 'gstt',
            name: "",
            latLng: [51.4995, -0.1248],
            image: 'img/logos/gstt.png',
            side: 'right',
            slot: 7,
            imageWidth: 140,
            imageHeight: 50,
            lineOffsetX: -5,
            lineOffsetY: 0
        },
        {
            id: 'edinburgh',
            name: "",
            latLng: [55.9533395, -3.1891069],
            image: 'img/logos/lothian.png',
            side: 'right',
            slot: 2,
            imageWidth: 140,
            imageHeight: 50,
            lineOffsetX: 25,
            lineOffsetY: 0
        },
        {
            id: 'leicester',
            name: "",
            latLng: [52.6369, -1.1398],
            image: 'img/logos/leicester.png',
            side: 'right',
            slot: 4,
            imageWidth: 140,
            imageHeight: 60,
            lineOffsetX: 0,
            lineOffsetY: 0
        },
        {
            id: 'southampton',
            name: '',
            latLng: [50.9097, -1.4044],
            image: 'img/logos/southampton.png',
            side: 'left',
            slot: 10,
            imageWidth: 200,
            imageHeight: 60,
            lineOffsetX: -30,
            lineOffsetY: 0
        }
    ];

    var SLOTS_PER_SIDE = 10;

    // Build slot arrays
    var leftSlots = new Array(SLOTS_PER_SIDE).fill(null);
    var rightSlots = new Array(SLOTS_PER_SIDE).fill(null);

    siteConfig.forEach(function(site) {
        var slotIndex = site.slot - 1;
        if (site.side === 'left' && slotIndex >= 0 && slotIndex < SLOTS_PER_SIDE) {
            leftSlots[slotIndex] = site;
        } else if (site.side === 'right' && slotIndex >= 0 && slotIndex < SLOTS_PER_SIDE) {
            rightSlots[slotIndex] = site;
        }
    });

    // Render annotation slots
    function renderSlots(slots, columnId, side) {
        var $column = $('#' + columnId);
        $column.empty();
        slots.forEach(function(site, index) {
            var $slot = $('<div class="annotation-slot ' + side + '" data-slot="' + (index + 1) + '"></div>');
            if (site) {
                var imgWidth = site.imageWidth || 230;
                var imgHeight = site.imageHeight || 80;
                var $card = $(
                    '<div class="annotation-card" data-site-id="' + site.id + '">' +
                        '<img src="' + site.image + '" alt="' + site.name + '" style="width:' + imgWidth + 'px;height:' + imgHeight + 'px;" onerror="this.style.display=\'none\'">' +
                        '<div class="site-name">' + site.name + '</div>' +
                    '</div>'
                );
                $slot.append($card);
            }
            $column.append($slot);
        });
    }

    renderSlots(leftSlots, 'leftColumn', 'left');
    renderSlots(rightSlots, 'rightColumn', 'right');

    // Initialize map
    var mapObj = $('#ukMap').vectorMap({
        map: 'uk_mill',
        backgroundColor: 'none',
        zoomOnScroll: false,
        zoomButtons: false,
        regionStyle: {initial: {fill: '#e8e8e8'}},
        markerStyle: {
            initial: {
                fill: '#005EB8',
                stroke: '#FFFFFF',
                'stroke-width': 2,
                r: 6
            }
        },
        focusOn: {
            scale: 1,
            x: 0.5,
            y: 0.5,
            animate: false
        },
        markers: siteConfig.map(function(site) {
            return {latLng: site.latLng, name: site.name};
        }),
        onRegionTipShow: function(e) { e.preventDefault(); },
        onMarkerTipShow: function(e) { e.preventDefault(); }
    }).vectorMap('get', 'mapObject');

    // Draw connector lines
    function drawConnectors() {
        var $svg = $('#connectorSvg');
        $svg.empty();

        var $container = $('#mapContainer');
        var containerOffset = $container.offset();
        var $mapDiv = $('#ukMap');
        var mapOffset = $mapDiv.offset();

        siteConfig.forEach(function(site, index) {
            var markerPos = mapObj.latLngToPoint(site.latLng[0], site.latLng[1]);
            if (!markerPos) return;

            var $card = $('.annotation-card[data-site-id="' + site.id + '"]');
            if ($card.length === 0) return;

            var cardRect = $card[0].getBoundingClientRect();
            
            // Marker position relative to container
            var markerX = markerPos.x + (mapOffset.left - containerOffset.left);
            var markerY = markerPos.y + (mapOffset.top - containerOffset.top);

            // Card connection point relative to container
            var cardX, cardY;
            var offsetX = site.lineOffsetX || 0;
            var offsetY = site.lineOffsetY || 0;
            if (site.side === 'left') {
                cardX = cardRect.right - containerOffset.left + window.scrollX + offsetX;
                cardY = cardRect.top + cardRect.height / 2 - containerOffset.top + window.scrollY + offsetY;
            } else {
                cardX = cardRect.left - containerOffset.left + window.scrollX + offsetX;
                cardY = cardRect.top + cardRect.height / 2 - containerOffset.top + window.scrollY + offsetY;
            }

            // Create line
            var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', cardX);
            line.setAttribute('y1', cardY);
            line.setAttribute('x2', markerX);
            line.setAttribute('y2', markerY);
            line.setAttribute('class', 'connector-line');
            $svg.append(line);

        });
    }

    // Draw connectors after map renders
    setTimeout(drawConnectors, 500);
    $(window).on('resize', function() {
        setTimeout(drawConnectors, 100);
    });
});
</script>


## Lab protocols
The lab protocol is a same-day DNA/RNA extraction, host-depletion and ONT library preparation workflow for delivery of preliminary sequencing results in < 6 hours.

## Informatics workflow
The software runs from containers incorporating all dependencies for operation, leaving a minimal footprint on the host devices. Sequence databases sourced from publicly available NCBI databases are included, tuned specifically for respiratory specimen metagenome analysis. 

This document describes all facets of operating the NHS RMg platform, from initiation of sequencing experiments to generating reports.

## Reporting framework 
Speak to the GSTT clinical team for a copy of the reporting SOP. We recommend using this to help interpret results from the informatics workflow. 

## Software versions included in the 'Agnes' release:

|Application|Version|
|-|-|
|CIDR Metagenomics Workflow | v3.8.3 |
|Organism Query| v1.7.1|
|Summary Report| v1.4 |
|Deanonymisation tool| v1.0|
|Network Hub Launcher| v1.0|

: Agnes software version table

## Related documents

|Document|Version|
|--|--|
|Respiratory metagenomics network: validation outline |v1.0|
|Reporting of clinical metagenomic diagnostic test on respiratory samples |v1.1|
|Processing of Respiratory Samples for Metagenomic Sequencing |v1.0 | 
|nhs_rmg_cyber_sec |v1.1|
|mscape_rmg_protocol |v1.0|
|metagenomics_release_notes |v1.0|

: Related documents table

## Some history

St Thomas’ Hospital was founded in the 1100s. This release is named after two matrons of Royal St. Thomas’ Hospital in the 1500s. Agnes Lott and Agnes Snappe were the third and fifth recorded matrons of St. Thomas’ hospital. Agnes Lott was matron at St. Thomas’ from 1562-1572 and was succeeded by Ann Reader. Reader, however, was dismissed after three court appearances for "her fault with drink [alcohol], for that she hath been found very faulty of late." Agnes Snappe took over from Reader from 1580-1583. Reader’s name is not listed on the Matron’s board seen today at St. Thomas’ hospital, suggesting that her dismissal was considered significant enough to erase her from the hospital’s official record. 

In the 1500s, the title “matron” referred to a senior housekeeper and supervisor of female staff, not a trained nurse. The matron at St Thomas’ oversaw around ten ward sisters and was primarily responsible for domestic tasks rather than medical care. These tasks included laundry and cooking alongside a ‘number of odd jobs’ such as presenting the cases of offence for that week to the weekly governors meeting and helping the daytime baker make loaves of bread after the nighttime baker was sacked in 1563 for under-making bread.

_Research by Miren Sowden - Project Manager_

_Sources: The history of St. Thomas's Hospital (urn:oclc:record:1041046451)_