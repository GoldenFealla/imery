import { ChangeDetectionStrategy, Component, computed, effect, output, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { skip } from 'rxjs';

// Models
import { Filter } from '@models/image';
import { ToggleValue } from '@spartan-ng/brain/toggle-group';

// Spartan
import { HlmToggleGroupImports } from '@spartan-ng/helm/toggle-group';

// Components
import { SidebarToggle } from './sidebar-toggle';

@Component({
  selector: 'sidebar-filter',
  imports: [HlmToggleGroupImports, SidebarToggle],
  template: `
    <sidebar-toggle category="Filters" [visible]="true" (isActive)="isActive.set($event)">
      <hlm-toggle-group type="multiple" variant="outline" spacing="2" size="sm" [nullable]="true" (valueChange)="handleOnChangeFilters($event)">
        @for (f of filters; track f) {
          <button class="data-[state=on]:bg-primary data-[state=on]:text-background" hlmToggleGroupItem [value]="f">
            {{ f }}
          </button>
        }
      </hlm-toggle-group>
    </sidebar-toggle>
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

  filter = output<Filter[] | undefined>();

  isActive = signal<boolean>(false);
  filtersState = signal<Filter[]>([]);

  private watcher = computed<Filter[] | undefined>(() => {
    if (!this.isActive()) return undefined;
    return this.filtersState();
  });

  constructor() {
    toObservable(this.watcher)
      .pipe(skip(1))
      .subscribe((v) => this.filter.emit(v));
  }

  handleOnChangeFilters(value: ToggleValue<Filter>) {
    this.filtersState.set(value as Filter[]);
  }
}
