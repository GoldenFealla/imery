import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { Filter } from '@models/image';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'sidebar-filter',
  imports: [HlmButtonImports],
  template: `
    <section>
      <p class="text-xs font-medium text-muted-foreground mb-2">Filters</p>
      <div class="flex gap-2">
        @for (filter of allFilters; track filter) {
          <button
            hlmBtn
            [variant]="filters()?.includes(filter) ? 'default' : 'outline'"
            size="sm"
            (click)="toggle(filter)"
          >
            {{ filter }}
          </button>
        }
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarFilter {
  allFilters: Filter[] = ['grayscale', 'sepia'];
  filters = model<Filter[]>();

  toggle(filter: Filter) {
    let fils = this.filters();
    if (fils) {
      const next = fils.includes(filter) ? fils.filter((f) => f !== filter) : [...fils, filter];
      this.filters.set(next);
    }
  }
}
