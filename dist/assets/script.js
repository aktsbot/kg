// will be populated later by the loadSearchJSON method
let searchData = [];

function loadSearchJSON() {
  const input = document.querySelector("#search-input");

  fetch("/index-search.json")
    .then((res) => res.json())
    .then((data) => {
      searchData = data;
      input.disabled = false;
    });
}

function doSearch(text) {
  if (!searchData.length) {
    console.log("searchData is empty");
    return;
  }

  const filtered = searchData.filter((s) => s.en.includes(text.toLowerCase()));

  let html = "";
  if (filtered.length) {
    const lis = filtered.map(
      (f) => `<li><a href="/${f.link}">${f.ml}</a></li>`
    );
    html += `<ol>${lis.join("")}</ol>`;
  } else {
    html += "<h3>nothing found ☹️</h3>";
  }
  document.querySelector("#search-results").innerHTML = html;
}

function hookSearch() {
  const input = document.querySelector("#search-input");
  const searchDiv = document.querySelector("#search");
  const mainDiv = document.querySelector("#main");

  input.addEventListener("input", function (e) {
    const text = e.target.value;
    if (text) {
      // filter
      searchDiv.classList.remove("d-none");
      mainDiv.classList.add("d-none");
      doSearch(text);
    } else {
      // show old page content
      searchDiv.classList.add("d-none");
      mainDiv.classList.remove("d-none");
      document.querySelector("#search-results").innerHTML = "";
    }
  });
}

window.addEventListener(
  "DOMContentLoaded",
  function () {
    loadSearchJSON();
    hookSearch();
  },
  false
);
