[![Build Status](https://travis-ci.org/mtronix/vanilla-frontend-starter.svg?branch=master)](https://travis-ci.org/mtronix/vanilla-frontend-starter)

# Vanilla frontend starter
Starter for static pages without JS frameworks. Useful for cutting from PSD to HTML or building simple landing pages

## Getting started

Before you use this project you must perform some operations.

### Installation

First, you must clone git repository from branch **master** (only last commit) typing command:
```
git clone --depth 1 https://github.com/mtronix/vanilla-frontend-starter.git
```

Then you should run a bash script that removes the repository from unnecessary files:
```
cd vanilla-frontend-starter && bash ./clean.sh
```
Above script is __self destroying__, file *clean.sh* will be deleted after run the script.
You can run it only once.

After cleanup you can install dependencies from [npm](https://npmjs.com/) and start developing new awesome website
```
npm install
```

### Building
To build website you should run below command:

```
npm run build
```
Webpack perform some optimalizations, minify js, css and add build hash to every emitted file.

If you want to see unminified html, comments in css and other useful features in stagging environment add *:pretty* suffix to build command:

```
npm run build:pretty
```

In the current directory a new *dist* folder will be created that contains the finished project.

### Deployment
Projects hosted on GitHub may use TravisCI as CI/CD tool free of charge.
Example configuration which build project and deploy on GitHub pages is in *.travis.yml* file.


Deployed website is available [here](http://vanilla-frontend-starter.github.mtronix.pl).

## License

The MIT License (MIT)

Copyright (c) 2018 Michał Jamrożek

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.