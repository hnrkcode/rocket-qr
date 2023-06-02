import qr from 'qrcode';
import type { QRCodeRenderersOptions } from 'qrcode';

interface ErrorCorrectionLevel {
  name: string;
  fullName: string;
}

export const ERROR_CORR_LEVELS: Record<number, ErrorCorrectionLevel> = {
  7: { name: 'L', fullName: 'Low' },
  15: { name: 'M', fullName: 'Medium' },
  25: { name: 'Q', fullName: 'Quartile' },
  30: { name: 'H', fullName: 'High' }
};

export async function getCurrentTab() {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

export function getNearestErrorLevel(resistanceLevel: number): number {
  const values = Object.keys(ERROR_CORR_LEVELS);
  const nearest = values.reduce(function (prev: string, curr: string) {
    const prevNum = Number(prev);
    const currNum = Number(curr);
    return Math.abs(currNum - resistanceLevel) < Math.abs(prevNum - resistanceLevel) ? curr : prev;
  });

  return Number(nearest);
}

export function getErrorCorrectionLevel(resistanceLevel: number): {
  name: string;
  fullName: string;
} {
  return ERROR_CORR_LEVELS[resistanceLevel];
}

export function renderQR(
  canvas: HTMLCanvasElement | HTMLElement | null,
  url: string | undefined,
  options: QRCodeRenderersOptions
): void {
  if (url) {
    qr.toCanvas(canvas, url, options);
  } else {
    console.error('URL is undefined');
  }
}
