import { ChangeDetectionStrategy, Component, effect, input, linkedSignal, output, signal } from '@angular/core';

// Models
import { TransformOptions, TransformOptionsKey } from '@models/image';
import { NgIcon, provideIcons } from '@ng-icons/core';

// Components
import { SidebarResize } from './components/sidebar-resize';
import { SidebarRotate } from './components/sidebar-rotate';
import { SidebarFilter } from './components/sidebar-filter';
import { SidebarFormat } from './components/sidebar-format';
import { SidebarFlipMirror } from './components/sidebar-flip-mirror';
import { SidebarCompress } from './components/sidebar-compress';
import { SidebarCrop } from './components/sidebar-crop';
import { SidebarWatermark } from './components/sidebar-wartermark';

// Icons
import { lucideArrowLeft, lucideLoader, lucideSave } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'edit-sidebar',
  imports: [
    NgIcon,
    HlmButtonImports,

    // SidebarCrop,
    SidebarResize,
    SidebarRotate,
    SidebarFlipMirror,

    SidebarFilter,
    SidebarFormat,
    SidebarCompress,
    SidebarWatermark,
  ],
  providers: [provideIcons({ lucideArrowLeft, lucideLoader, lucideSave })],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBar {
  id = input.required<string>();
  back = output<void>();

  opts = signal<TransformOptions>({});
  optsChange = output<TransformOptions>();
  // url = input<string | null>(null);

  save = output<void>();
  isSaving = input<boolean>(false);

  handleOnChange<K extends keyof TransformOptions>(key: K, value: TransformOptions[K]) {
    this.opts.update((v) => ({ ...v, [key]: value }));
    this.optsChange.emit(this.opts());
  }
}
