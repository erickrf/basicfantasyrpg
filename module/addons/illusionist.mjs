import { BASICFANTASYRPG } from "../helpers/config.mjs";

/**
 * Illusionist Class Add-on for Basic Fantasy RPG
 */

export const IllusionistAddon = {
  id: 'illusionist',
  name: 'Illusionist Class',
  description: 'Adds the Illusionist class from BFRPG supplements',
  settingName: 'Enable Illusionist',

  classes: {
    illusionist: "BASICFANTASYRPG.ClassIllusionist"
  },

  spellcasterClasses: {
    illusionist: "BASICFANTASYRPG.ClassIllusionist"
  },

  localization: {
    en: {
      "BASICFANTASYRPG.ClassIllusionist": "Illusionist"
    }
  },

  xpProgression: {
    illusionist: BASICFANTASYRPG.xpProgression.magicUser
  },

  attackBonusProgression: {
    illusionist: BASICFANTASYRPG.attackBonusProgression.magicUser
  },

  savesProgression: {
    illusionist: BASICFANTASYRPG.savesProgression.magicUser
  }
};
