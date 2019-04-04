/*
This code is based on https://stackblitz.com/edit/ngbootstrap-table?file=app/app.module.ts
*/
import { Directive, Input, Output, EventEmitter } from '@angular/core';

export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = {'asc': 'desc', 'desc': '', '': 'asc'}

export interface SortEvent {
    column: string;
    direction: SortDirection;
}

@Directive({
    selector: 'th[sortable]',
    host: {
        '[class.asc]': 'direction === "asc"',
        '[class.desc]': 'direction === "desc"',
        '(click)': 'rotate()'
    }
})
export class NgbdSortableHeader {

    @Input() sortable: string;
    @Input() direction: SortDirection = '';
    @Output() sort = new EventEmitter<SortEvent>();

    rotate() {
        this.direction = rotate[this.direction]; // rotate the direction
        this.sort.emit({column: this.sortable, direction: this.direction}); // send event with column and new direction
    }
}