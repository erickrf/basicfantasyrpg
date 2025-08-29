import { BASICFANTASYRPG } from "../helpers/config.mjs";

/**
 * Barbarian Class Add-on for Basic Fantasy RPG
 */

export const BarbarianAddon = {
  id: 'barbarian',
  name: 'Barbarian Class',
  description: 'Adds the Barbarian class from BFRPG supplements',
  settingName: 'Enable Barbarian',

  classes: {
    barbarian: "BASICFANTASYRPG.ClassBarbarian"
  },

  localization: {
    en: {
      "BASICFANTASYRPG.ClassBarbarian": "Barbarian"
    }
  },

  xpProgression: {
    // it looks weird at first but it's the same as magic-user
    barbarian: BASICFANTASYRPG.xpProgression.magicUser
  },

  attackBonusProgression: {
    barbarian: BASICFANTASYRPG.attackBonusProgression.fighter
  },

  savesProgression: {
    barbarian: BASICFANTASYRPG.savesProgression.fighter
  }
};
