export type Image = {
  id: string;
  url: string;
  version: number;
  owner_id: string;
};

export type Format = 'jpeg' | 'png' | 'webp';
export type Filter = 'grayscale' | 'sepia';

export type WatermarkPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center';

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
  opacity: number;
  position: WatermarkPosition;
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
