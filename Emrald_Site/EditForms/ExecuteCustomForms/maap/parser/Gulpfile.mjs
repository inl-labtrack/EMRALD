import gulp from 'gulp';
import rename from 'gulp-rename';
import path from 'path';
import peggy from 'peggy';
import through from 'through2';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config.mjs';

/**
 * Builds the PEG parser.
 *
 * @returns The gulp stream.
 */
export async function buildParser() {
  return gulp
    .src(path.join('src', 'maapInpParser.pegjs'))
    .pipe(
      through.obj((grammarFile, enc, cb) => {
        const newFile = grammarFile.clone();
        newFile.contents = Buffer.from(
          peggy.generate(grammarFile.contents.toString(), {
            format: 'commonjs',
            output: 'source',
          }),
          enc,
        );
        cb(null, newFile);
      }),
    )
    .pipe(rename('parser.js'))
    .pipe(gulp.dest(path.join('dist')));
}

/**
 * Builds the distribution bundle.
 *
 * @returns The gulp stream.
 */
export async function buildBundle() {
  return gulp
    .src(path.join('src', 'index.ts'))
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(path.join('dist')));
}

export const build = gulp.series(buildParser, buildBundle);

export default build;
