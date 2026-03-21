import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

// Models
import { WatermarkOptions } from '@models/image';

// Spartan
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSliderImports } from '@spartan-ng/helm/slider';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';

@Component({
  selector: 'sidebar-watermark',
  imports: [HlmLabelImports, HlmInputImports, HlmSliderImports, HlmCheckboxImports],
  template: `
    <section class="space-y-3">
      <div class="flex items-center justify-between">
        <label hlmLabel class="text-xs font-medium">Watermark</label>
        <hlm-checkbox [checked]="!!watermark()" (checkedChange)="toggle($event)" />
      </div>

      @if (watermark(); as w) {
        <input
          hlmInput
          type="text"
          placeholder="Watermark text"
          [value]="w.text"
          (input)="patch('text', $any($event.target).value)"
          class="w-full"
        />

        <div class="space-y-1">
          <div class="flex items-center justify-between">
            <label hlmLabel class="text-xs">Size</label>
            <span class="text-xs text-muted-foreground">{{ w.size }}px</span>
          </div>
          <hlm-slider
            min="10"
            max="120"
            step="1"
            [value]="[w.size]"
            (valueChange)="patch('size', $event[0])"
          />
        </div>

        <div class="space-y-1">
          <div class="flex items-center justify-between">
            <label hlmLabel class="text-xs">Opacity</label>
            <span class="text-xs text-muted-foreground"> {{ (w.opacity * 100).toFixed(0) }}% </span>
          </div>
          <hlm-slider
            min="0"
            max="1"
            step="0.05"
            [value]="[w.opacity]"
            (valueChange)="patch('size', $event[0])"
          />
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div class="space-y-1">
            <label hlmLabel class="text-xs">X</label>
            <input
              hlmInput
              type="number"
              [value]="w.x"
              (input)="patch('x', +$any($event.target).value)"
              class="w-full"
            />
          </div>
          <div class="space-y-1">
            <label hlmLabel class="text-xs">Y</label>
            <input
              hlmInput
              type="number"
              [value]="w.y"
              (input)="patch('y', +$any($event.target).value)"
              class="w-full"
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
export class SidebarWatermark {
  watermark = input<WatermarkOptions | undefined>(undefined);
  watermarkChange = output<WatermarkOptions | undefined>();

  toggle(enabled: boolean) {
    this.watermarkChange.emit(
      enabled ? { text: '', size: 48, opacity: 0.5, x: 20, y: 20 } : undefined,
    );
  }

  patch<K extends keyof WatermarkOptions>(field: K, value: WatermarkOptions[K]) {
    this.watermarkChange.emit({ ...this.watermark()!, [field]: value });
  }
}
