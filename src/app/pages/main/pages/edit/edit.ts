import { Component, inject, signal, computed, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

import { combineLatest, debounceTime, distinctUntilChanged, map, Subject, switchMap, tap, timer } from 'rxjs';

// Components
import { SideBar } from './components/side-bar/sidebar';
import { Preview } from './components/preview/preview';

// Services
import { ImageService } from '@services/image';

// Models
import { TransformOptions } from '@models/image';

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
          this.previewUrl.set(url);
        }
        this.isPreviewing.set(false);
      },
      error: () => this.isPreviewing.set(false),
    });

  handleOnTransform(opts: TransformOptions) {
    this.opts.set(opts);
    this.transformSubject.next(opts);
  }

  save() {
    this.isSaving.set(true);
    combineLatest([this.imageService.Save(this.id, this.opts()), timer(1000)]).subscribe({
      next: () => this.router.navigateByUrl('/galleries'),
      complete: () => {
        this.isSaving.set(false);
      },
    });
  }

  goBack() {
    this.router.navigateByUrl('/galleries');
  }

  ngOnDestroy() {
    this.transformSub.unsubscribe();
  }
}
