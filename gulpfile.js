const gulp = require("gulp");
const ts = require('gulp-typescript');
const mocha = require("gulp-mocha");
const babel = require('gulp-babel');

// import gulp from "gulp";
// import ts from'gulp-typescript';
// import mocha from "gulp-mocha";
// import babel from 'gulp-babel';

// gulp.task("set-local-node-env", (done) => {
//   process.env.ENV = "local";
//   done();
// });

const srcVal = "src/test/authtest.spec.js";

const mochaOptions = {
  reporter: "list",
  mongoosetimeout: 5000,
  exit: true,
};

gulp.task("local", (done) => {
  gulp.src(srcVal)
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(mocha(mochaOptions))
    .pipe(ts({
      noImplicitAny: true,
      outFile: 'output.js'
    }))
    .pipe(gulp.dest('built/local'));
  done();
});

// gulp.task("local", (done) => {
//   gulp.src(srcVal).pipe(ts(mocha(mochaOptions)));
//   done();
// });
