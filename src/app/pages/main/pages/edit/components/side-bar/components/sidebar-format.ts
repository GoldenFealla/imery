import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';

// Models
import { Format } from '@models/image';
import { ToggleValue } from '@spartan-ng/brain/toggle-group';

// Spartan
import { HlmToggleGroupImports } from '@spartan-ng/helm/toggle-group';

@Component({
  selector: 'sidebar-format',
  imports: [HlmToggleGroupImports],
  template: `
    <section>
      <p class="text-xs font-medium text-muted-foreground mb-2">Format</p>
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
    </section>
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
  f = signal<Format | undefined>(undefined);

  format = output<Format | undefined>();

  handleOnSelect(fmt: ToggleValue<Format>) {
    this.format.emit((fmt as Format | null) ?? undefined);
  }
}
