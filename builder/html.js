const head = ({ title = "ക്രിസ്തീയ ഗീതങ്ങൾ", siteName, subPath = "" }) => {
  const str = `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title} | Kristheeya geethangal</title>
      <meta name="title" content="${title} | Kristheeya geethangal" />
      <meta name="description" content="Malayalam songbook for popular christian songs" />
      <link rel="canonical" href="${siteName}/${subPath}" />
      <link rel="stylesheet" href="/assets/style.css?_=${new Date().getTime()}" />
      <link rel="icon" href="/favicon.svg" />
    </head>  
    <body>
  `;
  return str;
};

const nav = () => {
  const str = `
  <!-- navbar -->
    <nav>
      <div class="nav-items-wrapper">
        <div>
          <a href="/" class="home">&#127968;</a>
        </div>
        <div class="search-container">
          <input
            type="text"
            placeholder="🔍 Search"
            id="search-input"
            disabled
          />
        </div>
      </div>
    </nav>
  `;
  return str;
};

const search = () => {
  const str = `
  <div id="search" class="d-none">
    <h1>Search results 🔍</h1>
    <div id="search-results"></div>
  </div>`;

  return str;
};

const article = ({ content }) => {
  const str = `
  <article class="container">

  <div id="main">
  ${content}
  </div>
  
  ${search()}
  </article>
  `;
  return str;
};

const tail = () => {
  const str = `
  <div class="empty-height"></div>
  <script src="/assets/script.js"></script>
  </body>
</html>`;
  return str;
};

export const makePage = ({
  content,
  type = "index",
  title,
  siteName,
  subPath,
}) => {
  let html = `${head({ siteName, subPath })}`;
  if (title) {
    html = `${head({ title, siteName, subPath })}`;
  }
  html += `${nav()}`;
  html += `${article({ content })}`;
  html += `${tail()}`;

  return html;
};
