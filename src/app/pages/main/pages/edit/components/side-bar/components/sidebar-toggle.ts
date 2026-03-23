import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

// Spartan
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';

@Component({
  selector: 'sidebar-toggle',
  imports: [HlmCheckboxImports],
  template: `
    <section class="">
      <div class="flex items-center justify-between mb-2">
        <p class="text-xs font-medium text-muted-foreground">{{ category() }}</p>
        <hlm-checkbox [checked]="shown()" (checkedChange)="toggleVisible($event)" />
      </div>
      @if (shown()) {
        <ng-content></ng-content>
      }
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarToggle {
  category = input.required<string>();
  shown = signal<boolean>(false);

  toggleVisible(enabled: boolean) {
    this.shown.set(enabled);
  }
}
