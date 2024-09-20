import MarkdownIt, { Token, Options, Renderer } from 'markdown-it';

interface Env {
  docId?: string;
  currentUrl?: string;
}

export function customFootnote(md: MarkdownIt) {
  function render_footnote_anchor_name(
    tokens: Token[],
    idx: number,
    options: Options,
    env: Env,
    slf: Renderer,
  ) {
    const n = Number(tokens[idx].meta.id + 1).toString();
    let prefix = '';

    if (typeof env.docId === 'string') prefix = `-${env.docId}-`;

    slf; // 'use' var

    return prefix + n;
  }

  function render_footnote_caption(tokens: Token[], idx: number) {
    let n = Number(tokens[idx].meta.id + 1).toString();

    if (tokens[idx].meta.subId > 0) n += `:${tokens[idx].meta.subId}`;

    return `[${n}]`;
  }

  function render_footnote_ref(
    tokens: Token[],
    idx: number,
    options: Options,
    env: Env,
    slf: Renderer,
  ) {
    const id = slf.rules.footnote_anchor_name
      ? slf.rules.footnote_anchor_name(tokens, idx, options, env, slf)
      : '';
    const caption = slf.rules.footnote_caption
      ? slf.rules.footnote_caption(tokens, idx, options, env, slf)
      : '';
    let refid = id;

    if (tokens[idx].meta.subId > 0) refid += `:${tokens[idx].meta.subId}`;

    const currentUrl = env.currentUrl || '';
    return `<sup class="footnote-ref"><a href="${currentUrl}#fn${id}" id="fnref${refid}">${caption}</a></sup>`;
  }

  function render_footnote_anchor(
    tokens: Token[],
    idx: number,
    options: Options,
    env: Env,
    slf: Renderer,
  ) {
    let id = slf.rules.footnote_anchor_name
      ? slf.rules.footnote_anchor_name(tokens, idx, options, env, slf)
      : '';

    if (tokens[idx].meta.subId > 0) id += `:${tokens[idx].meta.subId}`;

    const currentUrl = env.currentUrl || '';
    /* ↩ with escape code to prevent display as Apple Emoji on iOS */
    return ` <a href="${currentUrl}#fnref${id}" class="footnote-backref">\u21a9\uFE0E</a>`;
  }

  md.renderer.rules.footnote_ref = render_footnote_ref;
  md.renderer.rules.footnote_anchor = render_footnote_anchor;
  md.renderer.rules.footnote_caption = render_footnote_caption;
  md.renderer.rules.footnote_anchor_name = render_footnote_anchor_name;
}

export default customFootnote;
