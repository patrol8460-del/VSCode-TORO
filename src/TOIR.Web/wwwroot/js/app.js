
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
  } else if (currentSection === "equipment") {
    renderEquipment(content);
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

// ===== RENDER EQUIPMENT SECTION =====
let allEquipment = [];

function renderEquipment(container) {
  container.innerHTML = `
    <div class="welcome-block">
      <h1>Оборудование</h1>
      <p>Реестр единиц оборудования предприятия</p>
    </div>
    <div class="data-table-wrap">
      <div class="data-table-toolbar">
        <div style="display:flex;align-items:center;">
          <h3>Список оборудования</h3>
          <span class="toolbar-count" id="equipCount"></span>
        </div>
      </div>
      <div style="overflow-x:auto;">
        <table class="data-table" id="equipmentTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Наименование</th>
              <th>Тип / модель</th>
              <th>Статус</th>
              <th>Цех</th>
              <th>Корпус</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  `;

  loadEquipment();
}

async function loadEquipment() {
  try {
    const response = await fetch("/api/equipment");
    if (!response.ok) throw new Error("Ошибка загрузки");
    allEquipment = await response.json();

    const countEl = document.getElementById("equipCount");
    if (countEl) countEl.textContent = "(" + allEquipment.length + " ед.)";

    const tbody = document.querySelector("#equipmentTable tbody");
    tbody.innerHTML = "";

    allEquipment.forEach(item => {
      const tr = document.createElement("tr");
      tr.onclick = function() { openEquipmentDetail(item.id); };

      const statusBadge = item.status_oborudovaniya
        ? '<span class="cell-badge default">' + (item.status_oborudovaniya || "") + "</span>"
        : '<span class="cell-secondary">—</span>';

      tr.innerHTML =
        '<td class="cell-id">' + (item.id || "") + "</td>" +
        '<td><span class="cell-link">' + (item.naimenovanie_oborudovaniya || "—") + "</span></td>" +
        "<td>" + (item.tip_model || "—") + "</td>" +
        "<td>" + statusBadge + "</td>" +
        "<td>" + (item.ceh || "—") + "</td>" +
        '<td class="cell-secondary">' + (item.korpus || "—") + "</td>";
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error("Ошибка загрузки оборудования:", error);
  }
}

// ===== EQUIPMENT DETAIL =====
const equipTabs = ["Основное", "Местоположение", "Ответственные", "Планирование", "Поверка", "Надзор"];

const equipFields = {
  "Основное": [
    { key: "naimenovanie_oborudovaniya", label: "Наименование", type: "text" },
    { key: "kolichestvo", label: "Кол-во", type: "number", step: "0.01", min: "0" },
    { key: "ei", label: "ЕИ", type: "text" },
    { key: "tip_model", label: "Тип / модель", type: "text" },
    { key: "chertezh", label: "Чертеж", type: "text" },
    { key: "seriyniy_nomer", label: "Серийный номер", type: "text" },
    { key: "klass", label: "Класс", type: "text" },
    { key: "inventarniy_nomer_OS", label: "Инв. № ОС", type: "number", min: "0" },
    { key: "nomer_TOPAZ", label: "№ ТОПАЗ", type: "text" },
    { key: "nomer_SAP_TORO", label: "№ SAP TORO", type: "number", min: "0" },
    { key: "kod_ABCD", label: "Код ABCD", type: "text" },
    { key: "mvz", label: "МВЗ", type: "text" },
    { key: "izgotovitel", label: "Изготовитель", type: "text" },
    { key: "data_vypuska", label: "Дата выпуска", type: "date", pair: "data_vvoda_v_exspluataciyu" },
    { key: "data_vvoda_v_exspluataciyu", label: "Дата ввода в экспл.", type: "date", pairWith: true },
    { key: "data_spisaniya", label: "Дата списания", type: "date" },
    { key: "vazhnost_dlya_tehnologicheskogo_processa", label: "Важность для техн. процесса", type: "text" },
    { key: "klyuchevoe", label: "Ключевое", type: "checkbox" },
    { key: "ispytatelnoe", label: "Испытательное", type: "checkbox" },
    { key: "status_oborudovaniya", label: "Статус", type: "text" },
    { key: "vyshestoyaschaya_EO", label: "Вышестоящая ЕО", type: "number", min: "0" },
    { key: "nalichie_rezerva", label: "Наличие резерва", type: "checkbox" }
  ],
  "Местоположение": [
    { key: "ceh", label: "Цех", type: "text" },
    { key: "korpus", label: "Корпус", type: "text" },
    { key: "proizvodstvenniy_uchastok", label: "Произв. участок", type: "text" },
    { key: "tehnologicheskiy_uchastok", label: "Техн. участок", type: "text" },
    { key: "nomer_pomesheniya", label: "№ помещения", type: "text" },
    { key: "naimenovanie_pomesheniya", label: "Наименование помещения", type: "text" },
    { key: "mestopolozhenie", label: "Местоположение", type: "text" },
    { key: "liniya_ustanovka_kompleks", label: "Линия / установка", type: "text" },
    { key: "vysotnaya_otmetka", label: "Отметка Z", type: "number", step: "0.01" },
    { key: "os_1_po_gorizontali", label: "Ось Х1", type: "text" },
    { key: "os_2_po_gorizontali", label: "Ось Х2", type: "text" },
    { key: "os_1_po_vertikali", label: "Ось Y1", type: "text" },
    { key: "os_2_po_vertikali", label: "Ось Y2", type: "text" },
    { key: "nomer_proekta", label: "№ проекта", type: "text" },
    { key: "poziciya_po_proekty", label: "Позиция по проекту", type: "text" },
    { key: "prolet", label: "Пролет", type: "text" },
    { key: "etazh", label: "Этаж", type: "text" }
  ],
  "Ответственные": [
    { key: "ceh_otvetstvenniy", label: "Цех-ответственный", type: "text" },
    { key: "sluzhba_glavnogo_specialista", label: "Служба гл. специалиста", type: "text" },
    { key: "litso_otvetstvennoe_ispravnoe", label: "Ответственный за исправное", type: "text" },
    { key: "litso_otvetstvennoe_bezopasnoe", label: "Ответственный за безопасное", type: "text" },
    { key: "materialno_otvetstvennoe_litso", label: "Материально-ответственный", type: "text" }
  ],
  "Планирование": [
    { key: "periodichnost_TO_meh", label: "ТО мех (мес.)", type: "number", step: "0.01", min: "0" },
    { key: "periodichnost_TR_meh", label: "ТР мех (мес.)", type: "number", step: "0.01", min: "0" },
    { key: "periodichnost_KR_meh", label: "КР мех (мес.)", type: "number", step: "0.01", min: "0" },
    { key: "periodichnost_TO_el", label: "ТО эл (мес.)", type: "number", step: "0.01", min: "0" },
    { key: "periodichnost_TR_el", label: "ТР эл (мес.)", type: "number", step: "0.01", min: "0" },
    { key: "periodichnost_KR_el", label: "КР эл (мес.)", type: "number", step: "0.01", min: "0" },
    { key: "periodichnost_TO_kip", label: "ТО кип (мес.)", type: "number", step: "0.01", min: "0" },
    { key: "periodichnost_TR_kip", label: "ТР кип (мес.)", type: "number", step: "0.01", min: "0" },
    { key: "periodichnost_TO_ASU", label: "ТО АСУ (мес.)", type: "number", step: "0.01", min: "0" },
    { key: "ispolnitel_TO_meh", label: "Исп. ТО мех", type: "text" },
    { key: "ispolnitel_TR_meh", label: "Исп. ТР мех", type: "text" },
    { key: "ispolnitel_KR_meh", label: "Исп. КР мех", type: "text" },
    { key: "ispolnitel_TO_el", label: "Исп. ТО эл", type: "text" },
    { key: "ispolnitel_TR_el", label: "Исп. ТР эл", type: "text" },
    { key: "ispolnitel_KR_el", label: "Исп. КР эл", type: "text" },
    { key: "ispolnitel_TO_kip", label: "Исп. ТО кип", type: "text" },
    { key: "ispolnitel_TR_kip", label: "Исп. ТР кип", type: "text" },
    { key: "ispolnitel_TO_ASU", label: "Исп. ТО АСУ", type: "text" },
    { key: "remontoslozhnost_meh", label: "Рем-ть мех", type: "number", step: "0.01", min: "0" },
    { key: "remontoslozhnost_el", label: "Рем-ть эл", type: "number", step: "0.01", min: "0" },
    { key: "remontoslozhnost_kip", label: "Рем-ть КИПиА", type: "number", step: "0.01", min: "0" },
    { key: "remontoslozhnost_ASUTP", label: "Рем-ть АСУТП", type: "number", step: "0.01", min: "0" },
    { key: "data_nachala_cikla_remontov", label: "Дата начала цикла", type: "date" },
    { key: "smennost", label: "Сменность", type: "text" },
    { key: "koefficient_usloviy_truda", label: "Кут (1–1,15)", type: "number", step: "0.01", min: "1", max: "1.15" },
    { key: "dop_remontniy_koefficient_DRK", label: "ДРК (1–1,3)", type: "number", step: "0.01", min: "1", max: "1.3" }
  ],
  "Поверка": [
    { key: "data_posledney_poverki", label: "Дата последней поверки", type: "date", pair: "goden_do" },
    { key: "goden_do", label: "Годен до", type: "date", pairWith: true }
  ],
  "Надзор": [
    { key: "yavlyaetsya_tehnicheskim_ustroystvom_OPO", label: "Тех. устройство ОПО", type: "checkbox" },
    { key: "yavlyaetsya_tehnicheskim_ustroystvom_HOPO", label: "Тех. устройство ХОПО", type: "checkbox" },
    { key: "yavlyaetsya_obektom_vazhnim_bezopasnosti", label: "Объект, важный для безопасности", type: "checkbox" },
    { key: "yavlyaetsya_yadernoy_ustanovkoy", label: "Ядерная установка", type: "checkbox" },
    { key: "normativniy_dokument_klassa_bezopasnosti", label: "Норм. документ класса безоп.", type: "text" },
    { key: "klass_bezopasnosti", label: "Класс безоп. (1–4)", type: "number", min: "1", max: "4" },
    { key: "klassifikacionnoe_oboznachenie", label: "Классиф. обозначение", type: "text" },
    { key: "yavlyaetsya_obektom_ohrany_okruzhayuschey_sredy", label: "Влияет на охрану окр. среды", type: "checkbox" },
    { key: "yavlyaetsya_obektom_protivopozharnoy_zaschity", label: "Объект пож. защиты", type: "checkbox" },
    { key: "nadzorniy_organ_vneshniy", label: "Надзор (внешний)", type: "text" },
    { key: "nadzorniy_organ_vnutrenniy", label: "Надзор (внутренний)", type: "text" },
    { key: "registracionniy_nomer", label: "Рег. номер", type: "text" },
    { key: "srok_sluzhby_let", label: "Срок службы (лет)", type: "number", min: "0" },
    { key: "data_istecheniya_sroka_sluzhby", label: "Дата истечения срока", type: "date" }
  ]
};

let currentEquipId = null;
let currentEquipTab = "Основное";
let currentEquipData = {};

function openEquipmentDetail(id) {
  currentEquipId = id;
  currentEquipTab = "Основное";
  const item = allEquipment.find(e => e.id === id);
  if (!item) return;
  currentEquipData = JSON.parse(JSON.stringify(item));
  renderEquipmentDetail();
}

function renderEquipmentDetail() {
  const content = document.getElementById("mainContent");

  const tabButtons = equipTabs.map(t => {
    const cls = t === currentEquipTab ? "detail-tab active" : "detail-tab";
    return '<button class="'+cls+'" onclick="switchEquipTab(\''+t+'\')">'+t+'</button>';
  }).join("");

  const fields = equipFields[currentEquipTab] || [];

  // Build "rows": pair adjacent date fields, each other field is its own row
  const rows = [];
  let i = 0;
  while (i < fields.length) {
    const f = fields[i];
    if (f.type === "date" && f.pair && !f.pairWith) {
      // Find the paired field
      const paired = fields.find(x => x.key === f.pair);
      if (paired) {
        rows.push([f, paired]);
        i += 2;
        continue;
      }
    }
    if (f.pairWith) { i++; continue; } // skip, already paired
    rows.push([f]);
    i++;
  }

  // Smart column split: 20 fields → 10+10, 17 → 9+8
  const numCols = Math.ceil(rows.length / 10);
  const colSize = Math.ceil(rows.length / numCols);
  const columns = [];
  for (let c = 0; c < numCols; c++) {
    columns.push(rows.slice(c * colSize, (c + 1) * colSize));
  }

  function renderInput(f) {
    const val = currentEquipData[f.key];
    const extraAttrs = (f.step ? ' step="'+f.step+'"' : '') + (f.min != null ? ' min="'+f.min+'"' : '') + (f.max != null ? ' max="'+f.max+'"' : '');
    if (f.type === "checkbox") {
      const checked = val ? " checked" : "";
      return '<div class="detail-field field-checkbox"><input type="checkbox" id="ef_'+f.key+'"'+checked+' onchange="onEquipFieldChange(\''+f.key+'\',this.checked)"><label for="ef_'+f.key+'">'+f.label+'</label></div>';
    }
    let dispVal = val != null ? val : "";
    if (f.type === "date" && dispVal) dispVal = dispVal.substring(0, 10);
    return '<div class="detail-field"><label>'+f.label+'</label><input type="'+f.type+'" id="ef_'+f.key+'" value="'+dispVal+'"'+extraAttrs+' onchange="onEquipFieldChange(\''+f.key+'\',this.value)"></div>';
  }

  const fieldsHtml = columns.map(col => {
    const colHtml = col.map(row => {
      if (row.length === 2) {
        // Paired dates side by side
        return '<div class="detail-field field-date-pair">' + renderInput(row[0]) + renderInput(row[1]) + '</div>';
      }
      return renderInput(row[0]);
    }).join("");
    return '<div class="detail-column">'+colHtml+'</div>';
  }).join("");

  content.innerHTML = `
    <button class="detail-back-btn" onclick="renderEquipment(document.getElementById('mainContent'))">
      ← Назад к списку
    </button>
    <div class="detail-header">
      <h2>Оборудование #${currentEquipId}</h2>
      <span class="detail-subtitle">${currentEquipData.tip_model || currentEquipData.naimenovanie_oborudovaniya || ""}</span>
    </div>
    <div class="detail-tabs">
      ${tabButtons}
    </div>
    <div class="detail-fields">
      ${fieldsHtml}
    </div>
    <div class="detail-actions">
      <button class="btn-save" onclick="saveEquipment()">Сохранить</button>
      <span id="saveStatus" class="save-status" style="display:none;">✓ Сохранено</span>
    </div>
  `;
}

function switchEquipTab(tab) {
  currentEquipTab = tab;
  renderEquipmentDetail();
}

function onEquipFieldChange(key, value) {
  // Find field definition to determine type
  const allFields = Object.values(equipFields).flat();
  const field = allFields.find(f => f.key === key);

  if (field) {
    if (field.type === "checkbox") {
      currentEquipData[key] = value; // boolean from this.checked
    } else if (field.type === "number") {
      if (value === "" || value === null || value === undefined) {
        currentEquipData[key] = 0;
      } else {
        const num = parseFloat(value);
        currentEquipData[key] = isNaN(num) ? 0 : num;
      }
    } else if (field.type === "date") {
      // Send null for empty dates, ISO string for non-empty
      currentEquipData[key] = value ? value : null;
    } else {
      currentEquipData[key] = value; // string for text
    }
  } else {
    currentEquipData[key] = value;
  }
}

async function saveEquipment() {
  try {
    const response = await fetch("/api/equipment/" + currentEquipId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentEquipData)
    });
    if (!response.ok) throw new Error("Ошибка сохранения");
    currentEquipData = await response.json();
    const idx = allEquipment.findIndex(e => e.id === currentEquipId);
    if (idx >= 0) allEquipment[idx] = JSON.parse(JSON.stringify(currentEquipData));
    const st = document.getElementById("saveStatus");
    if (st) { st.style.display = "inline"; setTimeout(() => { st.style.display = "none"; }, 2000); }
  } catch (error) {
    console.error("Ошибка сохранения:", error);
    alert("Ошибка при сохранении: " + error.message);
  }
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
