import { Config } from '@stencil/core';
import { sass } from "@stencil/sass";

export const config: Config = {
  namespace: 'super-datepicker',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      baseUrl: 'https://super-datepicker.netlify.com',
      serviceWorker: null // disable service workers
    }
  ],
  plugins: [
    sass({
      includePaths: ['node_modules']
    })
  ]
};
