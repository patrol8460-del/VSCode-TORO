
// ===== LC TOPO - TOIR Dashboard =====

const API_URL = "/api/needs";

let allNeeds = [];
let currentSection = "dashboard";

const sectionNames = {
  dashboard: "Панель управления",
  equipment: "Оборудование",
  personnel: "Подразделения",
  materials: "Запасные части",
  planning: "График ППР",
  requests: "Неплановые заявки",
  reports: "Аналитика"
};

// SVG outline icons (stroke-based, no fill)
const svgIcons = {
  dashboard: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  equipment: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  personnel: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  materials: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
  planning: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  requests: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
  reports: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  // Stat & action icons (larger)
  doc: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
  warning: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  calendar: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  cube: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
  users: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  chart: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  clock: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  bell: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  chevronLeft: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>'
};

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  loadStats();
});

// ===== SIDEBAR TOGGLE =====
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("collapsed");
}

// ===== SIDEBAR NAVIGATION =====
function switchSection(el) {
  document.querySelectorAll(".sidebar-link").forEach(link => link.classList.remove("active"));
  el.classList.add("active");

  currentSection = el.dataset.section;
  document.getElementById("bcCurrent").textContent = sectionNames[currentSection] || currentSection;

  renderSectionContent();
}

function navigateTo(section) {
  const link = document.querySelector(`.sidebar-link[data-section="${section}"]`);
  if (link) switchSection(link);
}

// ===== RENDER SECTION CONTENT =====
function renderSectionContent() {
  const content = document.getElementById("mainContent");

  if (currentSection === "dashboard") {
    renderDashboard(content);
  } else {
    renderPlaceholder(content);
  }
}

function renderDashboard(container) {
  container.innerHTML = `
    <div class="welcome-block">
      <h1>Добро пожаловать, Администратор!</h1>
      <p>Ремонтная служба предприятия</p>
    </div>

    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-icon blue">${svgIcons.doc}</div>
        <div class="stat-info">
          <div class="stat-value" id="statEquipment">0</div>
          <div class="stat-unit">единиц</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange">${svgIcons.warning}</div>
        <div class="stat-info">
          <div class="stat-value" id="statRequests">0</div>
          <div class="stat-unit">заявок</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green">${svgIcons.calendar}</div>
        <div class="stat-info">
          <div class="stat-value" id="statPPR">0</div>
          <div class="stat-unit">на месяц</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple">${svgIcons.cube}</div>
        <div class="stat-info">
          <div class="stat-value" id="statParts">0</div>
          <div class="stat-unit">наименований</div>
        </div>
      </div>
    </div>

    <div class="section-header">
      <h2>Быстрые действия</h2>
    </div>
    <div class="quick-actions">
      <div class="action-card" onclick="navigateTo('equipment')">
        <div class="action-icon blue">${svgIcons.equipment}</div>
        <div class="action-title">Оборудование</div>
        <div class="action-desc">Классификатор объектов предприятия</div>
        <div class="watermark">РАБОТКЕ</div>
      </div>
      <div class="action-card" onclick="navigateTo('requests')">
        <div class="action-icon orange">${svgIcons.requests}</div>
        <div class="action-title">Неплановые заявки</div>
        <div class="action-desc">Обращения на проведение работ</div>
        <div class="watermark">РАБОТКЕ</div>
      </div>
      <div class="action-card" onclick="navigateTo('planning')">
        <div class="action-icon green">${svgIcons.planning}</div>
        <div class="action-title">Планирование ППР</div>
        <div class="action-desc">График плановых ремонтов</div>
        <div class="watermark">РАБОТКЕ</div>
      </div>
      <div class="action-card" onclick="navigateTo('materials')">
        <div class="action-icon purple">${svgIcons.materials}</div>
        <div class="action-title">Запасные части</div>
        <div class="action-desc">Учет и заказ комплектующих</div>
        <div class="watermark">РАБОТКЕ</div>
      </div>
      <div class="action-card" onclick="navigateTo('personnel')">
        <div class="action-icon red">${svgIcons.users}</div>
        <div class="action-title">Персонал</div>
        <div class="action-desc">Управление бригадами и заданиями</div>
        <div class="watermark">РАБОТКЕ</div>
      </div>
      <div class="action-card" onclick="navigateTo('reports')">
        <div class="action-icon blue-chart">${svgIcons.chart}</div>
        <div class="action-title">Аналитика</div>
        <div class="action-desc">KPI и отчеты ремонтной службы</div>
        <div class="watermark">РАБОТКЕ</div>
      </div>
    </div>

    <div class="activity-block">
      <div class="section-header">
        <h2>Последняя активность</h2>
        <a class="view-all">Все события →</a>
      </div>
      <div class="empty-activity">
        <div class="empty-icon">${svgIcons.clock}</div>
        <p>Нет записей о действиях</p>
      </div>
    </div>
  `;

  loadStats();
}

function renderPlaceholder(container) {
  const name = sectionNames[currentSection] || currentSection;
  const icon = svgIcons[currentSection] || svgIcons.dashboard;

  container.innerHTML = `
    <div class="welcome-block">
      <h1>${name}</h1>
      <p>Раздел в разработке</p>
    </div>
    <div class="activity-block" style="margin-top: 24px;">
      <div class="empty-activity" style="padding: 80px 20px;">
        <div class="empty-icon" style="opacity: 0.3;">${icon}</div>
        <p style="font-size: 16px; margin-top: 12px; color: #64748b;">Раздел «${name}» скоро будет доступен</p>
      </div>
    </div>
  `;
}

// ===== LOAD STATS FROM API =====
async function loadStats() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Ошибка");
    allNeeds = await response.json();

    const total = allNeeds.length;
    const approved = allNeeds.filter(n => n.status === "Согласовано").length;
    const pending = allNeeds.filter(n => n.status === "На рассмотрении").length;

    const el = (id) => document.getElementById(id);
    if (el("statEquipment")) el("statEquipment").textContent = total;
    if (el("statRequests")) el("statRequests").textContent = pending;
    if (el("statPPR")) el("statPPR").textContent = approved;
    if (el("statParts")) el("statParts").textContent = "0";
  } catch (e) {
    console.error("Stats load error:", e);
  }
}
