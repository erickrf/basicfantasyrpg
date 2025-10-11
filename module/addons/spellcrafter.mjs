import { BASICFANTASYRPG } from "../helpers/config.mjs";

/**
 * Spellcrafter Class Add-on for Basic Fantasy RPG
 */

export const SpellcrafterAddon = {
  id: 'spellcrafter',
  name: 'Spellcrafter Class',
  description: 'Adds the Spellcrafter class from BFRPG supplements',
  settingName: 'Enable Spellcrafter',

  classes: {
    spellcrafter: "BASICFANTASYRPG.ClassSpellcrafter"
  },

  spellcasterClasses: {
    spellcrafter: "BASICFANTASYRPG.ClassSpellcrafter"
  },

  localization: {
    en: {
      "BASICFANTASYRPG.ClassSpellcrafter": "Spellcrafter"
    }
  },

  xpProgression: {
    spellcrafter: BASICFANTASYRPG.xpProgression.magicUser
  },

  attackBonusProgression: {
    spellcrafter: BASICFANTASYRPG.attackBonusProgression.magicUser
  },

  savesProgression: {
    spellcrafter: BASICFANTASYRPG.savesProgression.magicUser
  }
};
