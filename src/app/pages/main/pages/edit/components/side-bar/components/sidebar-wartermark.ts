import { ChangeDetectionStrategy, Component, computed, effect, model, output, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { skip } from 'rxjs';

// Models
import { WatermarkOptions } from '@models/image';

// Spartan
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSliderImports } from '@spartan-ng/helm/slider';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { SidebarToggle } from './sidebar-toggle';

@Component({
  selector: 'sidebar-watermark',
  imports: [HlmLabelImports, HlmInputImports, HlmSliderImports, HlmCheckboxImports, SidebarToggle],
  template: `
    <sidebar-toggle category="Watermark" (isActive)="isActive.set($event)">
      <div class="space-y-4">
        <input hlmInput type="text" placeholder="Watermark text" [value]="text()" (input)="handleOnChangeText($event)" />
        <div class="space-y-1">
          <div class="flex items-center justify-between">
            <label hlmLabel class="text-xs">Size</label>
            <span class="text-xs text-muted-foreground">{{ size() }}px</span>
          </div>
          <hlm-slider min="10" max="120" step="1" [value]="[size()]" (valueChange)="handleOnChangeSize($event)" />
        </div>

        <div class="space-y-1">
          <div class="flex items-center justify-between">
            <label hlmLabel class="text-xs">Opacity</label>
            <span class="text-xs text-muted-foreground"> {{ (opacity() * 100).toFixed(0) }}% </span>
          </div>
          <hlm-slider min="0" max="1" step="0.05" [value]="[opacity()]" (valueChange)="handleOnChangeOpacity($event)" />
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div class="space-y-1">
            <label hlmLabel class="text-xs">X</label>
            <input hlmInput type="number" [value]="x()" class="w-full" (input)="handleOnChangeX($event)" />
          </div>
          <div class="space-y-1">
            <label hlmLabel class="text-xs">Y</label>
            <input hlmInput type="number" [value]="y()" class="w-full" (input)="handleOnChangeY($event)" />
          </div>
        </div>
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
export class SidebarWatermark {
  text = signal<string>('watermark');
  size = signal<number>(16);
  opacity = signal<number>(0.75);
  x = signal<number>(20);
  y = signal<number>(20);

  isActive = signal<boolean>(false);

  watermark = output<WatermarkOptions | undefined>();
  private watcher = computed<WatermarkOptions | undefined>(() => {
    if (!this.isActive()) return undefined;
    return {
      text: this.text(),
      size: this.size(),
      opacity: this.opacity(),
      x: this.x(),
      y: this.y(),
    };
  });

  constructor() {
    toObservable(this.watcher)
      .pipe(skip(1))
      .subscribe((v) => this.watermark.emit(v));
  }

  handleOnChangeText(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.text.set(value);
  }

  handleOnChangeSize(value: number[]) {
    this.size.set(value[0]);
  }

  handleOnChangeOpacity(value: number[]) {
    this.opacity.set(value[0]);
  }

  handleOnChangeX(event: Event) {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    this.x.set(value);
  }

  handleOnChangeY(event: Event) {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    this.y.set(value);
  }
}
