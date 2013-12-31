Sync module for nodejs
===========

Synchronizing async calls in nodejs (generators + yield)

To install simply run:

`npm install synchronode`

This turns this:
```javascript
  function logContents(sFileName) {
    fs.readFile(sFileName, 'utf8', function(s) {
      console.log(s);
    });
  }
```
  
into this:
```javascript
  Sync(function*(sFileName) {
    console.log(yield fs.readFile.sync(sFileName, 'utf8'));
  });
```
  
It also does this for every and any async method with callback specified as last parameter.

Blog post: <a href="http://dot-js.blogspot.com/2013/12/nodejs-async-to-sync-using-javascript.html">http://dot-js.blogspot.com/2013/12/nodejs-async-to-sync-using-javascript.html</a>
Enjoy!

  
