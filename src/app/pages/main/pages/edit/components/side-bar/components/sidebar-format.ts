import { ChangeDetectionStrategy, Component, effect, output, signal } from '@angular/core';

// Models
import { Format } from '@models/image';
import { ToggleValue } from '@spartan-ng/brain/toggle-group';

// Spartan
import { HlmToggleGroupImports } from '@spartan-ng/helm/toggle-group';

// Components
import { SidebarToggle } from './sidebar-toggle';
import { SidebarCompress } from './sidebar-compress';

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

  constructor() {
    effect(() => {
      if (!this.isActive()) {
        this.format.emit(undefined);
        return;
      }
      this.format.emit(this.f());
    });
  }

  handleOnSelect(fmt: ToggleValue<Format>) {
    this.f.set((fmt as Format | null) ?? undefined);
  }
}
