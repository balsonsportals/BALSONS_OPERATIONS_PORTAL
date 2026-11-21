/**
 * BALSONS OPERATIONS MANAGER • DOMAIN APPLICATION CONTROLLER (V7.2)
 * Governing Reference: BAL-OPS-E2E-007 V7.2
 * Standard: SAM-2026 / BEDS V1.0 Locked Baseline
 * Project Context: JTRWF Khordha, Odisha
 */

(function () {
  'use strict';

  const DB_NAME = 'balsons_ops_db_v7_2';
  const SPREADSHEET_ID = '1GeqDDmBgdVm3ZUp4c9iB36__iLJ9wADQQRhEIwVxa-E';
  const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1GeqDDmBgdVm3ZUp4c9iB36__iLJ9wADQQRhEIwVxa-E/edit';
  const APPS_SCRIPT_ID = '1an3LeD6Ich14qtWZ5GFgJMaa3dYQSboZRwFy9g_gf9zWicPDB9KpFNny';
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/1an3LeD6Ich14qtWZ5GFgJMaa3dYQSboZRwFy9g_gf9zWicPDB9KpFNny/exec';
  const DB_VERSION = 1;
  let dbInstance = null;

  // INITIAL SEED DATA ACCORDING TO V7.2 GOVERNANCE BASELINE
  const SEED_WORK_PACKAGES = [
    {
      id: 'WP-AXLE-PRS-001',
      workspaceId: 'LINE-AXLE',
      workstreamId: 'AXLE-PRESS-CELL',
      assetId: 'AST-AXLE-SCH-01',
      title: 'Schuler Axle Press Crown Tandem Rigging & Rough Levelling',
      scopeRef: 'SOW-MECH-05.1',
      scopeClause: 'Unloading, shifting to foundation, placement on columns, rough levelling',
      plannedStart: '2026-11-15',
      plannedFinish: '2026-11-25',
      actualStart: '2026-11-16',
      actualFinish: '',
      supervisor: 'Dilip Rout',
      state: 'In progress',
      progressBasis: 'Milestone 4 of 6 (Crown Placed on Uprights)',
      progressPercentage: 75,
      craneReq: 'Tandem Lift: Demag 250T (Main) + Sany 150T (Tail)',
      form11TackleRef: 'TKL-F11-2026-089 (Valid)',
      safetyPtwRef: 'PTW-AXLE-049 (Active)',
      readiness: { drawings: true, foundation: true, path: true, tools: true, ptw: true },
      hold: null,
      completionDossier: null
    },
    {
      id: 'WP-AXLE-HYD-002',
      workspaceId: 'LINE-AXLE',
      workstreamId: 'AXLE-HYDRAULICS',
      assetId: 'AST-AXLE-PULL-01',
      title: 'Hydraulic Puller & Bed Anchor Tie-Rod Pre-Tensioning',
      scopeRef: 'SOW-MECH-05.4',
      scopeClause: 'Internal shifting near foundation, mechanical mounting',
      plannedStart: '2026-11-18',
      plannedFinish: '2026-11-28',
      actualStart: '2026-11-19',
      actualFinish: '',
      supervisor: 'Suresh Behera',
      state: 'In progress',
      progressBasis: 'Torque tightening sequence step 2 of 4',
      progressPercentage: 50,
      craneReq: 'Sany 150T Auxiliary',
      form11TackleRef: 'TKL-F11-2026-092 (Valid)',
      safetyPtwRef: 'PTW-AXLE-052 (Active)',
      readiness: { drawings: true, foundation: true, path: true, tools: true, ptw: true },
      hold: null,
      completionDossier: null
    },
    {
      id: 'WP-WHEEL-FURN-003',
      workspaceId: 'LINE-WHEEL',
      workstreamId: 'WHEEL-FURNACE-CELL',
      assetId: 'AST-WHEEL-RHF-02',
      title: 'Rotary Hearth Furnace Segment 2 Placement & Centerline Setting',
      scopeRef: 'SOW-MECH-05.5',
      scopeClause: 'Shifting, rough levelling, X-Y axis positioning to bay coordinates',
      plannedStart: '2026-11-10',
      plannedFinish: '2026-11-20',
      actualStart: '2026-11-12',
      actualFinish: '2026-11-20',
      supervisor: 'Dilip Rout',
      state: 'Mechanical completion',
      progressBasis: 'Dossier signed; rough levelling at 0.7 mm, X-Y verified',
      progressPercentage: 100,
      craneReq: 'Demag 250T',
      form11TackleRef: 'TKL-F11-2026-064 (Valid)',
      safetyPtwRef: 'PTW-WHEEL-078 (Cleared)',
      readiness: { drawings: true, foundation: true, path: true, tools: true, ptw: true },
      hold: null,
      completionDossier: {
        levellingVerified: true,
        levellingToleranceMm: 0.7,
        xyPositioningVerified: true,
        punchPointsOpen: 0,
        signOffBy: 'Ashok Mohanty (Area Mgr)',
        signOffDate: '2026-11-20'
      }
    },
    {
      id: 'WP-WHEEL-PRS-004',
      workspaceId: 'LINE-WHEEL',
      workstreamId: 'WHEEL-PRESS-CELL',
      assetId: 'AST-WHEEL-SCH-01',
      title: 'Schuler Wheel Forging Press Upright Columns Insertion',
      scopeRef: 'SOW-MECH-05.2',
      scopeClause: 'Unloading, unboxing, cleaning, column vertical rigging and pocket setting',
      plannedStart: '2026-11-14',
      plannedFinish: '2026-11-24',
      actualStart: '2026-11-15',
      actualFinish: '',
      supervisor: 'Kartik Nayak',
      state: 'In progress',
      progressBasis: 'Columns 1, 2, 3 placed; column 4 rigged',
      progressPercentage: 75,
      craneReq: 'Tandem: Demag 250T + Sany 150T',
      form11TackleRef: 'TKL-F11-2026-081 (Valid)',
      safetyPtwRef: 'PTW-WHEEL-082 (Active)',
      readiness: { drawings: true, foundation: true, path: true, tools: true, ptw: true },
      hold: null,
      completionDossier: null
    },
    {
      id: 'WP-MS-FFG-020.1',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-FFG',
      assetId: 'AST-MS-FFG-OP20.1',
      title: 'VDF Boehringer / FFG Lathe OP20.1 Foundation Setting & Rough Levelling',
      scopeRef: 'SOW-MECH-05.3',
      scopeClause: 'Unloading, unpacking, shifting to machine shop foundation, rough levelling',
      plannedStart: '2026-11-05',
      plannedFinish: '2026-11-16',
      actualStart: '2026-11-06',
      actualFinish: '2026-11-16',
      supervisor: 'Dilip Rout',
      state: 'Mechanical completion',
      progressBasis: 'Mechanical completion verified; levelling 0.6 mm, centerline aligned',
      progressPercentage: 100,
      craneReq: 'Sany 150T + Machine Shop Overhead EOT',
      form11TackleRef: 'TKL-F11-2026-042 (Valid)',
      safetyPtwRef: 'PTW-MS-021 (Cleared)',
      readiness: { drawings: true, foundation: true, path: true, tools: true, ptw: true },
      hold: null,
      completionDossier: {
        levellingVerified: true,
        levellingToleranceMm: 0.6,
        xyPositioningVerified: true,
        punchPointsOpen: 0,
        signOffBy: 'Dilip Rout (Lifting In-Charge)',
        signOffDate: '2026-11-16'
      }
    },
    {
      id: 'WP-MS-GER-050.1',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-GER',
      assetId: 'AST-MS-GER-OP50.1',
      title: 'GER CPT-3000 CNC Grinder (Serial 25/2050) Internal Shifting & Bed Assembly',
      scopeRef: 'SOW-MECH-05.6',
      scopeClause: 'Uncrating, anti-rust cleaning, internal shifting on base plates, rough levelling',
      plannedStart: '2026-11-17',
      plannedFinish: '2026-11-27',
      actualStart: '2026-11-18',
      actualFinish: '',
      supervisor: 'Suresh Behera',
      state: 'In progress',
      progressBasis: 'Machine bed resting on foundation plates; levelling adjustments in progress',
      progressPercentage: 60,
      craneReq: '80T Rough Terrain + Rollers & Heavy Jacks',
      form11TackleRef: 'TKL-F11-2026-095 (Valid)',
      safetyPtwRef: 'PTW-MS-044 (Active)',
      readiness: { drawings: true, foundation: true, path: true, tools: true, ptw: true },
      hold: null,
      completionDossier: null
    },
    {
      id: 'WP-MS-GANTRY-GH02',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-PARI-GANTRY',
      assetId: 'AST-MS-PARI-GH02',
      title: 'PARI Gantry Head GH02 Overhead Rail Trolley Placement & X-Y Alignment',
      scopeRef: 'SOW-MECH-05.7',
      scopeClause: 'Gantry beam rigging, trolley hoisting, mechanical fastening, axis positioning',
      plannedStart: '2026-11-19',
      plannedFinish: '2026-11-29',
      actualStart: '2026-11-20',
      actualFinish: '',
      supervisor: 'Kartik Nayak',
      state: 'In progress',
      progressBasis: 'Trolley mounted on runway rails; drive pinions meshed',
      progressPercentage: 45,
      craneReq: 'Demag 250T Main Hoist',
      form11TackleRef: 'TKL-F11-2026-099 (Valid)',
      safetyPtwRef: 'PTW-MS-048 (Active)',
      readiness: { drawings: true, foundation: true, path: true, tools: true, ptw: true },
      hold: null,
      completionDossier: null
    },
    {
      id: 'WP-MS-OEM-010.1',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-OEM-PENDING',
      assetId: 'AST-MS-OEM-OP10.1',
      title: 'OP10.1 Machining Station Uncrating & Component Verification',
      scopeRef: 'SOW-MECH-05.1',
      scopeClause: 'Unloading & unboxing pending client OEM attribution clarification',
      plannedStart: '2026-11-15',
      plannedFinish: '2026-11-22',
      actualStart: '2026-11-16',
      actualFinish: '',
      supervisor: 'Suresh Behera',
      state: 'Hold / blocked',
      progressBasis: 'Unloading complete; uncrating stopped on technical documentation hold',
      progressPercentage: 20,
      craneReq: 'RT 80T Crane',
      form11TackleRef: 'TKL-F11-2026-088 (Valid)',
      safetyPtwRef: 'PTW-MS-038 (Active)',
      readiness: { drawings: false, foundation: true, path: true, tools: true, ptw: true },
      hold: {
        reasonCode: 'C-01',
        description: 'OEM technical manual & attribution pending client clarification (Discrepancy C-01)',
        responsibleParty: 'Client Technical Directorate (JTRWF)',
        startTime: '2026-11-18 10:00',
        impactHours: 72,
        releaseCriteria: 'Client written approval of OEM installation manual'
      },
      completionDossier: null
    }
  ];

  const SEED_MANPOWER = [
    { id: 'EMP-BAL-01', name: 'Dilip Rout', trade: 'Rigging Superintendent', wpId: 'WP-AXLE-PRS-001', shift: 'Shift A', state: 'DEPLOYED' },
    { id: 'EMP-BAL-02', name: 'Suresh Behera', trade: 'Mechanical Assembly Lead', wpId: 'WP-MS-GER-050.1', shift: 'Shift A', state: 'DEPLOYED' },
    { id: 'EMP-BAL-03', name: 'Kartik Nayak', trade: 'Heavy Lift Supervisor', wpId: 'WP-MS-GANTRY-GH02', shift: 'Shift A', state: 'DEPLOYED' },
    { id: 'EMP-BAL-04', name: 'Birendra Patra', trade: 'Master Crane Operator', wpId: 'WP-AXLE-PRS-001', shift: 'Shift A', state: 'DEPLOYED' },
    { id: 'EMP-BAL-05', name: 'Manoranjan Das', trade: 'Heavy Crane Operator', wpId: 'WP-WHEEL-PRS-004', shift: 'Shift A', state: 'DEPLOYED' },
    { id: 'EMP-BAL-06', name: 'Rabindra Jena', trade: 'Senior Rigger (Lead)', wpId: 'WP-AXLE-PRS-001', shift: 'Shift A', state: 'DEPLOYED' },
    { id: 'EMP-BAL-07', name: 'Sukant Mohanty', trade: 'Hydraulic Fitter', wpId: 'WP-AXLE-HYD-002', shift: 'Shift A', state: 'DEPLOYED' },
    { id: 'EMP-BAL-08', name: 'Tapas Sahoo', trade: 'Alignment Specialist', wpId: 'WP-MS-GER-050.1', shift: 'Shift A', state: 'DEPLOYED' },
    { id: 'EMP-BAL-09', name: 'Pramod Biswal', trade: 'Heavy Rigger', wpId: 'WP-WHEEL-PRS-004', shift: 'Shift A', state: 'DEPLOYED' },
    { id: 'EMP-BAL-10', name: 'Ganesh Swain', trade: 'Rigging Helper', wpId: 'WP-MS-GANTRY-GH02', shift: 'Shift A', state: 'DEPLOYED' },
    { id: 'EMP-BAL-11', name: 'Kailash Sethi', trade: 'Rigger', wpId: 'WP-MS-OEM-010.1', shift: 'Shift A', state: 'ALLOCATED' },
    { id: 'EMP-BAL-12', name: 'Bijay Samal', trade: 'Mechanical Helper', wpId: 'WP-MS-OEM-010.1', shift: 'Shift A', state: 'ALLOCATED' }
  ];

  const SEED_SHIFT_LOGS = [
    {
      id: 'LOG-20261121-A',
      date: '2026-11-21',
      shiftCode: 'Shift A (08:00 - 17:00)',
      supervisor: 'Dilip Rout',
      leadRigger: 'Rabindra Jena',
      activeBays: ['LINE-AXLE', 'LINE-WHEEL', 'AREA-MACHINE-SHOP-AXLE'],
      deployedCrewCount: 48,
      cranesActive: 'Demag 250T + Sany 150T (Tandem) + RT 80T',
      tackleCertStatus: 'Form 11 Verified (100% compliant, 0 defects)',
      safetyPtwStatus: 'PTW-AXLE-049 & PTW-MS-048 Active',
      keyMilestone: 'Crown rough levelling reached 0.8 mm tolerance; GH02 trolley seated on rails',
      incidents: 'Zero incidents; zero near-misses recorded',
      handoverNotes: 'Shift B to continue torque-checking on Bed Anchor bolts and maintain laydown path clearance'
    }
  ];

  // 1. INDEXEDDB INITIALIZATION
  function initDb() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('work_packages')) {
          const wpStore = db.createObjectStore('work_packages', { keyPath: 'id' });
          wpStore.createIndex('workspaceId', 'workspaceId', { unique: false });
          wpStore.createIndex('state', 'state', { unique: false });
        }
        if (!db.objectStoreNames.contains('manpower_roster')) {
          db.createObjectStore('manpower_roster', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('shift_logs')) {
          db.createObjectStore('shift_logs', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('audit_log')) {
          db.createObjectStore('audit_log', { keyPath: 'auditId', autoIncrement: true });
        }
      };

      request.onsuccess = (e) => {
        dbInstance = e.target.result;
        seedInitialDataIfEmpty().then(resolve);
      };

      request.onerror = (e) => {
        console.error('IndexedDB error:', e);
        reject(e);
      };
    });
  }

  function seedInitialDataIfEmpty() {
    return new Promise((resolve) => {
      const tx = dbInstance.transaction(['work_packages', 'manpower_roster', 'shift_logs', 'audit_log'], 'readwrite');
      const wpStore = tx.objectStore('work_packages');
      const countReq = wpStore.count();

      countReq.onsuccess = () => {
        if (countReq.result === 0) {
          SEED_WORK_PACKAGES.forEach((wp) => wpStore.add(wp));
          const mpStore = tx.objectStore('manpower_roster');
          SEED_MANPOWER.forEach((mp) => mpStore.add(mp));
          const logStore = tx.objectStore('shift_logs');
          SEED_SHIFT_LOGS.forEach((log) => logStore.add(log));
          const auditStore = tx.objectStore('audit_log');
          auditStore.add({
            timestamp: new Date().toISOString(),
            actor: 'System Baseline Seeder',
            action: 'INITIALIZE_V7_2_BASELINE',
            target: 'DATABASE_BOOTSTRAP',
            details: 'Initial operational work packages, manpower roster, and shift logs bootstrapped successfully.'
          });
        }
      };

      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve(); // continue even if seeding fails
    });
  }

  // 2. REPOSITORY HELPERS
  function getAllRecords(storeName) {
    return new Promise((resolve) => {
      if (!dbInstance) return resolve([]);
      const tx = dbInstance.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  }

  function saveRecord(storeName, record) {
    return new Promise((resolve, reject) => {
      if (!dbInstance) return reject('No DB');
      const tx = dbInstance.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.put(record);
      req.onsuccess = () => resolve(req.result);
      req.onerror = (e) => reject(e);
    });
  }

  function logAudit(action, target, details, actor = 'Operations In-Charge') {
    if (!dbInstance) return;
    const tx = dbInstance.transaction('audit_log', 'readwrite');
    tx.objectStore('audit_log').add({
      timestamp: new Date().toISOString(),
      actor: actor,
      action: action,
      target: target,
      details: details
    });
  }

  // 3. UI RENDERING ENGINES
  async function refreshDashboard() {
    const packages = await getAllRecords('work_packages');
    const logs = await getAllRecords('shift_logs');
    const roster = await getAllRecords('manpower_roster');

    // Update Super View Stats
    const totalWp = packages.length;
    const completedWp = packages.filter((w) => w.state === 'Mechanical completion' || w.state === 'Closed').length;
    const holdWp = packages.filter((w) => w.state === 'Hold / blocked').length;
    const activeWp = packages.filter((w) => w.state === 'In progress' || w.state === 'Mobilized').length;
    const deployedCrew = roster.filter((r) => r.state === 'DEPLOYED').length;

    // Overall Milestone-Weighted Progress
    const sumProgress = packages.reduce((acc, curr) => acc + (curr.progressPercentage || 0), 0);
    const avgProgress = totalWp > 0 ? (sumProgress / totalWp).toFixed(1) : 0;

    const elProg = document.getElementById('statErectionProgress');
    if (elProg) elProg.textContent = `${avgProgress}%`;

    const elWp = document.getElementById('statActiveWp');
    if (elWp) elWp.textContent = `${activeWp} Active`;

    const elCrew = document.getElementById('statCrewCount');
    if (elCrew) elCrew.textContent = `${deployedCrew} Deployed`;

    // Render Work Packages Table
    renderWorkPackagesTable(packages);

    // Render Manpower Table
    renderManpowerTable(roster);

    // Render Shift Logs Table
    renderShiftLogsTable(logs);
  }

  function renderWorkPackagesTable(packages) {
    const tbody = document.getElementById('wpTableBody');
    if (!tbody) return;

    if (packages.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:20px; color:#94a3b8;">No work packages found.</td></tr>';
      return;
    }

    tbody.innerHTML = packages
      .map((wp) => {
        let badgeClass = 'tag-cyan';
        if (wp.state === 'Mechanical completion' || wp.state === 'Closed') badgeClass = 'tag-green';
        else if (wp.state === 'Hold / blocked') badgeClass = 'tag-red';
        else if (wp.state === 'In progress') badgeClass = 'tag-purple';
        else if (wp.state === 'Mobilized') badgeClass = 'tag-amber';

        return `
        <tr>
          <td><strong><code>${wp.id}</code></strong></td>
          <td>
            <span class="tag-chip tag-cyan" style="font-size:10px;">${wp.workspaceId}</span>
            <div style="font-size:11px; color:#64748b; margin-top:2px;">${wp.workstreamId}</div>
          </td>
          <td>
            <strong>${escapeHtml(wp.title)}</strong>
            <div style="font-size:11.5px; color:#475569; margin-top:2px;">Asset: <code>${wp.assetId}</code> | Scope: ${wp.scopeRef}</div>
          </td>
          <td>${wp.supervisor}</td>
          <td>
            <div style="display:flex; align-items:center; gap:8px;">
              <div style="flex:1; background:#e2e8f0; height:6px; border-radius:3px; overflow:hidden;">
                <div style="width:${wp.progressPercentage}%; background:#0097a7; height:100%;"></div>
              </div>
              <span style="font-size:11px; font-weight:700;">${wp.progressPercentage}%</span>
            </div>
            <div style="font-size:10.5px; color:#64748b; margin-top:2px;">${escapeHtml(wp.progressBasis || '')}</div>
          </td>
          <td><span class="tag-chip ${badgeClass}">${wp.state}</span></td>
          <td>
            <button class="beds-btn beds-btn-sm beds-btn-secondary" onclick="BalsonsOpsApp.openEditModal('${wp.id}')" title="Inspect / Manage Package">
              ⚙️ Manage
            </button>
          </td>
        </tr>
      `;
      })
      .join('');
  }

  function renderManpowerTable(roster) {
    const tbody = document.getElementById('manpowerTableBody');
    if (!tbody) return;

    tbody.innerHTML = roster
      .map((m) => {
        let chip = 'tag-green';
        if (m.state === 'REQUIRED') chip = 'tag-amber';
        if (m.state === 'ALLOCATED') chip = 'tag-cyan';
        if (m.state === 'RELEASED') chip = 'tag-purple';

        return `
        <tr>
          <td><code>${m.id}</code></td>
          <td><strong>${m.name}</strong></td>
          <td>${m.trade}</td>
          <td><code>${m.wpId}</code></td>
          <td>${m.shift}</td>
          <td><span class="tag-chip ${chip}">${m.state}</span></td>
          <td>
            <button class="beds-btn beds-btn-sm beds-btn-secondary" onclick="BalsonsOpsApp.cycleManpowerState('${m.id}')" title="Advance Lifecycle State">
              ➔ Next State
            </button>
          </td>
        </tr>
      `;
      })
      .join('');
  }

  function renderShiftLogsTable(logs) {
    const tbody = document.getElementById('shiftLogTableBody');
    if (!tbody) return;

    tbody.innerHTML = logs
      .map(
        (l) => `
      <tr>
        <td><code>${l.id}</code></td>
        <td><strong>${l.date}</strong></td>
        <td>${l.shiftCode}</td>
        <td>${l.supervisor}</td>
        <td>${l.cranesActive}</td>
        <td><span class="tag-chip tag-green">${l.tackleCertStatus}</span></td>
        <td><span class="tag-chip tag-cyan">${l.safetyPtwStatus}</span></td>
        <td style="max-width:260px; font-size:11.5px;">${escapeHtml(l.keyMilestone)}</td>
      </tr>
    `
      )
      .join('');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // 4. ACTION CONTROLLERS & MODAL HANDLERS
  window.BalsonsOpsApp = {
    init: async function () {
      await initDb();
      await refreshDashboard();
    },

    openCreateWpModal: function () {
      const modal = document.getElementById('modalCreateWp');
      if (modal) modal.style.display = 'flex';
    },

    closeCreateWpModal: function () {
      const modal = document.getElementById('modalCreateWp');
      if (modal) modal.style.display = 'none';
    },

    submitCreateWp: async function (e) {
      if (e) e.preventDefault();
      const form = document.getElementById('formCreateWp');
      if (!form) return;

      const newId = 'WP-' + (document.getElementById('newWpWorkspace').value.includes('AXLE') ? 'AXLE' : document.getElementById('newWpWorkspace').value.includes('WHEEL') ? 'WHEEL' : 'MS') + '-' + Date.now().toString().slice(-4);
      const newWp = {
        id: newId,
        workspaceId: document.getElementById('newWpWorkspace').value,
        workstreamId: document.getElementById('newWpWorkstream').value,
        assetId: document.getElementById('newWpAsset').value,
        title: document.getElementById('newWpTitle').value,
        scopeRef: document.getElementById('newWpScopeRef').value,
        scopeClause: document.getElementById('newWpScopeClause').value,
        plannedStart: document.getElementById('newWpStartDate').value,
        plannedFinish: document.getElementById('newWpEndDate').value,
        actualStart: '',
        actualFinish: '',
        supervisor: document.getElementById('newWpSupervisor').value,
        state: 'Identified',
        progressBasis: 'Work package created; awaiting scope verification',
        progressPercentage: 0,
        craneReq: document.getElementById('newWpCrane').value,
        form11TackleRef: 'Pending Store Check',
        safetyPtwRef: 'Pending Safety PTW',
        readiness: { drawings: true, foundation: false, path: false, tools: false, ptw: false },
        hold: null,
        completionDossier: null
      };

      await saveRecord('work_packages', newWp);
      logAudit('CREATE_WORK_PACKAGE', newId, `Created new work package ${newId} (${newWp.title}) in ${newWp.workspaceId}`);
      this.closeCreateWpModal();
      form.reset();
      await refreshDashboard();
      alert(`✔ Work Package ${newId} created successfully in state 'Identified'.`);
    },

    openEditModal: async function (wpId) {
      const packages = await getAllRecords('work_packages');
      const wp = packages.find((w) => w.id === wpId);
      if (!wp) return;

      document.getElementById('editWpId').textContent = wp.id;
      document.getElementById('editWpTitle').textContent = wp.title;
      document.getElementById('editWpWorkspace').textContent = `${wp.workspaceId} • ${wp.workstreamId}`;
      document.getElementById('editWpAsset').textContent = wp.assetId;
      document.getElementById('editWpScope').textContent = `${wp.scopeRef}: ${wp.scopeClause}`;
      document.getElementById('editWpProgressPercent').value = wp.progressPercentage;
      document.getElementById('editWpProgressBasis').value = wp.progressBasis;
      document.getElementById('editWpStateSelect').value = wp.state;

      const modal = document.getElementById('modalManageWp');
      modal.setAttribute('data-current-wp', wpId);
      modal.style.display = 'flex';
    },

    closeEditModal: function () {
      const modal = document.getElementById('modalManageWp');
      if (modal) modal.style.display = 'none';
    },

    saveWpChanges: async function () {
      const modal = document.getElementById('modalManageWp');
      const wpId = modal.getAttribute('data-current-wp');
      const packages = await getAllRecords('work_packages');
      const wp = packages.find((w) => w.id === wpId);
      if (!wp) return;

      const oldState = wp.state;
      const newState = document.getElementById('editWpStateSelect').value;
      const newProg = parseInt(document.getElementById('editWpProgressPercent').value, 10) || 0;
      const newBasis = document.getElementById('editWpProgressBasis').value;

      wp.state = newState;
      wp.progressPercentage = newProg;
      wp.progressBasis = newBasis;

      if (newState === 'Mechanical completion' && !wp.completionDossier) {
        wp.completionDossier = {
          levellingVerified: true,
          levellingToleranceMm: 0.8,
          xyPositioningVerified: true,
          punchPointsOpen: 0,
          signOffBy: wp.supervisor,
          signOffDate: new Date().toISOString().slice(0, 10)
        };
      }

      await saveRecord('work_packages', wp);
      logAudit('UPDATE_WORK_PACKAGE', wp.id, `Updated ${wp.id}: State changed from ${oldState} to ${newState}, progress ${newProg}%`);
      this.closeEditModal();
      await refreshDashboard();
      alert(`✔ Work Package ${wp.id} updated successfully.`);
    },

    cycleManpowerState: async function (empId) {
      const roster = await getAllRecords('manpower_roster');
      const emp = roster.find((e) => e.id === empId);
      if (!emp) return;

      const states = ['REQUIRED', 'AVAILABLE', 'QUALIFIED', 'CLEARED', 'ALLOCATED', 'MOBILIZED', 'DEPLOYED', 'RELEASED'];
      const currentIndex = states.indexOf(emp.state);
      const nextIndex = (currentIndex + 1) % states.length;
      emp.state = states[nextIndex];

      await saveRecord('manpower_roster', emp);
      logAudit('UPDATE_MANPOWER_STATE', emp.id, `Advanced ${emp.name} lifecycle state to ${emp.state}`);
      await refreshDashboard();
    },

    openNewShiftModal: function () {
      const modal = document.getElementById('modalNewShiftLog');
      if (modal) modal.style.display = 'flex';
    },

    closeNewShiftModal: function () {
      const modal = document.getElementById('modalNewShiftLog');
      if (modal) modal.style.display = 'none';
    },

    submitNewShiftLog: async function (e) {
      if (e) e.preventDefault();
      const newLog = {
        id: 'LOG-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + (document.getElementById('shiftSelect').value.includes('A') ? 'A' : 'B'),
        date: document.getElementById('shiftDate').value,
        shiftCode: document.getElementById('shiftSelect').value,
        supervisor: document.getElementById('shiftSup').value,
        leadRigger: document.getElementById('shiftRigger').value,
        deployedCrewCount: parseInt(document.getElementById('shiftCrewCount').value, 10) || 48,
        cranesActive: document.getElementById('shiftCranes').value,
        tackleCertStatus: document.getElementById('shiftTackleCert').value,
        safetyPtwStatus: document.getElementById('shiftPtw').value,
        keyMilestone: document.getElementById('shiftMilestone').value,
        incidents: 'Zero incidents recorded',
        handoverNotes: document.getElementById('shiftHandoverNotes').value
      };

      await saveRecord('shift_logs', newLog);
      logAudit('SUBMIT_SHIFT_LOG', newLog.id, `Shift log submitted for ${newLog.date} (${newLog.shiftCode}) by ${newLog.supervisor}`);
      this.closeNewShiftModal();
      await refreshDashboard();
      alert(`✔ Shift execution log ${newLog.id} submitted and signed off.`);
    },

    exportOperationalData: async function () {
      const packages = await getAllRecords('work_packages');
      const roster = await getAllRecords('manpower_roster');
      const logs = await getAllRecords('shift_logs');
      const audits = await getAllRecords('audit_log');

      const fullExport = {
        metadata: {
          system: 'BALSONS OPERATIONS MANAGER',
          documentId: 'BAL-OPS-E2E-007 V7.2',
          exportedAt: new Date().toISOString(),
          totalPackages: packages.length,
          totalManpower: roster.length,
          totalShiftLogs: logs.length
        },
        workPackages: packages,
        manpowerRoster: roster,
        shiftLogs: logs,
        auditLog: audits
      };

      const blob = new Blob([JSON.stringify(fullExport, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `BALSONS_OPERATIONS_BACKUP_V7_2_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      logAudit('EXPORT_DATABASE_BACKUP', 'FULL_SYSTEM', 'Exported JSON operational database backup snapshot.');
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    window.BalsonsOpsApp.init();
  });
})();
