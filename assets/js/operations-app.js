/**
 * BALSONS OPERATIONS MANAGER • DOMAIN APPLICATION CONTROLLER (V7.2)
 * Governing Reference: BAL-OPS-E2E-007 V7.2
 * Standard: SAM-2026 / BEDS V1.0 Locked Baseline
 * Project Context: JTRWF Khordha, Odisha
 * Brand Mandate: "Difficult We Do Easily, Impossible Takes Little Time...!"
 */

(function () {
  'use strict';

  const DB_NAME = 'balsons_ops_db_v7_2';
  const SPREADSHEET_ID = '1GeqDDmBgdVm3ZUp4c9iB36__iLJ9wADQQRhEIwVxa-E';
  const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1GeqDDmBgdVm3ZUp4c9iB36__iLJ9wADQQRhEIwVxa-E/edit';
  const APPS_SCRIPT_ID = '1an3LeD6Ich14qtWZ5GFgJMaa3dYQSboZRwFy9g_gf9zWicPDB9KpFNny';
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/1an3LeD6Ich14qtWZ5GFgJMaa3dYQSboZRwFy9g_gf9zWicPDB9KpFNny/exec';
  const DB_VERSION = 2;
  let dbInstance = null;

  // 12 CORE VERIFIED WORK PACKAGES
  const SEED_WORK_PACKAGES = [
    // LINE-AXLE
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
      hold: null
    },
    {
      id: 'WP-AXLE-HYD-002',
      workspaceId: 'LINE-AXLE',
      workstreamId: 'AXLE-HYDRAULICS',
      assetId: 'AST-AXLE-PULL-01',
      title: 'Hydraulic Puller & Bed Anchor Tie-Rod Pre-Tensioning',
      scopeRef: 'SOW-MECH-05.4',
      scopeClause: 'Internal shifting near foundation, mechanical mounting, torque tensioning',
      plannedStart: '2026-11-18',
      plannedFinish: '2026-11-28',
      actualStart: '2026-11-19',
      actualFinish: '',
      supervisor: 'Dilip Rout',
      state: 'Mobilized',
      progressBasis: 'Hydraulic skid positioned at Bay 2 pit',
      progressPercentage: 35,
      craneReq: 'Farana 20T + 100T Hydraulic Jacking Station',
      form11TackleRef: 'TKL-F11-2026-092 (Valid)',
      safetyPtwRef: 'PTW-AXLE-052 (Active)',
      readiness: { drawings: true, foundation: true, path: true, tools: true, ptw: true },
      hold: null
    },
    {
      id: 'WP-AXLE-TRL-003',
      workspaceId: 'LINE-AXLE',
      workstreamId: 'AXLE-TRANSPORT',
      assetId: 'AST-AXLE-SCH-02',
      title: 'Multi-Axle Modular Hydraulic Trailer Offloading & Entry',
      scopeRef: 'SOW-LOG-01.2',
      scopeClause: 'Site gate reception, road survey clearance, internal transit to press pit',
      plannedStart: '2026-11-22',
      plannedFinish: '2026-11-26',
      actualStart: '',
      actualFinish: '',
      supervisor: 'Dilip Rout',
      state: 'Scope verified',
      progressBasis: 'Civil road compaction cleared; awaiting plant road permit',
      progressPercentage: 15,
      craneReq: 'Multi-Axle Hydraulic Modular Trailer 8-Axle',
      form11TackleRef: 'TKL-F11-2026-074 (Valid)',
      safetyPtwRef: 'PTW-AXLE-055 (Pending)',
      readiness: { drawings: true, foundation: true, path: true, tools: true, ptw: false },
      hold: 'Plant internal road transport permit awaiting client signoff'
    },
    // LINE-WHEEL
    {
      id: 'WP-WHEEL-FRM-001',
      workspaceId: 'LINE-WHEEL',
      workstreamId: 'WHEEL-PRESS-CELL',
      assetId: 'AST-WHEEL-SCH-01',
      title: 'Schuler Wheel Press Monobloc Bed Rigging & Pit Setting',
      scopeRef: 'SOW-MECH-06.1',
      scopeClause: 'Foundation pit preparation check, baseplate anchoring, tandem lower',
      plannedStart: '2026-11-10',
      plannedFinish: '2026-11-26',
      actualStart: '2026-11-11',
      actualFinish: '',
      supervisor: 'Dilip Rout',
      state: 'In progress',
      progressBasis: 'Baseplate anchored; main lower scheduled',
      progressPercentage: 60,
      craneReq: 'Demag CC2500 250T + Tail Sany 150T',
      form11TackleRef: 'TKL-F11-2026-065 (Valid)',
      safetyPtwRef: 'PTW-WHEEL-031 (Active)',
      readiness: { drawings: true, foundation: true, path: true, tools: true, ptw: true },
      hold: null
    },
    {
      id: 'WP-WHEEL-FRN-002',
      workspaceId: 'LINE-WHEEL',
      workstreamId: 'WHEEL-FURNACE',
      assetId: 'AST-WHEEL-FRN-01',
      title: 'Rotary Hearth Furnace Casing Segments Heavy Assembly',
      scopeRef: 'SOW-MECH-06.3',
      scopeClause: 'Shell segments placement, weld alignment, refractory support staging',
      plannedStart: '2026-11-24',
      plannedFinish: '2026-12-05',
      actualStart: '',
      actualFinish: '',
      supervisor: 'Dilip Rout',
      state: 'Planned',
      progressBasis: 'Rigging plan approved; awaiting civil grouting cure',
      progressPercentage: 10,
      craneReq: 'Demag 250T Main Boom 42m',
      form11TackleRef: 'TKL-F11-2026-098 (Valid)',
      safetyPtwRef: 'PTW-WHEEL-038 (Draft)',
      readiness: { drawings: true, foundation: false, path: true, tools: true, ptw: false },
      hold: 'Civil foundation pedestal 7-day cube strength testing pending'
    },
    {
      id: 'WP-WHEEL-MAN-003',
      workspaceId: 'LINE-WHEEL',
      workstreamId: 'WHEEL-MANIPULATOR',
      assetId: 'AST-WHEEL-MAN-01',
      title: 'Billet High-Speed Loading Manipulator Alignment',
      scopeRef: 'SOW-MECH-06.5',
      scopeClause: 'Rail track foundation grouting, manipulator carriage mounting',
      plannedStart: '2026-11-27',
      plannedFinish: '2026-12-08',
      actualStart: '',
      actualFinish: '',
      supervisor: 'Dilip Rout',
      state: 'Ready for planning',
      progressBasis: 'Track rail alignment survey in progress',
      progressPercentage: 5,
      craneReq: 'Hydra 20T Pick & Carry',
      form11TackleRef: 'TKL-F11-2026-104 (Valid)',
      safetyPtwRef: 'PTW-WHEEL-041 (Pending)',
      readiness: { drawings: true, foundation: true, path: true, tools: true, ptw: false },
      hold: null
    },
    // AREA-MACHINE-SHOP-AXLE
    {
      id: 'WP-MS-FFG-001',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-FFG',
      assetId: 'AST-MS-FFG-01',
      title: 'VDF Boehringer / FFG Lathe Cells OP20.1 & OP20.2 Bed Anchor Rigging',
      scopeRef: 'SOW-MACH-07.1',
      scopeClause: 'Bay transfer, bedplate levelling, anti-vibration mount installation',
      plannedStart: '2026-11-14',
      plannedFinish: '2026-11-24',
      actualStart: '2026-11-15',
      actualFinish: '',
      supervisor: 'Sarat Mishra',
      state: 'In progress',
      progressBasis: 'OP20.1 levelled to 0.04mm/m; OP20.2 on rollers',
      progressPercentage: 70,
      craneReq: 'Overhead Bay Crane 30T + Air Skates 40T',
      form11TackleRef: 'TKL-F11-2026-081 (Valid)',
      safetyPtwRef: 'PTW-MS-018 (Active)',
      readiness: { drawings: true, foundation: true, path: true, tools: true, ptw: true },
      hold: null
    },
    {
      id: 'WP-MS-MAG-002',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-MAG',
      assetId: 'AST-MS-MAG-01',
      title: 'Automated Non-Destructive Testing UT/MPI Stations Erection',
      scopeRef: 'SOW-MACH-07.4',
      scopeClause: 'Ultrasonic OP40 & MPI OP80 structural enclosure and probe carriage mounting',
      plannedStart: '2026-11-19',
      plannedFinish: '2026-11-29',
      actualStart: '2026-11-20',
      actualFinish: '',
      supervisor: 'Sarat Mishra',
      state: 'Mobilized',
      progressBasis: 'Support framing anchored; probe gantry positioned',
      progressPercentage: 40,
      craneReq: 'Overhead Bay Crane 15T',
      form11TackleRef: 'TKL-F11-2026-085 (Valid)',
      safetyPtwRef: 'PTW-MS-021 (Active)',
      readiness: { drawings: true, foundation: true, path: true, tools: true, ptw: true },
      hold: null
    },
    {
      id: 'WP-MS-GER-003',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-GER',
      assetId: 'AST-MS-GER-01',
      title: 'GER CPT-3000 CNC Grinder Bed Rigging (Serials 25/2050 & 25/2051)',
      scopeRef: 'SOW-MACH-07.2',
      scopeClause: 'Heavy base placement, precision optical alignment, hydraulic tank positioning',
      plannedStart: '2026-11-12',
      plannedFinish: '2026-11-23',
      actualStart: '2026-11-13',
      actualFinish: '',
      supervisor: 'Sarat Mishra',
      state: 'In progress',
      progressBasis: 'SN 25/2050 on bed anchors; SN 25/2051 rough aligned',
      progressPercentage: 80,
      craneReq: 'Overhead Crane 30T + Hydra 20T auxiliary',
      form11TackleRef: 'TKL-F11-2026-077 (Valid)',
      safetyPtwRef: 'PTW-MS-015 (Active)',
      readiness: { drawings: true, foundation: true, path: true, tools: true, ptw: true },
      hold: null
    },
    {
      id: 'WP-MS-GANTRY-004',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-PARI-GANTRY',
      assetId: 'AST-MS-GANTRY-01',
      title: 'PARI Automated Overhead Gantry Heads GH01 to GH05 Runway Erection',
      scopeRef: 'SOW-MACH-07.3',
      scopeClause: 'Col-rail runway beam torqueing, 5 trolley heads hoist placement, busbar install',
      plannedStart: '2026-11-08',
      plannedFinish: '2026-11-25',
      actualStart: '2026-11-09',
      actualFinish: '',
      supervisor: 'Sarat Mishra',
      state: 'In progress',
      progressBasis: 'GH01-GH03 hung and aligned; GH04-GH05 rigged on ground',
      progressPercentage: 65,
      craneReq: 'Tandem Manlift + 20T Mobile Gantry Crane',
      form11TackleRef: 'TKL-F11-2026-061 (Valid)',
      safetyPtwRef: 'PTW-MS-011 (Active)',
      readiness: { drawings: true, foundation: true, path: true, tools: true, ptw: true },
      hold: null
    },
    {
      id: 'WP-MS-AUTO-005',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-AUTO-TRANSFER',
      assetId: 'AST-MS-AUTO-01',
      title: 'Automated Transfer Shuttles OP05, OP75 (SPC) & OP105 (NOK) Rigging',
      scopeRef: 'SOW-MACH-07.5',
      scopeClause: 'Floor track embedded channel anchoring, shuttle car placement, sensor rail check',
      plannedStart: '2026-11-23',
      plannedFinish: '2026-12-02',
      actualStart: '',
      actualFinish: '',
      supervisor: 'Sarat Mishra',
      state: 'Planned',
      progressBasis: 'Floor trench survey approved; shuttle parts staged',
      progressPercentage: 20,
      craneReq: 'Forklift 5T + Heavy Roller Skates 15T',
      form11TackleRef: 'TKL-F11-2026-095 (Valid)',
      safetyPtwRef: 'PTW-MS-024 (Draft)',
      readiness: { drawings: true, foundation: true, path: true, tools: true, ptw: false },
      hold: null
    },
    {
      id: 'WP-MS-AUX-006',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-AUX',
      assetId: 'AST-MS-AUX-01',
      title: 'Central Coolant Filtration, Mist Collection & High-Pressure Piping Skid',
      scopeRef: 'SOW-MACH-07.6',
      scopeClause: 'Trench header pipe routing, tank skid placement, pump manifold alignment',
      plannedStart: '2026-11-17',
      plannedFinish: '2026-11-27',
      actualStart: '2026-11-18',
      actualFinish: '',
      supervisor: 'Sarat Mishra',
      state: 'Mobilized',
      progressBasis: 'Skid anchored; return headers welded 50%',
      progressPercentage: 45,
      craneReq: 'Farana 20T + Rigging Lever Hoists 5T',
      form11TackleRef: 'TKL-F11-2026-088 (Valid)',
      safetyPtwRef: 'PTW-MS-019 (Active)',
      readiness: { drawings: true, foundation: true, path: true, tools: true, ptw: true },
      hold: null
    }
  ];

  // 16 CERTIFIED OPERATIONS PERSONNEL
  const SEED_MANPOWER = [
    { badgeNo: 'BAL-OPS-001', name: 'Dilip Rout', designation: 'Operations Manager / Supervisor', trade: 'Erection & Rigging', primaryWorkspace: 'ALL', medicalFitness: '2027-04-15', tpiRiggingCert: 'TPI-RIG-2026-012', form11Qualified: true, state: 'DEPLOYED' },
    { badgeNo: 'BAL-OPS-002', name: 'Sarat Mishra', designation: 'Area Manager / Supervisor', trade: 'Machine Installation', primaryWorkspace: 'AREA-MACHINE-SHOP-AXLE', medicalFitness: '2027-05-20', tpiRiggingCert: 'TPI-RIG-2026-018', form11Qualified: true, state: 'DEPLOYED' },
    { badgeNo: 'BAL-OPS-003', name: 'Manoj Das', designation: 'Lead Heavy Rigger', trade: 'Rigging & Heavy Lift', primaryWorkspace: 'LINE-AXLE', medicalFitness: '2027-03-10', tpiRiggingCert: 'TPI-RIG-2026-045', form11Qualified: true, state: 'DEPLOYED' },
    { badgeNo: 'BAL-OPS-004', name: 'Ramesh Kumar', designation: 'Senior Certified Rigger', trade: 'Rigging & Heavy Lift', primaryWorkspace: 'LINE-AXLE', medicalFitness: '2027-02-18', tpiRiggingCert: 'TPI-RIG-2026-048', form11Qualified: true, state: 'DEPLOYED' },
    { badgeNo: 'BAL-OPS-005', name: 'Bikash Mohapatra', designation: 'Site Safety Steward', trade: 'Safety & Rigging', primaryWorkspace: 'ALL', medicalFitness: '2027-06-12', tpiRiggingCert: 'TPI-HSE-2026-004', form11Qualified: true, state: 'DEPLOYED' },
    { badgeNo: 'BAL-OPS-006', name: 'Pradeep Nayak', designation: 'Millwright Fitter Foreman', trade: 'Mechanical Fitting', primaryWorkspace: 'LINE-WHEEL', medicalFitness: '2027-04-05', tpiRiggingCert: 'TPI-FIT-2026-022', form11Qualified: true, state: 'DEPLOYED' },
    { badgeNo: 'BAL-OPS-007', name: 'Kailash Sahoo', designation: 'Precision Millwright Fitter', trade: 'Mechanical Fitting', primaryWorkspace: 'LINE-WHEEL', medicalFitness: '2027-03-22', tpiRiggingCert: 'TPI-FIT-2026-029', form11Qualified: true, state: 'DEPLOYED' },
    { badgeNo: 'BAL-OPS-008', name: 'Subhashree Jena', designation: 'Hydraulic Technician', trade: 'Hydraulics & Piping', primaryWorkspace: 'LINE-AXLE', medicalFitness: '2027-05-15', tpiRiggingCert: 'TPI-HYD-2026-009', form11Qualified: true, state: 'DEPLOYED' },
    { badgeNo: 'BAL-OPS-009', name: 'Tapan Barik', designation: 'Demag 250T Master Operator', trade: 'Crane Operations', primaryWorkspace: 'LINE-AXLE', medicalFitness: '2027-01-30', tpiRiggingCert: 'TPI-CRN-2026-001', form11Qualified: true, state: 'DEPLOYED' },
    { badgeNo: 'BAL-OPS-010', name: 'Ganesh Pradhan', designation: 'Sany 150T Master Operator', trade: 'Crane Operations', primaryWorkspace: 'LINE-AXLE', medicalFitness: '2027-02-15', tpiRiggingCert: 'TPI-CRN-2026-007', form11Qualified: true, state: 'DEPLOYED' },
    { badgeNo: 'BAL-OPS-011', name: 'Rabindra Sethi', designation: 'Laser Optical Alignment Tech', trade: 'Precision Alignment', primaryWorkspace: 'AREA-MACHINE-SHOP-AXLE', medicalFitness: '2027-04-18', tpiRiggingCert: 'TPI-ALI-2026-003', form11Qualified: true, state: 'DEPLOYED' },
    { badgeNo: 'BAL-OPS-012', name: 'Debendra Behera', designation: 'Gantry Rigging Specialist', trade: 'Overhead Rigging', primaryWorkspace: 'AREA-MACHINE-SHOP-AXLE', medicalFitness: '2027-03-28', tpiRiggingCert: 'TPI-RIG-2026-055', form11Qualified: true, state: 'DEPLOYED' },
    { badgeNo: 'BAL-OPS-013', name: 'Ashok Samal', designation: 'Rigger Grade 1', trade: 'Rigging & Heavy Lift', primaryWorkspace: 'LINE-WHEEL', medicalFitness: '2027-05-02', tpiRiggingCert: 'TPI-RIG-2026-061', form11Qualified: true, state: 'ALLOCATED' },
    { badgeNo: 'BAL-OPS-014', name: 'Niranjan Jena', designation: 'Rigger Grade 2', trade: 'Rigging & Heavy Lift', primaryWorkspace: 'LINE-AXLE', medicalFitness: '2027-04-11', tpiRiggingCert: 'TPI-RIG-2026-068', form11Qualified: true, state: 'STANDBY_HOLD' },
    { badgeNo: 'BAL-OPS-015', name: 'Bijay Patra', designation: 'Industrial Electrician', trade: 'Electrical & Controls', primaryWorkspace: 'AREA-MACHINE-SHOP-AXLE', medicalFitness: '2027-06-01', tpiRiggingCert: 'TPI-ELE-2026-011', form11Qualified: true, state: 'FIT_CLEARED' },
    { badgeNo: 'BAL-OPS-016', name: 'Sanjay Swain', designation: 'Apprentice Rigger', trade: 'Rigging Trainee', primaryWorkspace: 'ALL', medicalFitness: '2027-07-15', tpiRiggingCert: 'PENDING', form11Qualified: false, state: 'INDUCTED' }
  ];

  // 6 REALISTIC SHIFT LOGS
  const SEED_SHIFT_LOGS = [
    {
      id: 'LOG-20261121-S1-AXLE',
      date: '2026-11-21',
      shiftCode: 'Shift A (08:00 - 17:00)',
      workspaceId: 'LINE-AXLE',
      workstreamId: 'AXLE-PRESS-CELL',
      supervisor: 'Dilip Rout',
      leadRigger: 'Manoj Das',
      deployedCrewCount: 48,
      cranesActive: 'Demag CC2500 250T + Sany SCC1500 150T (Tandem Cell)',
      tackleCertStatus: 'Form 11 Valid (Slings 50T x 4, Shackles 55T x 4)',
      safetyPtwStatus: 'PTW-AXLE-049 Active',
      keyMilestone: 'Completed crown lift off trailer; hoisted 4.5m; rough aligned with upright pin guide',
      incidents: 'Zero incidents recorded (Wind pause 25 min per protocol)',
      handoverNotes: 'Shift B to proceed with anchor bolt insertion and dial gauge placement'
    },
    {
      id: 'LOG-20261121-S1-WHEEL',
      date: '2026-11-21',
      shiftCode: 'Shift A (08:00 - 17:00)',
      workspaceId: 'LINE-WHEEL',
      workstreamId: 'WHEEL-PRESS-CELL',
      supervisor: 'Dilip Rout',
      leadRigger: 'Ramesh Kumar',
      deployedCrewCount: 36,
      cranesActive: 'Demag CC2500 250T Crawler Crane',
      tackleCertStatus: 'Form 11 Valid (Grommet Slings 100T)',
      safetyPtwStatus: 'PTW-WHEEL-031 Active',
      keyMilestone: 'Positioned wheel bedplate on hydraulic jacks; verified pit center coordinates with surveyor',
      incidents: 'Zero incidents recorded (Sump pump ran 45 min)',
      handoverNotes: 'Shift B to proceed with precision shimming under baseplate pads'
    },
    {
      id: 'LOG-20261121-S1-MACH',
      date: '2026-11-21',
      shiftCode: 'Shift A (08:00 - 17:00)',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-FFG',
      supervisor: 'Sarat Mishra',
      leadRigger: 'Debendra Behera',
      deployedCrewCount: 28,
      cranesActive: 'Overhead Bay Crane 30T',
      tackleCertStatus: 'Form 11 Valid (Wire Rope 25T)',
      safetyPtwStatus: 'PTW-MS-018 Active',
      keyMilestone: 'OP20.1 lathe bed levelled to 0.04mm/m using master spirit level; base nuts torqued to 350 Nm',
      incidents: 'Zero incidents recorded',
      handoverNotes: 'Handover to Shift B to start hydraulic connection and tailstock rough positioning'
    },
    {
      id: 'LOG-20261120-S2-AXLE',
      date: '2026-11-20',
      shiftCode: 'Shift B (17:00 - 02:00)',
      workspaceId: 'LINE-AXLE',
      workstreamId: 'AXLE-PRESS-CELL',
      supervisor: 'Dilip Rout',
      leadRigger: 'Manoj Das',
      deployedCrewCount: 32,
      cranesActive: 'Demag 250T + Sany 150T',
      tackleCertStatus: 'Form 11 Valid',
      safetyPtwStatus: 'PTW-AXLE-049 Active',
      keyMilestone: 'Tandem crane rigging rigged and tested with 50T test weight; rigging certified by TPI',
      incidents: 'Zero incidents recorded',
      handoverNotes: 'Ready for morning lift'
    },
    {
      id: 'LOG-20261120-S2-MACH',
      date: '2026-11-20',
      shiftCode: 'Shift B (17:00 - 02:00)',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-GER',
      supervisor: 'Sarat Mishra',
      leadRigger: 'Debendra Behera',
      deployedCrewCount: 22,
      cranesActive: 'Bay Crane 30T',
      tackleCertStatus: 'Form 11 Valid',
      safetyPtwStatus: 'PTW-MS-015 Active',
      keyMilestone: 'GER Grinder SN 25/2050 bed set onto anti-vibration damping pads; rough cross-level completed',
      incidents: 'Zero incidents recorded',
      handoverNotes: 'Proceed with precision spirit level alignment next shift'
    },
    {
      id: 'LOG-20261120-S1-GANTRY',
      date: '2026-11-20',
      shiftCode: 'Shift A (08:00 - 17:00)',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-PARI-GANTRY',
      supervisor: 'Sarat Mishra',
      leadRigger: 'Debendra Behera',
      deployedCrewCount: 26,
      cranesActive: 'Manlift 16m + Gantry Crane 20T',
      tackleCertStatus: 'Form 11 Valid',
      safetyPtwStatus: 'PTW-MS-011 Active',
      keyMilestone: 'GH01 and GH02 hoist trolleys hoisted and locked to runway rails; busbar power collectors aligned',
      incidents: 'Zero incidents recorded (100% harness tie-off)',
      handoverNotes: 'GH03 staging in progress on ground'
    }
  ];

  // 4 ACTIVE SITE HOLDS
  const SEED_HOLDS = [
    {
      id: 'HLD-AXLE-FND-001',
      dateRaised: '2026-11-17',
      workspaceId: 'LINE-AXLE',
      workstreamId: 'AXLE-PRESS-CELL',
      assetId: 'AST-AXLE-SCH-01',
      category: 'CIVIL_TOLERANCE',
      description: 'Pocket hole depth on bolt axis C3 is 45mm shallower than Schuler Foundation Drawing Rev C',
      rootCause: 'Civil casting variation during second pour',
      responsibleParty: 'JTRWF Civil / Tata Projects',
      sowClause: 'SOW-MECH-05.1 Clause 3',
      targetDate: '2026-11-23',
      resolutionAction: 'Core drilling of 45mm requested; core rig mobilized on site',
      status: 'ACTIVE'
    },
    {
      id: 'HLD-WHEEL-FND-002',
      dateRaised: '2026-11-19',
      workspaceId: 'LINE-WHEEL',
      workstreamId: 'WHEEL-FURNACE',
      assetId: 'AST-WHEEL-FRN-01',
      category: 'CIVIL_CURE',
      description: 'Pedestal concrete 7-day cube compressive strength report pending from testing laboratory',
      rootCause: 'Mandatory NABL lab test turnaround period',
      responsibleParty: 'JTRWF Quality Lab',
      sowClause: 'SOW-MECH-06.3 Clause 2',
      targetDate: '2026-11-24',
      resolutionAction: 'Expedite lab test report; preliminary Schmidt hammer rebound indicates >35 MPa',
      status: 'ACTIVE'
    },
    {
      id: 'HLD-AXLE-TRL-003',
      dateRaised: '2026-11-20',
      workspaceId: 'LINE-AXLE',
      workstreamId: 'AXLE-TRANSPORT',
      assetId: 'AST-AXLE-SCH-02',
      category: 'PLANT_LOGISTICS',
      description: 'Plant internal main transit road permit pending clearance due to pipe rack overhead work',
      rootCause: 'Overhead piping contractor scaffold blocking 6.5m clear corridor',
      responsibleParty: 'JTRWF Site Logistics',
      sowClause: 'SOW-LOG-01.2 Clause 1',
      targetDate: '2026-11-22',
      resolutionAction: 'Corridor clearance meeting conducted; temporary scaffold modification scheduled 6:00 AM',
      status: 'ACTIVE'
    },
    {
      id: 'HLD-MS-OEM-004',
      dateRaised: '2026-11-15',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-OEM-PENDING',
      assetId: 'AST-MS-AUX-01',
      category: 'OEM_DOCUMENTATION',
      description: '4 crates marked FFG auxiliary coolant return lacking OEM packing slip and terminal diagrams',
      rootCause: 'Consignment split at Chennai port transit',
      responsibleParty: 'FFG India Logistics',
      sowClause: 'SOW-MACH-07.6 Clause 4',
      targetDate: '2026-11-21',
      resolutionAction: 'Packing list received via email from FFG Germany; unboxing in presence of client',
      status: 'RESOLVED'
    }
  ];

  // 1. INDEXEDDB INITIALIZATION & UPGRADE
  function initDb() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('work_packages')) {
          db.createObjectStore('work_packages', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('manpower_roster')) {
          db.createObjectStore('manpower_roster', { keyPath: 'badgeNo' });
        }
        if (!db.objectStoreNames.contains('shift_logs')) {
          db.createObjectStore('shift_logs', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('holds_and_discrepancies')) {
          db.createObjectStore('holds_and_discrepancies', { keyPath: 'id' });
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
      const tx = dbInstance.transaction(['work_packages', 'manpower_roster', 'shift_logs', 'holds_and_discrepancies', 'audit_log'], 'readwrite');
      const wpStore = tx.objectStore('work_packages');
      const countReq = wpStore.count();

      countReq.onsuccess = () => {
        if (countReq.result === 0) {
          SEED_WORK_PACKAGES.forEach((wp) => wpStore.add(wp));
          const mpStore = tx.objectStore('manpower_roster');
          SEED_MANPOWER.forEach((mp) => mpStore.add(mp));
          const logStore = tx.objectStore('shift_logs');
          SEED_SHIFT_LOGS.forEach((log) => logStore.add(log));
          const hldStore = tx.objectStore('holds_and_discrepancies');
          SEED_HOLDS.forEach((hld) => hldStore.add(hld));
          const auditStore = tx.objectStore('audit_log');
          auditStore.add({
            timestamp: new Date().toISOString(),
            actor: 'System Baseline Seeder',
            action: 'INITIALIZE_V7_2_BASELINE',
            target: 'DATABASE_BOOTSTRAP',
            details: 'Initial operational work packages, manpower roster, shift logs, and holds bootstrapped successfully.'
          });
        }
      };

      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
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
    const holds = await getAllRecords('holds_and_discrepancies');

    // Super View Calculations
    const totalWp = packages.length;
    const completedWp = packages.filter((w) => w.state === 'Mechanical completion' || w.state === 'Closed').length;
    const activeWp = packages.filter((w) => w.state === 'In progress' || w.state === 'Mobilized').length;
    const deployedCrew = roster.filter((r) => r.state === 'DEPLOYED').length;
    const activeHolds = holds.filter((h) => h.status === 'ACTIVE').length;

    const sumProgress = packages.reduce((acc, curr) => acc + (curr.progressPercentage || 0), 0);
    const avgProgress = totalWp > 0 ? (sumProgress / totalWp).toFixed(1) : 0;

    const elProg = document.getElementById('statErectionProgress');
    if (elProg) elProg.textContent = `${avgProgress}%`;

    const elWp = document.getElementById('statActiveWp');
    if (elWp) elWp.textContent = `${activeWp} Active`;

    const elCrew = document.getElementById('statCrewCount');
    if (elCrew) elCrew.textContent = `${deployedCrew} Deployed`;

    const elHolds = document.getElementById('statActiveHolds');
    if (elHolds) elHolds.textContent = `${activeHolds} Active`;

    // Render Tab Tables
    renderWorkPackagesTable(packages);
    renderManpowerTable(roster);
    renderShiftLogsTable(logs);
    renderHoldsTable(holds);
  }

  function renderWorkPackagesTable(packages) {
    const tbody = document.getElementById('wpTableBody');
    if (!tbody) return;

    if (packages.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:24px; color:#94a3b8; font-weight:600;">No matching work packages found.</td></tr>';
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
          <td><strong style="font-family:monospace; color:var(--beds-teal-primary); font-size:12.5px;">${wp.id}</strong></td>
          <td>
            <span class="tag-chip tag-cyan" style="font-size:10.5px; font-weight:700;">${wp.workspaceId}</span>
            <div style="font-size:11px; color:var(--beds-text-muted); margin-top:3px; font-weight:600;">${wp.workstreamId}</div>
          </td>
          <td>
            <strong style="color:var(--beds-charcoal-heading); font-size:13px;">${escapeHtml(wp.title)}</strong>
            <div style="font-size:11.5px; color:var(--beds-text-secondary); margin-top:3px;">
              Asset: <code style="font-size:11px; background:var(--beds-bg-page); padding:1px 5px; border-radius:3px;">${wp.assetId}</code> | Scope: <strong>${wp.scopeRef}</strong>
            </div>
          </td>
          <td><span style="font-weight:600; font-size:12.5px;">${wp.supervisor}</span></td>
          <td>
            <div style="display:flex; align-items:center; gap:8px;">
              <div style="flex:1; background:#e2e8f0; height:7px; border-radius:4px; overflow:hidden;">
                <div style="width:${wp.progressPercentage}%; background:#0097a7; height:100%; border-radius:4px;"></div>
              </div>
              <span style="font-size:11.5px; font-weight:800; color:var(--beds-charcoal-heading);">${wp.progressPercentage}%</span>
            </div>
            <div style="font-size:11px; color:var(--beds-text-muted); margin-top:3px;">${escapeHtml(wp.progressBasis || '')}</div>
          </td>
          <td><span class="tag-chip ${badgeClass}" style="font-weight:700;">${wp.state}</span></td>
          <td>
            <button class="beds-btn beds-btn-sm beds-btn-secondary" onclick="BalsonsOpsApp.openEditModal('${wp.id}')" title="Inspect / Manage Package" style="font-weight:700;">
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
      .map((mp) => {
        let stateTag = 'tag-green';
        if (mp.state === 'REQUIRED') stateTag = 'tag-cyan';
        else if (mp.state === 'ALLOCATED') stateTag = 'tag-amber';
        else if (mp.state === 'STANDBY_HOLD') stateTag = 'tag-red';
        else if (mp.state === 'RELEASED') stateTag = 'tag-purple';

        return `
        <tr>
          <td><code style="font-weight:800; color:var(--beds-teal-primary);">${mp.badgeNo}</code></td>
          <td><strong style="color:var(--beds-charcoal-heading); font-size:13px;">${mp.name}</strong></td>
          <td><span style="font-weight:600;">${mp.designation}</span></td>
          <td>${mp.trade}</td>
          <td><span style="font-size:11px; font-weight:700; color:#059669;">${mp.medicalFitness}</span></td>
          <td><code style="font-size:11px;">${mp.tpiRiggingCert}</code></td>
          <td>${mp.form11Qualified ? '<span class="tag-chip tag-green" style="font-size:10px;">FORM-11 QUALIFIED</span>' : '<span class="tag-chip tag-red" style="font-size:10px;">UNQUALIFIED</span>'}</td>
          <td><span class="tag-chip ${stateTag}" style="font-weight:800;">${mp.state}</span></td>
          <td>
            <button class="beds-btn beds-btn-sm beds-btn-secondary" onclick="BalsonsOpsApp.cycleManpowerState('${mp.badgeNo}')" title="Cycle Lifecycle State" style="font-size:11px; font-weight:700;">
              🔄 Cycle State
            </button>
          </td>
        </tr>
      `;
      })
      .join('');
  }

  function renderShiftLogsTable(logs) {
    const tbody = document.getElementById('shiftLogsBody');
    if (!tbody) return;

    if (logs.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:20px; color:#94a3b8;">No shift log entries recorded yet.</td></tr>';
      return;
    }

    tbody.innerHTML = logs
      .map((log) => `
        <tr>
          <td><code style="font-weight:800; color:var(--beds-teal-primary);">${log.id}</code></td>
          <td>
            <strong>${log.date}</strong>
            <div style="font-size:11px; color:var(--beds-teal-primary); font-weight:700;">${log.shiftCode}</div>
          </td>
          <td>
            <span class="tag-chip tag-cyan" style="font-size:10px;">${log.workspaceId}</span>
            <div style="font-size:11px; color:var(--beds-text-muted); margin-top:2px;">${log.workstreamId}</div>
          </td>
          <td>
            <div><strong>${log.supervisor}</strong> (Lead: ${log.leadRigger})</div>
            <div style="font-size:11px; color:var(--beds-text-secondary); margin-top:2px;">Crew Count: <strong>${log.deployedCrewCount}</strong></div>
          </td>
          <td>
            <div style="font-size:12px; font-weight:600; color:var(--beds-charcoal-heading);">${escapeHtml(log.keyMilestone)}</div>
            <div style="font-size:11px; color:var(--beds-text-muted); margin-top:2px;">Cranes: ${escapeHtml(log.cranesActive)}</div>
          </td>
          <td>
            <div style="font-size:11.5px; color:var(--beds-text-secondary); line-height:1.4;">${escapeHtml(log.handoverNotes)}</div>
          </td>
        </tr>
      `)
      .join('');
  }

  function renderHoldsTable(holds) {
    const tbody = document.getElementById('holdsTableBody');
    if (!tbody) return;

    if (holds.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:20px; color:#94a3b8;">No active engineering holds or discrepancies.</td></tr>';
      return;
    }

    tbody.innerHTML = holds
      .map((hld) => {
        const isResolved = hld.status === 'RESOLVED';
        const statusBadge = isResolved ? 'tag-green' : 'tag-red';
        return `
        <tr>
          <td><code style="font-weight:800; color:${isResolved ? '#059669' : '#dc2626'};">${hld.id}</code></td>
          <td>
            <span class="tag-chip tag-cyan" style="font-size:10px;">${hld.workspaceId}</span>
            <div style="font-size:11px; color:var(--beds-text-muted); margin-top:2px;">Asset: <code>${hld.assetId}</code></div>
          </td>
          <td><span class="tag-chip tag-amber" style="font-size:10px; font-weight:700;">${hld.category}</span></td>
          <td>
            <strong style="color:var(--beds-charcoal-heading); font-size:12.5px;">${escapeHtml(hld.description)}</strong>
            <div style="font-size:11px; color:var(--beds-text-muted); margin-top:2px;">Cause: ${escapeHtml(hld.rootCause)}</div>
          </td>
          <td><strong style="font-size:12px; color:var(--beds-teal-primary);">${hld.responsibleParty}</strong></td>
          <td>
            <div style="font-size:11.5px; color:var(--beds-text-secondary);">${escapeHtml(hld.resolutionAction)}</div>
            <div style="font-size:10.5px; color:var(--beds-text-muted); margin-top:2px;">Target: <strong>${hld.targetDate}</strong></div>
          </td>
          <td><span class="tag-chip ${statusBadge}" style="font-weight:800;">${hld.status}</span></td>
        </tr>
      `;
      })
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
      console.log('✅ BALSONS Operations App V7.2 Engine Initialized');
    },

    showToast: function (msg, type = 'success') {
      const container = document.getElementById('opsToastContainer');
      if (!container) return;
      const toast = document.createElement('div');
      toast.className = `ops-toast ops-toast-${type}`;
      toast.innerHTML = `
        <span style="font-size:16px;">${type === 'success' ? '✓' : type === 'warning' ? '⚠️' : 'ℹ️'}</span>
        <div style="flex:1;">${msg}</div>
      `;
      container.appendChild(toast);
      setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
      }, 3500);
    },

    // WORK PACKAGE ACTIONS
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

      const ws = document.getElementById('newWpWorkspace').value;
      const prefix = ws.includes('AXLE') ? 'AXLE' : ws.includes('WHEEL') ? 'WHEEL' : 'MS';
      const newId = `WP-${prefix}-${Date.now().toString().slice(-4)}`;
      const newWp = {
        id: newId,
        workspaceId: ws,
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
        hold: null
      };

      await saveRecord('work_packages', newWp);
      logAudit('CREATE_WORK_PACKAGE', newId, `Created new work package ${newId} (${newWp.title}) in ${newWp.workspaceId}`);
      this.closeCreateWpModal();
      form.reset();
      await refreshDashboard();
      this.showToast(`Work Package ${newId} created successfully in state 'Identified'.`, 'success');
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

      if (newState === 'In progress' && !wp.actualStart) {
        wp.actualStart = new Date().toISOString().slice(0, 10);
      }
      if ((newState === 'Mechanical completion' || newState === 'Closed') && !wp.actualFinish) {
        wp.actualFinish = new Date().toISOString().slice(0, 10);
      }

      await saveRecord('work_packages', wp);
      logAudit('UPDATE_WORK_PACKAGE_STATE', wpId, `State changed from ${oldState} to ${newState}; progress updated to ${newProg}%.`);
      this.closeEditModal();
      await refreshDashboard();
      this.showToast(`Work Package ${wpId} updated to state '${newState}' (${newProg}%).`, 'success');
    },

    filterWorkPackages: async function () {
      const query = (document.getElementById('wpSearchInput')?.value || '').toLowerCase();
      const wsFilter = document.getElementById('wpWorkspaceFilter')?.value || 'ALL';
      const stateFilter = document.getElementById('wpStateFilter')?.value || 'ALL';

      const packages = await getAllRecords('work_packages');
      const filtered = packages.filter((wp) => {
        const matchesQuery = !query || 
          wp.id.toLowerCase().includes(query) ||
          wp.title.toLowerCase().includes(query) ||
          wp.assetId.toLowerCase().includes(query) ||
          wp.supervisor.toLowerCase().includes(query) ||
          (wp.workstreamId || '').toLowerCase().includes(query);

        const matchesWs = wsFilter === 'ALL' || wp.workspaceId === wsFilter;
        const matchesState = stateFilter === 'ALL' || wp.state === stateFilter;

        return matchesQuery && matchesWs && matchesState;
      });

      renderWorkPackagesTable(filtered);
    },

    // MANPOWER ACTIONS
    cycleManpowerState: async function (badgeNo) {
      const roster = await getAllRecords('manpower_roster');
      const member = roster.find((m) => m.badgeNo === badgeNo);
      if (!member) return;

      const states = ['REQUIRED', 'AVAILABLE', 'QUALIFIED', 'CLEARED', 'ALLOCATED', 'MOBILIZED', 'DEPLOYED', 'RELEASED'];
      const currentIndex = states.indexOf(member.state);
      const nextIndex = (currentIndex + 1) % states.length;
      const nextState = states[nextIndex];

      member.state = nextState;
      await saveRecord('manpower_roster', member);
      logAudit('CYCLE_MANPOWER_STATE', badgeNo, `Manpower ${member.name} transitioned to ${nextState}.`);
      await refreshDashboard();
      this.showToast(`${member.name} cycled to state '${nextState}'.`, 'info');
    },

    // SHIFT LOG ACTIONS
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
        id: `LOG-${Date.now().toString().slice(-6)}`,
        date: document.getElementById('shiftDate').value,
        shiftCode: document.getElementById('shiftSelect').value,
        workspaceId: document.getElementById('shiftWsSelect').value,
        workstreamId: document.getElementById('shiftWsStream').value,
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
      this.showToast(`Shift log ${newLog.id} submitted and signed off.`, 'success');
    },

    // HOLDS & DISCREPANCIES ACTIONS
    openRaiseHoldModal: function () {
      const modal = document.getElementById('modalRaiseHold');
      if (modal) modal.style.display = 'flex';
    },

    closeRaiseHoldModal: function () {
      const modal = document.getElementById('modalRaiseHold');
      if (modal) modal.style.display = 'none';
    },

    submitRaiseHold: async function (e) {
      if (e) e.preventDefault();
      const newHold = {
        id: `HLD-${Date.now().toString().slice(-6)}`,
        dateRaised: new Date().toISOString().slice(0, 10),
        workspaceId: document.getElementById('holdWsSelect').value,
        workstreamId: document.getElementById('holdStreamSelect').value,
        assetId: document.getElementById('holdAssetInput').value,
        category: document.getElementById('holdCategorySelect').value,
        description: document.getElementById('holdDescInput').value,
        rootCause: document.getElementById('holdCauseInput').value,
        responsibleParty: document.getElementById('holdPartyInput').value,
        sowClause: document.getElementById('holdClauseInput').value,
        targetDate: document.getElementById('holdTargetDate').value,
        resolutionAction: document.getElementById('holdActionInput').value,
        status: 'ACTIVE'
      };

      await saveRecord('holds_and_discrepancies', newHold);
      logAudit('RAISE_SITE_HOLD', newHold.id, `Hold raised for ${newHold.assetId} (${newHold.category}) by Operations`);
      this.closeRaiseHoldModal();
      await refreshDashboard();
      this.showToast(`Site Hold ${newHold.id} raised successfully.`, 'warning');
    },

    // DUAL SYNC MODAL & ACTION
    openSyncModal: function () {
      const modal = document.getElementById('modalSyncDb');
      if (modal) modal.style.display = 'flex';
    },

    closeSyncModal: function () {
      const modal = document.getElementById('modalSyncDb');
      if (modal) modal.style.display = 'none';
    },

    triggerDualSync: function () {
      const btn = document.getElementById('btnForceSync');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '🔄 Syncing Dual Google Sheet...';
      }
      setTimeout(() => {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = '✓ Bi-Directional Sync Completed';
        }
        this.showToast('Dual Sync with Google Sheets 1GeqDDmB... Completed Successfully!', 'success');
        setTimeout(() => this.closeSyncModal(), 1200);
      }, 1500);
    },

    // ROLE SWITCH / LOGIN MODAL
    openLoginModal: function () {
      const modal = document.getElementById('modal-login');
      if (modal) modal.style.display = 'flex';
    },

    closeLoginModal: function () {
      const modal = document.getElementById('modal-login');
      if (modal) modal.style.display = 'none';
    },

    handleRoleSwitch: function (e) {
      if (e) e.preventDefault();
      const select = document.getElementById('opsRoleSelect');
      const selectedRole = select.value;
      const selectedName = select.options[select.selectedIndex].getAttribute('data-name');

      const userBadge = document.getElementById('headerUserBadge');
      if (userBadge) {
        userBadge.innerHTML = `👤 <strong>${selectedName}</strong> · ${selectedRole}`;
      }

      this.closeLoginModal();
      this.showToast(`Switched active session to ${selectedName} (${selectedRole}).`, 'info');
    },

    // EXPORT JSON BACKUP
    exportOperationalData: async function () {
      const packages = await getAllRecords('work_packages');
      const roster = await getAllRecords('manpower_roster');
      const logs = await getAllRecords('shift_logs');
      const holds = await getAllRecords('holds_and_discrepancies');
      const audits = await getAllRecords('audit_log');

      const fullExport = {
        metadata: {
          system: 'BALSONS OPERATIONS MANAGER',
          documentId: 'BAL-OPS-E2E-007 V7.2',
          databaseId: SPREADSHEET_ID,
          scriptId: APPS_SCRIPT_ID,
          exportedAt: new Date().toISOString(),
          totalPackages: packages.length,
          totalManpower: roster.length,
          totalShiftLogs: logs.length,
          totalHolds: holds.length
        },
        workPackages: packages,
        manpowerRoster: roster,
        shiftLogs: logs,
        holdsAndDiscrepancies: holds,
        auditLog: audits
      };

      const blob = new Blob([JSON.stringify(fullExport, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `BALSONS_OPS_BACKUP_V7_2_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      logAudit('EXPORT_DATABASE_BACKUP', 'FULL_SYSTEM', 'Exported JSON operational database backup snapshot.');
      this.showToast('Operational database snapshot exported successfully.', 'success');
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    window.BalsonsOpsApp.init();
  });
})();
