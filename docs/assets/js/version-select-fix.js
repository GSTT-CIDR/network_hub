/**
 * Fix for mike version selector not appearing when a logo is configured
 * in the readthedocs theme. Mike's version-select.js expects an element
 * with class .icon-home, which doesn't exist when a logo image is used.
 * This script re-implements the version selector injection.
 */
window.addEventListener("DOMContentLoaded", function () {
  // If mike already injected the selector, do nothing
  if (document.getElementById("version-selector")) return;

  function expandPath(path) {
    var expanded = window.location.pathname.split("/");
    expanded.pop();

    path.split("/").forEach(function (bit, i) {
      if (bit === "" && i === 0) {
        expanded = [""];
      } else if (bit === "." || bit === "") {
        // stay in current dir
      } else if (bit === "..") {
        if (expanded.length > 1) expanded.pop();
      } else {
        expanded.push(bit);
      }
    });

    if (path.endsWith("/") || path.endsWith("/.") || path.endsWith("/.."))
      expanded.push("");
    return expanded.join("/");
  }

  var defined = typeof base_url !== "undefined";
  if (!defined) return;

  var ABS_BASE_URL = expandPath(base_url);
  var match = ABS_BASE_URL.match(/\/([^\/]+)\/$/);
  if (!match) return;

  var CURRENT_VERSION = match[1];

  fetch(ABS_BASE_URL + "../versions.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (versions) {
      var realVersion = versions.find(function (i) {
        return (
          i.version === CURRENT_VERSION ||
          i.aliases.includes(CURRENT_VERSION)
        );
      });
      if (!realVersion) return;
      realVersion = realVersion.version;

      var select = document.createElement("select");
      versions
        .filter(function (i) {
          return (
            i.version === realVersion ||
            !i.properties ||
            !i.properties.hidden
          );
        })
        .forEach(function (i) {
          var option = new Option(
            i.title,
            i.version,
            undefined,
            i.version === realVersion
          );
          select.add(option);
        });

      select.id = "version-selector";
      select.addEventListener("change", function () {
        window.location.href = ABS_BASE_URL + "../" + this.value + "/";
      });

      // Insert into the sidebar header, handling both logo and icon-home cases
      var sidebar = document.querySelector("div.wy-side-nav-search");
      if (sidebar) {
        var anchor =
          sidebar.querySelector(".icon-home") || sidebar.querySelector("a");
        if (anchor) {
          anchor.parentNode.insertBefore(select, anchor.nextSibling);
        } else {
          sidebar.appendChild(select);
        }
      }
    })
    .catch(function () {
      // Silently fail if versions.json is not available (e.g. local dev)
    });
});
