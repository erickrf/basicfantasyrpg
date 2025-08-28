import { getRegisteredAddons, applyEnabledAddons } from "./addons/addon-registry.mjs";

/**
 * Settings to apply to the module, including common house rules and supplements.
 */

export function registerSystemSettings() {
  const addons = getRegisteredAddons();

  // Register individual checkbox settings for each addon
  addons.forEach((addon) => {
    game.settings.register("basicfantasyrpg", `addon-${addon.id}`, {
      name: addon.settingName,
      hint: addon.description || `Enable ${addon.name}`,
      scope: "world",
      config: true,
      type: Boolean,
      default: false,
      requiresReload: true,
    });
  });

  // Apply enabled addons to game configuration
  applyEnabledAddons();
}
