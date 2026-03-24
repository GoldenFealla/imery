export type Image = {
  id: string;
  name: string;
  url: string;
  version: number;
  owner_id: string;
  updated_at: string;
};

export type Format = 'jpeg' | 'png' | 'webp';
export type Filter = 'grayscale' | 'sepia';

export type ResizeOptions = {
  width: number;
  height: number;
  keep_aspect: boolean;
};

export type CropOptions = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type WatermarkOptions = {
  text: string;
  size: number;
  opacity: number;
  x: number;
  y: number;
};

export type CompressOptions = {
  quality: number;
};

export type RotateOptions = {
  angle: number;
};

export type TransformOptions = {
  resize?: ResizeOptions;
  crop?: CropOptions;
  rotate?: RotateOptions;
  watermark?: WatermarkOptions;
  compress?: CompressOptions;
  flip?: boolean;
  mirror?: boolean;
  format?: Format;
  filters?: Filter[];
};

export type TransformOptionsKey = keyof TransformOptions;
