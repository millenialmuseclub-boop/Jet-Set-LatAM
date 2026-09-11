"""Extract a fragment from the single-file Vite preview build for the
Artifact tool, which wraps content in its own <head>/<body> skeleton.

Critical: preserve the <script> tag's own opening tag verbatim (attributes
and all - specifically `type="module" crossorigin`). Rebuilding it as a
plain <script> breaks `import.meta` usage and produces a blank page. This
was a real regression earlier in this project; this script exists
specifically so it can't happen again.

Actual structure of this project's `vite-plugin-singlefile` output: the
module <script> and the inlined <style> both live in <head>, and <body>
is just `<div id="root"></div>`. There is exactly one real <script>...
</script> pair - other "<script" substrings appear only inside minified JS
string literals (e.g. React DOM's own `<script></script>` placeholder
string) and are never followed by a bare, unescaped `</script>`, so a
single greedy match across the whole file is safe here - verified by
counting literal `</script>` occurrences (must be exactly 1) before
trusting the match.
"""
import re
import sys

SRC = sys.argv[1] if len(sys.argv) > 1 else "dist-preview/index.html"
OUT = sys.argv[2] if len(sys.argv) > 2 else "/tmp/artifact_fragment.html"

html = open(SRC, encoding="utf-8").read()

close_count = len(re.findall(r"</script>", html))
if close_count != 1:
    raise SystemExit(f"Expected exactly 1 literal </script>, found {close_count} - "
                      f"structure changed, don't guess, fix this script first.")

title_match = re.search(r"<title>(.*?)</title>", html, re.S)
title = title_match.group(1) if title_match else "Jet Set LatAm"

style_match = re.search(r"<style[^>]*>.*?</style>", html, re.S)
style = style_match.group(0) if style_match else ""

script_match = re.search(r"(<script[^>]*>)(.*)</script>", html, re.S)
if not script_match:
    raise SystemExit("Could not find the module script tag - aborting rather than guessing.")
script_open_tag = script_match.group(1)
script_body = script_match.group(2)

fragment = (
    f"<title>{title}</title>\n"
    f"{style}\n"
    f'<div id="root"></div>\n'
    f"{script_open_tag}{script_body}</script>\n"
)

with open(OUT, "w", encoding="utf-8") as f:
    f.write(fragment)

print(f"Wrote fragment to {OUT} ({len(fragment)} chars)")
print(f"Preserved script tag: {script_open_tag}")
