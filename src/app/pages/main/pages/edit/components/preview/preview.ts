import { ChangeDetectionStrategy, Component, ElementRef, input, ViewChild } from '@angular/core';

// Panzoom
import Panzoom, { PanZoom } from 'panzoom';

// Icons
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLoader } from '@ng-icons/lucide';

@Component({
  selector: 'edit-preview',
  imports: [NgIcon],
  templateUrl: './preview.html',
  providers: [provideIcons({ lucideLoader })],
  styleUrl: './preview.css',
  host: { class: 'flex-1' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Preview {
  url = input<string | null>(null);
  isPreviewing = input<boolean>(false);

  private panzoomInstance!: PanZoom;
  @ViewChild('imageElement') imageElement!: ElementRef<HTMLImageElement>;

  ngAfterViewInit() {
    const el = this.imageElement?.nativeElement;

    if (el) {
      this.panzoomInstance = Panzoom(el, {
        bounds: false,
      });
    }
  }

  ngOnDetroy() {
    this.panzoomInstance.dispose();
  }
}
