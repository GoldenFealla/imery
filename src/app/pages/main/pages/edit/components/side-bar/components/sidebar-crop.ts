import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

// Models
import { CropOptions } from '@models/image';

// Spartan
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';

// ngx-image-cropper
import { ImageCropperComponent, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'sidebar-crop',
  imports: [HlmButtonImports, HlmBadgeImports, ImageCropperComponent],
  template: `
    <section class="space-y-3">
      <div class="flex items-center justify-between">
        <p class="text-xs font-medium text-muted-foreground">Crop</p>
        <div class="flex items-center gap-2">
          @if (draft()) {
            <span
              hlmBadge
              variant="outline"
              class="h-4 text-[10px]"
              [class.text-green-500]="isValid()"
              [class.border-green-500/30]="isValid()"
              [class.text-destructive]="!isValid()"
              [class.border-destructive/30]="!isValid()"
            >
              {{ isValid() ? draft()!.width + ' × ' + draft()!.height : 'invalid' }}
            </span>
          }
          <input
            type="checkbox"
            [checked]="active()"
            (change)="toggle($any($event.target).checked)"
            class="accent-primary"
          />
        </div>
      </div>

      @if (active()) {
        <div class="rounded-md overflow-hidden border border-border/40">
          <image-cropper
            [imageURL]="url()"
            [maintainAspectRatio]="false"
            [resizeToWidth]="0"
            [cropperMinWidth]="10"
            [onlyScaleDown]="true"
            [roundCropper]="false"
            [canvasRotation]="0"
            [alignImage]="'center'"
            format="png"
            (imageCropped)="onCropped($event)"
            (imageLoaded)="onLoaded($event)"
            (cropperReady)="ready.set(true)"
            (loadImageFailed)="ready.set(false)"
            class="block max-h-48"
          />
        </div>

        <div
          class="rounded-md bg-muted/40 px-2 py-1.5 grid grid-cols-2 gap-x-3 text-[10px] text-muted-foreground"
        >
          <span>origin</span>
          <span>size</span>
          @if (draft()) {
            <span class="font-mono text-xs font-medium text-foreground">
              {{ draft()!.x }}, {{ draft()!.y }}
            </span>
            <span class="font-mono text-xs font-medium text-foreground">
              {{ draft()!.width }} × {{ draft()!.height }}
            </span>
          } @else {
            <span class="text-muted-foreground/50">—</span>
            <span class="text-muted-foreground/50">—</span>
          }
        </div>

        <div class="flex gap-2">
          <button hlmBtn variant="outline" size="sm" class="flex-1 h-7 text-xs" (click)="discard()">
            discard
          </button>
          <button
            hlmBtn
            size="sm"
            class="flex-1 h-7 text-xs"
            [disabled]="!isValid() || !isDirty()"
            (click)="commit()"
          >
            apply crop
          </button>
        </div>
      } @else {
        <p class="text-[11px] text-muted-foreground/60 leading-snug">
          Enable to draw a crop region on the image.
        </p>
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
  url = input.required<string | undefined>();
  crop = input<CropOptions | undefined>(undefined);
  imageWidth = input<number>(0);
  imageHeight = input<number>(0);

  cropChange = output<{ options: CropOptions; blob: Blob }>();
  cropClear = output<void>();

  active = signal(false);
  ready = signal(false);

  private event = signal<ImageCroppedEvent | null>(null);

  draft = computed<CropOptions | undefined>(() => {
    const e = this.event();
    if (!e?.cropperPosition) return undefined;
    const { x1, y1, x2, y2 } = e.cropperPosition;
    return {
      x: Math.round(x1),
      y: Math.round(y1),
      width: Math.round(x2 - x1),
      height: Math.round(y2 - y1),
    };
  });

  isValid = computed(() => {
    const d = this.draft();
    if (!d) return false;
    const iw = this.imageWidth();
    const ih = this.imageHeight();
    return (
      d.width > 0 &&
      d.height > 0 &&
      d.x >= 0 &&
      d.y >= 0 &&
      (!iw || d.x + d.width <= iw) &&
      (!ih || d.y + d.height <= ih)
    );
  });

  isDirty = computed(() => {
    const d = this.draft();
    const c = this.crop();
    if (!d) return false;
    if (!c) return true;
    return d.x !== c.x || d.y !== c.y || d.width !== c.width || d.height !== c.height;
  });

  toggle(enabled: boolean) {
    this.active.set(enabled);
    if (!enabled) {
      this.event.set(null);
      this.ready.set(false);
      this.cropClear.emit();
    }
  }

  onLoaded(_: LoadedImage) {
    // restore previous crop position if re-opening
    // ngx-image-cropper handles this via [cropper] input if needed
  }

  onCropped(e: ImageCroppedEvent) {
    this.event.set(e);
  }

  discard() {
    this.event.set(null); // cropper resets to full image
  }

  commit() {
    const e = this.event();
    const d = this.draft();
    if (!e?.blob || !d) return;
    this.cropChange.emit({ options: d, blob: e.blob });
  }
}
