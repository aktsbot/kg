# kg - ക്രിസ്തീയ ഗീതങ്ങൾ

This is the source code for https://kg.aktsbot.in/ - an online malayalam christian songbook.
The whole songbook is a set of statically generated html files from markdown files in the [songs](songs) folder.

## Getting started

Clone and setup the repo.

```
$ git clone https://github.com/aktsbot/kg
$ cd kg
$ npm i
```

Building the songbook is easy as running

```
$ export SITE_NAME="https://your-domain.com"
$ npm run build
```

Look at [builder/index.js](builder/index.js) config section to update default values.

To see logs of the build process, run it like so

```
$ LOG=1 npm run build
```

To see the generated songbook site, run

```
$ npm run serve
```

Visit http://localhost:3456 to see it running.

To deploy the songbook, copy over the [dist](dist) folder to
your server's www folder. Here's a sample nginx config.

```
server {
  listen 80;

  root /path/to/kg/dist;
  index index.html index.htm;

  server_name kg.mysite.com;

  location / {
    default_type "text/html";
    try_files $uri.html $uri $uri/ /index.html;
  }
}
```

Here's an rsync command to deploy the dist folder to your server

```
rsync -avzh -e 'ssh -p 6457 -i ~/.ssh/id_rsa_vps' --progress ./dist/* sshuser@1.2.3.4:/var/www/kg.mydomain.com/.
```

This assumes openssh server is running on port 6457(on your vps) and that rsync is installed(on your vps and on your local
machine). I usually put this command in a `deploy.sh` script in the root of this project and run that.

## What makes it different?

Manglish search for song titles. That's it!

## Thanks

- The songs are all credited to their `source` in the individual markdown files.
- The incredible [grey-matter](https://github.com/jonschlinkert/gray-matter) library.
- The fabulous [Manjari](https://smc.org.in/ml/fonts/manjari/) font.
