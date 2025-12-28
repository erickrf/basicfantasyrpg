export const BASICFANTASYRPG = {};

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
 * Character races available in Basic Fantasy RPG
 * @type {Object}
 */
BASICFANTASYRPG.characterRaces = {
  "": "",
  human: "BASICFANTASYRPG.RaceHuman",
  dwarf: "BASICFANTASYRPG.RaceDwarf",
  elf: "BASICFANTASYRPG.RaceElf",
  halfling: "BASICFANTASYRPG.RaceHalfling",
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
 * Armor types (including shield)
 */
BASICFANTASYRPG.ArmorTypes = {
  leather: "BASICFANTASYRPG.ArmorLeather",
  metal: "BASICFANTASYRPG.ArmorMetal",
  shield: "BASICFANTASYRPG.ArmorShield",
  clothing: "BASICFANTASYRPG.ArmorClothing",
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
 * "Normal man" saves; used for classless NPCs and monsters with less than 1d8 HD.
 * @type {{}}
 */
BASICFANTASYRPG.savesNormalMan = {
  death: 13,
  wands: 14,
  paralysis: 15,
  breath: 16,
  spells: 18
}

/**
 * Saving throw progression tables for each class
 * Key is class, value is object with save types containing arrays indexed by level
 * (level 1 pointing to index 0)
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
