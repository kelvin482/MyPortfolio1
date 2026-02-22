from __future__ import annotations

import html
import re
from dataclasses import dataclass
from datetime import date, datetime
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
POSTS_DIR = ROOT / "posts"
BLOG_DIR = ROOT / "blog"
BLOG_INDEX = ROOT / "blog.html"


@dataclass
class Post:
    title: str
    slug: str
    iso_date: str
    read_time: str
    category: str
    image: str
    summary: str
    body_markdown: str

    @property
    def parsed_date(self) -> date:
        return date.fromisoformat(self.iso_date)

    @property
    def display_date(self) -> str:
        return self.parsed_date.strftime("%b %d, %Y")

    @property
    def output_path(self) -> Path:
        return BLOG_DIR / f"{self.slug}.html"

    @property
    def relative_url(self) -> str:
        return f"blog/{self.slug}.html"


def slugify(text: str) -> str:
    value = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return value or "post"


def read_text_with_fallback(path: Path) -> tuple[str, str]:
    for enc in ("utf-8", "cp1252", "latin-1"):
        try:
            return path.read_text(encoding=enc), enc
        except UnicodeDecodeError:
            continue
    return path.read_text(encoding="utf-8", errors="replace"), "utf-8"


def parse_front_matter(text: str) -> tuple[dict[str, str], str]:
    if not text.startswith("---"):
        return {}, text
    lines = text.splitlines()
    end_idx = None
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            end_idx = i
            break
    if end_idx is None:
        return {}, text

    meta: dict[str, str] = {}
    for line in lines[1:end_idx]:
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        meta[key.strip()] = value.strip()

    body = "\n".join(lines[end_idx + 1 :]).strip()
    return meta, body


def markdown_to_html(markdown: str) -> str:
    out: list[str] = []
    in_list = False

    for raw_line in markdown.splitlines():
        line = raw_line.strip()
        if not line:
            if in_list:
                out.append("</ul>")
                in_list = False
            continue

        if line.startswith("## "):
            if in_list:
                out.append("</ul>")
                in_list = False
            out.append(f"<h2 class=\"section-title\">{html.escape(line[3:])}</h2>")
            continue

        if line.startswith("- "):
            if not in_list:
                out.append("<ul class=\"clean-list\">")
                in_list = True
            out.append(f"<li>{html.escape(line[2:])}</li>")
            continue

        if in_list:
            out.append("</ul>")
            in_list = False
        out.append(f"<p>{html.escape(line)}</p>")

    if in_list:
        out.append("</ul>")

    return "\n      ".join(out)


def build_post_page(post: Post) -> str:
    body_html = markdown_to_html(post.body_markdown)
    title = html.escape(post.title)
    summary = html.escape(post.summary)
    category = html.escape(post.category)
    image = html.escape(f"../{post.image}")
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title} - Kelvin Mutwiri</title>
  <style>
    :root {{
      --bg:#0d1117; --panel:#0f1720; --muted:#9aa4b2; --accent:#58a6ff;
      --glass-border: rgba(88,166,255,0.12); --card:#0f1820; --radius:14px; --maxw:1000px;
    }}
    *{{box-sizing:border-box;}}
    html,body{{height:100%;margin:0;font-family:'Inter',sans-serif;color:#e6eef6;background:linear-gradient(180deg,var(--bg),#061217 120%);}}
    a{{text-decoration:none;color:inherit;}}
    header.site-header{{background:rgba(13,17,23,0.92);border-bottom:1px solid rgba(255,255,255,0.06);padding:16px 20px;position:sticky;top:0;z-index:50;}}
    .nav-grid{{max-width:var(--maxw);margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:12px;}}
    .brand{{font-family:'Poppins',sans-serif;font-weight:700;font-size:1.3rem;color:#f0f6fc;}}
    nav.nav{{display:flex;align-items:center;gap:12px;}}
    nav.nav a{{color:var(--muted);padding:8px 10px;border-radius:10px;font-size:0.95rem;}}
    nav.nav a.active{{color:var(--accent);background:rgba(88,166,255,0.08);}}
    main.container{{max-width:var(--maxw);margin:28px auto;padding:0 18px;}}
    .hero{{display:flex;gap:20px;align-items:center;background:linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01));padding:22px;border-radius:var(--radius);border:1px solid var(--glass-border);}}
    .hero-left{{flex:1;min-width:0;}}
    .eyebrow{{font-size:0.85rem;color:var(--muted);margin-bottom:6px;}}
    h1{{font-family:'Poppins',sans-serif;margin:0;font-size:1.6rem;color:#f0f6fc;}}
    p.lead{{color:#cbd5e1;margin-top:10px;margin-bottom:0.5rem;}}
    .hero-right{{width:220px;height:120px;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);}}
    .hero-right img{{width:100%;height:100%;object-fit:cover;display:block;}}
    article.card{{margin-top:18px;background:linear-gradient(180deg,var(--panel),rgba(6,14,20,0.2));padding:20px;border-radius:12px;border:1px solid rgba(255,255,255,0.05);}}
    .meta{{color:var(--muted);font-size:0.9rem;margin-top:6px;}}
    h2.section-title{{color:#bff6ff;margin-top:16px;margin-bottom:10px;font-size:1.05rem;}}
    ul.clean-list{{padding-left:0;margin:8px 0 16px;list-style:none;display:grid;gap:8px;}}
    ul.clean-list li{{background:var(--card);padding:12px 14px;border-radius:10px;border:1px solid rgba(255,255,255,0.05);}}
    p{{color:#d7eef6;line-height:1.65;}}
    footer.site-footer{{max-width:var(--maxw);margin:26px auto 60px;padding:18px;text-align:center;color:var(--muted);font-size:0.9rem;}}
    .badge{{font-size:0.8rem;color:#cde8ff;background:rgba(88,166,255,0.12);padding:6px 8px;border-radius:8px;font-weight:600;margin-top:6px;display:inline-block;border:1px solid rgba(88,166,255,0.3);}}
    @media (max-width:960px){{.hero{{flex-direction:column;}}.hero-right{{display:none;}}}}
  </style>
</head>
<body>
  <header class="site-header">
    <div class="nav-grid">
      <a class="brand" href="../index.html">Kelvin.</a>
      <nav class="nav">
        <a href="../index.html">Home</a>
        <a href="../projects.html">Projects</a>
        <a href="../skills.html">Skills</a>
        <a href="../blog.html" class="active">Blog</a>
        <a href="../contact.html">Contact</a>
      </nav>
    </div>
  </header>

  <main class="container">
    <div class="hero">
      <div class="hero-left">
        <div class="eyebrow">{category} • Practical Guide</div>
        <h1>{title}</h1>
        <p class="lead">{summary}</p>
        <span class="badge">{category}</span>
      </div>
      <div class="hero-right">
        <img src="{image}" alt="{title}">
      </div>
    </div>

    <article class="card">
      <div class="meta">{post.display_date} · {html.escape(post.read_time)}</div>
      {body_html}
    </article>
  </main>

  <footer class="site-footer">
    &copy; 2026 Kelvin Mutwiri. All rights reserved.
  </footer>
</body>
</html>
"""


def load_posts() -> list[Post]:
    POSTS_DIR.mkdir(exist_ok=True)
    BLOG_DIR.mkdir(exist_ok=True)

    posts: list[Post] = []
    for path in sorted(POSTS_DIR.glob("*.md")):
        raw, _ = read_text_with_fallback(path)
        meta, body = parse_front_matter(raw)

        title = meta.get("title", path.stem.replace("-", " ").title())
        slug = meta.get("slug", slugify(title))
        iso_date = meta.get("date", "2026-01-01")
        read_time = meta.get("read_time", "5 min read")
        category = meta.get("category", "Engineering")
        image = meta.get("image", "assets/images/ui.jpg")
        summary = meta.get("summary", "")
        if not summary:
            for line in body.splitlines():
                line = line.strip()
                if line and not line.startswith("#") and not line.startswith("- "):
                    summary = line
                    break
        summary = summary or "Latest engineering notes and practical implementation guidance."

        posts.append(
            Post(
                title=title,
                slug=slug,
                iso_date=iso_date,
                read_time=read_time,
                category=category,
                image=image,
                summary=summary,
                body_markdown=body,
            )
        )

    posts.sort(key=lambda p: p.parsed_date, reverse=True)
    return posts


def update_blog_index(posts: list[Post]) -> None:
    index_html, source_encoding = read_text_with_fallback(BLOG_INDEX)

    cards: list[str] = []
    for post in posts:
        title = html.escape(post.title)
        meta = f"{post.display_date} · {html.escape(post.read_time)}"
        image = html.escape(post.image)
        summary = html.escape(post.summary)
        href = html.escape(post.relative_url)
        cards.append(
            f"""          <article class="post card">
            <h2>{title}</h2>
            <p class="meta">{meta}</p>
            <img src="{image}" alt="{title}">
            <p>{summary}</p>
            <a href="{href}" class="read-more btn ghost">Read more -&gt;</a>
          </article>"""
        )

    if not cards:
        cards.append(
            """          <article class="post card">
            <h2>No posts yet</h2>
            <p class="meta">Add a file in posts/ and run the build script.</p>
            <p>Your generated blog cards will appear here.</p>
          </article>"""
        )

    replacement = (
        "          <!-- BLOG_POSTS_START -->\n"
        + "\n".join(cards)
        + "\n          <!-- BLOG_POSTS_END -->"
    )
    updated = re.sub(
        r"<!-- BLOG_POSTS_START -->.*?<!-- BLOG_POSTS_END -->",
        replacement,
        index_html,
        flags=re.S,
    )
    BLOG_INDEX.write_text(updated, encoding=source_encoding)


def main() -> None:
    posts = load_posts()
    for post in posts:
        post.output_path.write_text(build_post_page(post), encoding="utf-8")
    update_blog_index(posts)
    print(f"Built {len(posts)} post(s).")


if __name__ == "__main__":
    main()
