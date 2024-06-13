import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-rule',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './rule.component.html',
  styleUrl: './rule.component.scss',
})
export class RuleComponent implements OnChanges {
  @Input()
  texte: string = '';

  @Input()
  regex?: string;

  valid: boolean = false;

  expressionReguliere?: RegExp;

  ngOnInit() {

    if (this.regex) {
      this.expressionReguliere = new RegExp(this.regex);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['texte'] && this.expressionReguliere) {
      this.valid = this.expressionReguliere?.test(
        changes['texte'].currentValue
      );
    }
  }
}
