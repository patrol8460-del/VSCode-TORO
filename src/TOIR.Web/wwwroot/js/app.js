
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
const equipTabs = ["Основное", "Местоположение", "Ответственные", "Планирование", "Поверка", "Надзор", "Замеряемые параметры"];

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

  if (currentEquipTab === "Замеряемые параметры") {
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
      <div id="measurableParamsContainer">
        <div class="meas-loading">Загрузка параметров...</div>
      </div>
    `;
    loadMeasurableParams();
    return;
  }

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

// ===== MEASURABLE PARAMETERS =====

let measurableParams = [];

const okeiUnits = [
  { code: "006", name: "м" },
  { code: "008", name: "мм" },
  { code: "012", name: "дм" },
  { code: "018", name: "км" },
  { code: "020", name: "см" },
  { code: "025", name: "мкм" },
  { code: "027", name: "нм" },
  { code: "039", name: "дюйм" },
  { code: "050", name: "м²" },
  { code: "055", name: "см²" },
  { code: "060", name: "мм²" },
  { code: "070", name: "дм²" },
  { code: "071", name: "км²" },
  { code: "112", name: "л" },
  { code: "113", name: "мл" },
  { code: "120", name: "дм³" },
  { code: "121", name: "см³" },
  { code: "123", name: "мм³" },
  { code: "131", name: "м³" },
  { code: "160", name: "г" },
  { code: "161", name: "мг" },
  { code: "162", name: "кг" },
  { code: "163", name: "т" },
  { code: "166", name: "ц" },
  { code: "170", name: "карат" },
  { code: "206", name: "Н" },
  { code: "208", name: "кН" },
  { code: "222", name: "Па" },
  { code: "223", name: "кПа" },
  { code: "224", name: "МПа" },
  { code: "227", name: "бар" },
  { code: "231", name: "атм" },
  { code: "237", name: "мм рт.ст." },
  { code: "241", name: "мм вод.ст." },
  { code: "250", name: "Дж" },
  { code: "251", name: "кДж" },
  { code: "252", name: "МДж" },
  { code: "271", name: "Вт" },
  { code: "272", name: "кВт" },
  { code: "273", name: "МВт" },
  { code: "285", name: "л.с." },
  { code: "305", name: "°С" },
  { code: "315", name: "А" },
  { code: "316", name: "мА" },
  { code: "327", name: "В" },
  { code: "328", name: "кВ" },
  { code: "329", name: "мВ" },
  { code: "338", name: "Ом" },
  { code: "341", name: "кОм" },
  { code: "342", name: "МОм" },
  { code: "355", name: "Гц" },
  { code: "356", name: "кГц" },
  { code: "357", name: "МГц" },
  { code: "361", name: "об/мин" },
  { code: "366", name: "Ф" },
  { code: "367", name: "мкФ" },
  { code: "371", name: "Гн" },
  { code: "372", name: "мГн" },
  { code: "505", name: "ч" },
  { code: "506", name: "мин" },
  { code: "507", name: "с" },
  { code: "539", name: "дБ" },
  { code: "565", name: "%" },
  { code: "570", name: "‰" },
  { code: "796", name: "шт." },
  { code: "839", name: "комплект" },
  { code: "868", name: "рулон" }
];

async function loadMeasurableParams() {
  try {
    const response = await fetch("/api/measurableparameters?equipmentId=" + currentEquipId);
    if (!response.ok) throw new Error("Ошибка загрузки");
    measurableParams = await response.json();
    renderMeasurableParams();
  } catch (error) {
    console.error("Ошибка загрузки параметров:", error);
    const container = document.getElementById("measurableParamsContainer");
    if (container) container.innerHTML = '<div class="meas-error">Ошибка загрузки параметров</div>';
  }
}

function renderMeasurableParams() {
  const container = document.getElementById("measurableParamsContainer");
  if (!container) return;

  if (measurableParams.length === 0) {
    container.innerHTML = `
      <div class="meas-empty">
        <div class="meas-empty-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
        </div>
        <p>Замеряемые параметры не добавлены</p>
        <button class="btn-add-param" onclick="showAddParamForm()">+ Добавить параметр</button>
      </div>
      <div id="measModal" class="meas-modal" style="display:none;"></div>
    `;
    return;
  }

  const paramsHtml = measurableParams.map(p => {
    const measurementsHtml = (p.measurements || []).map(m => {
      const dateStr = m.measurementDate ? m.measurementDate.substring(0, 10) : "";
      return '<tr><td>' + dateStr + '</td><td>' + m.value + '</td><td>' + (m.note || "") + '</td><td><button class="btn-icon-sm" onclick="deleteMeasurement(' + p.id + ',' + m.id + ')" title="Удалить">✕</button></td></tr>';
    }).join("");

    const sparkId = "spark_" + p.id;
    const lastVal = (p.measurements && p.measurements.length > 0) ? p.measurements[p.measurements.length-1].value : '—';
    const lastDate = (p.measurements && p.measurements.length > 0) ? (p.measurements[p.measurements.length-1].measurementDate || '').substring(0,10) : '';
    const hasData = p.measurements && p.measurements.length > 0;

    return `
      <div class="meas-param-card" id="paramCard_${p.id}">
        <div class="meas-param-header">
          <div class="meas-param-title">
            <span class="meas-param-name">${p.name || "Без названия"}</span>
            <span class="meas-param-unit">(${p.unitName || "—"})</span>
          </div>
          <div class="meas-param-actions">
            <button class="btn-icon-sm" onclick="showEditParamForm(${p.id})" title="Редактировать">✎</button>
            <button class="btn-icon-sm btn-icon-danger" onclick="deleteParam(${p.id})" title="Удалить">✕</button>
          </div>
        </div>
        <div class="meas-param-info">
          <div class="meas-info-item">
            <span class="meas-info-label">Реф. значение</span>
            <span class="meas-info-value">${p.referenceValue} ${p.unitName || ""}</span>
          </div>
          <div class="meas-info-item">
            <span class="meas-info-label">Допуск</span>
            <span class="meas-info-value">${p.deviationMinus > 0 ? '-' : ''}${p.deviationMinus}% ... +${p.deviationPlus}%</span>
          </div>
          ${hasData ? '<div class="meas-info-item"><span class="meas-info-label">Последний замер</span><span class="meas-info-value">' + lastVal + ' ' + (p.unitName||'') + ' <span class="meas-date-sub">' + lastDate + '</span></span></div>' : ''}
        </div>
        <div class="meas-sparkline-wrap" id="${sparkId}" onclick="openFullChart(${p.id})" title="Нажмите для полного графика"></div>
        <div class="meas-measurements">
          <div class="meas-measurements-header" onclick="toggleMeasurements(${p.id})" style="cursor:pointer">
            <span class="meas-measurements-toggle">Замеры <span class="meas-toggle-arrow" id="arrow_${p.id}">▸</span></span>
            <button class="btn-add-measurement" onclick="event.stopPropagation(); showAddMeasurementForm(${p.id})">+ Замер</button>
          </div>
          <div class="meas-measurements-body" id="measBody_${p.id}" style="display:none">
            ${hasData ? `
              <table class="meas-table">
                <thead><tr><th>Дата</th><th>Значение</th><th>Примечание</th><th></th></tr></thead>
                <tbody>${measurementsHtml}</tbody>
              </table>
            ` : '<div class="meas-no-data">Замеры не проводились</div>'}
          </div>
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML = `
    <div class="meas-toolbar">
      <button class="btn-add-param" onclick="showAddParamForm()">+ Добавить параметр</button>
    </div>
    <div class="meas-params-grid">
      ${paramsHtml}
    </div>
    <div id="measModal" class="meas-modal" style="display:none;"></div>
    <div id="chartModal" class="meas-modal" style="display:none;"></div>
  `;

  // Draw sparklines after DOM is ready
  measurableParams.forEach(p => drawSparkline(p));
}

function drawSparkline(param) {
  const sparkId = "spark_" + param.id;
  const wrap = document.getElementById(sparkId);
  if (!wrap) return;

  const measurements = param.measurements || [];
  if (measurements.length < 2) {
    wrap.innerHTML = '<div class="meas-chart-empty">Нет данных для графика</div>';
    return;
  }

  const W = 200, H = 40;
  const ref = param.referenceValue;
  const plusLimit = ref * (1 + param.deviationPlus / 100);
  const minusLimit = ref * (1 - param.deviationMinus / 100);

  const values = measurements.map(m => m.value);
  const allVals = [...values, ref, plusLimit, minusLimit];
  const minV = Math.min(...allVals);
  const maxV = Math.max(...allVals);
  const range = maxV - minV || 1;

  const scaleX = (i) => (i / Math.max(measurements.length - 1, 1)) * W;
  const scaleY = (v) => H - ((v - minV) / range) * H;

  const refY = scaleY(ref);
  const plusY = scaleY(plusLimit);
  const minusY = scaleY(minusLimit);

  // Tolerance zone
  const tolZone = '<rect x="0" y="'+plusY+'" width="'+W+'" height="'+(minusY - plusY)+'" fill="#fef2f2" opacity="0.5"/>';

  // Reference line
  const refLine = '<line x1="0" y1="'+refY+'" x2="'+W+'" y2="'+refY+'" stroke="#22c55e" stroke-width="1" stroke-dasharray="4,2"/>';

  // Data line
  let pathD = '';
  measurements.forEach((m, idx) => {
    const x = scaleX(idx);
    const y = scaleY(m.value);
    pathD += (idx === 0 ? 'M' : 'L') + x + ',' + y;
  });
  const dataLine = '<path d="'+pathD+'" fill="none" stroke="#f97316" stroke-width="1.5"/>';

  // Last point
  const lastM = measurements[measurements.length - 1];
  const lastX = scaleX(measurements.length - 1);
  const lastY = scaleY(lastM.value);
  const isOut = lastM.value > plusLimit || lastM.value < minusLimit;
  const dotColor = isOut ? '#ef4444' : '#f97316';
  const lastDot = '<circle cx="'+lastX+'" cy="'+lastY+'" r="3" fill="'+dotColor+'" stroke="white" stroke-width="1"/>';

  wrap.innerHTML = '<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" style="display:block">'+tolZone+refLine+dataLine+lastDot+'</svg>';
}

function openFullChart(paramId) {
  const param = measurableParams.find(p => p.id === paramId);
  if (!param) return;

  const measurements = param.measurements || [];
  const modal = document.getElementById("chartModal");
  if (!modal) return;

  const ref = param.referenceValue;
  const plusLimit = ref * (1 + param.deviationPlus / 100);
  const minusLimit = ref * (1 - param.deviationMinus / 100);

  const W = 560, H = 280;
  const padL = 55, padR = 25, padT = 25, padB = 35;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  let svgContent = '';
  if (measurements.length < 1) {
    svgContent = '<text x="'+(W/2)+'" y="'+(H/2)+'" text-anchor="middle" fill="#9ca3af" font-size="14">Нет данных</text>';
  } else {
    const values = measurements.map(m => m.value);
    const allVals = [...values, ref, plusLimit, minusLimit];
    const minV = Math.min(...allVals);
    const maxV = Math.max(...allVals);
    const range = maxV - minV || 1;

    const scaleX = (i) => padL + (i / Math.max(measurements.length - 1, 1)) * plotW;
    const scaleY = (v) => padT + plotH - ((v - minV) / range) * plotH;

    // Grid
    let gridLines = '';
    const steps = 5;
    for (let s = 0; s <= steps; s++) {
      const v = minV + (range * s / steps);
      const y = scaleY(v);
      gridLines += '<line x1="'+padL+'" y1="'+y+'" x2="'+(W-padR)+'" y2="'+y+'" stroke="#e5e7eb" stroke-width="1"/>';
      gridLines += '<text x="'+(padL-6)+'" y="'+(y+4)+'" text-anchor="end" fill="#9ca3af" font-size="10">'+v.toFixed(1)+'</text>';
    }

    // Date labels
    let dateLabels = '';
    const labelStep = Math.max(1, Math.floor(measurements.length / 8));
    measurements.forEach((m, idx) => {
      if (idx % labelStep === 0 || idx === measurements.length - 1) {
        const x = scaleX(idx);
        const dateStr = m.measurementDate ? m.measurementDate.substring(5, 10) : "";
        dateLabels += '<text x="'+x+'" y="'+(H-8)+'" text-anchor="middle" fill="#9ca3af" font-size="9">'+dateStr+'</text>';
      }
    });

    const refY = scaleY(ref);
    const plusY = scaleY(plusLimit);
    const minusY = scaleY(minusLimit);

    const tolZone = '<rect x="'+padL+'" y="'+plusY+'" width="'+plotW+'" height="'+(minusY - plusY)+'" fill="#fef2f2" opacity="0.5"/>';
    const refLine = '<line x1="'+padL+'" y1="'+refY+'" x2="'+(W-padR)+'" y2="'+refY+'" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="6,3"/>';
    const limitLines = '<line x1="'+padL+'" y1="'+plusY+'" x2="'+(W-padR)+'" y2="'+plusY+'" stroke="#ef4444" stroke-width="1" stroke-dasharray="4,3"/>'
      + '<line x1="'+padL+'" y1="'+minusY+'" x2="'+(W-padR)+'" y2="'+minusY+'" stroke="#ef4444" stroke-width="1" stroke-dasharray="4,3"/>';

    let pathD = '';
    measurements.forEach((m, idx) => {
      const x = scaleX(idx);
      const y = scaleY(m.value);
      pathD += (idx === 0 ? 'M' : 'L') + x + ',' + y;
    });
    const dataLine = '<path d="'+pathD+'" fill="none" stroke="#f97316" stroke-width="2"/>';

    let points = '';
    measurements.forEach((m, idx) => {
      const x = scaleX(idx);
      const y = scaleY(m.value);
      const isOut = m.value > plusLimit || m.value < minusLimit;
      const color = isOut ? '#ef4444' : '#f97316';
      points += '<circle cx="'+x+'" cy="'+y+'" r="4" fill="'+color+'" stroke="white" stroke-width="1.5"><title>'+m.measurementDate.substring(0,10)+': '+m.value+'</title></circle>';
    });

    svgContent = tolZone + gridLines + refLine + limitLines + dataLine + points + dateLabels;
  }

  modal.innerHTML = `
    <div class="meas-modal-overlay" onclick="closeChartModal()"></div>
    <div class="meas-modal-content" style="width:640px">
      <div class="meas-modal-header">
        <h3>${param.name || "Без названия"} (${param.unitName || "—"})</h3>
        <button class="btn-icon-sm" onclick="closeChartModal()">✕</button>
      </div>
      <div style="padding:8px 0">
        <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="display:block">${svgContent}</svg>
      </div>
      <div style="display:flex;gap:16px;justify-content:center;padding-top:4px;font-size:12px;color:var(--text-secondary)">
        <span><span style="color:#22c55e">--- </span>Реф. значение: ${ref}</span>
        <span><span style="color:#ef4444">--- </span>Допуск: -${param.deviationMinus}% / +${param.deviationPlus}%</span>
        <span><span style="color:#f97316">● </span>Замеры</span>
      </div>
    </div>
  `;
  modal.style.display = "flex";
}

function closeChartModal() {
  const modal = document.getElementById("chartModal");
  if (modal) modal.style.display = "none";
}

function toggleMeasurements(paramId) {
  const body = document.getElementById("measBody_" + paramId);
  const arrow = document.getElementById("arrow_" + paramId);
  if (!body) return;
  if (body.style.display === "none") {
    body.style.display = "block";
    if (arrow) arrow.textContent = "▾";
  } else {
    body.style.display = "none";
    if (arrow) arrow.textContent = "▸";
  }
}

function showAddParamForm() {
  const modal = document.getElementById("measModal");
  if (!modal) return;

  const unitOptions = okeiUnits.map(u => '<option value="'+u.code+'">'+u.code + ' — ' + u.name+'</option>').join("");

  modal.innerHTML = `
    <div class="meas-modal-overlay" onclick="closeMeasModal()"></div>
    <div class="meas-modal-content">
      <div class="meas-modal-header">
        <h3>Новый замеряемый параметр</h3>
        <button class="btn-icon-sm" onclick="closeMeasModal()">✕</button>
      </div>
      <div class="meas-modal-body">
        <div class="meas-form-group">
          <label>Название</label>
          <input type="text" id="mp_name" placeholder="Например: Температура подшипника">
        </div>
        <div class="meas-form-row">
          <div class="meas-form-group">
            <label>Референсное значение</label>
            <input type="number" id="mp_refValue" step="0.01">
          </div>
          <div class="meas-form-group">
            <label>Единица измерения (ОКЕИ)</label>
            <select id="mp_unit">${unitOptions}</select>
          </div>
        </div>
        <div class="meas-form-row">
          <div class="meas-form-group">
            <label>Отклонение + (%)</label>
            <input type="number" id="mp_devPlus" step="0.1" min="0" value="5">
          </div>
          <div class="meas-form-group">
            <label>Отклонение − (%)</label>
            <input type="number" id="mp_devMinus" step="0.1" min="0" value="5">
          </div>
        </div>
        <div class="meas-form-group">
          <label>Примечание</label>
          <input type="text" id="mp_note" placeholder="Необязательно">
        </div>
      </div>
      <div class="meas-modal-footer">
        <button class="btn-cancel" onclick="closeMeasModal()">Отмена</button>
        <button class="btn-save" onclick="createParam()">Создать</button>
      </div>
    </div>
  `;
  modal.style.display = "flex";
}

function showEditParamForm(paramId) {
  const param = measurableParams.find(p => p.id === paramId);
  if (!param) return;

  const modal = document.getElementById("measModal");
  if (!modal) return;

  const unitOptions = okeiUnits.map(u => '<option value="'+u.code+'"'+(u.code===param.unitCode?' selected':'')+'>'+u.code+' — '+u.name+'</option>').join("");

  modal.innerHTML = `
    <div class="meas-modal-overlay" onclick="closeMeasModal()"></div>
    <div class="meas-modal-content">
      <div class="meas-modal-header">
        <h3>Редактирование параметра</h3>
        <button class="btn-icon-sm" onclick="closeMeasModal()">✕</button>
      </div>
      <div class="meas-modal-body">
        <div class="meas-form-group">
          <label>Название</label>
          <input type="text" id="mp_name" value="${param.name || ''}">
        </div>
        <div class="meas-form-row">
          <div class="meas-form-group">
            <label>Референсное значение</label>
            <input type="number" id="mp_refValue" step="0.01" value="${param.referenceValue}">
          </div>
          <div class="meas-form-group">
            <label>Единица измерения (ОКЕИ)</label>
            <select id="mp_unit">${unitOptions}</select>
          </div>
        </div>
        <div class="meas-form-row">
          <div class="meas-form-group">
            <label>Отклонение + (%)</label>
            <input type="number" id="mp_devPlus" step="0.1" min="0" value="${param.deviationPlus}">
          </div>
          <div class="meas-form-group">
            <label>Отклонение − (%)</label>
            <input type="number" id="mp_devMinus" step="0.1" min="0" value="${param.deviationMinus}">
          </div>
        </div>
        <div class="meas-form-group">
          <label>Примечание</label>
          <input type="text" id="mp_note" value="${param.note || ''}">
        </div>
      </div>
      <div class="meas-modal-footer">
        <button class="btn-cancel" onclick="closeMeasModal()">Отмена</button>
        <button class="btn-save" onclick="updateParam(${paramId})">Сохранить</button>
      </div>
    </div>
  `;
  modal.style.display = "flex";
}

function showAddMeasurementForm(paramId) {
  const param = measurableParams.find(p => p.id === paramId);
  if (!param) return;

  const modal = document.getElementById("measModal");
  if (!modal) return;

  const today = new Date().toISOString().substring(0, 10);

  modal.innerHTML = `
    <div class="meas-modal-overlay" onclick="closeMeasModal()"></div>
    <div class="meas-modal-content">
      <div class="meas-modal-header">
        <h3>Новый замер — ${param.name || "Параметр"}</h3>
        <button class="btn-icon-sm" onclick="closeMeasModal()">✕</button>
      </div>
      <div class="meas-modal-body">
        <div class="meas-form-row">
          <div class="meas-form-group">
            <label>Дата замера</label>
            <input type="date" id="mm_date" value="${today}">
          </div>
          <div class="meas-form-group">
            <label>Значение (${param.unitName || ""})</label>
            <input type="number" id="mm_value" step="0.01" value="${param.referenceValue}">
          </div>
        </div>
        <div class="meas-form-group">
          <label>Примечание</label>
          <input type="text" id="mm_note" placeholder="Необязательно">
        </div>
      </div>
      <div class="meas-modal-footer">
        <button class="btn-cancel" onclick="closeMeasModal()">Отмена</button>
        <button class="btn-save" onclick="createMeasurement(${paramId})">Записать</button>
      </div>
    </div>
  `;
  modal.style.display = "flex";
}

function closeMeasModal() {
  const modal = document.getElementById("measModal");
  if (modal) modal.style.display = "none";
}

async function createParam() {
  const name = document.getElementById("mp_name").value;
  const refValue = parseFloat(document.getElementById("mp_refValue").value) || 0;
  const unitSel = document.getElementById("mp_unit");
  const unitCode = unitSel.value;
  const unitName = unitSel.options[unitSel.selectedIndex].text.split(" — ")[1] || "";
  const devPlus = parseFloat(document.getElementById("mp_devPlus").value) || 0;
  const devMinus = parseFloat(document.getElementById("mp_devMinus").value) || 0;
  const note = document.getElementById("mp_note").value;

  try {
    const response = await fetch("/api/measurableparameters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        equipmentId: currentEquipId,
        name, referenceValue: refValue, unitCode, unitName,
        deviationPlus: devPlus, deviationMinus: devMinus, note
      })
    });
    if (!response.ok) throw new Error("Ошибка создания");
    closeMeasModal();
    loadMeasurableParams();
  } catch (error) {
    alert("Ошибка: " + error.message);
  }
}

async function updateParam(paramId) {
  const name = document.getElementById("mp_name").value;
  const refValue = parseFloat(document.getElementById("mp_refValue").value) || 0;
  const unitSel = document.getElementById("mp_unit");
  const unitCode = unitSel.value;
  const unitName = unitSel.options[unitSel.selectedIndex].text.split(" — ")[1] || "";
  const devPlus = parseFloat(document.getElementById("mp_devPlus").value) || 0;
  const devMinus = parseFloat(document.getElementById("mp_devMinus").value) || 0;
  const note = document.getElementById("mp_note").value;

  try {
    const response = await fetch("/api/measurableparameters/" + paramId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name, referenceValue: refValue, unitCode, unitName,
        deviationPlus: devPlus, deviationMinus: devMinus, note
      })
    });
    if (!response.ok) throw new Error("Ошибка обновления");
    closeMeasModal();
    loadMeasurableParams();
  } catch (error) {
    alert("Ошибка: " + error.message);
  }
}

async function deleteParam(paramId) {
  if (!confirm("Удалить параметр и все его замеры?")) return;
  try {
    const response = await fetch("/api/measurableparameters/" + paramId, { method: "DELETE" });
    if (!response.ok) throw new Error("Ошибка удаления");
    loadMeasurableParams();
  } catch (error) {
    alert("Ошибка: " + error.message);
  }
}

async function createMeasurement(paramId) {
  const date = document.getElementById("mm_date").value;
  const value = parseFloat(document.getElementById("mm_value").value);
  const note = document.getElementById("mm_note").value;

  if (!date) { alert("Укажите дату"); return; }
  if (isNaN(value)) { alert("Укажите значение"); return; }

  try {
    const response = await fetch("/api/measurableparameters/" + paramId + "/measurements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ measurementDate: date, value, note })
    });
    if (!response.ok) throw new Error("Ошибка создания замера");
    closeMeasModal();
    loadMeasurableParams();
  } catch (error) {
    alert("Ошибка: " + error.message);
  }
}

async function deleteMeasurement(paramId, measurementId) {
  if (!confirm("Удалить замер?")) return;
  try {
    const response = await fetch("/api/measurableparameters/measurements/" + measurementId, { method: "DELETE" });
    if (!response.ok) throw new Error("Ошибка удаления");
    loadMeasurableParams();
  } catch (error) {
    alert("Ошибка: " + error.message);
  }
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
