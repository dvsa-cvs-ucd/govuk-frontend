// tasks/copyCustomScripts.js
import { join } from 'path'

import { task } from '@govuk-frontend/tasks'
import gulp from 'gulp'

/**
 * Copy custom scripts to dist path
 *
 * @type {import('@govuk-frontend/tasks').TaskFunction}
 */
export const copyCustomScripts = (options) => {
  console.log('Copying')
  return task.name(
    'copy:customScripts',
    () =>
      gulp
        .src('govuk/customExtension/scripts/**/*', {
          base: join(options.srcPath, 'govuk'),
          cwd: options.srcPath,
          encoding: false
        })
        .pipe(gulp.dest(options.destPath)) // Set custom destination
  )
}
