module.exports = {
  default: {
    require: [
      'features/step_definitions/**/*.js',
    ],
    format: ['progress', 'json:report/cucumber_report.json'],
    paths: ['features/**/*.feature'],
    parallel: 2,
    timeout: 60000, 
  },
};