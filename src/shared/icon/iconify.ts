import type { IconifyIcon } from '@iconify/types';

export function iconifyToNgIcons(icons: Record<string, IconifyIcon>): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [name, icon] of Object.entries(icons)) {
    const width = icon.width ?? 24;
    const height = icon.height ?? 24;

    result[name] = `
      <svg xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 ${width} ${height}"
           fill="none">
        ${icon.body}
      </svg>
    `.trim();
  }

  return result;
}
