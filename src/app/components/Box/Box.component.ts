import {  Component, inject, Input } from '@angular/core';
import { BoxStore } from '../../state/state';

import { Option } from '../../models/Box.model';

@Component({
  selector: 'app-box',
  standalone: true,
  templateUrl: './Box.component.html',
})
export class BoxComponent {
  @Input() id!: number;
  @Input() selectedOption?: Option | null;
  @Input() options!: Option[];
  @Input() selected!: boolean;

  readonly state = inject(BoxStore);

  constructor() {
  }

  selectBox(): void {
    this.state.selectBoxState(this.id);
  }

  getOptionBackgroundColor(): string {
    return this.selected ? '#81ffdb' : 'white';
  }
}
