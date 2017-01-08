var gulp = require('gulp')
var fs = require('fs')
var notifier = require('node-notifier')
var browserify = require('browserify')
var watchify = require('watchify')
var tsify = require('tsify')

const BUILD_DIR = './build/'

var filesToBundle = [
  './src/scripts/myAnimeList.tsx',
  './src/scripts/background.ts'
]

var outputJavascriptMap = {}
outputJavascriptMap[filesToBundle[0]] = 'myanimelist.js'
outputJavascriptMap[filesToBundle[1]] = 'background.js'

var bundlers = filesToBundle.map(function(file) { return createBundler(file) })

function createBundler(entry) {
  return browserify({
    entries: [entry],
    cache: {},
    packageCache: {},
    extensions: ['.jsx'],
    plugin: [
      watchify,
      tsify
    ]
  })
}

function notify(error) {
  console.log(error)
  var fileName = error.message.match(/[^/]+$/)
  notifier.notify({title: fileName, message: error.description})
}

function bundle(bundler) {
  let outputFileName = outputJavascriptMap[bundler._options.entries[0]];

  bundler.bundle()
    .on('error', notify)
    .pipe(fs.createWriteStream(BUILD_DIR + outputFileName))
}

function copyContentToBuild() {
  try{
    fs.statSync('build')
  } catch(err) {
    fs.mkdirSync('build')
  }

  gulp.src(['src/manifest.json']).pipe(gulp.dest('build'))
}

gulp.task('bundle', function() {
  for (let i = 0; i < bundlers.length; i++) {
    bundle(bundlers[i]);
  }
})

gulp.task('build', function() {
  copyContentToBuild()
})

gulp.task('deployBuild', ['build', 'bundle'])
gulp.task('dev', ['build', 'bundle'], function() {
  for (let i = 0; i < bundlers.length; i++) {
    bundlers[i].on('update', function(ids) {
      bundle(bundlers[i])
    })
  }
})
gulp.task('default', ['dev'])
