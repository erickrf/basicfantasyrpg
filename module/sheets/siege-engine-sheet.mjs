import { BaseActorSheet } from './base-actor-sheet.mjs';

/**
 * Siege Engine Sheet for Basic Fantasy RPG
 * Extends BaseActorSheet with siege engine-specific functionality
 * @extends {BaseActorSheet}
 */
export class SiegeEngineSheet extends BaseActorSheet {

  static DEFAULT_OPTIONS = {
    ...BaseActorSheet.DEFAULT_OPTIONS,
    classes: [...BaseActorSheet.DEFAULT_OPTIONS.classes, "siege-engine"],
    window: {
      ...BaseActorSheet.DEFAULT_OPTIONS.window,
      title: "Siege Engine",
    },
  };

  // Siege engines use a single-page layout (no tabs)
  static PARTS = {
    main: {
      template: "systems/basicfantasyrpg/templates/actor/siege-engine.hbs"
    },
  };

  /** @override */
  _onRender(context, options) {
    super._onRender(context, options);
  }

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    return context;
  }
}