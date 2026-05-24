export const DRIVERS = [
  {
    id: 1, code: "DRV-001", avatar: "LN", name: "Liam Nguyen",
    phone: "0412 345 678", email: "liam.nguyen@email.com",
    address: "12 Swan St, Richmond VIC 3121",
    license: "VIC-DL-8821934", licenseClass: "Car + Heavy Rigid",
    licenseExpiry: "2026-03-14", licensePhotoFront: true, licensePhotoBack: true,
    employmentStart: "2021-06-01", status: "active", type: "fixed",
    expressCertified: true, expressCertifiedSince: "2023-01-01",
    totalActiveDays: 847,
    suburbs: [
      { name: "Richmond", mainStreets: ["Swan Street", "Bridge Road"], branchStreets: ["Lennox Street", "Church Street"] },
      { name: "Collingwood", mainStreets: ["Smith Street", "Johnston Street"], branchStreets: ["Cambridge Street"] },
      { name: "Fitzroy", mainStreets: ["Brunswick Street"], branchStreets: ["Gertrude Street", "Rose Street"] },
    ],
    incidents: [
      { id: 1, type: "complaint", desc: "Customer reported late delivery to wrong address", date: "2025-04-12", van: "1ABC234", suburb: "Richmond", status: "open" },
      { id: 2, type: "damage", desc: "Parcel damaged — wet weather, unsealed bag", date: "2025-01-03", van: "1ABC234", suburb: "Collingwood", status: "closed" },
      { id: 3, type: "complaint", desc: "Parcel left in unsecured location, reported missing", date: "2024-08-19", van: "1ABC234", suburb: "Fitzroy", status: "closed" },
    ],
    dispatchLog: [
      { date: "2025-05-24", van: "1ABC234", suburbs: ["Richmond", "Collingwood", "Fitzroy"], normal: 74, express: 0, xl: 0 },
      { date: "2025-05-23", van: "1ABC234", suburbs: ["Collingwood", "Fitzroy"], normal: 63, express: 12, xl: 0 },
      { date: "2025-05-22", van: "1ABC234", suburbs: ["Richmond"], normal: 81, express: 0, xl: 0 },
      { date: "2025-05-21", van: null, suburbs: [], normal: 0, express: 0, xl: 0, leave: true },
      { date: "2025-05-20", van: "1ABC234", suburbs: ["Richmond", "Collingwood"], normal: 69, express: 0, xl: 0 },
      { date: "2025-05-19", van: "1ABC234", suburbs: ["Richmond", "Fitzroy"], normal: 72, express: 8, xl: 0 },
      { date: "2025-05-16", van: "1ABC234", suburbs: ["Richmond", "Collingwood", "Fitzroy"], normal: 77, express: 0, xl: 0 },
      { date: "2025-05-15", van: "1ABC234", suburbs: ["Collingwood"], normal: 68, express: 0, xl: 0 },
      { date: "2025-05-14", van: "1ABC234", suburbs: ["Richmond", "Fitzroy"], normal: 80, express: 11, xl: 0 },
      { date: "2025-05-13", van: "1ABC234", suburbs: ["Richmond"], normal: 71, express: 0, xl: 0 },
      { date: "2025-05-12", van: "1ABC234", suburbs: ["Richmond", "Collingwood"], normal: 66, express: 0, xl: 0 },
      { date: "2025-05-09", van: "1ABC234", suburbs: ["Richmond", "Collingwood", "Fitzroy"], normal: 83, express: 0, xl: 0 },
      { date: "2025-05-08", van: "1ABC234", suburbs: ["Fitzroy"], normal: 59, express: 0, xl: 0 },
      { date: "2025-05-07", van: "1ABC234", suburbs: ["Richmond", "Collingwood"], normal: 74, express: 0, xl: 0 },
      { date: "2025-05-06", van: "1ABC234", suburbs: ["Richmond"], normal: 76, express: 0, xl: 0 },
      { date: "2025-05-05", van: "1ABC234", suburbs: ["Collingwood", "Fitzroy"], normal: 70, express: 0, xl: 0 },
      { date: "2025-05-02", van: "1ABC234", suburbs: ["Richmond", "Collingwood", "Fitzroy"], normal: 78, express: 0, xl: 0 },
      { date: "2025-05-01", van: "1ABC234", suburbs: ["Richmond"], normal: 69, express: 0, xl: 0 },
    ],
  },
  {
    id: 2, code: "DRV-002", avatar: "SO", name: "Sarah Okafor",
    phone: "0423 456 789", email: "sarah.okafor@email.com",
    address: "45 High St, Northcote VIC 3070",
    license: "VIC-DL-7712045", licenseClass: "Car",
    licenseExpiry: "2025-11-30", licensePhotoFront: true, licensePhotoBack: true,
    employmentStart: "2022-09-15", status: "active", type: "fixed",
    expressCertified: true, expressCertifiedSince: "2023-06-01",
    totalActiveDays: 512,
    suburbs: [
      { name: "Northcote", mainStreets: ["High Street"], branchStreets: ["Separation Street", "Westgarth Street"] },
      { name: "Preston", mainStreets: ["Murray Road", "Gilbert Road"], branchStreets: ["Tyler Street"] },
      { name: "Thornbury", mainStreets: ["Station Street"], branchStreets: ["Mansfield Street"] },
    ],
    incidents: [
      { id: 1, type: "complaint", desc: "Customer claims parcel not delivered despite scan", date: "2025-03-08", van: "2DEF567", suburb: "Northcote", status: "closed" },
    ],
    dispatchLog: [
      { date: "2025-05-24", van: "2DEF567", suburbs: ["Northcote", "Preston"], normal: 51, express: 12, xl: 0 },
      { date: "2025-05-23", van: "2DEF567", suburbs: ["Northcote", "Thornbury"], normal: 60, express: 8, xl: 0 },
      { date: "2025-05-22", van: "2DEF567", suburbs: ["Preston"], normal: 55, express: 0, xl: 0 },
      { date: "2025-05-21", van: "2DEF567", suburbs: ["Northcote", "Preston", "Thornbury"], normal: 72, express: 14, xl: 0 },
      { date: "2025-05-20", van: "2DEF567", suburbs: ["Northcote"], normal: 48, express: 0, xl: 0 },
    ],
  },
  {
    id: 3, code: "DRV-003", avatar: "MB", name: "Marcus Bell",
    phone: "0434 567 890", email: "marcus.bell@email.com",
    address: "8 Collins St, Melbourne VIC 3000",
    license: "VIC-DL-6603821", licenseClass: "Car + Medium Rigid",
    licenseExpiry: "2027-07-22", licensePhotoFront: true, licensePhotoBack: true,
    employmentStart: "2020-02-10", status: "active", type: "floating",
    expressCertified: false,
    totalActiveDays: 1102,
    suburbs: [],
    incidents: [
      { id: 1, type: "damage", desc: "Parcel damaged during transit — wet conditions", date: "2025-05-10", van: "3GHI890", suburb: "CBD", status: "open" },
      { id: 2, type: "complaint", desc: "Package left in unsecured location", date: "2025-03-22", van: "3GHI890", suburb: "South Yarra", status: "closed" },
      { id: 3, type: "accident", desc: "Minor collision in depot car park", date: "2025-02-14", van: "3GHI890", suburb: "Depot", status: "closed" },
    ],
    dispatchLog: [
      { date: "2025-05-24", van: "3GHI890", suburbs: ["CBD", "South Yarra"], normal: 68, express: 0, xl: 8 },
      { date: "2025-05-23", van: "3GHI890", suburbs: ["Prahran"], normal: 55, express: 0, xl: 5 },
      { date: "2025-05-22", van: "3GHI890", suburbs: ["CBD"], normal: 72, express: 0, xl: 0 },
    ],
  },
  {
    id: 4, code: "DRV-004", avatar: "PS", name: "Priya Sharma",
    phone: "0445 678 901", email: "priya.sharma@email.com",
    address: "22 Sydney Rd, Brunswick VIC 3056",
    license: "VIC-DL-5594712", licenseClass: "Car",
    licenseExpiry: "2026-12-01", licensePhotoFront: true, licensePhotoBack: true,
    employmentStart: "2023-01-20", status: "active", type: "fixed",
    expressCertified: false,
    totalActiveDays: 378,
    suburbs: [
      { name: "Brunswick", mainStreets: ["Sydney Road"], branchStreets: ["Albion Street", "Glenlyon Road"] },
      { name: "Coburg", mainStreets: ["Bell Street", "Sydney Road"], branchStreets: ["Urquhart Street"] },
      { name: "Pascoe Vale", mainStreets: ["Cumberland Road"], branchStreets: ["Victoria Street"] },
    ],
    incidents: [],
    dispatchLog: [
      { date: "2025-05-24", van: "5MNO456", suburbs: ["Brunswick", "Coburg"], normal: 99, express: 0, xl: 0 },
      { date: "2025-05-23", van: "5MNO456", suburbs: ["Brunswick", "Pascoe Vale"], normal: 88, express: 0, xl: 0 },
      { date: "2025-05-22", van: "5MNO456", suburbs: ["Coburg"], normal: 74, express: 0, xl: 0 },
    ],
  },
  {
    id: 5, code: "DRV-005", avatar: "TW", name: "Tom Westwood",
    phone: "0456 789 012", email: "tom.westwood@email.com",
    address: "31 Barkly St, Footscray VIC 3011",
    license: "VIC-DL-4485603", licenseClass: "Car",
    licenseExpiry: "2025-08-18", licensePhotoFront: true, licensePhotoBack: true,
    employmentStart: "2019-11-05", status: "active", type: "fixed",
    expressCertified: false,
    totalActiveDays: 1280,
    suburbs: [
      { name: "Footscray", mainStreets: ["Barkly Street", "Nicholson Street"], branchStreets: ["Hyde Street"] },
      { name: "Yarraville", mainStreets: ["Somerville Road"], branchStreets: ["Hyde Street", "Anderson Street"] },
      { name: "Seddon", mainStreets: ["Charles Street"], branchStreets: ["Victoria Street"] },
    ],
    incidents: [
      { id: 1, type: "complaint", desc: "Incorrect address attempted without customer contact", date: "2025-05-18", van: "5MNO456", suburb: "Footscray", status: "open" },
      { id: 2, type: "complaint", desc: "Customer reported rude behaviour", date: "2024-11-02", van: "1ABC234", suburb: "Seddon", status: "closed" },
    ],
    dispatchLog: [
      { date: "2025-05-23", van: "5MNO456", suburbs: ["Footscray", "Yarraville"], normal: 82, express: 0, xl: 0 },
      { date: "2025-05-22", van: "5MNO456", suburbs: ["Seddon"], normal: 61, express: 0, xl: 0 },
      { date: "2025-05-21", van: "5MNO456", suburbs: ["Footscray", "Yarraville", "Seddon"], normal: 90, express: 0, xl: 0 },
    ],
  },
];

export const VANS = [
  { id: 1, plate: "1ABC234", make: "Toyota HiAce", year: 2021, reg: "2025-09-30", lastInspection: "2025-03-01", odometer: 84200, health: 92, violations: 0, status: "active", notes: "" },
  { id: 2, plate: "2DEF567", make: "Ford Transit", year: 2020, reg: "2025-07-14", lastInspection: "2025-01-15", odometer: 102400, health: 78, violations: 1, status: "active", notes: "Minor dent rear bumper" },
  { id: 3, plate: "3GHI890", make: "Mercedes Sprinter", year: 2022, reg: "2026-02-28", lastInspection: "2025-04-10", odometer: 61000, health: 96, violations: 0, status: "active", notes: "" },
  { id: 4, plate: "4JKL123", make: "Toyota HiAce", year: 2019, reg: "2025-06-10", lastInspection: "2024-12-20", odometer: 138700, health: 61, violations: 2, status: "maintenance", notes: "Engine service overdue" },
  { id: 5, plate: "5MNO456", make: "Ford Transit", year: 2023, reg: "2026-08-15", lastInspection: "2025-05-01", odometer: 29000, health: 99, violations: 0, status: "active", notes: "" },
];

export const INSPECTION_CHECKLIST_TEMPLATE = [
  { section: "Exterior", icon: "car", items: ["Body damage", "Tyre tread & pressure", "Headlights & indicators", "Tail lights", "Mirrors", "Windscreen & wipers"] },
  { section: "Interior", icon: "steering-wheel", items: ["Seatbelts", "Dashboard warning lights", "Horn", "Air conditioning", "Interior cleanliness"] },
  { section: "Under bonnet", icon: "tool", items: ["Oil level", "Coolant level", "Brake fluid", "Battery condition"] },
  { section: "Safety & documents", icon: "shield", items: ["First aid kit", "Fire extinguisher", "Warning triangle", "Hi-vis vest", "Registration papers present", "Insurance present"] },
];

export const INSPECTION_HISTORY = [
  { id: 1, vanPlate: "1ABC234", date: "2025-05-17", inspector: "James S.", week: 20, outcome: "passed", notes: "All 20 items passed. No notes.", results: {} },
  { id: 2, vanPlate: "5MNO456", date: "2025-05-10", inspector: "James S.", week: 19, outcome: "passed", notes: "All items passed.", results: {} },
  { id: 3, vanPlate: "4JKL123", date: "2025-05-03", inspector: "James S.", week: 18, outcome: "flagged", notes: "Engine oil low. Flagged for service.", results: { "Oil level": "fail" } },
  { id: 4, vanPlate: "2DEF567", date: "2025-04-26", inspector: "James S.", week: 17, outcome: "passed", notes: "Minor note on dent — cosmetic only.", results: {} },
  { id: 5, vanPlate: "3GHI890", date: "2025-04-10", inspector: "James S.", week: 15, outcome: "passed", notes: "All clear.", results: {} },
];

export const WEEKLY_INSPECTION_VANS = ["3GHI890", "7XYZ321"];

export const ONBOARDING_QUEUE = [
  { id: 1, name: "James Kowalski", submittedAt: "2025-05-24T08:30:00", status: "submitted", linkCode: "xK9mP2qR" },
  { id: 2, name: "Anika Rao", submittedAt: null, status: "pending", linkCode: "mQ3nR7sT", expiresAt: "2025-05-26T10:00:00" },
];

export const TODAY_DISPATCHES = [
  { id: 1, driverId: 1, vanPlate: "1ABC234", suburbs: ["Richmond", "Collingwood", "Fitzroy"], normal: 74, express: 0, xl: 0, time: "06:45" },
  { id: 2, driverId: 2, vanPlate: "2DEF567", suburbs: ["Northcote", "Preston"], normal: 51, express: 12, xl: 0, time: "06:52" },
  { id: 3, driverId: 3, vanPlate: "3GHI890", suburbs: ["CBD", "South Yarra"], normal: 68, express: 0, xl: 8, time: "07:01" },
  { id: 4, driverId: 4, vanPlate: "5MNO456", suburbs: ["Brunswick", "Coburg"], normal: 99, express: 0, xl: 0, time: "07:10" },
];
