/**
 * 12th Berlin Biennale for Contemporary Art — Interactive Controller
 * Theme: Iris-and-ink broadsheet — violet skies over monumental black type on white paper
 */

document.addEventListener('DOMContentLoaded', () => {
  initSideNav();
  initLanguageSwitcher();
  initProgramFilters();
  initArtistsIndex();
  initInteractiveMap();
  initTicketBooking();
  initModals();
  initArchivalViewer();
  initNewsletter();
});

// Toast notification helper
function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// -----------------------------------------------------------------------------
// Side Nav Panel Controller
// -----------------------------------------------------------------------------
function initSideNav() {
  const openButtons = document.querySelectorAll('[data-action="open-menu"]');
  const closeButton = document.getElementById('sideNavClose');
  const panel = document.getElementById('sideNavPanel');
  const backdrop = document.getElementById('sideNavBackdrop');

  function openMenu() {
    panel.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    panel.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => btn.addEventListener('click', openMenu));
  if (closeButton) closeButton.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('open')) {
      closeMenu();
    }
  });

  // Nav item click closes menu and scrolls smoothly
  const navLinks = panel.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Search inside side nav
  const sideSearchInput = document.getElementById('sideNavSearchInput');
  const sideSearchBtn = document.getElementById('sideNavSearchBtn');
  if (sideSearchInput && sideSearchBtn) {
    sideSearchBtn.addEventListener('click', () => {
      const q = sideSearchInput.value.trim();
      if (q) {
        closeMenu();
        const artistSearch = document.getElementById('artistSearchInput');
        if (artistSearch) {
          artistSearch.value = q;
          artistSearch.dispatchEvent(new Event('input'));
          document.getElementById('artists')?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
    sideSearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sideSearchBtn.click();
    });
  }
}

// -----------------------------------------------------------------------------
// Language Switcher Controller (EN / DE / Easy Language)
// -----------------------------------------------------------------------------
const translations = {
  en: {
    heroDateTitle: 'Present!<br>Still',
    heroDateRange: 'June 11<br>— Sept 18<br>2022',
    heroBrandSub: 'for Contemporary Art',
    curatorNote: 'Curated by Kader Attia',
    aboutLabel: 'About Still Present!',
    aboutLead: 'Every two years, the Berlin Biennale for Contemporary Art brings together international artists, theoreticians, and practitioners in exhibitions and interdisciplinary formats. The 12th edition, titled Still Present! and curated by Kader Attia, takes the historical and continuing legacies of colonialism, environmental devastation, and wounded collective memories as a point of departure to imagine modes of repair, solidarity, and planetary survival.',
    aboutBody: 'Featuring more than 80 international artists and collectives, the exhibition unfolds across six emblematic venues in Berlin. Rather than presenting static historical artifacts, Still Present! creates dynamic constellations between archival findings, decolonial interventions, and non-Western cosmologies that challenge dominant Eurocentric narratives.',
    curatorQuote: '“Repair is a continuous, perpetual movement. It is not an attempt to return to a mythic pristine past, but an active engagement with the scars of history, the extraction of the planet, and algorithmic confinement.” — Kader Attia'
  },
  de: {
    heroDateTitle: 'Present!<br>Still',
    heroDateRange: '11. Juni<br>— 18. Sept.<br>2022',
    heroBrandSub: 'für zeitgenössische Kunst',
    curatorNote: 'Kuratiert von Kader Attia',
    aboutLabel: 'Über Still Present!',
    aboutLead: 'Alle zwei Jahre bringt die Berlin Biennale für zeitgenössische Kunst internationale Künstler*innen, Theoretiker*innen und Praktiker*innen in Ausstellungen und interdisziplinären Formaten zusammen. Die 12. Ausgabe mit dem Titel Still Present!, kuratiert von Kader Attia, nimmt die fortdauernden Folgen des Kolonialismus, der Umweltzerstörung und verwundeter kollektiver Erinnerungen zum Ausgangspunkt, um Formen von Reparation, Solidarität und planetarem Überleben zu entwerfen.',
    aboutBody: 'Mit über 80 internationalen Kunstschaffenden und Kollektiven entfaltet sich die Ausstellung an sechs symbolträchtigen Orten in Berlin. Anstatt statische Artefakte auszustellen, schafft Still Present! dynamische Konstellationen zwischen Archiven, dekolonialen Interventionen und nicht-westlichen Kosmologien.',
    curatorQuote: '„Reparation ist eine kontinuierliche, unausgesetzte Bewegung. Es ist kein Versuch, in eine mythische, unberührte Vergangenheit zurückzukehren, sondern eine aktive Auseinandersetzung mit den Narben der Geschichte und der algorithmischen Enteignung.“ — Kader Attia'
  },
  easy: {
    heroDateTitle: 'Noch da!<br>Still Present!',
    heroDateRange: '11. Juni bis<br>18. September<br>2022',
    heroBrandSub: 'Ausstellung für Kunst von heute',
    curatorNote: 'Ausstellung von Kader Attia gemacht',
    aboutLabel: 'Einfache Sprache — Über die Biennale',
    aboutLead: 'Die Berlin Biennale ist eine sehr große Kunst-Ausstellung. Sie findet alle zwei Jahre in Berlin statt. Die 12. Ausgabe heißt „Still Present!“. Das ist Englisch und bedeutet: Immer noch da! Die Ausstellung zeigt Kunst von mehr als 80 Künstlerinnen und Künstlern aus der ganzen Welt an 6 verschiedenen Orten in Berlin.',
    aboutBody: 'Die Kunstwerke erzählen von Gerechtigkeit, der Natur, der Geschichte und davon, wie Menschen friedlich und respektvoll zusammenleben können. Alle Orte haben Aufzüge oder Rampen. Es gibt Führungen mit Gebärdensprache und Begleithefte in Leichter Sprache.',
    curatorQuote: '„Kunst kann dabei helfen, alte Wunden der Geschichte zu heilen und gemeinsam an eine gute Zukunft zu denken.“ — Kader Attia'
  }
};

function initLanguageSwitcher() {
  const buttons = document.querySelectorAll('.lang-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (!lang || !translations[lang]) return;

      buttons.forEach(b => {
        if (b.dataset.lang === lang) b.classList.add('active');
        else b.classList.remove('active');
      });

      const t = translations[lang];
      const dateTitleEl = document.getElementById('heroDateTitle');
      const dateRangeEl = document.getElementById('heroDateRange');
      const brandSubEl = document.getElementById('heroBrandSub');
      const curatorNoteEl = document.getElementById('curatorNote');
      const aboutLabelEl = document.getElementById('aboutLabel');
      const aboutLeadEl = document.getElementById('aboutLead');
      const aboutBodyEl = document.getElementById('aboutBody');
      const curatorQuoteEl = document.getElementById('curatorQuote');

      if (dateTitleEl) dateTitleEl.innerHTML = t.heroDateTitle;
      if (dateRangeEl) dateRangeEl.innerHTML = t.heroDateRange;
      if (brandSubEl) brandSubEl.textContent = t.heroBrandSub;
      if (curatorNoteEl) curatorNoteEl.textContent = t.curatorNote;
      if (aboutLabelEl) aboutLabelEl.textContent = t.aboutLabel;
      if (aboutLeadEl) aboutLeadEl.textContent = t.aboutLead;
      if (aboutBodyEl) aboutBodyEl.textContent = t.aboutBody;
      if (curatorQuoteEl) curatorQuoteEl.textContent = t.curatorQuote;

      showToast(`Language switched: ${lang.toUpperCase()}`);
    });
  });
}

// -----------------------------------------------------------------------------
// Biennale Program Leaflet & Event Filtering
// -----------------------------------------------------------------------------
const eventDataset = [
  {
    id: 1,
    date: '18.9. SUNDAY 4 PM',
    venue: 'Hamburger Bahnhof — Museum für Gegenwart — Berlin',
    venueKey: 'hb',
    format: 'tour',
    month: 'september',
    dark: false,
    title: 'Guided Tour (English): Decolonial Perspectives and Wounded Archives',
    speaker: 'Guided by Sarita Sharma · Art Educator & Researcher',
    desc: 'An in-depth thematic walkthrough addressing the intersection of historical archives, colonial plunder, and contemporary installations at Hamburger Bahnhof.',
    capacity: '20 participants · Included in admission'
  },
  {
    id: 2,
    date: '17.9. SATURDAY 7 PM',
    venue: 'KW Institute for Contemporary Art',
    venueKey: 'kw',
    format: 'performance',
    month: 'september',
    dark: true,
    title: 'Performance: Basel Abbas and Ruanne Abou-Rahme: Where remember me',
    speaker: 'Live multichannel sonic & bodily activation',
    desc: 'A boundary-pushing audio-visual performance weaving lost Palestinian songlines, electronic sub-bass, and spoken word into an elegy of persistent resistance.',
    capacity: 'Courtyard & Hall · Limited seating'
  },
  {
    id: 3,
    date: '15.9. THURSDAY 6 PM',
    venue: 'Akademie der Künste, Hanseatenweg',
    venueKey: 'adk-h',
    format: 'talk',
    month: 'september',
    dark: false,
    title: 'Symposium: Repair as Planetary Urgency with Kader Attia & Guests',
    speaker: 'Kader Attia, Souleymane Bachir Diagne, Françoise Vergès',
    desc: 'Concluding panel discussing philosophical definitions of reparation beyond monetary restitution: restoring severed spiritual ties and ecological habitats.',
    capacity: 'Plenary Hall · German / English simultaneous translation'
  },
  {
    id: 4,
    date: '10.9. SATURDAY 3 PM',
    venue: 'Stasi Headquarters. Campus for Democracy',
    venueKey: 'stasi',
    format: 'tour',
    month: 'september',
    dark: false,
    title: 'Site Walk: Surveillance, Archival Amnesia and State Panopticons',
    speaker: 'Guided by Dr. Florian Huber & Florian Schmidt',
    desc: 'Walking through Haus 7 and Haus 22 examining surveillance machinery alongside works by Susan Schuppli and Mathieu Pernot on digital extraction.',
    capacity: 'Meeting Point: Haus 22 Info Desk'
  },
  {
    id: 5,
    date: '4.9. SUNDAY 5 PM',
    venue: 'Dekoloniale Memory Culture in the City',
    venueKey: 'dekoloniale',
    format: 'workshop',
    month: 'september',
    dark: true,
    title: 'Workshop: Counter-Mapping Berlin’s Colonial Geographies',
    speaker: 'Facilitated by Dekoloniale Collective & Moses März',
    desc: 'Collaborative map-making exercise interrogating street names, imperial statues, and hidden African-diasporic safe houses across Berlin-Mitte.',
    capacity: 'Open workshop · Materials provided'
  },
  {
    id: 6,
    date: '28.8. SUNDAY 2 PM',
    venue: 'Akademie der Künste, Pariser Platz',
    venueKey: 'adk-p',
    format: 'talk',
    month: 'august',
    dark: false,
    title: 'In Conversation: Nil Yalter with Curatorial Team Member Rasha Salti',
    speaker: 'Nil Yalter & Rasha Salti',
    desc: 'Pioneering feminist conceptual artist Nil Yalter discusses her monumental video installations on immigrant workers and domestic spaces across Europe.',
    capacity: 'Auditorium · Livestreamed online'
  },
  {
    id: 7,
    date: '14.8. SUNDAY 6 PM',
    venue: 'KW Institute for Contemporary Art',
    venueKey: 'kw',
    format: 'screening',
    month: 'august',
    dark: false,
    title: 'Screening: Tuan Andrew Nguyen: The Unburied Sounds of a Troubled Horizon',
    speaker: 'Post-screening Q&A with director Tuan Andrew Nguyen',
    desc: 'Poetic feature film set in Quảng Trị, Vietnam, where families repurpose unexploded ordnance into bells and temple sculptures for karmic healing.',
    capacity: 'KW Hall · Free admission'
  },
  {
    id: 8,
    date: '24.7. SUNDAY 4 PM',
    venue: 'Hamburger Bahnhof — Museum für Gegenwart — Berlin',
    venueKey: 'hb',
    format: 'tour',
    month: 'july',
    dark: true,
    title: 'Curatorial Walkthrough with Đỗ Tường Linh and Marie Helene Pereira',
    speaker: 'Biennale Curatorial Team Members',
    desc: 'Close reading of installations by Binta Diaw, Ariella Aïsha Azoulay, and DAAR, exploring how non-Western aesthetics refuse colonial containment.',
    capacity: 'Main Hall · Registration required'
  },
  {
    id: 9,
    date: '11.6. SATURDAY 11 AM',
    venue: 'All 6 Biennale Venues',
    venueKey: 'all',
    format: 'performance',
    month: 'june',
    dark: false,
    title: 'Opening Day: Durational Public Interventions & Free Admission',
    speaker: 'Over 40 participating artists across Berlin',
    desc: 'The official public inauguration of the 12th Berlin Biennale. Simultaneous open doors, site-specific readings, soundscapes, and curatorial introductions.',
    capacity: 'Free entry all day · All venues'
  }
];

function initProgramFilters() {
  const grid = document.getElementById('eventsGrid');
  const formatButtons = document.querySelectorAll('[data-filter-format]');
  const venueSelect = document.getElementById('programVenueSelect');
  const monthButtons = document.querySelectorAll('[data-filter-month]');
  const counterEl = document.getElementById('programCount');

  let currentFormat = 'all';
  let currentVenue = 'all';
  let currentMonth = 'all';

  function renderEvents() {
    if (!grid) return;
    grid.innerHTML = '';

    const filtered = eventDataset.filter(item => {
      const matchFormat = currentFormat === 'all' || item.format === currentFormat;
      const matchVenue = currentVenue === 'all' || item.venueKey === currentVenue || item.venueKey === 'all';
      const matchMonth = currentMonth === 'all' || item.month === currentMonth;
      return matchFormat && matchVenue && matchMonth;
    });

    if (counterEl) {
      counterEl.textContent = `${filtered.length} event${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 48px; text-align: center; border: 1px solid var(--color-obsidian); background: var(--surface-ash-gray); border-radius: var(--radius-cards);">
          <p style="font-size: var(--text-subheading); font-weight: bold; margin-bottom: 8px;">No program entries found</p>
          <p style="color: #666; font-size: var(--text-body-sm);">Try resetting your filters or selecting a different month.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(ev => {
      const card = document.createElement('article');
      card.className = `event-card ${ev.dark ? 'event-card-dark' : ''}`;
      
      const formatTag = ev.format.toUpperCase();
      
      card.innerHTML = `
        <div>
          <div class="event-card-top">
            <span class="event-date-row">${ev.date}</span>
            <span class="tag-pill ${ev.dark ? '' : 'tag-pill-violet'}">${formatTag}</span>
          </div>
          <h3 class="event-title">${ev.title}</h3>
          <p class="event-venue-line"><strong>${ev.venue}</strong></p>
          <p style="font-family: var(--font-bradfordll); font-size: 13px; color: ${ev.dark ? '#cccccc' : '#555555'}; line-height: 1.35; margin-bottom: 12px;">
            ${ev.desc}
          </p>
        </div>
        <div class="event-card-bottom">
          <span style="font-size: 11px; font-weight: bold; color: ${ev.dark ? '#7373ff' : '#666666'};">${ev.capacity}</span>
          <div class="event-actions">
            <button class="btn btn-violet-outline" data-book-event="${ev.title}" style="padding: 4px 8px; font-size: 12px;">Book</button>
            <button class="btn btn-neutral-outline" data-cal-event="${ev.title}" style="padding: 4px 8px; font-size: 12px;">+ Cal</button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    // Attach event listeners for booking & calendar
    grid.querySelectorAll('[data-book-event]').forEach(btn => {
      btn.addEventListener('click', () => {
        openTicketModal(btn.dataset.bookEvent);
      });
    });

    grid.querySelectorAll('[data-cal-event]').forEach(btn => {
      btn.addEventListener('click', () => {
        showToast(`Event added to your calendar: ${btn.dataset.calEvent.substring(0, 30)}...`);
      });
    });
  }

  formatButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      formatButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFormat = btn.dataset.filterFormat;
      renderEvents();
    });
  });

  monthButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      monthButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMonth = btn.dataset.filterMonth;
      renderEvents();
    });
  });

  if (venueSelect) {
    venueSelect.addEventListener('change', (e) => {
      currentVenue = e.target.value;
      renderEvents();
    });
  }

  renderEvents();
}

// -----------------------------------------------------------------------------
// Participating Artists Directory & Search
// -----------------------------------------------------------------------------
const artistsDataset = [
  {
    name: 'Basel Abbas & Ruanne Abou-Rahme',
    letter: 'A',
    origin: 'Palestine / New York',
    work: 'Where remember me? (2022)',
    venue: 'KW Institute for Contemporary Art',
    medium: 'Multichannel video, audio installation & archival text',
    bio: 'Their practice centers on memory, exile, and counter-archives across the Levant, interrogating how communities preserve resilience in periods of fracture.'
  },
  {
    name: 'Ariella Aïsha Azoulay',
    letter: 'A',
    origin: 'Palestine / United States',
    work: 'The Natural History of Rape & Plunder (2022)',
    venue: 'Hamburger Bahnhof',
    medium: 'Photographic archive & text montage',
    bio: 'Author and filmmaker proposing a radical unlearning of imperial modes of historiography, museum looting, and photographic sovereignty.'
  },
  {
    name: 'Amal Kenawy',
    letter: 'A',
    origin: 'Cairo, Egypt (1974–2012)',
    work: 'Silence of the Sheep & The Room (2003–2009)',
    venue: 'KW Institute for Contemporary Art',
    medium: 'Video animation, archival performance & sculpture',
    bio: 'A foundational figure in contemporary Arab performance art whose visceral video animations investigate state violence, gender subordination, and dream spaces.'
  },
  {
    name: 'Ammar Bouras',
    letter: 'A',
    origin: 'Algiers, Algeria',
    work: 'Frontières Invisibles (2022)',
    venue: 'Hamburger Bahnhof',
    medium: 'Silver gelatin photographic prints',
    bio: 'Investigates the lingering psychic trauma of the Algerian civil war (the Black Decade) and military occupation.'
  },
  {
    name: 'Binta Diaw',
    letter: 'B',
    origin: 'Milan, Italy / Dakar, Senegal',
    work: 'Dïà s p o r a (2022)',
    venue: 'Hamburger Bahnhof',
    medium: 'Soil, woven synthetic hair, seeds & sound',
    bio: 'Constructs immersive floor installations tracing transatlantic slave ship stowage geometry while cultivating sprouting seeds of rebirth.'
  },
  {
    name: 'Clement Cogitore',
    letter: 'C',
    origin: 'Colmar, France',
    work: 'Les Indes Galantes (2017/2022)',
    venue: 'Akademie der Künste, Hanseatenweg',
    medium: 'HD Video installation & Krump choreography',
    bio: 'Transposes Rameau’s 1735 baroque opera onto a street Krump dance battle in Paris, confronting colonial aesthetics with visceral urban energy.'
  },
  {
    name: 'DAAR (Sandi Hilal & Alessandro Petti)',
    letter: 'D',
    origin: 'Beit Sahour / Stockholm',
    work: 'Entity of Decolonization (2022)',
    venue: 'Hamburger Bahnhof',
    medium: 'Architectural facsimile & textile assembly',
    bio: 'Architectural studio and collective examining the reuse, subversion, and profanation of fascist and colonial architecture.'
  },
  {
    name: 'Deneth Piumakshi Veda Arachchige',
    letter: 'D',
    origin: 'Colombo, Sri Lanka / France',
    work: 'Amulets for Forgotten Ancestors (2022)',
    venue: 'Dekoloniale Memory Culture',
    medium: 'Handmade paper, indigenous fibers & ink',
    bio: 'Explores indigenous Vedda community archives looted by German colonial ethnographers and displayed in European museums.'
  },
  {
    name: 'Forensic Architecture',
    letter: 'F',
    origin: 'London, UK / International',
    work: 'Cloud Studies & The Chemical Scars of Colonialism (2022)',
    venue: 'Hamburger Bahnhof',
    medium: 'Spatial reconstruction, fluid dynamics & digital modeling',
    bio: 'Multidisciplinary research group utilizing spatial architecture, teargas chemical modeling, and open-source data to document state violence.'
  },
  {
    name: 'Jihan El-Tahri',
    letter: 'J',
    origin: 'Beirut, Lebanon / Cairo',
    work: 'Modernism in the Ruins of Non-Alignment (2022)',
    venue: 'Akademie der Künste, Hanseatenweg',
    medium: 'Multi-screen archival video installation',
    bio: 'Documentary filmmaker and writer tracing the promises, internal struggles, and betrayals of the Non-Aligned Movement during the Cold War.'
  },
  {
    name: 'Jean-Jacques Lebel',
    letter: 'J',
    origin: 'Paris, France',
    work: 'Solitary Confinement / Abu Ghraib (2022)',
    venue: 'Hamburger Bahnhof',
    medium: 'Labyrinthine photo labyrinth & archival evidence',
    bio: 'A harrowing installation confronting the sanitized circulation of torture images from Abu Ghraib prison, demanding moral witness.'
  },
  {
    name: 'Lamia Joreige',
    letter: 'L',
    origin: 'Beirut, Lebanon',
    work: 'Under-Writing Beirut — Mathaf (2013–2022)',
    venue: 'Akademie der Künste, Pariser Platz',
    medium: 'Mixed media, archival maps, drawings & sound',
    bio: 'Tracks how national borders, wartime demarcations, and civil strife scar urban topography and archaeological artifacts in Beirut.'
  },
  {
    name: 'Mathieu Pernot',
    letter: 'M',
    origin: 'Paris, France',
    work: 'The Fire Inside: Roma Settlements & Displacement (2022)',
    venue: 'Stasi Headquarters. Campus for Democracy',
    medium: 'Photographic prints & field recordings',
    bio: 'Documents the resilience, forced evictions, and alternative architectures of nomadic and marginalized Roma populations across Europe.'
  },
  {
    name: 'Moses März',
    letter: 'M',
    origin: 'Berlin / Cape Town',
    work: 'Maps of Decolonial Berlin (2022)',
    venue: 'Dekoloniale Memory Culture in the City',
    medium: 'Hand-drawn cartography on newsprint',
    bio: 'Cartographer and editor revealing Berlin’s suppressed imperial network through hand-lettered counter-maps and topological texts.'
  },
  {
    name: 'Mai Nguyễn-Long',
    letter: 'M',
    origin: 'Hobart, Tasmania / Vietnam',
    work: 'Vomit Girl (Spew) & The Banyan Tree (2022)',
    venue: 'Akademie der Künste, Hanseatenweg',
    medium: 'Terracotta ceramics, unfired clay & charcoal',
    bio: 'Confronts cross-generational silence around the Vietnam War, blending folk animism with cathartic ceramic effigies.'
  },
  {
    name: 'Nil Yalter',
    letter: 'N',
    origin: 'Cairo / Istanbul / Paris',
    work: 'Exile is a Hard Job & Temporary Dwellings (1975–2022)',
    venue: 'Akademie der Künste, Pariser Platz',
    medium: 'Polychrome drawings, video & nomadic tents',
    bio: 'Pioneer of socially engaged feminist video art documenting the precarious lives of Turkish and North African guest workers across European capitals.'
  },
  {
    name: 'Omer Fast',
    letter: 'O',
    origin: 'Jerusalem / Berlin',
    work: 'Garage Sale (2022)',
    venue: 'KW Institute for Contemporary Art',
    medium: 'Room installation, 3D video & psychological dialogue',
    bio: 'Probes the ambiguities of historical documentation, reenactment, and collective guilt within contemporary western domestic spaces.'
  },
  {
    name: 'Prabhakar Pachpute',
    letter: 'P',
    origin: 'Chandrapur, India',
    work: 'The Dark Minerals of Memory (2022)',
    venue: 'Hamburger Bahnhof',
    medium: 'Charcoal wall murals, fibreglass sculptures & mine soil',
    bio: 'Born into a three-generation mining family, Pachpute depicts hybrid human-machine laborers consumed by coal extraction.'
  },
  {
    name: 'Praneet Soi',
    letter: 'P',
    origin: 'Kolkata, India / Amsterdam',
    work: 'Patterns of the Dispossessed (2022)',
    venue: 'Akademie der Künste, Hanseatenweg',
    medium: 'Hand-painted papier-mâché tiles & silverpoint',
    bio: 'Engages master craftsmen in Kashmir and Guangzhou to map political migrations and geometric ornamentation.'
  },
  {
    name: 'Sammy Baloji',
    letter: 'S',
    origin: 'Lubumbashi, DR Congo / Brussels',
    work: 'Tales of the Copper Crosses (2022)',
    venue: 'Hamburger Bahnhof',
    medium: 'Cast copper sculptures & colonial photographic glass plates',
    bio: 'Exposes how Katanga’s copper mines powered the European industrial revolution while decimating local Congolese sovereignty.'
  },
  {
    name: 'Susan Schuppli',
    letter: 'S',
    origin: 'London, UK / Zurich',
    work: 'Cold Cases & Toxic Ice (2022)',
    venue: 'Stasi Headquarters. Campus for Democracy',
    medium: 'Film installation, seismic sound & glacial ice cores',
    bio: 'Investigates environmental forensics, treating frozen landscapes and toxic spills as recording matter that bears witness to state impunity.'
  },
  {
    name: 'Tammy Nguyen',
    letter: 'T',
    origin: 'San Francisco, CA / New York',
    work: 'Oecologies of the Mekong & The Cold War (2022)',
    venue: 'Akademie der Künste, Hanseatenweg',
    medium: 'Oil paint, gold leaf, watercolor & printmaking',
    bio: 'Layers geopolitical treaties, geological strata, and Southeast Asian flora into dense, luminous theological broadsheets.'
  },
  {
    name: 'Tuan Andrew Nguyen',
    letter: 'T',
    origin: 'Saigon, Vietnam',
    work: 'The Unburied Sounds of a Troubled Horizon (2022)',
    venue: 'KW Institute for Contemporary Art',
    medium: 'Single-channel video & sculpted brass singing bowls',
    bio: 'Examines reincarnation, physical trauma, and spiritual reparation through sculptures forged directly from Vietnam War bomb casings.'
  },
  {
    name: 'Uriel Orlow',
    letter: 'U',
    origin: 'Zurich / London',
    work: 'Soil Affinities & Botanical Memory (2022)',
    venue: 'Akademie der Künste, Hanseatenweg',
    medium: 'Herbarium installations, video & soundscapes',
    bio: 'Explores plants as witnesses to human conflict, tracing how botanical trade routes mirrored transatlantic colonial expansion.'
  },
  {
    name: 'Zach Blas',
    letter: 'Z',
    origin: 'San Diego, CA / London',
    work: 'The Mop (Facial Weaponization Suite) (2022)',
    venue: 'Stasi Headquarters. Campus for Democracy',
    medium: 'Amorphous collective masks & biometric disruption',
    bio: 'Creates physical biometric masks generated from pooled facial scan data to render wearers undetectable to automated police facial recognition algorithms.'
  }
];

function initArtistsIndex() {
  const grid = document.getElementById('artistsGrid');
  const searchInput = document.getElementById('artistSearchInput');
  const alphaBar = document.getElementById('alphabetBar');
  const artistCountEl = document.getElementById('artistsCount');

  let activeLetter = 'ALL';
  let searchTerm = '';

  // Generate alphabet buttons
  const letters = ['ALL', ...new Set(artistsDataset.map(a => a.letter).sort())];
  if (alphaBar) {
    alphaBar.innerHTML = '';
    letters.forEach(letter => {
      const btn = document.createElement('button');
      btn.className = `alpha-btn ${letter === activeLetter ? 'active' : ''}`;
      btn.textContent = letter;
      btn.addEventListener('click', () => {
        alphaBar.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeLetter = letter;
        renderArtists();
      });
      alphaBar.appendChild(btn);
    });
  }

  function renderArtists() {
    if (!grid) return;
    grid.innerHTML = '';

    const filtered = artistsDataset.filter(artist => {
      const matchLetter = activeLetter === 'ALL' || artist.letter === activeLetter;
      const matchSearch = searchTerm === '' || 
        artist.name.toLowerCase().includes(searchTerm) || 
        artist.venue.toLowerCase().includes(searchTerm) ||
        artist.work.toLowerCase().includes(searchTerm);
      return matchLetter && matchSearch;
    });

    if (artistCountEl) {
      artistCountEl.textContent = `${filtered.length} artist${filtered.length === 1 ? '' : 's'} listed`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 36px; text-align: center; border: 1px solid var(--color-obsidian); background: var(--color-paper-white); border-radius: var(--radius-cards);">
          <p style="font-weight: bold; margin-bottom: 4px;">No participating artists found</p>
          <p style="font-size: 13px; color: #666;">Try changing your search keywords or clearing the filter.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(artist => {
      const card = document.createElement('div');
      card.className = 'artist-card';
      card.innerHTML = `
        <div>
          <div class="artist-name">${artist.name}</div>
          <div class="artist-origin">${artist.origin}</div>
          <div class="artist-artwork">${artist.work}</div>
        </div>
        <div class="artist-venue-tag">${artist.venue}</div>
      `;
      card.addEventListener('click', () => {
        openArtistModal(artist);
      });
      grid.appendChild(card);
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase().trim();
      renderArtists();
    });
  }

  renderArtists();
}

function openArtistModal(artist) {
  const modal = document.getElementById('artistModal');
  if (!modal) return;

  document.getElementById('modalArtistName').textContent = artist.name;
  document.getElementById('modalArtistOrigin').textContent = artist.origin;
  document.getElementById('modalArtistWork').textContent = artist.work;
  document.getElementById('modalArtistVenue').textContent = artist.venue;
  document.getElementById('modalArtistMedium').textContent = artist.medium;
  document.getElementById('modalArtistBio').textContent = artist.bio;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// -----------------------------------------------------------------------------
// Interactive Constructivist Map & Venue Cards
// -----------------------------------------------------------------------------
function initInteractiveMap() {
  const markers = document.querySelectorAll('.map-marker');
  const venueCards = document.querySelectorAll('.venue-card');

  markers.forEach(marker => {
    marker.addEventListener('click', () => {
      const venueKey = marker.dataset.venueKey;
      markers.forEach(m => m.classList.remove('active'));
      marker.classList.add('active');

      venueCards.forEach(card => {
        if (card.dataset.venueKey === venueKey) {
          card.classList.add('highlighted');
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          card.classList.remove('highlighted');
        }
      });
      showToast(`Selected Venue: ${marker.dataset.venueName}`);
    });
  });

  // Venue card locate on map button
  document.querySelectorAll('[data-locate-venue]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.locateVenue;
      const targetMarker = document.querySelector(`.map-marker[data-venue-key="${key}"]`);
      if (targetMarker) {
        document.getElementById('mapContainer')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        markers.forEach(m => m.classList.remove('active'));
        targetMarker.classList.add('active');
        showToast(`Located on map: ${targetMarker.dataset.venueName}`);
      }
    });
  });
}

// -----------------------------------------------------------------------------
// Ticket Booking Flow & Voucher Generator
// -----------------------------------------------------------------------------
const ticketPrices = {
  day: { name: 'Day Pass (1 Venue)', regular: 18, conc: 10 },
  pass: { name: 'Biennale Pass (All 6 Venues)', regular: 32, conc: 18 },
  tour: { name: 'Guided Tour Add-on', regular: 5, conc: 5 },
  under18: { name: 'Youth Pass (< 18 yrs)', regular: 0, conc: 0 }
};

function initTicketBooking() {
  // Trigger buttons
  document.querySelectorAll('[data-action="open-tickets"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openTicketModal();
    });
  });

  const modal = document.getElementById('ticketModal');
  const typeSelect = document.getElementById('ticketTypeSelect');
  const concessionCheckbox = document.getElementById('ticketConcession');
  const qtyInput = document.getElementById('ticketQty');
  const totalDisplay = document.getElementById('ticketTotalPrice');
  const bookSubmitBtn = document.getElementById('ticketSubmitBtn');
  const ticketFormContainer = document.getElementById('ticketFormContainer');
  const ticketSuccessContainer = document.getElementById('ticketSuccessContainer');

  function calculateTotal() {
    if (!typeSelect || !qtyInput || !totalDisplay) return;
    const typeKey = typeSelect.value;
    const isConc = concessionCheckbox ? concessionCheckbox.checked : false;
    const qty = parseInt(qtyInput.value, 10) || 1;

    const rate = isConc ? ticketPrices[typeKey].conc : ticketPrices[typeKey].regular;
    const total = rate * qty;
    totalDisplay.textContent = `€${total}.00`;
  }

  if (typeSelect) typeSelect.addEventListener('change', calculateTotal);
  if (concessionCheckbox) concessionCheckbox.addEventListener('change', calculateTotal);
  if (qtyInput) qtyInput.addEventListener('input', calculateTotal);

  if (bookSubmitBtn) {
    bookSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('ticketAttendeeName');
      const emailInput = document.getElementById('ticketAttendeeEmail');
      const dateInput = document.getElementById('ticketDate');

      const name = nameInput?.value.trim() || 'Exhibition Visitor';
      const email = emailInput?.value.trim() || 'visitor@berlinbiennale.de';
      const date = dateInput?.value || '2022-09-18';
      const typeKey = typeSelect?.value || 'pass';
      const qty = qtyInput?.value || 1;

      // Generate Ticket Voucher
      const ticketId = 'BB12-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      
      const voucherName = document.getElementById('voucherName');
      const voucherType = document.getElementById('voucherType');
      const voucherDate = document.getElementById('voucherDate');
      const voucherCode = document.getElementById('voucherCode');

      if (voucherName) voucherName.textContent = name;
      if (voucherType) voucherType.textContent = `${qty}x ${ticketPrices[typeKey].name}`;
      if (voucherDate) voucherDate.textContent = date;
      if (voucherCode) voucherCode.textContent = ticketId;

      ticketFormContainer.style.display = 'none';
      ticketSuccessContainer.style.display = 'block';

      showToast(`Pass confirmed: ${ticketId}`);
    });
  }

  // Reset ticket modal when closed
  const resetBtn = document.getElementById('ticketResetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      ticketSuccessContainer.style.display = 'none';
      ticketFormContainer.style.display = 'block';
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
}

function openTicketModal(preselectedEventTitle = '') {
  const modal = document.getElementById('ticketModal');
  if (!modal) return;

  const eventNote = document.getElementById('ticketEventNote');
  if (eventNote) {
    if (preselectedEventTitle) {
      eventNote.style.display = 'block';
      eventNote.textContent = `Booking for: ${preselectedEventTitle}`;
    } else {
      eventNote.style.display = 'none';
    }
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// -----------------------------------------------------------------------------
// Archival Reference Viewer (incorporating ./assets/hero-screenshot.jpg)
// -----------------------------------------------------------------------------
function initArchivalViewer() {
  const trigger = document.getElementById('viewArchiveBtn');
  const modal = document.getElementById('archiveModal');

  if (trigger && modal) {
    trigger.addEventListener('click', () => {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
}

// -----------------------------------------------------------------------------
// Generic Modals & Newsletter
// -----------------------------------------------------------------------------
function initModals() {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // Publication Modal trigger
  document.querySelectorAll('[data-view-publication]').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.dataset.viewPublication;
      const pubModal = document.getElementById('publicationModal');
      if (pubModal) {
        document.getElementById('pubModalTitle').textContent = title;
        pubModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });
}

function initNewsletter() {
  const form = document.getElementById('footerNewsletterForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast(`Subscribed: ${input.value} to Berlin Biennale updates.`);
        input.value = '';
      }
    });
  }
}
