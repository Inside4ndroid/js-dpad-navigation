const { rimraf } = require('rimraf');
const gulp = require('gulp');
const { spawn } = require('child_process');
const path = require('path');

const dst = path.join(__dirname, 'build');

gulp.task('clean', async () => {
  await rimraf(dst);
});

function runCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, { 
      stdio: 'inherit', 
      shell: true 
    });
    proc.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Command failed with code ${code}`));
      } else {
        resolve();
      }
    });
  });
}

gulp.task('build-browser', async () => {
  await runCommand('npx', ['rollup', '-c', 'rollup.config.js']);
});

gulp.task('build-node-lib', async () => {
  await runCommand('npx', ['tsc', '-p', 'tsconfig.node.json']);
});

gulp.task('build',
  gulp.series(
    'clean',
    gulp.parallel(
      'build-browser',
      'build-node-lib',
    ),
  )
);