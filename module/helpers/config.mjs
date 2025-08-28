export const BASICFANTASYRPG = {};

/**
 * Add-on registry for dynamic content
 * @type {Object}
 */
BASICFANTASYRPG.addons = {
  classes: new Map(),
  xpProgression: new Map(),
  attackBonusProgression: new Map(),
  savesProgression: new Map(),
  spellcasterClasses: new Map(),
  localization: new Map(), // Store add-on localization keys
  meta: new Map() // Store add-on metadata
};

/**
 * Register an add-on component
 * @param {string} type - The type of content (classes, xpProgression, etc.)
 * @param {string} key - The unique key for this content
 * @param {*} data - The data to register
 * @param {Object} meta - Metadata about the add-on this content belongs to
 */
BASICFANTASYRPG.registerAddon = function(type, key, data, meta = {}) {
  if (!this.addons[type]) {
    console.warn(`Unknown addon type: ${type}`);
    return;
  }
  this.addons[type].set(key, data);
  if (meta.addonId) {
    this.addons.meta.set(key, meta);
  }
};

/**
 * Get active content combining core and enabled add-ons
 * @param {string} type - The type of content to retrieve
 * @returns {Object} Combined core and add-on content
 */
BASICFANTASYRPG.getActiveContent = function(type) {
  const coreProperty = type === 'characterClasses' ? 'characterClasses' : type;
  const core = this[coreProperty] || {};
  const result = { ...core };
  
  // Get enabled add-ons from settings
  const enabledAddons = game?.settings?.get('basicfantasyrpg', 'enabledSupplements') || [];
  
  for (let [key, data] of this.addons[type]) {
    const meta = this.addons.meta.get(key);
    if (!meta || enabledAddons.includes(meta.addonId)) {
      result[key] = data;
    }
  }
  
  return result;
};

/**
 * Get metadata for registered add-ons
 * @returns {Object} Map of add-on IDs to their metadata
 */
BASICFANTASYRPG.getRegisteredAddons = function() {
  const addons = new Map();
  for (let [key, meta] of this.addons.meta) {
    if (meta.addonId && !addons.has(meta.addonId)) {
      addons.set(meta.addonId, {
        id: meta.addonId,
        name: meta.name || meta.addonId,
        description: meta.description || '',
        version: meta.version || '1.0.0'
      });
    }
  }

  console.log("Hey guys, there are these addons:", addons)
  return addons;
};

/**
 * Register localization keys for an add-on
 * @param {string} addonId - The add-on ID
 * @param {Object} translations - Object containing translation keys and values
 * @param {string} language - Language code (defaults to 'en')
 */
BASICFANTASYRPG.registerLocalization = function(addonId, translations, language = 'en') {
  if (!this.addons.localization.has(language)) {
    this.addons.localization.set(language, new Map());
  }
  
  const langMap = this.addons.localization.get(language);
  langMap.set(addonId, translations);
};

/**
 * Apply active localization keys to the game's i18n system
 */
BASICFANTASYRPG.applyActiveLocalization = function() {
  if (!game?.i18n) return;
  
  const enabledAddons = game?.settings?.get('basicfantasyrpg', 'enabledSupplements') || [];
  const currentLang = game.i18n.lang || 'en';
  
  // Get localization for current language
  const langMap = this.addons.localization.get(currentLang);
  if (!langMap) return;
  
  // Apply translations for enabled add-ons
  for (let addonId of enabledAddons) {
    const translations = langMap.get(addonId);
    if (translations) {
      // Merge translations into the game's i18n translations
      Object.assign(game.i18n.translations, translations);
    }
  }
};

/**
 * Register a complete add-on with all its components
 * @param {Object} addon - The add-on definition object
 */
BASICFANTASYRPG.registerCompleteAddon = function(addon) {
  const meta = {
    addonId: addon.id,
    name: addon.name,
    description: addon.description,
    version: addon.version
  };
  
  // Register all types of content that the add-on provides
  const contentTypes = ['classes', 'spellcasterClasses', 'xpProgression', 'attackBonusProgression', 'savesProgression'];
  
  for (let contentType of contentTypes) {
    if (addon[contentType]) {
      for (let [key, value] of Object.entries(addon[contentType])) {
        this.registerAddon(contentType, key, value, meta);
      }
    }
  }
  
  // Register localization
  if (addon.localization) {
    for (let [lang, translations] of Object.entries(addon.localization)) {
      this.registerLocalization(addon.id, translations, lang);
    }
  }
  
  console.log(`Registered ${addon.name} add-on (${addon.id})`);
};

/**
 * The set of Ability Scores used within the system.
 * @type {Object}
 */
BASICFANTASYRPG.abilities = {
  str: "BASICFANTASYRPG.AbilityStr",
  dex: "BASICFANTASYRPG.AbilityDex",
  con: "BASICFANTASYRPG.AbilityCon",
  int: "BASICFANTASYRPG.AbilityInt",
  wis: "BASICFANTASYRPG.AbilityWis",
  cha: "BASICFANTASYRPG.AbilityCha",
};

BASICFANTASYRPG.abilityAbbreviations = {
  str: "BASICFANTASYRPG.AbilityStrAbbr",
  dex: "BASICFANTASYRPG.AbilityDexAbbr",
  con: "BASICFANTASYRPG.AbilityConAbbr",
  int: "BASICFANTASYRPG.AbilityIntAbbr",
  wis: "BASICFANTASYRPG.AbilityWisAbbr",
  cha: "BASICFANTASYRPG.AbilityChaAbbr",
};

/**
 * The set of Saving Throws used within the system.
 * @type {Object}
 */
BASICFANTASYRPG.saves = {
  death: "BASICFANTASYRPG.SaveDeath",
  wands: "BASICFANTASYRPG.SaveWands",
  paralysis: "BASICFANTASYRPG.SaveParalysis",
  breath: "BASICFANTASYRPG.SaveBreath",
  spells: "BASICFANTASYRPG.SaveSpells",
};

/**
 * Money used within the system.
 * @type {Object}
 */
BASICFANTASYRPG.money = {
  pp: "BASICFANTASYRPG.Platinum",
  gp: "BASICFANTASYRPG.Gold",
  ep: "BASICFANTASYRPG.Electrum",
  sp: "BASICFANTASYRPG.Silver",
  cp: "BASICFANTASYRPG.Copper",
};

/**
 * Abbreviated money names used within the system.
 * @type {Object}
 */
BASICFANTASYRPG.moneyAbbr = {
  pp: "BASICFANTASYRPG.PlatinumAbbr",
  gp: "BASICFANTASYRPG.GoldAbbr",
  ep: "BASICFANTASYRPG.ElectrumAbbr",
  sp: "BASICFANTASYRPG.SilverAbbr",
  cp: "BASICFANTASYRPG.CopperAbbr",
};

/**
 * Character classes available in Basic Fantasy RPG
 * @type {Object}
 */
BASICFANTASYRPG.characterClasses = {
  "": "",
  fighter: "BASICFANTASYRPG.ClassFighter",
  cleric: "BASICFANTASYRPG.ClassCleric",
  magicUser: "BASICFANTASYRPG.ClassMagicUser",
  thief: "BASICFANTASYRPG.ClassThief",
};

/**
 * Spellcaster classes available in Basic Fantasy RPG
 * @type {Object}
 */
BASICFANTASYRPG.spellcasterClasses = {
  "": "",
  cleric: BASICFANTASYRPG.characterClasses.cleric,
  magicUser: BASICFANTASYRPG.characterClasses.magicUser,
};

/**
 * Weapon sizes available in Basic Fantasy RPG
 * @type {Object}
 */
BASICFANTASYRPG.weaponSizes = {
  S: "BASICFANTASYRPG.SizeSmall",
  M: "BASICFANTASYRPG.SizeMedium",
  L: "BASICFANTASYRPG.SizeLarge",
};

/**
 * Floor materials available for stronghold construction
 * @type {Object}
 */
BASICFANTASYRPG.floorMaterials = {
  floor: "ITEM.TypeFloor",
  roofThatch: "BASICFANTASYRPG.RoofThatched",
  roofWood: "BASICFANTASYRPG.RoofWood",
  roofSlate: "BASICFANTASYRPG.RoofSlate",
};

/**
 * Wall materials available for stronghold construction
 * @type {Object}
 */
BASICFANTASYRPG.wallMaterials = {
  wood: "BASICFANTASYRPG.MaterialWood",
  brick: "BASICFANTASYRPG.MaterialBrick",
  stoneSoft: "BASICFANTASYRPG.MaterialStoneSoft",
  stoneHard: "BASICFANTASYRPG.MaterialStoneHard",
};

/**
 * Experience point progression tables for each class
 * Key is class, value is array where index represents level (0-based, so level 1 = index 0)
 * @type {Object}
 */
BASICFANTASYRPG.xpProgression = {
  fighter: [
    0, // Level 1
    2000, // Level 2
    4000, // Level 3
    8000, // Level 4
    16000, // Level 5
    32000, // Level 6
    64000, // Level 7
    120000, // Level 8
    240000, // Level 9
    360000, // Level 10
    480000, // Level 11
    600000, // Level 12
    720000, // Level 13
    840000, // Level 14
    960000, // Level 15
    1080000, // Level 16
    1200000, // Level 17
    1320000, // Level 18
    1440000, // Level 19
    1560000, // Level 20
  ],
  cleric: [
    0, // Level 1
    1500, // Level 2
    3000, // Level 3
    6000, // Level 4
    12000, // Level 5
    24000, // Level 6
    48000, // Level 7
    90000, // Level 8
    180000, // Level 9
    270000, // Level 10
    360000, // Level 11
    450000, // Level 12
    540000, // Level 13
    630000, // Level 14
    720000, // Level 15
    810000, // Level 16
    900000, // Level 17
    990000, // Level 18
    1080000, // Level 19
    1170000, // Level 20
  ],
  magicUser: [
    0, // Level 1
    2500, // Level 2
    5000, // Level 3
    10000, // Level 4
    20000, // Level 5
    40000, // Level 6
    80000, // Level 7
    150000, // Level 8
    300000, // Level 9
    450000, // Level 10
    600000, // Level 11
    750000, // Level 12
    900000, // Level 13
    1050000, // Level 14
    1200000, // Level 15
    1350000, // Level 16
    1500000, // Level 17
    1650000, // Level 18
    1800000, // Level 19
    1950000, // Level 20
  ],
  thief: [
    0, // Level 1
    1250, // Level 2
    2500, // Level 3
    5000, // Level 4
    10000, // Level 5
    20000, // Level 6
    40000, // Level 7
    75000, // Level 8
    150000, // Level 9
    225000, // Level 10
    300000, // Level 11
    375000, // Level 12
    450000, // Level 13
    525000, // Level 14
    600000, // Level 15
    675000, // Level 16
    750000, // Level 17
    825000, // Level 18
    900000, // Level 19
    975000, // Level 20
  ],
};

/**
 * Attack bonus progression tables for each class
 * Key is class, value is array indexed by level (0-based, so level 1 = index 0)
 * @type {Object}
 */
BASICFANTASYRPG.attackBonusProgression = {
  fighter: [1, 2, 2, 3, 4, 4, 5, 6, 6, 6, 7, 7, 8, 8, 8, 9, 9, 10, 10, 10],
  cleric: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8],
  magicUser: [1, 1, 1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7],
  thief: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8],
};

/**
 * Saving throw progression tables for each class
 * Key is class, value is object with save types containing arrays indexed by level (0-based)
 * @type {Object}
 */
BASICFANTASYRPG.savesProgression = {
  fighter: {
    death: [12, 11, 11, 11, 11, 10, 10, 9, 9, 9, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6],
    wands: [13, 12, 12, 11, 11, 11, 11, 10, 10, 9, 9, 9, 9, 8, 8, 7, 7, 7, 7, 6],
    paralysis: [14, 14, 14, 13, 13, 12, 12, 12, 12, 11, 11, 10, 10, 10, 10, 9, 9, 8, 8, 8],
    breath: [15, 15, 15, 14, 14, 14, 14, 13, 13, 12, 12, 12, 12, 11, 11, 10, 10, 10, 10, 9],
    spells: [17, 16, 16, 15, 15, 15, 15, 14, 14, 13, 13, 13, 13, 12, 12, 11, 11, 11, 11, 10],
  },
  cleric: {
    death: [11, 10, 10, 9, 9, 9, 9, 8, 8, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 5],
    wands: [12, 11, 11, 10, 10, 10, 10, 9, 9, 9, 9, 8, 8, 8, 8, 7, 7, 7, 7, 6],
    paralysis: [14, 13, 13, 13, 13, 12, 12, 12, 12, 11, 11, 11, 11, 10, 10, 10, 10, 9, 9, 9],
    breath: [16, 15, 15, 15, 15, 14, 14, 14, 14, 13, 13, 13, 13, 12, 12, 12, 12, 11, 11, 11],
    spells: [15, 14, 14, 14, 14, 13, 13, 13, 13, 12, 12, 12, 12, 11, 11, 11, 11, 10, 10, 10],
  },
  magicUser: {
    death: [13, 13, 13, 12, 12, 12, 12, 11, 11, 11, 11, 10, 10, 10, 10, 9, 9, 9, 9, 8],
    wands: [14, 14, 14, 13, 13, 12, 12, 11, 11, 10, 10, 10, 10, 9, 9, 8, 8, 7, 7, 6],
    paralysis: [13, 13, 13, 12, 12, 11, 11, 10, 10, 9, 9, 9, 9, 8, 8, 7, 7, 6, 6, 5],
    breath: [16, 15, 15, 15, 15, 14, 14, 14, 14, 13, 13, 13, 13, 12, 12, 12, 12, 11, 11, 11],
    spells: [15, 14, 14, 13, 13, 13, 13, 12, 12, 11, 11, 11, 11, 10, 10, 9, 9, 9, 9, 8],
  },
  thief: {
    death: [13, 12, 12, 11, 11, 11, 11, 10, 10, 9, 9, 9, 9, 8, 8, 7, 7, 7, 7, 6],
    wands: [14, 14, 14, 13, 13, 13, 13, 12, 12, 12, 12, 10, 10, 10, 10, 9, 9, 9, 9, 8],
    paralysis: [13, 12, 12, 12, 12, 11, 11, 11, 11, 10, 10, 10, 10, 9, 9, 9, 9, 8, 8, 8],
    breath: [16, 15, 15, 14, 14, 13, 13, 12, 12, 11, 11, 10, 10, 9, 9, 8, 8, 7, 7, 6],
    spells: [15, 14, 14, 13, 13, 13, 13, 12, 12, 11, 11, 11, 11, 10, 10, 9, 9, 9, 9, 8],
  },
};
