import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { skip } from 'rxjs';

// Models
import { FilterOptions, Filters, FilterType } from '@models/image';

// Spartan
import { HlmSliderImports } from '@spartan-ng/helm/slider';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';

// Components
import { SidebarToggle } from './sidebar-toggle';

type FilterEvent = { type: 'update'; data: FilterOptions } | { type: 'remove'; name: FilterType };

@Component({
  standalone: true,
  selector: 'sidebar-filter-option',
  imports: [HlmCheckboxImports, HlmSliderImports],
  template: `
    <div class="w-full flex flex-row items-center bg-card p-2 rounded-sm gap-3">
      <div>
        <hlm-checkbox [checked]="false" (checkedChange)="handleToggle($event)" />
      </div>
      <div class="flex-1">
        <div class="flex flex-col gap-3">
          <div class="flex flex-row items-center justify-between">
            <span class="text-sm text-muted-foreground font-semibold"> {{ name() }} </span>
            <span class="text-sm text-muted-foreground">{{ intensity().toFixed(2) }}</span>
          </div>
          <div class="mb-2">
            <hlm-slider
              min="0"
              max="1"
              step="0.01"
              [disabled]="!enabled()"
              [value]="[intensity()]"
              (valueChange)="handleOnChangeIntensity($event)"
            />
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarFilterOption {
  name = input.required<FilterType>();
  intensity = signal<number>(1);
  enabled = signal<boolean>(false);

  output = output<FilterEvent>();

  private emit() {
    this.output.emit({
      type: 'update',
      data: {
        name: this.name(),
        intensity: this.intensity(),
      },
    });
  }

  handleToggle(checked: boolean) {
    this.enabled.set(checked);

    if (!checked) {
      this.output.emit({ type: 'remove', name: this.name() });
    } else {
      this.emit();
    }
  }

  handleOnChangeIntensity(values: number[]) {
    this.intensity.set(values[0]);

    if (this.enabled()) {
      this.emit();
    }
  }
}

@Component({
  standalone: true,
  selector: 'sidebar-filter',
  imports: [SidebarToggle, SidebarFilterOption, HlmButtonImports],
  template: `
    <sidebar-toggle category="Filters" [visible]="true" (isActive)="isActive.set($event)">
      <div class="flex flex-col gap-1">
        @for (filter of setOfFilters; track $index) {
          <sidebar-filter-option [name]="filter" (output)="handleOnChangeFilter($event)"></sidebar-filter-option>
        }
      </div>
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
  setOfFilters = Filters;

  filter = output<FilterOptions[] | undefined>();

  isActive = signal<boolean>(false);
  current = signal<FilterOptions[]>([]);

  private watcher = computed<FilterOptions[] | undefined>(() => {
    if (!this.isActive()) return undefined;
    return this.current();
  });

  constructor() {
    toObservable(this.watcher)
      .pipe(skip(1))
      .subscribe((v) => {
        // console.log(v);
        this.filter.emit(v);
      });
  }

  handleOnChangeFilter(event: FilterEvent) {
    this.current.update((filters) => {
      if (event.type === 'remove') {
        return filters.filter((f) => f.name !== event.name);
      }

      const filter = event.data;
      const exists = filters.some((f) => f.name === filter.name);

      if (exists) {
        return filters.map((f) => (f.name === filter.name ? filter : f));
      }

      return [...filters, filter];
    });
  }
}
