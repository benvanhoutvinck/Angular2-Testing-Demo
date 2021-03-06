import { join } from 'path';
import { SeedAdvancedConfig } from './seed-advanced.config';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedAdvancedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

 this.SYSTEM_CONFIG['packages']['rxjs'] = {
      main: 'bundles/Rx.js',
      defaultExtension: 'js'
    };

 this.SYSTEM_CONFIG.packageConfigPaths =
      this.SYSTEM_CONFIG.packageConfigPaths.concat([
        `${this.APP_BASE}node_modules/@angular/material/*/package.json`
      ]);
     

       this.SYSTEM_BUILDER_CONFIG.paths['rxjs'] = `node_modules/rxjs/Rx.js`;
    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });
  }

}
