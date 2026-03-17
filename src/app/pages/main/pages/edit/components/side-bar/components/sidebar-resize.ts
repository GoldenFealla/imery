import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

// Models
import { ResizeOptions } from '@models/image';

@Component({
  selector: 'sidebar-resize',
  imports: [],
  template: `
    <section>
      <div class="flex items-center justify-between mb-2">
        <p class="text-xs font-medium text-muted-foreground">Resize</p>
        <input
          type="checkbox"
          [checked]="!!resize()"
          (change)="toggle($any($event.target).checked)"
        />
      </div>
      @if (resize()) {
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="text-xs text-muted-foreground">Width</label>
            <input
              type="number"
              hlmInput
              [value]="resize()!.width"
              (change)="patch('width', +$any($event.target).value)"
              class="w-full mt-1"
            />
          </div>
          <div>
            <label class="text-xs text-muted-foreground">Height</label>
            <input
              type="number"
              hlmInput
              [value]="resize()!.height"
              (change)="patch('height', +$any($event.target).value)"
              class="w-full mt-1"
            />
          </div>
        </div>
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
export class SidebarResize {
  resize = input<ResizeOptions | undefined>(undefined);
  resizeChange = output<ResizeOptions | undefined>();

  toggle(enabled: boolean) {
    this.resizeChange.emit(enabled ? { width: 800, height: 600 } : undefined);
  }

  patch(field: keyof ResizeOptions, value: number) {
    this.resizeChange.emit({ ...this.resize()!, [field]: value });
  }
}
