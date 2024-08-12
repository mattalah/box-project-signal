import { Component, inject, Input } from '@angular/core';
import { BoxStore } from '../../state/state';
import { Option } from '../../models/Box.model';

@Component({
  selector: 'app-sub-box',
  standalone: true,
  imports: [],
  templateUrl: './SubBox.component.html'
})
export class SubBoxComponent {

  @Input() id!: number;
  @Input() selectedOption?: Option | null;
  @Input() option!: Option;

  readonly state = inject(BoxStore);

  constructor() { }

  selectOption(option: Option) {
    this.state.updateBoxState(this.id, option);
  }
  getOptionBackgroundColor(option: Option): string {
    return this.selectedOption?.id === option.id ? '#8d95f1d1' : 'white';
  }
}
