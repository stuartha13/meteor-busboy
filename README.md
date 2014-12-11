Busboy 0.2.9 Packaged for Meteor
=====================================

The NPM package, [Busboy](https://github.com/mscdex/busboy), prepped for Meteor.

I packaged this simply so that I could use it in one of my own projects.

I can't guarantee that it will be regularly maintained.

Installation
-------------

With Meteor 1.0+:

```sh
$ meteor add shammar13:busboy
```

How to use
-------------
This snippet is adapted from [pmgration's comment](https://github.com/EventedMind/iron-router/issues/909#issuecomment-63055513) on the Iron Router issues page.

This snippet would belong in your Iron Router `routes.js` file.
```js
if (Meteor.isServer) {
    var fs = Npm.require("fs"),
        os = Npm.require("os"),
        path = Npm.require("path");

    Router.onBeforeAction(function(req, res, next) {
        var file = {}; // Store a file and then pass it to the request.

        if (req.method === "POST") {
            var busboy = new Busboy({
                headers: req.headers
            });
            busboy.on("file", function(fieldname, file, filename, encoding, mimetype) {
                var saveTo = path.join(os.tmpDir(), filename);
                var fileSizeBytes = 0;
                file.pipe(fs.createWriteStream(saveTo));

                file.on("data", function(data) {
                    fileSizeBytes = fileSizeBytes + data.length;
                });

                file.on('end', function() {
                    file = {
                        originalFilename: filename,
                        path: saveTo,
                        size: fileSizeBytes
                    };
                });
            });
            busboy.on("finish", function() {
                // Pass the file on to the request
                req.file = file;
                next();
            });
            // Pass request to busboy
            req.pipe(busboy);
        } else {
            next();
        }
    });
}
```

