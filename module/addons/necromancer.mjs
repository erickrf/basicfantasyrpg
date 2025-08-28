import { BASICFANTASYRPG } from "../helpers/config.mjs";

/**
 * Necromancer Class Add-on for Basic Fantasy RPG
 * Adds the Necromancer class from BFRPG supplements
 */

export const NecromancerAddon = {
  id: 'necromancer',
  name: 'Necromancer Class',
  description: 'Adds the Necromancer class from BFRPG supplements',

  classes: {
    necromancer: "BASICFANTASYRPG.ClassNecromancer"
  },
  
  spellcasterClasses: {
    necromancer: "BASICFANTASYRPG.ClassNecromancer"
  },
  
localization: {
    en: {
      "BASICFANTASYRPG.ClassNecromancer": "Necromancer"
    }
  },
  
  xpProgression: {
    necromancer: BASICFANTASYRPG.xpProgression.magicUser
  },
  
  attackBonusProgression: {
    necromancer: BASICFANTASYRPG.attackBonusProgression.magicUser
  },
  
  savesProgression: {
    necromancer: BASICFANTASYRPG.savesProgression.magicUser
  }
};
