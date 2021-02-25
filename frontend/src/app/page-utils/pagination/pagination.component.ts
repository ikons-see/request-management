import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Pager, PagerService } from './pager.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() totalItems: number;
  @Input() itemsPerPage: number;
  @Input() page: number;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  pager: Pager;
  constructor(private pagerService: PagerService) { }

  ngOnInit() {
    this.pager = this.pagerService.getPager(
      this.totalItems,
      this.page,
      this.itemsPerPage
    );
  }

  setPage(page: number) {
    if (this.isValidPage(page)) {
      this.pageChanged.emit(page - 1);
      this.scrollToTop();
    }
  }

  private isValidPage(page: number) {
    return (
      1 <= page &&
      page <= this.pager.totalPages &&
      page !== this.pager.currentPage
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pager = this.pagerService.getPager(
      this.totalItems,
      this.page,
      this.itemsPerPage
    );
  }

  private scrollToTop(): void {
    window.scroll({
      top: 0,
      left: 0
    });
  }
}
