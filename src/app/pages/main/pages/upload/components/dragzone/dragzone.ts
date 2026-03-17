import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

// Icons
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideUpload, lucideLoader } from '@ng-icons/lucide';

// Spartan
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';

@Component({
  selector: 'upload-dragzone',
  imports: [NgIcon, HlmSpinnerImports],
  providers: [provideIcons({ lucideUpload, lucideLoader })],
  templateUrl: './dragzone.html',
  styleUrl: './dragzone.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dragzone {
  // Inputs
  accept = input<string>('image/*');
  maxSizeMb = input<number>(20);
  isLoading = input.required<boolean>();

  // Outputs
  filesSelected = output<File[]>();

  // State
  isDragging = false;

  onDragOver(e: DragEvent) {
    e.preventDefault();
    this.isDragging = true;
  }

  onDrop(e: DragEvent) {
    e.preventDefault();
    this.isDragging = false;
    const files = this.filterFiles(Array.from(e.dataTransfer?.files ?? []));
    this.filesSelected.emit(files);
  }

  onFileSelect(e: Event) {
    const files = this.filterFiles(Array.from((e.target as HTMLInputElement).files ?? []));
    this.filesSelected.emit(files);
  }

  private filterFiles(files: File[]): File[] {
    const maxBytes = this.maxSizeMb() * 1024 * 1024;
    return files.filter((f) => f.size <= maxBytes);
  }
}
