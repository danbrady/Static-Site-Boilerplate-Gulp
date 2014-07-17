# Static Site Boilerplate

A Gulp-powered project to build up the scaffolding for static site assets.

## Features

* Automatically compress PNG, GIF, JPG, and SVG files when added to folder
* Automatic linting (via JSHint and CSSlint), concatenation, and minification of JS and CSS files
* SASS and Autoprefixer integration
* Browser auto-refresh on save (via Livereload plugin)

##**Prerequisites**

- [NodeJS](http://nodejs.org/) and NPM
- Gulp (`npm install -g gulp`)
- [Livereload Plugins](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-) for Chrome, Firefox, and Safari (*Optional*)

## Running
1. Navigate to repo folder in terminal and run `npm install` (may need to `sudo npm install`)
2. Run `gulp` to start watching `src` directory for changes

## Notes

#### ***Compressing Images***

Placing any PNG, GIF, JPG, or SVG files into `src/images/_uncompressed` will create a compressed copy in `build/images/`:

#####**Example**

* `src/images/_uncompressed/image.png` --> `build/images/image.png`

#### Linting/Concatenating/Minifying JS
All files in `src/lib` folder are not part of the JS processing.
