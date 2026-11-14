// silly-cards site render helpers — shared by all pages (data lives in data.js)

// Top nav: Index + every section, current page marked active.
function renderTopnav(active) {
  const el = document.getElementById('topnav');
  if (!el) return;
  const items = [{ id: 'home', title: 'Index', href: 'index.html' }].concat(SECTIONS);
  el.innerHTML = items
    .map(s => `<a href="${s.href}"${s.id === active ? ' class="active"' : ''}>${s.title}</a>`)
    .join('<span class="sep"></span>');
}

// Landing directory: one tile per section, with a count line.
function renderDirectory(el) {
  const counts = {
    succubi: CARDS.filter(c => c.section === 'succubi').length,
    cards: CARDS.length,
    lorebooks: LOREBOOKS.length,
    presets: PRESETS.length
  };
  const label = { succubi: 'card', cards: 'card', lorebooks: 'lorebook', presets: 'preset' };
  for (const s of SECTIONS) {
    const n = counts[s.id];
    const a = document.createElement('a');
    a.className = 'dirent';
    a.href = s.href;
    a.innerHTML = `
      <div class="kicker">${n} ${label[s.id]}${n > 1 ? 's' : ''}</div>
      <h2>${s.title}</h2>
      <p class="dnote">${s.note}</p>
      <div class="go">Browse</div>`;
    el.appendChild(a);
  }
}

// Card tiles (same markup the old landing grid used).
function cardTile(c) {
  const a = document.createElement('a');
  a.className = 'gcard';
  a.href = `card.html?id=${c.id}`;
  const art = c.poster
    ? `<div class="poster"><img src="${c.poster}" alt="${c.name}" loading="lazy"></div>`
    : `<div class="textonly"><div class="initial">${c.name[0]}</div><div class="hint">no art — deal with that</div></div>`;
  a.innerHTML = `
    ${art}
    <div class="body">
      <div class="kicker">${c.kicker}</div>
      <h2>${c.name}</h2>
      <p class="tagline">${c.tagline}</p>
      <ul class="chips">${c.tags.slice(0, 4).map(t => `<li>${t}</li>`).join('')}</ul>
      <div class="meta">
        <span>${c.greetings} greeting${c.greetings > 1 ? 's' : ''}</span>
        <span>${c.date}</span>
      </div>
    </div>`;
  return a;
}

function renderGrid(el, cards) {
  for (const c of cards) el.appendChild(cardTile(c));
}

function renderPresetList(el, list) {
  for (const p of list) {
    const div = document.createElement('div');
    div.className = 'preset';
    div.innerHTML = `
      <div>
        <div class="pname">${p.name}</div>
        <div class="pblurb">${p.blurb}</div>
      </div>
      <div class="actions">
        <a class="src" href="${blobURL(p.file)}" target="_blank" rel="noopener">source</a>
        <a class="dl" href="${rawURL(p.file)}" download>Download</a>
      </div>`;
    el.appendChild(div);
  }
}

function renderLorebookList(el, list) {
  for (const b of list) {
    const div = document.createElement('div');
    div.className = 'preset lorebook';
    div.innerHTML = `
      <div>
        <div class="pname">${b.name} <span class="pdate">${b.date}</span></div>
        <div class="pblurb">${b.blurb}</div>
        <div class="phint">World Info JSON — import via SillyTavern's World Info panel, then attach it to any character.</div>
      </div>
      <div class="actions">
        <a class="src" href="${blobURL(b.file)}" target="_blank" rel="noopener">source</a>
        <a class="dl" href="${rawURL(b.file)}" download>Download</a>
      </div>`;
    el.appendChild(div);
  }
}
