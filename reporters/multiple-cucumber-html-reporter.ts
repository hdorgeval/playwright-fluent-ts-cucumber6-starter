import path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const report = require('multiple-cucumber-html-reporter');

const projectName = path.basename(__dirname);
const projectVersion = process.env.npm_package_version;
const reportGenerationTime = new Date().toISOString();
report.generate({
  reportName: 'Cucumber Report',
  jsonDir: 'reports',
  reportPath: 'reports/multiple-cucumber-html-reporter',
  openReportInBrowser: true,
  disableLog: true,
  displayDuration: true,
  hideMetadata: false,
  displayReportTime: true,
  durationInMS: true,
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: `${projectName}` },
      { label: 'Release', value: `${projectVersion}` },
      { label: 'Report Generation Time', value: `${reportGenerationTime}` },
    ],
  },
});
