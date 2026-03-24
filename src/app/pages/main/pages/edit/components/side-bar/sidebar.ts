import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

// Models
import { TransformOptions } from '@models/image';
import { NgIcon, provideIcons } from '@ng-icons/core';

// Components
import { SidebarCrop } from './components/sidebar-crop';
import { SidebarResize } from './components/sidebar-resize';
import { SidebarRotate } from './components/sidebar-rotate';
import { SidebarFilter } from './components/sidebar-filter';
import { SidebarFormat } from './components/sidebar-format';
import { SidebarFlipMirror } from './components/sidebar-flip-mirror';
import { SidebarCompress } from './components/sidebar-compress';
import { SidebarWatermark } from './components/sidebar-wartermark';

// Icons
import { lucideArrowLeft, lucideLoader, lucideSave } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
import { HlmScrollAreaImports } from '@spartan-ng/helm/scroll-area';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'edit-sidebar',
  imports: [
    NgIcon,
    HlmButtonImports,
    HlmSeparatorImports,
    HlmScrollAreaImports,
    NgScrollbarModule,
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
  name = input<string>();

  opts = signal<TransformOptions>({});
  optsChange = output<TransformOptions>();

  isSaving = input<boolean>(false);
  save = output<void>();

  back = output<void>();

  handleOnChange<K extends keyof TransformOptions>(key: K, value: TransformOptions[K]) {
    this.opts.update((v) => ({ ...v, [key]: value }));
    this.optsChange.emit(this.opts());
  }
}
