import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-loading-view',
  templateUrl: './loading-view.component.html',
  styleUrls: ['./loading-view.component.scss']
})
export class LoadingViewComponent implements OnInit {

  @Input()
  icon: string = 'fa-search';

  @Input()
  message: string = this.translate.instant('loading-view.title');
  
  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
  }

}
