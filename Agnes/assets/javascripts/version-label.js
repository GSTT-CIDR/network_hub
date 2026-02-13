document.addEventListener("DOMContentLoaded", function () {
    var selector = document.getElementById("version-selector");
    if (selector) {
        var label = document.createElement("span");
        label.className = "version-label";
        label.textContent = "Select version";
        selector.parentNode.insertBefore(label, selector);
    }
});
