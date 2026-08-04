"""Converte guia-claude.html (legado, estático) em src/data/guia.js.

Uso: python scripts/convert-guia.py

Roda uma vez. Depois da conversão a fonte de verdade passa a ser o guia.js —
este script fica no repo só como registro de como o conteúdo foi migrado.
"""

import json
import os
import re
import sys

SRC = 'guia-claude.html'
OUT = 'src/data/guia.js'

INLINE_OK = {'strong', 'em', 'code', 'a', 'br', 'span'}


def inline(html):
    """Reduz markup inline a um subconjunto seguro. Descarta o resto das tags."""
    html = re.sub(r'<span class="kbd">(.*?)</span>', r'<kbd>\1</kbd>', html, flags=re.S)
    html = re.sub(r'<span[^>]*>', '', html)
    html = html.replace('</span>', '')
    html = re.sub(r'<(?!/?(?:strong|em|code|a|br|kbd)\b)[^>]*>', '', html)
    html = re.sub(r'\s+', ' ', html)
    return html.strip()


def text(html):
    return inline(re.sub(r'<[^>]+>', '', html))


def parse_table(node):
    head = [text(m.group(1)) for m in re.finditer(r'<th[^>]*>(.*?)</th>', node, flags=re.S)]
    rows = []
    for tr in re.finditer(r'<tr[^>]*>(.*?)</tr>', node, flags=re.S):
        cells = [inline(m.group(1)) for m in re.finditer(r'<td[^>]*>(.*?)</td>', tr.group(1), flags=re.S)]
        if cells:
            rows.append(cells)
    return {'type': 'table', 'head': head, 'rows': rows}


def span_of_div(html, open_idx):
    """Retorna (inner, end) da div que abre em open_idx, contando aninhamento."""
    i = html.index('>', open_idx) + 1
    depth, start = 1, i
    for m in re.finditer(r'<div\b|</div>', html[i:]):
        depth += 1 if m.group(0) == '<div' else -1
        if depth == 0:
            return html[start:i + m.start()], i + m.end()
    return html[start:], len(html)


def hoist(html, cls, build):
    """Extrai divs de uma classe (com aninhamento) e troca por placeholder."""
    out, held, cursor = '', [], 0
    for m in re.finditer(rf'<div class="{cls}"', html):
        if m.start() < cursor:
            continue
        inner, end = span_of_div(html, m.start())
        block = build(inner)
        out += html[cursor:m.start()]
        if block:
            out += f'@@BLOCO{len(held)}@@'
            held.append(block)
        cursor = end
    return out + html[cursor:], held


def build_cards(inner):
    items = [
        {'title': text(c.group(1)), 'body': inline(c.group(2))}
        for c in re.finditer(
            r'<div class="card-title"[^>]*>(.*?)</div>\s*<div class="card-body"[^>]*>(.*?)</div>', inner, flags=re.S
        )
    ]
    return {'type': 'cards', 'items': items} if items else None


def build_versus(inner):
    sides = [
        {'kind': s.group(1), 'label': text(s.group(2)), 'text': inline(s.group(3))}
        for s in re.finditer(
            r'<div class="versus-(bad|good)"[^>]*>\s*<div class="versus-label"[^>]*>(.*?)</div>\s*'
            r'<div class="versus-text"[^>]*>(.*?)</div>',
            inner,
            flags=re.S,
        )
    ]
    return {'type': 'compare', 'sides': sides} if sides else None


def parse_blocks(html):
    """Percorre o conteúdo de uma section na ordem e emite blocos tipados."""
    html, cards = hoist(html, 'cards', build_cards)
    html, versus = hoist(html, 'versus', build_versus)
    held = {'CARD': cards, 'VERSUS': versus}
    # placeholders foram numerados por passe; renumera para um índice único
    idx = 0
    lookup = {}
    for kind in ('CARD', 'VERSUS'):
        for n, b in enumerate(held[kind]):
            lookup[(kind, n)] = b
    # primeiro passe usou @@BLOCO{n}@@ duas vezes; desambigua por ordem de hoist
    for n in range(len(versus) - 1, -1, -1):
        html = html.replace(f'@@BLOCO{n}@@', f'@@VERSUS{n}@@', 1)
    for n in range(len(cards) - 1, -1, -1):
        html = html.replace(f'@@BLOCO{n}@@', f'@@CARD{n}@@', 1)

    blocks = []
    pattern = re.compile(
        r'@@(?P<ph>CARD|VERSUS)(?P<phn>\d+)@@'
        r'|<h3[^>]*>(?P<h3>.*?)</h3>'
        r'|<h4[^>]*>(?P<h4>.*?)</h4>'
        r'|<div class="big-quote"[^>]*>(?P<quote>.*?)</div>'
        r'|<div class="(?P<boxkind>fun|tip|warn)"[^>]*>(?P<box>.*?)</div>'
        r'|<table[^>]*>(?P<table>.*?)</table>'
        r'|<ul[^>]*>(?P<ul>.*?)</ul>'
        r'|<pre[^>]*>(?P<pre>.*?)</pre>'
        r'|<p(?! class="section-subtitle")[^>]*>(?P<p>.*?)</p>',
        flags=re.S,
    )
    for m in pattern.finditer(html):
        if m.group('ph'):
            b = lookup.get((m.group('ph'), int(m.group('phn'))))
            if b:
                blocks.append(b)
        elif m.group('h3'):
            blocks.append({'type': 'h3', 'text': text(m.group('h3'))})
        elif m.group('h4'):
            blocks.append({'type': 'h4', 'text': text(m.group('h4'))})
        elif m.group('quote'):
            blocks.append({'type': 'quote', 'body': inline(m.group('quote'))})
        elif m.group('box'):
            body = m.group('box')
            title = ''
            t = re.search(r'<strong>(.*?)</strong>', body, flags=re.S)
            if t:
                title = text(t.group(1))
                body = body.replace(t.group(0), '', 1)
            blocks.append({'type': 'box', 'tone': m.group('boxkind'), 'title': title, 'body': inline(body)})
        elif m.group('table'):
            blocks.append(parse_table(m.group('table')))
        elif m.group('ul'):
            items = [inline(li.group(1)) for li in re.finditer(r'<li[^>]*>(.*?)</li>', m.group('ul'), flags=re.S)]
            blocks.append({'type': 'list', 'items': items})
        elif m.group('pre'):
            code = re.sub(r'<button[^>]*>.*?</button>', '', m.group('pre'), flags=re.S)
            code = re.sub(r'<[^>]+>', '', code)
            code = code.replace('&lt;', '<').replace('&gt;', '>').replace('&amp;', '&').replace('&quot;', '"')
            blocks.append({'type': 'code', 'code': code.strip('\n').rstrip()})
        elif m.group('p'):
            body = inline(m.group('p'))
            if body:
                blocks.append({'type': 'p', 'body': body})
    return blocks


def main():
    if not os.path.exists(SRC):
        sys.exit(f'nao achei {SRC} — rode a partir da raiz do skills-hub')

    html = open(SRC, encoding='utf-8').read()
    body = html[html.find('<body'):]
    body = re.sub(r'<script.*?</script>', '', body, flags=re.S)

    hero = {'title': '', 'lead': ''}
    h1 = re.search(r'<h1[^>]*>(.*?)</h1>', body, flags=re.S)
    if h1:
        hero['title'] = text(h1.group(1))
        after = body[h1.end():]
        lead = re.search(r'<p[^>]*>(.*?)</p>', after, flags=re.S)
        if lead:
            hero['lead'] = inline(lead.group(1))

    sections = []
    for m in re.finditer(r'<section[^>]*id="([^"]+)"[^>]*>(.*?)</section>', body, flags=re.S):
        sid, inner = m.group(1), m.group(2)

        kicker = ''
        k = re.search(r'<div class="section-tag[^"]*">(.*?)</div>', inner, flags=re.S)
        if k:
            kicker = text(k.group(1))

        title, level = '', ''
        h2 = re.search(r'<h2[^>]*>(.*?)</h2>', inner, flags=re.S)
        if h2:
            raw = h2.group(1)
            lv = re.search(r'<span class="level[^"]*">(.*?)</span>', raw, flags=re.S)
            if lv:
                level = text(lv.group(1))
                raw = raw.replace(lv.group(0), '')
            title = text(raw)

        lead = ''
        sub = re.search(r'<p class="section-subtitle">(.*?)</p>', inner, flags=re.S)
        if sub:
            lead = inline(sub.group(1))

        sections.append(
            {
                'id': sid,
                'kicker': kicker,
                'title': title,
                'level': level,
                'lead': lead,
                'blocks': parse_blocks(inner),
            }
        )

    payload = json.dumps({'hero': hero, 'sections': sections}, ensure_ascii=False, indent=2)
    out = (
        '// Conteúdo do Guia Claude, em dados.\n'
        '// Gerado a partir do guia-claude.html legado por scripts/convert-guia.py.\n'
        '// A partir daqui, edite ESTE arquivo — o HTML antigo não é mais a fonte.\n\n'
        f'export const guia = {payload}\n'
    )
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    open(OUT, 'w', encoding='utf-8', newline='\n').write(out)

    total = sum(len(s['blocks']) for s in sections)
    print(f'{len(sections)} secoes, {total} blocos -> {OUT}')
    for s in sections:
        print(f"  #{s['id']:<12} {len(s['blocks']):>3} blocos  {s['title'][:48]}")


if __name__ == '__main__':
    main()
