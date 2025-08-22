import { BaseActorSheet } from './base-actor-sheet.mjs';

/**
 * Monster Sheet for Basic Fantasy RPG
 * Extends BaseActorSheet with monster-specific functionality
 * @extends {BaseActorSheet}
 */
export class MonsterSheet extends BaseActorSheet {

  static DEFAULT_OPTIONS = {
    ...BaseActorSheet.DEFAULT_OPTIONS,
    classes: [...BaseActorSheet.DEFAULT_OPTIONS.classes, "monster"],
    window: {
      ...BaseActorSheet.DEFAULT_OPTIONS.window,
      title: "Character",
    },
  };

  static TABS = {
    primary: {
      tabs: [{ id: "combat" }, { id: "description"}],
      labelPrefix: "BASICFANTASYRPG.Tab",
      initial: "combat",
    },
  };

  static PARTS = {
    main: {
      template: "systems/basicfantasyrpg/templates/actor/monster.hbs"
    },
    tabs: {
      // Foundry-provided generic template
      template: 'templates/generic/tab-navigation.hbs',
    },
    combat: {
      template: "systems/basicfantasyrpg/templates/actor/parts/combat.hbs",
    },
    description: {
      template: "systems/basicfantasyrpg/templates/actor/parts/description.hbs",
    },

  };

  /** @override */
  _onRender(context, options) {
    super._onRender(context, options);

    // Add monster-specific rendering logic
    console.log("Monster Sheet rendered for:", context.name);
  }

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    await super._prepareSaves(context);

    context.tabs = this._prepareTabs("primary");

    return context;
  }
}