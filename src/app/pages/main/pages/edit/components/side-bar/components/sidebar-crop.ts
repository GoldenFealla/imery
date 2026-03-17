import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

// Models
import { CropOptions } from '@models/image';

@Component({
  selector: 'sidebar-crop',
  imports: [],
  template: `
    <section>
      <div class="flex items-center justify-between mb-2">
        <p class="text-xs font-medium text-muted-foreground">Crop</p>
        <input
          type="checkbox"
          [checked]="!!crop()"
          (change)="toggle($any($event.target).checked)"
        />
      </div>
      @if (crop()) {
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="text-xs text-muted-foreground">X</label>
            <input
              type="number"
              hlmInput
              [value]="crop()!.x"
              (change)="patch('x', +$any($event.target).value)"
              class="w-full mt-1"
            />
          </div>
          <div>
            <label class="text-xs text-muted-foreground">Y</label>
            <input
              type="number"
              hlmInput
              [value]="crop()!.y"
              (change)="patch('y', +$any($event.target).value)"
              class="w-full mt-1"
            />
          </div>
          <div>
            <label class="text-xs text-muted-foreground">Width</label>
            <input
              type="number"
              hlmInput
              [value]="crop()!.width"
              (change)="patch('width', +$any($event.target).value)"
              class="w-full mt-1"
            />
          </div>
          <div>
            <label class="text-xs text-muted-foreground">Height</label>
            <input
              type="number"
              hlmInput
              [value]="crop()!.height"
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
export class SidebarCrop {
  crop = input<CropOptions | undefined>(undefined);
  cropChange = output<CropOptions | undefined>();

  toggle(enabled: boolean) {
    this.cropChange.emit(enabled ? { x: 0, y: 0, width: 800, height: 600 } : undefined);
  }

  patch(field: keyof CropOptions, value: number) {
    this.cropChange.emit({ ...this.crop()!, [field]: value });
  }
}
