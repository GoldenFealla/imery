import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';

// Models
import { Filter } from '@models/image';
import { ToggleValue } from '@spartan-ng/brain/toggle-group';

// Spartan
import { HlmToggleGroupImports } from '@spartan-ng/helm/toggle-group';

@Component({
  selector: 'sidebar-filter',
  imports: [HlmToggleGroupImports],
  template: `
    <section>
      <p class="text-xs font-medium text-muted-foreground mb-2">Filters</p>
      <hlm-toggle-group type="multiple" variant="outline" spacing="2" size="sm" [nullable]="true" (valueChange)="handleOnChnageFilters($event)">
        @for (f of filters; track f) {
          <button class="data-[state=on]:bg-primary data-[state=on]:text-background" hlmToggleGroupItem [value]="f">
            {{ f }}
          </button>
        }
      </hlm-toggle-group>
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
  filters: Filter[] = ['grayscale', 'sepia'];

  filter = output<Filter[]>();

  handleOnChnageFilters(value: ToggleValue<Filter>) {
    this.filter.emit(value as Filter[]);
  }
}
