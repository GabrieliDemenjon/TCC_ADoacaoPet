
import xss from 'xss';

export function sanitize(input: any) {
  if (typeof input !== 'string') return input;
  return xss(input || '');
}
