import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

// Models
import { TransformOptions } from '@models/image';
import { NgIcon, provideIcons } from '@ng-icons/core';

// Components
import { SidebarFilter } from './components/sidebar-filter';
import { SidebarFormat } from './components/sidebar-format';
import { SidebarFlipMirror } from './components/sidebar-flip-mirror';
import { SidebarRotate } from './components/sidebar-rotate';
import { SidebarCompress } from './components/sidebar-compress';
import { SidebarResize } from './components/sidebar-resize';
import { SidebarCrop } from './components/sidebar-crop';
import { SidebarWatermark } from './components/sidebar-wartermark';

// Icons
import { lucideArrowLeft, lucideLoader, lucideSave } from '@ng-icons/lucide';

@Component({
  selector: 'edit-sidebar',
  imports: [
    NgIcon,

    SidebarFilter,
    SidebarFormat,
    SidebarFlipMirror,
    SidebarRotate,
    SidebarCompress,
    SidebarResize,
    SidebarCrop,
    SidebarWatermark,
  ],
  providers: [provideIcons({ lucideArrowLeft, lucideLoader, lucideSave })],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBar {
  id = input.required<string>();
  opts = input.required<TransformOptions>();
  isSaving = input<boolean>(false);

  save = output<void>();
  back = output<void>();
  optsChange = output<Partial<TransformOptions>>();

  patch(partial: Partial<TransformOptions>) {
    this.optsChange.emit(partial);
  }
}
