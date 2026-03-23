import { ChangeDetectionStrategy, Component, computed, effect, output, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { skip } from 'rxjs';

// Models
import { Format } from '@models/image';
import { ToggleValue } from '@spartan-ng/brain/toggle-group';

// Spartan
import { HlmToggleGroupImports } from '@spartan-ng/helm/toggle-group';

// Components
import { SidebarToggle } from './sidebar-toggle';

@Component({
  selector: 'sidebar-format',
  imports: [HlmToggleGroupImports, SidebarToggle],
  template: `
    <sidebar-toggle category="Format" [visible]="true" (isActive)="isActive.set($event)">
      <div class="flex gap-2">
        <hlm-toggle-group
          type="single"
          variant="outline"
          spacing="2"
          size="sm"
          [nullable]="true"
          [value]="empty"
          (valueChange)="handleOnSelect($event)"
        >
          @for (fmt of allFormats; track fmt) {
            <button hlmToggleGroupItem class="data-[state=on]:bg-primary data-[state=on]:text-background" size="sm" [value]="fmt">
              {{ fmt }}
            </button>
          }
        </hlm-toggle-group>
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
export class SidebarFormat {
  empty: Format[] = [];
  allFormats: Format[] = ['jpeg', 'png', 'webp'];

  format = output<Format | undefined>();

  f = signal<Format | undefined>(undefined);
  isActive = signal<boolean>(false);

  private watcher = computed<Format | undefined>(() => {
    if (!this.isActive()) return undefined;
    return this.f();
  });

  constructor() {
    toObservable(this.watcher)
      .pipe(skip(1))
      .subscribe((v) => this.format.emit(v));
  }

  handleOnSelect(fmt: ToggleValue<Format>) {
    this.f.set((fmt as Format | null) ?? undefined);
  }
}
