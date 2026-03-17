import { Component, inject, signal, computed, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

import { debounceTime, distinctUntilChanged, map, Subject, switchMap, tap } from 'rxjs';

// Components
import { SideBar } from './components/side-bar/sidebar';
import { Preview } from './components/preview/preview';

// Services
import { ImageService } from '@services/image';

// Models
import { TransformOptions, Filter } from '@models/image';

@Component({
  selector: 'app-edit',
  imports: [CommonModule, FormsModule, SideBar, Preview],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class Edit implements OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private imageService = inject(ImageService);

  id = this.route.snapshot.paramMap.get('id')!;

  image = toSignal(this.imageService.Retrieve(this.id).pipe(map((res) => res.body)));

  // Transform state
  opts = signal<TransformOptions>({});
  previewUrl = signal<string | null>(null);
  originalUrl = computed(() => this.image()?.url ?? null);
  isPreviewing = signal(false);
  isSaving = signal(false);

  private transformSubject = new Subject<TransformOptions>();
  private blobUrls: string[] = [];

  private transformSub = this.transformSubject
    .pipe(
      debounceTime(500),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      tap(() => this.isPreviewing.set(true)),
      switchMap((opts) => this.imageService.Transform(this.id, opts)),
    )
    .subscribe({
      next: (res) => {
        if (res.body) {
          const url = URL.createObjectURL(res.body);
          this.blobUrls.push(url);
          this.previewUrl.set(url);
        }
        this.isPreviewing.set(false);
      },
      error: () => this.isPreviewing.set(false),
    });

  update(patch: Partial<TransformOptions>) {
    this.opts.update((o) => ({ ...o, ...patch }));
    this.transformSubject.next(this.opts());
  }

  toggleFilter(filter: Filter) {
    const current = this.opts().filters ?? [];
    const next = current.includes(filter)
      ? current.filter((f) => f !== filter)
      : [...current, filter];
    this.update({ filters: next });
  }

  toggleResize(enabled: boolean) {
    this.update({ resize: enabled ? { width: 800, height: 600 } : undefined });
  }

  toggleCrop(enabled: boolean) {
    this.update({ crop: enabled ? { x: 0, y: 0, width: 800, height: 600 } : undefined });
  }

  toggleWatermark(enabled: boolean) {
    this.update({
      watermark: enabled ? { text: '', opacity: 0.5, position: 'bottom-right' } : undefined,
    });
  }

  toggleCompress(enabled: boolean) {
    this.update({ compress: enabled ? { quality: 80 } : undefined });
  }

  updateCrop(field: string, value: number) {
    this.update({
      crop: { ...this.opts().crop!, [field]: value },
    });
  }

  save() {
    this.isSaving.set(true);
    this.imageService.Save(this.id).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.router.navigateByUrl('/galleries');
      },
      error: () => this.isSaving.set(false),
    });
  }

  goBack() {
    this.router.navigateByUrl('/galleries');
  }

  ngOnDestroy() {
    this.transformSub.unsubscribe();
    this.blobUrls.forEach((url) => URL.revokeObjectURL(url));
  }
}
