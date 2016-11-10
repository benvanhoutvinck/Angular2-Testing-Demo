// app
import { BaseComponent, LogService } from '../../../core/index';

@BaseComponent({
  moduleId: module.id,
  selector: 'atd-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css']
})
export class ToolbarComponent {

  public title = 'Angular 2 Testing Demo :-)';

  constructor(private log: LogService) {}

  public openLanguages(e: any): void {
    this.log.debug('openLanguages');
  }
}
