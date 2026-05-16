const WHEELS_KEY = "skillWheelWheels";
const ACTIVE_WHEEL_KEY = "skillWheelActiveWheelId";
const DASHBOARD_KEY = "skillWheelSpinnerDashboard";
const DEFAULT_WHEEL_SEEDED_KEY = "skillWheelDefaultMainstayWheelsSeededV1";
const PREVIOUS_DEFAULT_WHEEL_SEEDED_KEYS = ["skillWheelDefaultCharacterWheelsSeededV2"];
const LEGACY_DEFAULT_WHEEL_NAMES = ["Male Character generator", "Female Character generator"];
const IMAGE_DB_NAME = "skillWheelSpinnerImages";
const IMAGE_STORE = "images";
const ALL_RINGS = ["outer", "middle", "inner", "core", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];
const RING_LABELS = { outer: "ring 1", middle: "ring 2", inner: "ring 3", core: "ring 4", fifth: "ring 5", sixth: "ring 6", seventh: "ring 7", eighth: "ring 8", ninth: "ring 9", tenth: "ring 10" };
const DEFAULT_WHEEL_PAYLOADS = [
  {
    "type": "wonder-wheel",
    "version": 1,
    "exportedAt": "2026-05-16T23:37:17.687Z",
    "wheel": {
      "id": "wheel-1778974387819-d2d99b51afcbd",
      "name": "Bad Product Pitch",
      "createdAt": "2026-05-16T23:33:07.819Z",
      "updatedAt": "2026-05-16T23:37:05.023Z",
      "ringCount": 5,
      "wheelFrame": "neon-circuit",
      "showWheelLines": true,
      "allowSound": false,
      "sizeScale": 1,
      "colors": {
        "wheel": "#ffd700",
        "interface": "#ffffff",
        "text": "#ffffff",
        "pageBg": "#111111",
        "pageBgImageRef": "",
        "wheelBgImageRef": "",
        "wheelBgImage": "",
        "pageBgImage": ""
      },
      "center": {
        "background": "",
        "backgroundRef": ""
      },
      "rings": {
        "outer": {
          "names": [
            "Toaster",
            "Backpack",
            "Shoes",
            "Coffee mug",
            "Gaming chair",
            "Toilet",
            "Microwave",
            "Helmet",
            "Blender",
            "Smart fridge",
            "Lawn mower",
            "Car",
            "Phone app",
            "Pillow",
            "Drone"
          ],
          "prompt": "Product",
          "background": "",
          "backgroundRef": "",
          "rotation": 199.54939268722364,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {},
          "connector": ""
        },
        "middle": {
          "names": [
            "Astronauts",
            "Gamers",
            "Toddlers",
            "Grandparents",
            "Lawyers",
            "Influencers",
            "Bodybuilders",
            "Pirates",
            "CEOs",
            "College students",
            "Survivalists",
            "Cats",
            "Billionaires",
            "Campers",
            "Office workers"
          ],
          "prompt": "Audience",
          "background": "",
          "backgroundRef": "",
          "rotation": 276.5558068554492,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {},
          "connector": "for"
        },
        "inner": {
          "names": [
            "AI-powered tech",
            "chance to explode",
            "Voice activation",
            "Solar powered battery",
            "Emotion sensing tech",
            "Self-destructing button",
            "Bluetooth",
            "Edible feature",
            "Flamethrower attachment",
            "Terrible smell",
            "ability to scream",
            "Wifi connectivity",
            "Waterproof teh",
            "Hover technology",
            "Mood tracking tech"
          ],
          "prompt": "Special Feature",
          "background": "",
          "backgroundRef": "",
          "rotation": 328.2490100657367,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {},
          "connector": "with"
        },
        "core": {
          "names": [
            "Causes paranoia",
            "Attracts raccoons",
            "Deletes contacts",
            "Makes people emotional",
            "Starts arguments",
            "Summons geese",
            "Cannot stop vibrating",
            "Changes accents",
            "Creates mild confusion",
            "Drains batteries instantly",
            "Makes users too confident",
            "Causes hiccups",
            "Leaks glitter",
            "Breaks relationships",
            "Randomly screams"
          ],
          "prompt": "Side Effect",
          "background": "",
          "backgroundRef": "",
          "rotation": 87.74613247952448,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {},
          "connector": "that"
        },
        "fifth": {
          "names": [
            "$5",
            "$999/month subscription",
            "$14,000 one-time payment",
            "Free but cursed",
            "Crypto only",
            "Trade for goats",
            "$1 per use",
            "Government funded",
            "Pay what you feel",
            "Requires blood sample",
            "Sponsored by energy drinks",
            "Ad-supported",
            "Premium deluxe edition",
            "Auction only",
            "Black market exclusive"
          ],
          "prompt": "Price Model",
          "background": "",
          "backgroundRef": "",
          "rotation": 309.61308695410435,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {},
          "connector": "is"
        },
        "sixth": {
          "names": [
            "sixth 1"
          ],
          "prompt": "",
          "connector": "",
          "background": "",
          "backgroundRef": "",
          "rotation": 0,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {}
        },
        "seventh": {
          "names": [
            "seventh 1"
          ],
          "prompt": "",
          "connector": "",
          "background": "",
          "backgroundRef": "",
          "rotation": 0,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {}
        },
        "eighth": {
          "names": [
            "eighth 1"
          ],
          "prompt": "",
          "connector": "",
          "background": "",
          "backgroundRef": "",
          "rotation": 0,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {}
        },
        "ninth": {
          "names": [
            "ninth 1"
          ],
          "prompt": "",
          "connector": "",
          "background": "",
          "backgroundRef": "",
          "rotation": 0,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {}
        },
        "tenth": {
          "names": [
            "tenth 1"
          ],
          "prompt": "",
          "connector": "",
          "background": "",
          "backgroundRef": "",
          "rotation": 0,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {}
        }
      },
      "completed": [],
      "preventRepeatSelections": false,
      "hideWheelLines": false,
      "hideWheelText": false
    },
    "imageData": {}
  },
  {
    "type": "wonder-wheel",
    "version": 1,
    "exportedAt": "2026-05-16T23:33:39.489Z",
    "wheel": {
      "id": "wheel-1778973069565-5f68ff7fe6fc08",
      "name": "Conspiracy Generator",
      "createdAt": "2026-05-16T23:11:09.565Z",
      "updatedAt": "2026-05-16T23:33:33.428Z",
      "ringCount": 5,
      "wheelFrame": "classic-glow",
      "showWheelLines": true,
      "allowSound": false,
      "sizeScale": 2.247907986676472,
      "colors": {
        "wheel": "#ffd700",
        "interface": "#ffffff",
        "text": "#ffffff",
        "pageBg": "#111111",
        "pageBgImageRef": "",
        "wheelBgImageRef": "",
        "wheelBgImage": "",
        "pageBgImage": ""
      },
      "center": {
        "background": "",
        "backgroundRef": ""
      },
      "rings": {
        "outer": {
          "names": [
            "Costco",
            "NASA",
            "Disney",
            "TikTok",
            "Local HOA",
            "Walmart",
            "The Government",
            "YouTube",
            "Starbucks",
            "Apple",
            "A Secret Society",
            "Area 51",
            "The Moon",
            "The DMV",
            "Weather Stations"
          ],
          "prompt": "Organization",
          "background": "",
          "backgroundRef": "",
          "rotation": 282.8087805359464,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {},
          "connector": ""
        },
        "middle": {
          "names": [
            "Mind control",
            "Replacing birds",
            "Time travel experiments",
            "Controlling weather",
            "Tracking citizens",
            "Hiding aliens",
            "Creating influencers",
            "Manipulating prices",
            "Replacing celebrities",
            "Starting fake trends",
            "Controlling dreams",
            "Suppressing knowledge",
            "Creating shortages",
            "Monitoring thoughts",
            "Stealing pets"
          ],
          "prompt": "Goal",
          "background": "",
          "backgroundRef": "",
          "rotation": 40.99049754243629,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {},
          "connector": "is"
        },
        "inner": {
          "names": [
            "Underground magnets",
            "AI drones",
            "Satellites",
            "Microwave towers",
            "Quantum potatoes",
            "Mind-reading pigeons",
            "Invisible lasers",
            "Tiny robots",
            "Nanobots",
            "Fake clouds",
            "Brain chips",
            "Toaster signals",
            "Underground tunnels",
            "Weather balloons",
            "Energy crystals"
          ],
          "prompt": "Secret Technology",
          "background": "",
          "backgroundRef": "",
          "rotation": 142.72270822766518,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {},
          "connector": "using"
        },
        "core": {
          "names": [
            "Nicolas Cage",
            "Taylor Swift",
            "Keanu Reeves",
            "The Rock",
            "Gordon Ramsay",
            "Tom Cruise",
            "Elon Musk",
            "Danny DeVito",
            "Ryan Reynolds",
            "Snoop Dogg",
            "Post Malone",
            "Jack Black",
            "MrBeast",
            "Oprah",
            "Drake"
          ],
          "prompt": "Celebrity Involved",
          "background": "",
          "backgroundRef": "",
          "rotation": 87.98155979802016,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {},
          "connector": "with"
        },
        "fifth": {
          "names": [
            "Fake traffic",
            "Celebrity drama",
            "Bad WiFi",
            "Gas prices",
            "Reality TV",
            "Fast food ads",
            "Streaming services",
            "Memes",
            "Influencer culture",
            "Crypto scams",
            "Bird migrations",
            "Sports events",
            "TikTok dances",
            "Concert tours",
            "Coffee shortages"
          ],
          "prompt": "Cover-Up",
          "background": "",
          "backgroundRef": "",
          "rotation": 137.11298054881132,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {},
          "connector": "at"
        },
        "sixth": {
          "names": [
            "sixth 1"
          ],
          "prompt": "",
          "background": "",
          "backgroundRef": "",
          "rotation": 0,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {},
          "connector": ""
        },
        "seventh": {
          "names": [
            "seventh 1"
          ],
          "prompt": "",
          "background": "",
          "backgroundRef": "",
          "rotation": 0,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {},
          "connector": ""
        },
        "eighth": {
          "names": [
            "eighth 1"
          ],
          "prompt": "",
          "background": "",
          "backgroundRef": "",
          "rotation": 0,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {},
          "connector": ""
        },
        "ninth": {
          "names": [
            "ninth 1"
          ],
          "prompt": "",
          "background": "",
          "backgroundRef": "",
          "rotation": 0,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {},
          "connector": ""
        },
        "tenth": {
          "names": [
            "tenth 1"
          ],
          "prompt": "",
          "background": "",
          "backgroundRef": "",
          "rotation": 0,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {},
          "connector": ""
        }
      },
      "completed": [],
      "preventRepeatSelections": false,
      "hideWheelLines": false,
      "hideWheelText": false
    },
    "imageData": {}
  },
  {
    "type": "wonder-wheel",
    "version": 1,
    "exportedAt": "2026-05-16T23:17:44.817Z",
    "wheel": {
      "id": "wheel-1778477012906-9e164ad96c9f6",
      "name": "Female Character generator",
      "createdAt": "2026-05-11T05:23:32.906Z",
      "updatedAt": "2026-05-16T23:17:40.646Z",
      "ringCount": 10,
      "wheelFrame": "arcane",
      "hideWheelLines": true,
      "showWheelLines": false,
      "allowSound": false,
      "sizeScale": 1,
      "colors": {
        "wheel": "#ffd700",
        "interface": "#ffffff",
        "text": "#ffd700",
        "pageBg": "#111111",
        "pageBgImageRef": "",
        "wheelBgImageRef": "",
        "wheelBgImage": ""
      },
      "center": {
        "background": "",
        "backgroundRef": ""
      },
      "rings": {
        "outer": {
          "names": [
            "Human",
            "Orc",
            "Elf",
            "Gnome",
            "Dwarf",
            "Tiefling",
            "Goliath",
            "Halfling",
            "Aarakocra",
            "Goblin",
            "Kobold",
            "Dragonborn",
            "Tabaxi",
            "Genasi",
            "Changeling"
          ],
          "prompt": "Species",
          "background": "",
          "backgroundRef": "",
          "rotation": 294.32937720548864,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {}
        },
        "middle": {
          "names": [
            "Barbarian",
            "Bard",
            "Cleric",
            "Druid",
            "Fighter",
            "Monk",
            "Paladin",
            "Ranger",
            "Rogue",
            "Sorcerer",
            "Warlock",
            "Wizard"
          ],
          "prompt": "Class",
          "background": "",
          "backgroundRef": "",
          "rotation": 217.64140075254602,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {}
        },
        "inner": {
          "names": [
            "Lawful Good",
            "Neutral Good",
            "Chaotic Good",
            "Neutral Good",
            "True Neutral",
            "Chaotic Netural",
            "Lawful Evil",
            "Neutral Evil",
            "Chaotic Evil"
          ],
          "prompt": "Alignment",
          "background": "",
          "backgroundRef": "",
          "rotation": 317.7710895136678,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {}
        },
        "core": {
          "names": [
            "Castle",
            "Large City",
            "Small town",
            "Forest",
            "Deep Caverns",
            "Remote Island",
            "Swamp settlement",
            "Farmland",
            "Mountain village",
            "Slums",
            "Nomad Camp",
            "Astral Plane",
            "Coastal village",
            "Holy Temple",
            "Soldier Academy",
            "Royal court",
            "Underdark",
            "Salve colony",
            "Prison colony",
            "Dead Kingdon"
          ],
          "prompt": "Place of Origin",
          "background": "",
          "backgroundRef": "",
          "rotation": 146.72304447774331,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {}
        },
        "fifth": {
          "names": [
            "Aristocrat",
            "Noble born",
            "Poor",
            "Disgraced",
            "Refugee",
            "Criminal",
            "Escaped Slave",
            "Deserter",
            "Celebrity",
            "Worshipped",
            "Blacksmith",
            "Local Hero",
            "Exiled",
            "Prophet",
            "Hexbound",
            "Gladiator",
            "Wanderer",
            "Crown Heir",
            "Veteran soldier",
            "Beast trainer"
          ],
          "prompt": "Social Status",
          "background": "",
          "backgroundRef": "",
          "rotation": 45.971216266866975,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {}
        },
        "sixth": {
          "names": [
            "Revenge",
            "Seeking artifact",
            "Dark Pact",
            "Redemption",
            "Trial by Fire",
            "Family Honor",
            "Blood Debt",
            "Monster hunting",
            "Hidden Shame",
            "Escape Past",
            "Forbidden love",
            "Treasure hunting",
            "Self Discovery",
            "Prove Innocence",
            "Gambling debt",
            "Become Immortal",
            "Fulfill Prophecy",
            "Seek Justice",
            "Honor Mentor",
            "Save Family"
          ],
          "prompt": "Motivation",
          "background": "",
          "backgroundRef": "",
          "rotation": 114.77993821505476,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {}
        },
        "seventh": {
          "names": [
            "Stoic",
            "Charming",
            "Paranoid",
            "Reckless",
            "Dutiful",
            "Charismatic",
            "Arrogant",
            "Cruel",
            "Fanatical",
            "Unstable",
            "Compassionate",
            "Patient",
            "Protective",
            "Friendly",
            "Fearless",
            "Cowardly",
            "Flirtatious",
            "Intelligent",
            "Resourceful",
            "Awkward"
          ],
          "prompt": "Personality",
          "background": "",
          "backgroundRef": "",
          "rotation": 209.21193486272625,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {}
        },
        "eighth": {
          "names": [
            "Flowing Hair",
            "Scar Covered",
            "Short Stature",
            "Towering Height",
            "Frail",
            "Ember eyes",
            "Fangs",
            "Stone Skin",
            "Crooked Smile",
            "Missing teeth",
            "Striking Beauty",
            "Obese",
            "Elegant",
            "Hideous",
            "Athletic build",
            "Permanent Scowl",
            "Hunched posture",
            "Muscular Build",
            "Wiry build",
            "Delicate frame"
          ],
          "prompt": "Physical Trait",
          "background": "",
          "backgroundRef": "",
          "rotation": 156.90681301391862,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {}
        },
        "ninth": {
          "names": [
            "Lock picking",
            "Endurance",
            "Tracking",
            "Navigation",
            "Pain Tolerance",
            "Negotiation",
            "Seduction",
            "Diplomacy",
            "Skilled in combat",
            "Perfect aim",
            "Brutal strength",
            "Good reflexes",
            "Animal handling",
            "Manipulative",
            "Lucky",
            "Pursuasive",
            "Natural leader",
            "Perfect memory",
            "Sharp intuition",
            "Adaptable"
          ],
          "prompt": "Strength",
          "background": "",
          "backgroundRef": "",
          "rotation": 219.87123180624633,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {}
        },
        "tenth": {
          "names": [
            "Insecure",
            "Greedy",
            "indecisive",
            "Easily tempted",
            "Unfocused",
            "Clumsy",
            "Sickly",
            "Too honest",
            "Gambler",
            "Terrible liar",
            "Corruptible",
            "Illiterate",
            "Missing limb",
            "Poor memory",
            "Distrustful",
            "People Pleaser",
            "Thrill addicted",
            "Alcoholic",
            "Loud",
            "Easily lost"
          ],
          "prompt": "Weakness",
          "background": "",
          "backgroundRef": "",
          "rotation": 347.95724252730827,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {}
        }
      },
      "completed": [],
      "preventRepeatSelections": false,
      "hideWheelText": false
    },
    "imageData": {}
  },
  {
    "type": "wonder-wheel",
    "version": 1,
    "exportedAt": "2026-05-16T22:59:40.356Z",
    "wheel": {
      "id": "wheel-1778477012906-9e164ad96c9f6",
      "name": "Male Character generator",
      "createdAt": "2026-05-11T05:23:32.906Z",
      "updatedAt": "2026-05-16T22:59:28.863Z",
      "ringCount": 10,
      "wheelFrame": "arcane",
      "showWheelLines": false,
      "allowSound": false,
      "sizeScale": 0.9761033227264325,
      "colors": {
        "wheel": "#ffd700",
        "interface": "#ffffff",
        "text": "#ffd700",
        "pageBg": "#111111",
        "pageBgImageRef": "",
        "wheelBgImageRef": "",
        "wheelBgImage": "",
        "pageBgImage": ""
      },
      "center": {
        "background": "",
        "backgroundRef": ""
      },
      "rings": {
        "outer": {
          "names": [
            "Human",
            "Orc",
            "Elf",
            "Gnome",
            "Dwarf",
            "Tiefling",
            "Goliath",
            "Halfling",
            "Aarakocra",
            "Goblin",
            "Kobold",
            "Dragonborn",
            "Tabaxi",
            "Genasi",
            "Changeling"
          ],
          "prompt": "Species",
          "background": "",
          "backgroundRef": "",
          "rotation": 240.48317720520254,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {}
        },
        "middle": {
          "names": [
            "Barbarian",
            "Bard",
            "Cleric",
            "Druid",
            "Fighter",
            "Monk",
            "Paladin",
            "Ranger",
            "Rogue",
            "Sorcerer",
            "Warlock",
            "Wizard"
          ],
          "prompt": "Class",
          "background": "",
          "backgroundRef": "",
          "rotation": 271.4876007528321,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {}
        },
        "inner": {
          "names": [
            "Lawful Good",
            "Neutral Good",
            "Chaotic Good",
            "Neutral Good",
            "True Neutral",
            "Chaotic Netural",
            "Lawful Evil",
            "Neutral Evil",
            "Chaotic Evil"
          ],
          "prompt": "Alignment",
          "background": "",
          "backgroundRef": "",
          "rotation": 263.9248895133817,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {}
        },
        "core": {
          "names": [
            "Castle",
            "Large City",
            "Small town",
            "Forest",
            "Deep Caverns",
            "Remote Island",
            "Swamp settlement",
            "Farmland",
            "Mountain village",
            "Slums",
            "Nomad Camp",
            "Astral Plane",
            "Coastal village",
            "Holy Temple",
            "Soldier Academy",
            "Royal court",
            "Underdark",
            "Salve colony",
            "Prison colony",
            "Dead Kingdon"
          ],
          "prompt": "Place of Origin",
          "background": "",
          "backgroundRef": "",
          "rotation": 96.56924447802936,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {}
        },
        "fifth": {
          "names": [
            "Aristocrat",
            "Noble born",
            "Poor",
            "Disgraced",
            "Refugee",
            "Criminal",
            "Escaped Slave",
            "Deserter",
            "Celebrity",
            "Worshipped",
            "Blacksmith",
            "Local Hero",
            "Exiled",
            "Prophet",
            "Hexbound",
            "Gladiator",
            "Wanderer",
            "Crown Heir",
            "Veteran soldier",
            "Beast trainer"
          ],
          "prompt": "Social Status",
          "background": "",
          "backgroundRef": "",
          "rotation": 352.1250162665808,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {}
        },
        "sixth": {
          "names": [
            "Revenge",
            "Seeking artifact",
            "Dark Pact",
            "Redemption",
            "Trial by Fire",
            "Family Honor",
            "Blood Debt",
            "Monster hunting",
            "Hidden Shame",
            "Escape Past",
            "Forbidden love",
            "Treasure hunting",
            "Self Discovery",
            "Prove Innocence",
            "Gambling debt",
            "Become Immortal",
            "Fulfill Prophecy",
            "Seek Justice",
            "Honor Mentor",
            "Save Family"
          ],
          "prompt": "Motivation",
          "background": "",
          "backgroundRef": "",
          "rotation": 64.62613821534086,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {}
        },
        "seventh": {
          "names": [
            "Stoic",
            "Charming",
            "Paranoid",
            "Reckless",
            "Dutiful",
            "Charismatic",
            "Arrogant",
            "Cruel",
            "Fanatical",
            "Unstable",
            "Compassionate",
            "Patient",
            "Protective",
            "Friendly",
            "Fearless",
            "Cowardly",
            "Flirtatious",
            "Intelligent",
            "Resourceful",
            "Awkward"
          ],
          "background": "",
          "backgroundRef": "",
          "rotation": 155.36573486244026,
          "prompt": "Personality",
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {}
        },
        "eighth": {
          "names": [
            "Long Beard",
            "Scar Covered",
            "Short Stature",
            "Towering Height",
            "Frail",
            "Ember eyes",
            "Fangs",
            "Stone Skin",
            "Crooked Smile",
            "Missing teeth",
            "Baby face",
            "Corpulent",
            "Beautiful",
            "Hideous",
            "Athletic build",
            "Permanent Scowl",
            "Hunched posture",
            "Broad shoulders",
            "Wiry build",
            "Delicate frame"
          ],
          "background": "",
          "backgroundRef": "",
          "rotation": 106.75301301420473,
          "prompt": "Physical Trait",
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {}
        },
        "ninth": {
          "names": [
            "Lock picking",
            "Endurance",
            "Tracking",
            "Navigation",
            "Pain Tolerance",
            "Negotiation",
            "Seduction",
            "Diplomacy",
            "Skilled in combat",
            "Perfect aim",
            "Brutal strength",
            "Good reflexes",
            "Animal handling",
            "Manipulative",
            "Lucky",
            "Pursuasive",
            "Natural leader",
            "Perfect memory",
            "Sharp intuition",
            "Adaptable"
          ],
          "background": "",
          "backgroundRef": "",
          "rotation": 166.02503180596023,
          "prompt": "Strength",
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {}
        },
        "tenth": {
          "names": [
            "Insecure",
            "Greedy",
            "indecisive",
            "Easily tempted",
            "Unfocused",
            "Clumsy",
            "Sickly",
            "Too honest",
            "Gambler",
            "Terrible liar",
            "Corruptible",
            "Illiterate",
            "Missing limb",
            "Poor memory",
            "Distrustful",
            "People Pleaser",
            "Thrill addicted",
            "Alcoholic",
            "Loud",
            "Easily lost"
          ],
          "background": "",
          "backgroundRef": "",
          "rotation": 297.80344252759437,
          "prompt": "Weakness",
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {}
        }
      },
      "completed": [],
      "preventRepeatSelections": false,
      "hideWheelLines": true,
      "hideWheelText": true
    },
    "imageData": {}
  },
  {
    "type": "wonder-wheel",
    "version": 1,
    "exportedAt": "2026-05-16T23:40:43.838Z",
    "wheel": {
      "id": "wheel-1778972933464-e9583f4778def8",
      "name": "Would You Rather Catastrophe Edition",
      "createdAt": "2026-05-16T23:08:53.464Z",
      "updatedAt": "2026-05-16T23:40:35.495Z",
      "ringCount": 5,
      "wheelFrame": "steampunk",
      "showWheelLines": true,
      "allowSound": false,
      "sizeScale": 2.2901384830105593,
      "colors": {
        "wheel": "#ffd700",
        "interface": "#ffffff",
        "text": "#ffffff",
        "pageBg": "#111111",
        "pageBgImageRef": "",
        "wheelBgImageRef": "",
        "wheelBgImage": "",
        "pageBgImage": ""
      },
      "center": {
        "background": "",
        "backgroundRef": ""
      },
      "rings": {
        "outer": {
          "names": [
            "Live underwater",
            "Fight one goose daily",
            "Be followed by clowns",
            "Always smell like onions",
            "Lose WiFi forever",
            "Only walk backwards",
            "Wear ski boots forever",
            "Never sit down again",
            "Be chased by squirrels",
            "Speak only in whispers",
            "Sweat mayonnaise",
            "Only eat cold food",
            "Have permanent jet lag",
            "Always hear elevator music",
            "Be allergic to chairs"
          ],
          "prompt": "Situation",
          "background": "",
          "backgroundRef": "",
          "rotation": 309.646572636403,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {},
          "connector": ""
        },
        "middle": {
          "names": [
            "For one week",
            "For one month",
            "For one year",
            "Forever",
            "Every weekend",
            "Only in public",
            "Only at work",
            "Only around friends",
            "During holidays",
            "Every summer",
            "Every Monday",
            "At random times",
            "While driving",
            "During dates",
            "During meals"
          ],
          "prompt": "Duration",
          "background": "",
          "backgroundRef": "",
          "rotation": 144.85869346987795,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {},
          "connector": ""
        },
        "inner": {
          "names": [
            "$1,000",
            "$10,000",
            "$1 million",
            "Free food forever",
            "A mansion",
            "Perfect health",
            "Unlimited gas",
            "A private island",
            "Your dream car",
            "Lifetime vacations",
            "Instant fame",
            "Unlimited tacos",
            "Student loans erased",
            "Retirement immediately",
            "Free flights forever"
          ],
          "prompt": "Reward",
          "background": "",
          "backgroundRef": "",
          "rotation": 198.35639341678302,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {},
          "connector": "and get"
        },
        "core": {
          "names": [
            "Your family knows",
            "It goes viral online",
            "You cannot explain it",
            "Children point at you",
            "You must livestream it",
            "Dogs hate you",
            "You smell terrible",
            "Your boss watches",
            "You hiccup constantly",
            "You cannot wear shoes",
            "You lose your phone",
            "It happens during weddings",
            "Your neighbors join in",
            "You must document it",
            "You cannot lie about it"
          ],
          "prompt": "Complication",
          "background": "",
          "backgroundRef": "",
          "rotation": 102.56384657541491,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {},
          "connector": "But"
        },
        "fifth": {
          "names": [
            "You can quit anytime but lose everything",
            "One friend must join you",
            "Your worst enemy benefits",
            "The government monitors it",
            "You become mildly famous",
            "Animals react aggressively",
            "It becomes a trend",
            "You inspire a cult",
            "You gain followers online",
            "It appears in documentaries",
            "You accidentally become an influencer",
            "People think it's performance art",
            "You must defend it publicly",
            "A celebrity copies you",
            "Nobody believes your explanation"
          ],
          "prompt": "Twist",
          "background": "",
          "backgroundRef": "",
          "rotation": 71.80362695082749,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {},
          "connector": "and"
        },
        "sixth": {
          "names": [
            "sixth 1"
          ],
          "prompt": "",
          "background": "",
          "backgroundRef": "",
          "rotation": 0,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {},
          "connector": ""
        },
        "seventh": {
          "names": [
            "seventh 1"
          ],
          "prompt": "",
          "background": "",
          "backgroundRef": "",
          "rotation": 0,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {},
          "connector": ""
        },
        "eighth": {
          "names": [
            "eighth 1"
          ],
          "prompt": "",
          "background": "",
          "backgroundRef": "",
          "rotation": 0,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {},
          "connector": ""
        },
        "ninth": {
          "names": [
            "ninth 1"
          ],
          "prompt": "",
          "background": "",
          "backgroundRef": "",
          "rotation": 0,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {},
          "connector": ""
        },
        "tenth": {
          "names": [
            "tenth 1"
          ],
          "prompt": "",
          "background": "",
          "backgroundRef": "",
          "rotation": 0,
          "limitSelectionCount": false,
          "selectionLimit": 1,
          "selectionCounts": {},
          "connector": ""
        }
      },
      "completed": [],
      "preventRepeatSelections": false,
      "hideWheelLines": false,
      "hideWheelText": false
    },
    "imageData": {}
  }
];

const grid = document.getElementById("dashboardGrid");
const empty = document.getElementById("dashboardEmpty");
const aboutButton = document.getElementById("aboutButton");
const aboutModal = document.getElementById("aboutModal");
const closeAboutButton = document.getElementById("closeAboutButton");
const customizeToggle = document.getElementById("dashboardCustomizeToggle");
const customizePanel = document.getElementById("dashboardCustomizePanel");
const interfaceColorInput = document.getElementById("dashboardInterfaceColor");
const bgImageInput = document.getElementById("dashboardBgImage");
const clearBgImageButton = document.getElementById("clearDashboardBgImage");
const resetDashboardColors = document.getElementById("resetDashboardColors");
const importWheelButton = document.getElementById("importWheelButton");
const importWheelInput = document.getElementById("importWheelInput");

function readJson(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || "null") ?? fallback; }
  catch { return fallback; }
}
function stripLargeImageData(value) {
  if (typeof value === "string" && value.startsWith("data:image/")) return "";
  if (Array.isArray(value)) return value.map(stripLargeImageData);
  if (value && typeof value === "object") {
    const next = {};
    Object.entries(value).forEach(([key, item]) => next[key] = stripLargeImageData(item));
    return next;
  }
  return value;
}
function writeJson(key, value) { localStorage.setItem(key, JSON.stringify(stripLargeImageData(value))); }
function openImageDb() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) { reject(new Error("IndexedDB unavailable")); return; }
    const request = indexedDB.open(IMAGE_DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(IMAGE_STORE)) db.createObjectStore(IMAGE_STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
async function getStoredImage(key) {
  if (!key) return "";
  const db = await openImageDb();
  return new Promise(resolve => {
    const tx = db.transaction(IMAGE_STORE, "readonly");
    const request = tx.objectStore(IMAGE_STORE).get(key);
    request.onsuccess = () => resolve(request.result || "");
    request.onerror = () => resolve("");
    tx.oncomplete = () => db.close();
  });
}
async function deleteStoredImage(key) {
  if (!key) return;
  try {
    const db = await openImageDb();
    await new Promise(resolve => {
      const tx = db.transaction(IMAGE_STORE, "readwrite");
      tx.objectStore(IMAGE_STORE).delete(key);
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = () => { db.close(); resolve(); };
    });
  } catch {}
}
async function putStoredImage(key, dataUrl) {
  const db = await openImageDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IMAGE_STORE, "readwrite");
    tx.objectStore(IMAGE_STORE).put(dataUrl, key);
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
}
function getWheels() { return readJson(WHEELS_KEY, []); }
function saveWheels(wheels) { writeJson(WHEELS_KEY, wheels); }
function getDashboardSettings() { return readJson(DASHBOARD_KEY, { interfaceColor: "#ffffff", bgImageRef: "" }); }
function saveDashboardSettings(settings) { writeJson(DASHBOARD_KEY, settings); }
async function applyDashboardSettings() {
  const settings = getDashboardSettings();
  document.documentElement.style.setProperty("--interface", settings.interfaceColor || "#ffffff");
  document.documentElement.style.setProperty("--wheel-line", settings.interfaceColor || "#ffffff");
  document.documentElement.style.setProperty("--bg", "#111111");
  const bgImage = settings.bgImageRef ? await getStoredImage(settings.bgImageRef) : "";
  document.documentElement.style.setProperty("--page-bg-image", bgImage ? `url("${bgImage}")` : "var(--dashboard-default-bg-image, none)");
  if (interfaceColorInput) interfaceColorInput.value = settings.interfaceColor || "#ffffff";
}
function makeFallbackRing(names, prompt = "") {
  return { names, prompt, connector: "", background: "", backgroundRef: "", rotation: 0, limitSelectionCount: false, selectionLimit: 1, selectionCounts: {} };
}
function wheelImageRefs(wheel) {
  const refs = [];
  ALL_RINGS.forEach(ring => { const ref = wheel?.rings?.[ring]?.backgroundRef; if (ref) refs.push(ref); });
  [wheel?.colors?.pageBgImageRef, wheel?.colors?.wheelBgImageRef, wheel?.center?.backgroundRef].forEach(ref => { if (ref) refs.push(ref); });
  return [...new Set(refs)];
}
async function wheelExportPayload(wheel) {
  const imageData = {};
  for (const ref of wheelImageRefs(wheel)) {
    const data = await getStoredImage(ref).catch(() => "");
    if (data) imageData[ref] = data;
  }
  return { type: "wonder-wheel", version: 1, exportedAt: new Date().toISOString(), wheel: stripLargeImageData(wheel), imageData };
}
function downloadJson(filename, value) {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 250);
}
function safeFilename(name) {
  return (String(name || "wonder-wheel").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "wonder-wheel") + ".json";
}
async function exportWheel(wheel) {
  const payload = await wheelExportPayload(wheel);
  downloadJson(safeFilename(wheel.name), payload);
}
function cloneImportedWheel(rawWheel) {
  const now = new Date().toISOString();
  const source = rawWheel && typeof rawWheel === "object" ? rawWheel : {};
  const wheel = typeof structuredClone === "function" ? structuredClone(source) : JSON.parse(JSON.stringify(source));
  wheel.id = "wheel-" + Date.now() + "-" + Math.random().toString(16).slice(2);
  wheel.name = String(wheel.name || "Imported Wheel").trim() || "Imported Wheel";
  wheel.createdAt = now; wheel.updatedAt = now; wheel.completed = [];
  wheel.ringCount = Math.max(1, Math.min(ALL_RINGS.length, Number(wheel.ringCount) || 3));
  wheel.sizeScale = Math.max(0.45, Math.min(3, Number(wheel.sizeScale) || 1));
  wheel.colors ||= {};
  wheel.colors.wheel ||= "#ffd700"; wheel.colors.interface ||= wheel.colors.wheel; wheel.colors.text ||= "#ffffff"; wheel.colors.pageBg ||= "#111111";
  wheel.center ||= { background: "", backgroundRef: "" };
  wheel.rings ||= {};
  ALL_RINGS.forEach(ring => {
    wheel.rings[ring] ||= makeFallbackRing([ring + " 1"]);
    if (!Array.isArray(wheel.rings[ring].names) || !wheel.rings[ring].names.length) wheel.rings[ring].names = [ring + " 1"];
    wheel.rings[ring].names = wheel.rings[ring].names.map(String).filter(Boolean).slice(0, 20);
    wheel.rings[ring].prompt = String(wheel.rings[ring].prompt || "");
    wheel.rings[ring].connector = String(wheel.rings[ring].connector || "");
    wheel.rings[ring].rotation = 0;
    wheel.rings[ring].selectionCounts = {};
  });
  return wheel;
}
async function remapImportedImages(wheel, imageData = {}) {
  const refMap = new Map();
  for (const [oldRef, dataUrl] of Object.entries(imageData || {})) {
    if (!oldRef || typeof dataUrl !== "string" || !dataUrl.startsWith("data:image/")) continue;
    const nextRef = wheel.id + ":import:" + refMap.size + ":" + Date.now();
    await putStoredImage(nextRef, dataUrl);
    refMap.set(oldRef, nextRef);
  }
  const mapRef = ref => refMap.get(ref) || ref || "";
  ALL_RINGS.forEach(ring => { wheel.rings[ring].background = ""; wheel.rings[ring].backgroundRef = mapRef(wheel.rings[ring].backgroundRef); });
  wheel.colors.pageBgImage = ""; wheel.colors.wheelBgImage = "";
  wheel.colors.pageBgImageRef = mapRef(wheel.colors.pageBgImageRef);
  wheel.colors.wheelBgImageRef = mapRef(wheel.colors.wheelBgImageRef);
  wheel.center.background = ""; wheel.center.backgroundRef = mapRef(wheel.center.backgroundRef);
}
async function copyWheel(wheel) {
  const payload = await wheelExportPayload(wheel);
  const copy = cloneImportedWheel(payload.wheel);
  copy.name = `${copy.name} Copy`;
  await remapImportedImages(copy, payload.imageData || {});
  saveWheels([...getWheels(), copy]);
  localStorage.setItem(ACTIVE_WHEEL_KEY, copy.id);
  renderDashboard();
}
function defaultWheelId(payload, index) {
  const name = payload?.wheel?.name || `default-wheel-${index + 1}`;
  const slug = safeFilename(name).replace(/\.json$/, "");
  return `default-${slug}`;
}
function seedDefaultWheel() {
  const existing = getWheels();
  const defaultIds = new Set(DEFAULT_WHEEL_PAYLOADS.map(defaultWheelId));
  const defaultNames = new Set(DEFAULT_WHEEL_PAYLOADS.map(payload => payload?.wheel?.name).filter(Boolean));
  const hadPreviousDefaults = PREVIOUS_DEFAULT_WHEEL_SEEDED_KEYS.some(key => localStorage.getItem(key));
  let next = existing.filter(wheel => {
    if (wheel?.isDefaultWheel) return false;
    if (defaultIds.has(wheel?.id)) return false;
    if (hadPreviousDefaults && LEGACY_DEFAULT_WHEEL_NAMES.includes(wheel?.name)) return false;
    return true;
  });
  if (localStorage.getItem(DEFAULT_WHEEL_SEEDED_KEY) && DEFAULT_WHEEL_PAYLOADS.every((payload, index) => existing.some(wheel => wheel.id === defaultWheelId(payload, index)))) return;
  const mainstays = DEFAULT_WHEEL_PAYLOADS.map((payload, index) => {
    const wheel = cloneImportedWheel(payload.wheel);
    wheel.id = defaultWheelId(payload, index);
    wheel.isDefaultWheel = true;
    wheel.defaultWheelName = wheel.name;
    return wheel;
  });
  next = [...mainstays, ...next.filter(wheel => !defaultNames.has(wheel?.name))];
  saveWheels(next);
  localStorage.setItem(DEFAULT_WHEEL_SEEDED_KEY, "true");
  PREVIOUS_DEFAULT_WHEEL_SEEDED_KEYS.forEach(key => localStorage.removeItem(key));
  if (!localStorage.getItem(ACTIVE_WHEEL_KEY) || !next.some(wheel => wheel.id === localStorage.getItem(ACTIVE_WHEEL_KEY))) {
    localStorage.setItem(ACTIVE_WHEEL_KEY, mainstays[0]?.id || next[0]?.id || "");
  }
}
async function importWheelFile(file) {
  if (!file) return;
  try {
    const payload = JSON.parse(await file.text());
    const rawWheel = payload?.type === "wonder-wheel" ? payload.wheel : payload;
    const wheel = cloneImportedWheel(rawWheel);
    await remapImportedImages(wheel, payload?.imageData || {});
    saveWheels([...getWheels(), wheel]);
    localStorage.setItem(ACTIVE_WHEEL_KEY, wheel.id);
    renderDashboard();
    alert(`Imported "${wheel.name}".`);
  } catch (error) {
    console.error(error);
    alert("Unable to import that wheel. Please choose a Wonder Wheel JSON file.");
  } finally {
    if (importWheelInput) importWheelInput.value = "";
  }
}
function getRingNames(wheel, ring) {
  return Array.isArray(wheel?.rings?.[ring]?.names) ? wheel.rings[ring].names.filter(Boolean) : [];
}
function getActiveRings(wheel) {
  return ALL_RINGS.slice(0, Math.max(1, Math.min(ALL_RINGS.length, Number(wheel?.ringCount) || 3)));
}
async function makeIcon(cardIcon, wheel) {
  let centerBg = wheel?.center?.background || "";
  if (!centerBg && wheel?.center?.backgroundRef) centerBg = await getStoredImage(wheel.center.backgroundRef);
  let outerBg = wheel?.rings?.outer?.background || "";
  if (!outerBg && wheel?.rings?.outer?.backgroundRef) outerBg = await getStoredImage(wheel.rings.outer.backgroundRef);
  const iconBg = centerBg || outerBg;
  if (iconBg) {
    cardIcon.style.backgroundImage = `url("${iconBg}")`;
    cardIcon.style.backgroundSize = "cover";
    cardIcon.style.backgroundPosition = "center";
  }
  cardIcon.style.setProperty("--wheel-line", wheel.colors?.wheel || "#ffd700");
}
function renderDashboard() {
  const wheels = getWheels();
  grid.innerHTML = "";
  empty.classList.toggle("hidden", wheels.length > 0);
  wheels.forEach(wheel => {
    const card = document.createElement("article");
    card.className = "wheel-card";
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="wheel-card-icon" aria-hidden="true"></div>
      <div>
        <h3>${escapeHtml(wheel.name || "Untitled Wheel")}</h3>
        <p>${getActiveRings(wheel).map(ring => `${getRingNames(wheel, ring).length} ${ring}`).join(" · ")}</p>
        <div class="card-actions">
          <button type="button" data-action="open">Open</button>
          <button type="button" data-action="edit">Edit</button>
          <button type="button" data-action="copy">Copy</button>
          <button type="button" data-action="export">Export</button>
          <button type="button" data-action="delete">Delete</button>
        </div>
      </div>`;
    card.querySelector("p").textContent = getActiveRings(wheel).map(ring => `${getRingNames(wheel, ring).length} ${RING_LABELS[ring] || ring}`).join(" - ");
    makeIcon(card.querySelector(".wheel-card-icon"), wheel);
    card.addEventListener("click", event => {
      const action = event.target?.dataset?.action;
      if (action === "delete") {
        event.stopPropagation();
        if (confirm(`Delete "${wheel.name || "this wheel"}"?`)) {
          ALL_RINGS.forEach(r => deleteStoredImage(wheel?.rings?.[r]?.backgroundRef));
          deleteStoredImage(wheel?.colors?.pageBgImageRef);
          deleteStoredImage(wheel?.colors?.wheelBgImageRef);
          deleteStoredImage(wheel?.center?.backgroundRef);
          saveWheels(getWheels().filter(item => item.id !== wheel.id));
          renderDashboard();
        }
        return;
      }
      if (action === "edit") {
        event.stopPropagation();
        localStorage.setItem(ACTIVE_WHEEL_KEY, wheel.id);
        window.location.href = `setup.html?mode=edit&id=${encodeURIComponent(wheel.id)}`;
        return;
      }
      if (action === "export") {
        event.stopPropagation();
        exportWheel(wheel);
        return;
      }
      if (action === "copy") {
        event.stopPropagation();
        copyWheel(wheel);
        return;
      }
      localStorage.setItem(ACTIVE_WHEEL_KEY, wheel.id);
      window.location.href = "index.html";
    });
    card.addEventListener("keydown", event => {
      if (event.key === "Enter") card.click();
    });
    grid.appendChild(card);
  });
}
function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[char]));
}
function readFileAsDataUrl(file, callback) {
  if (!file || !file.type.startsWith("image/")) return;
  const reader = new FileReader();
  reader.onload = () => {
    const raw = String(reader.result || "");
    const img = new Image();
    img.onload = () => {
      const maxSize = 1400;
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      const ctx = canvas.getContext("2d");
      if (!ctx) { callback(raw); return; }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      callback(canvas.toDataURL("image/jpeg", 0.82));
    };
    img.onerror = () => callback(raw);
    img.src = raw;
  };
  reader.readAsDataURL(file);
}
async function updateDashboardSetting(patch) {
  const next = { ...getDashboardSettings(), ...patch };
  saveDashboardSettings(next);
  await applyDashboardSettings();
}
aboutButton?.addEventListener("click", () => aboutModal.classList.remove("hidden"));
closeAboutButton?.addEventListener("click", () => aboutModal.classList.add("hidden"));
aboutModal?.addEventListener("click", event => { if (event.target === aboutModal) aboutModal.classList.add("hidden"); });
customizeToggle?.addEventListener("click", () => customizePanel.classList.toggle("hidden"));
interfaceColorInput?.addEventListener("input", () => updateDashboardSetting({ interfaceColor: interfaceColorInput.value }));
bgImageInput?.addEventListener("change", () => {
  const file = bgImageInput.files && bgImageInput.files[0];
  readFileAsDataUrl(file, async dataUrl => {
    const key = "dashboard:background";
    await putStoredImage(key, dataUrl);
    await updateDashboardSetting({ bgImageRef: key });
    bgImageInput.value = "";
  });
});
clearBgImageButton?.addEventListener("click", async () => {
  const settings = getDashboardSettings();
  await deleteStoredImage(settings.bgImageRef);
  await updateDashboardSetting({ bgImageRef: "" });
});
importWheelButton?.addEventListener("click", () => importWheelInput?.click());
importWheelInput?.addEventListener("change", () => importWheelFile(importWheelInput.files && importWheelInput.files[0]));
resetDashboardColors?.addEventListener("click", async () => {
  const settings = getDashboardSettings();
  await deleteStoredImage(settings.bgImageRef);
  saveDashboardSettings({ interfaceColor: "#ffffff", bgImageRef: "" });
  await applyDashboardSettings();
});
seedDefaultWheel();
applyDashboardSettings();
renderDashboard();
