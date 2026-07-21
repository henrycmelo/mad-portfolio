import DOMPurify from 'isomorphic-dompurify';

/**
 * Style properties the editor is allowed to emit. Anything else (position,
 * background-image, ...) is dropped so stored content can't break the layout.
 */
const ALLOWED_STYLE_PROPS = new Set([
  'font-size',
  'font-family',
  'color',
  'text-align',
  'font-weight',
  'font-style',
]);

const ALLOWED_TAGS = [
  'p',
  'br',
  'span',
  'strong',
  'b',
  'em',
  'i',
  'u',
  's',
  'h2',
  'h3',
  'h4',
  'ul',
  'ol',
  'li',
  'a',
];

/**
 * Keep only the declarations the toolbar can produce, and reject any value
 * containing url()/expression() constructs.
 */
function filterStyle(style: string): string {
  return style
    .split(';')
    .map((declaration) => declaration.trim())
    .filter(Boolean)
    .filter((declaration) => {
      const separator = declaration.indexOf(':');
      if (separator === -1) return false;

      const property = declaration.slice(0, separator).trim().toLowerCase();
      const value = declaration.slice(separator + 1).trim().toLowerCase();

      if (!ALLOWED_STYLE_PROPS.has(property)) return false;
      if (value.includes('url(') || value.includes('expression(')) return false;

      return true;
    })
    .join('; ');
}

let hooked = false;

function ensureHooks() {
  if (hooked) return;
  hooked = true;

  DOMPurify.addHook('afterSanitizeAttributes', (currentNode) => {
    // Feature-detect rather than `instanceof Element`: on the server DOMPurify
    // runs against jsdom, where `Element` is not a global and the check throws.
    const node = currentNode as Element;
    if (typeof node.getAttribute !== 'function') return;

    const style = node.getAttribute('style');
    if (style) {
      const filtered = filterStyle(style);
      if (filtered) {
        node.setAttribute('style', filtered);
      } else {
        node.removeAttribute('style');
      }
    }

    if (node.tagName === 'A' && node.hasAttribute('href')) {
      node.setAttribute('target', '_blank');
      node.setAttribute('rel', 'noopener noreferrer');
    }
  });
}

/**
 * Sanitizes rich text HTML produced by the admin editor. Applied on write, so
 * what lands in the database is already safe to render.
 */
export function sanitizeRichText(html: string | null | undefined): string {
  if (!html) return '';
  ensureHooks();

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR: ['style', 'href', 'target', 'rel'],
    ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|tel:|#|\/)/i,
  });
}

/**
 * Strips all tags - for fields that feed plain-text contexts such as image
 * alt text, <title>, and meta descriptions.
 */
export function toPlainText(html: string | null | undefined): string {
  if (!html) return '';
  const stripped = DOMPurify.sanitize(html, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
  return stripped.replace(/\s+/g, ' ').trim();
}
