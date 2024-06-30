export function withESI(response) {
  // `esi:include` encoded to be a valid CSS identifier.
  // https://github.com/mathiasbynens/CSS.escape/blob/master/css.escape.js
  // https://drafts.csswg.org/cssom/#serialize-an-identifier
  return (new HTMLRewriter).on("esi\\:include", {
    async element(elem) {
      try {
        const alt = elem.getAttribute('alt');
        const src = elem.getAttribute('src');

        if (!src) return;

        let text;
        let resp = await fetch(src);

        if (resp.ok) {
          text = "<!-- ESI -->\n" + await resp.text() + "\n<!-- /ESI -->";
        } else if (alt) {
          resp = await fetch(alt);
          if (resp.ok) {
            text = "<!-- ESI -->\n" + await resp.text() + "\n<!-- /ESI -->";
          }
        }

        if (text) {
          // FIXME: Replacing a self-closing tag generates invalid HTML.
          // temp: Append the content & leave the esi:include tag.
          elem.before(text, { html: true });
        }
      } catch (err) {
        console.warn(err.stack);
      }
    }
  }).transform(response);
}
