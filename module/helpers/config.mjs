export const BASICFANTASYRPG = {};

/**
 * The set of Ability Scores used within the sytem.
 * @type {Object}
 */
 BASICFANTASYRPG.abilities = {
  'str': 'BASICFANTASYRPG.AbilityStr',
  'dex': 'BASICFANTASYRPG.AbilityDex',
  'con': 'BASICFANTASYRPG.AbilityCon',
  'int': 'BASICFANTASYRPG.AbilityInt',
  'wis': 'BASICFANTASYRPG.AbilityWis',
  'cha': 'BASICFANTASYRPG.AbilityCha'
};

BASICFANTASYRPG.abilityAbbreviations = {
  'str': 'BASICFANTASYRPG.AbilityStrAbbr',
  'dex': 'BASICFANTASYRPG.AbilityDexAbbr',
  'con': 'BASICFANTASYRPG.AbilityConAbbr',
  'int': 'BASICFANTASYRPG.AbilityIntAbbr',
  'wis': 'BASICFANTASYRPG.AbilityWisAbbr',
  'cha': 'BASICFANTASYRPG.AbilityChaAbbr'
};

/**
 * The set of Saving Throws used within the sytem.
 * @type {Object}
 */
BASICFANTASYRPG.saves = {
  'death': 'BASICFANTASYRPG.SaveDeath',
  'wands': 'BASICFANTASYRPG.SaveWands',
  'paralysis': 'BASICFANTASYRPG.SaveParalysis',
  'breath': 'BASICFANTASYRPG.SaveBreath',
  'spells': 'BASICFANTASYRPG.SaveSpells'
};

/**
 * Money used within the sytem.
 * @type {Object}
 */
BASICFANTASYRPG.money = {
  'pp': 'BASICFANTASYRPG.Platinum',
  'gp': 'BASICFANTASYRPG.Gold',
  'ep': 'BASICFANTASYRPG.Electrum',
  'sp': 'BASICFANTASYRPG.Silver',
  'cp': 'BASICFANTASYRPG.Copper'
};

/**
 * Character classes available in Basic Fantasy RPG
 * @type {Object}
 */
BASICFANTASYRPG.characterClasses = {
  '': '',
  'fighter': 'BASICFANTASYRPG.ClassFighter',
  'cleric': 'BASICFANTASYRPG.ClassCleric', 
  'magicUser': 'BASICFANTASYRPG.ClassMagicUser',
  'thief': 'BASICFANTASYRPG.ClassThief'
};

/**
 * Experience point progression tables for each class
 * Key is class, value is array where index represents level (0-based, so level 1 = index 0)
 * @type {Object}
 */
BASICFANTASYRPG.xpProgression = {
  'fighter': [
    0,      // Level 1
    2000,   // Level 2
    4000,   // Level 3
    8000,   // Level 4
    16000,  // Level 5
    32000,  // Level 6
    64000,  // Level 7
    125000, // Level 8
    250000, // Level 9
    375000  // Level 10
  ],
  'cleric': [
    0,      // Level 1
    1500,   // Level 2
    3000,   // Level 3
    6000,   // Level 4
    12000,  // Level 5
    25000,  // Level 6
    50000,  // Level 7
    100000, // Level 8
    200000, // Level 9
    300000  // Level 10
  ],
  'magicUser': [
    0,      // Level 1
    2500,   // Level 2
    5000,   // Level 3
    10000,  // Level 4
    20000,  // Level 5
    40000,  // Level 6
    80000,  // Level 7
    150000, // Level 8
    300000, // Level 9
    450000  // Level 10
  ],
  'thief': [
    0,      // Level 1
    1200,   // Level 2
    2400,   // Level 3
    4800,   // Level 4
    9600,   // Level 5
    20000,  // Level 6
    40000,  // Level 7
    80000,  // Level 8
    160000, // Level 9
    240000  // Level 10
  ]
};

/**
 * Attack bonus progression tables for each class
 * Key is class, value is array indexed by level (0-based, so level 1 = index 0)
 * @type {Object}
 */
BASICFANTASYRPG.attackBonusProgression = {
  'fighter': [1, 1, 2, 2, 3, 3, 4, 4, 5, 5],        // Improves every 2 levels
  'cleric': [1, 1, 1, 2, 2, 2, 3, 3, 3, 4],         // Improves every 3 levels  
  'magicUser': [1, 1, 1, 1, 1, 2, 2, 2, 2, 2],      // Improves every 5 levels
  'thief': [1, 1, 2, 2, 2, 3, 3, 3, 4, 4]           // Improves every 2-3 levels
};

/**
 * Saving throw progression tables for each class
 * Key is class, value is object with save types containing arrays indexed by level (0-based)
 * @type {Object}
 */
BASICFANTASYRPG.savesProgression = {
  'fighter': {
    death: [12, 11, 11, 10, 10, 9, 9, 8, 8, 7],      // Death Ray or Poison
    wands: [13, 12, 12, 11, 11, 10, 10, 9, 9, 8],    // Magic Wands
    paralysis: [14, 13, 13, 12, 12, 11, 11, 10, 10, 9], // Paralysis or Petrify
    breath: [15, 14, 14, 13, 13, 12, 12, 11, 11, 10], // Dragon Breath
    spells: [17, 16, 16, 15, 15, 14, 14, 13, 13, 12]  // Rods, Staves, and Spells
  },
  'cleric': {
    death: [11, 10, 10, 9, 9, 8, 8, 7, 7, 6],
    wands: [12, 11, 11, 10, 10, 9, 9, 8, 8, 7],
    paralysis: [14, 13, 13, 12, 12, 11, 11, 10, 10, 9],
    breath: [16, 15, 15, 14, 14, 13, 13, 12, 12, 11],
    spells: [15, 14, 14, 13, 13, 12, 12, 11, 11, 10]
  },
  'magicUser': {
    death: [13, 13, 12, 12, 11, 11, 10, 10, 9, 9],
    wands: [14, 14, 13, 13, 12, 12, 11, 11, 10, 10],
    paralysis: [13, 13, 12, 12, 11, 11, 10, 10, 9, 9],
    breath: [16, 16, 15, 15, 14, 14, 13, 13, 12, 12],
    spells: [15, 15, 14, 14, 13, 13, 12, 12, 11, 11]
  },
  'thief': {
    death: [13, 12, 12, 11, 11, 10, 10, 9, 9, 8],
    wands: [14, 13, 13, 12, 12, 11, 11, 10, 10, 9],
    paralysis: [12, 11, 11, 10, 10, 9, 9, 8, 8, 7],
    breath: [16, 15, 15, 14, 14, 13, 13, 12, 12, 11],
    spells: [15, 14, 14, 13, 13, 12, 12, 11, 11, 10]
  }
};
