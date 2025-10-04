
import { NecromancerAddon } from './necromancer.mjs';
import { BarbarianAddon } from './barbarian.mjs';

/**
 * Array of available addons to be chosen in the game settings.
 */
const registeredAddons = [];

/**
 * Register an addon as available to the system
 * @param {Object} addon - The addon module to register
 */
export function registerAddon(addon) {
  if (!addon.id || !addon.name) {
    console.error('Addon missing required id or name', addon);
    return;
  }
  
  if (registeredAddons.find(a => a.id === addon.id)) {
    console.warn(`Addon with id '${addon.id}' is already registered`);
    return;
  }
  
  registeredAddons.push(addon);
}

/**
 * Get all registered addons
 * @returns {Array} Array of addon objects
 */
export function getRegisteredAddons() {
  return [...registeredAddons];
}


/**
 * Get enabled addons based on individual game settings
 * @returns {Array} Array of enabled addon objects
 */
export function getEnabledAddons() {
  return registeredAddons.filter(addon => {
    return game.settings.get('basicfantasyrpg', `addon-${addon.id}`) === true;
  });
}

/**
 * Apply enabled addons to the game configuration.
 *
 * This function essentially patches CONFIG.BASICFANTASYRPG
 */
export function applyEnabledAddons() {
  const enabledAddons = getEnabledAddons();

  enabledAddons.forEach(addon => {
    // Merge classes
    if (addon.classes) {
      CONFIG.BASICFANTASYRPG.characterClasses = foundry.utils.mergeObject(
        CONFIG.BASICFANTASYRPG.characterClasses || {},
        addon.classes
      );
    }
    
    // Merge spellcaster classes
    if (addon.spellcasterClasses) {
      CONFIG.BASICFANTASYRPG.spellcasterClasses = foundry.utils.mergeObject(
        CONFIG.BASICFANTASYRPG.spellcasterClasses || {}, 
        addon.spellcasterClasses
      );
    }
    
    // Merge XP progression
    if (addon.xpProgression) {
      CONFIG.BASICFANTASYRPG.xpProgression = foundry.utils.mergeObject(
        CONFIG.BASICFANTASYRPG.xpProgression || {}, 
        addon.xpProgression
      );
    }
    
    // Merge attack bonus progression
    if (addon.attackBonusProgression) {
      CONFIG.BASICFANTASYRPG.attackBonusProgression = foundry.utils.mergeObject(
        CONFIG.BASICFANTASYRPG.attackBonusProgression || {}, 
        addon.attackBonusProgression
      );
    }
    
    // Merge saves progression
    if (addon.savesProgression) {
      CONFIG.BASICFANTASYRPG.savesProgression = foundry.utils.mergeObject(
        CONFIG.BASICFANTASYRPG.savesProgression || {}, 
        addon.savesProgression
      );
    }

    
  });
}

/**
 * Add i18n strings for the enabled addons
 */
export function applyI18n() {
  const enabledAddons = getEnabledAddons();

  enabledAddons.forEach(addon => {
    if (addon.localization && addon.localization[game.i18n.lang]) {
      const strings = addon.localization[game.i18n.lang];

      Object.entries(strings).forEach(([key, value]) => {
        game.i18n.translations[key] = value;
      });
    }
  });
}

/**
 * Initialize the addon system - register all available addons
 */
export function initializeAddons() {
  // Register all available addons
  for (const addon of [NecromancerAddon, BarbarianAddon]) {
    registerAddon(addon);
  }
}

// Hook into i18nInit to apply addons after i18n system is ready
Hooks.once('i18nInit', () => {
  applyEnabledAddons();
  applyI18n();
});

initializeAddons();