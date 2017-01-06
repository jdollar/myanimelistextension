var gulp = require('gulp')
var fs = require('fs')
var notifier = require('node-notifier')
var browserify = require('browserify')
var watchify = require('watchify')
var tsify = require('tsify')

var bundler = browserify({
  entries: ['./src/ts/App.tsx'],
  cache: {},
  packageCache: {},
  extensions: ['.jsx'],
  plugin: [
    watchify
  ]
}).plugin(tsify, { noImplicitAny: true })

function notify(error) {
  console.log(error.message)
  var fileName = error.message.match(/[^/]+$/)
  notifier.notify({title: fileName, message: error.description})
}

function bundle() {
  bundler.bundle()
    .on('error', notify)
    .pipe(fs.createWriteStream('./build/myanimelist.js'))
}

function copyContentToBuild() {
  try{
    fs.statSync('build')
  } catch(err) {
    fs.mkdirSync('build')
  }

  gulp.src(['src/**/*', '!src/ts/', '!src/ts/{*,**}']).pipe(gulp.dest('build'))
}

gulp.task('bundle', function() {
  bundle()
})

gulp.task('build', function() {
  copyContentToBuild()
})

gulp.task('deployBuild', ['build', 'bundle'])
gulp.task('dev', ['build', 'bundle'], function() {
  bundler.on('update', bundle)
})
gulp.task('default', ['dev'])
