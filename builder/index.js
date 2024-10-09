import fs from "node:fs";
import matter from "gray-matter";

// ------------ config --------------
const songsDir = "songs";
const distDir = "dist";
// ----------------------------------

import { makePage } from "./html.js";

const log = (...args) => {
  if (process.env.LOG && process.env.LOG == 1) {
    console.log(...args);
  }
};

/*
https://stackoverflow.com/questions/14917757/delete-unlink-files-matching-a-regex
*/
function cleanOldDist() {
  log("removing old dist");
  try {
    let regex = /[.]html$/;
    fs.readdirSync(distDir)
      .filter((f) => regex.test(f))
      .map((f) => fs.unlinkSync(`${distDir}/${f}`));
    log(" done");
  } catch (error) {
    console.error(error);
  }
}

function buildIndex({ indexList }) {
  log("making index");
  const htmlFileName = `index.html`;
  let htmlContent = `<h1>ക്രിസ്തീയ ഗീതങ്ങൾ</h1>`;
  htmlContent += `<div class="list">
  <ol>
  ${indexList
    .map((item) => `<li><a href="/${item.htmlFileName}">${item.title}</a></li>`)
    .join("")}
  </ol>
  </div>`;

  const fullHtml = makePage({
    content: htmlContent,
    title: "ക്രിസ്തീയ ഗീതങ്ങൾ",
    type: "index",
  });

  fs.writeFileSync(`${distDir}/${htmlFileName}`, fullHtml, {
    encoding: "utf-8",
  });
  log(" done");

  log("making index-search.json");
  const content = indexList.map((item) => item.search);
  const str = JSON.stringify(content);
  fs.writeFileSync(`${distDir}/index-search.json`, str, {
    encoding: "utf-8",
  });
  log(" done");
}

function processFile({ path }) {
  let processed = null;
  try {
    log(` processing: ${path}`);
    const data = fs.readFileSync(path, { encoding: "utf-8" });
    const gm = matter(data);
    const htmlFileName = `${gm.data.slug}.html`;
    let htmlContent = `<h1>${gm.data.title}</h1>`;
    htmlContent += `<div class="song">${gm.content}</div>`;

    const fullHtml = makePage({
      content: htmlContent,
      title: gm.data.title,
      type: "song",
    });

    fs.writeFileSync(`${distDir}/${htmlFileName}`, fullHtml, {
      encoding: "utf-8",
    });
    log(` done`);
    processed = {
      htmlFileName,
      title: gm.data.title,
      search: {
        ml: gm.data.title,
        en: gm.data.slug.replace(/_/g, " "),
        link: htmlFileName,
      },
    };
  } catch (error) {
    console.error(error);
  }
  return processed;
}

async function main() {
  try {
    cleanOldDist();
    const indexList = [];
    const fileNames = fs.readdirSync(songsDir);
    for (const file of fileNames) {
      log(`reading: ${file}`);
      const item = processFile({ path: `${songsDir}/${file}` });
      if (item) {
        indexList.push(item);
      }
    }
    buildIndex({ indexList });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
