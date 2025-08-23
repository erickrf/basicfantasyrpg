import { BaseActorSheet } from './base-actor-sheet.mjs';

/**
 * Stronghold Sheet for Basic Fantasy RPG
 * Extends BaseActorSheet with stronghold-specific functionality
 * @extends {BaseActorSheet}
 */
export class StrongholdSheet extends BaseActorSheet {

  static DEFAULT_OPTIONS = {
    ...BaseActorSheet.DEFAULT_OPTIONS,
    classes: [...BaseActorSheet.DEFAULT_OPTIONS.classes, "stronghold"],
    window: {
      ...BaseActorSheet.DEFAULT_OPTIONS.window,
      title: "Stronghold",
    },
  };

  static TABS = {
    primary: {
      tabs: [{ id: "description" }, { id: "floors" }],
      labelPrefix: "BASICFANTASYRPG.Tab",
      initial: "floors",
    },
  };

  static PARTS = {
    header: {
      template: "systems/basicfantasyrpg/templates/actor/stronghold.hbs",
    },
    tabs: {
      template: 'templates/generic/tab-navigation.hbs',
    },
    description: {
      template: "systems/basicfantasyrpg/templates/actor/parts/description.hbs",
    },
    floors: {
      template: "systems/basicfantasyrpg/templates/actor/parts/floors.hbs",
    }
  };

  /** @override */
  _onRender(context, options) {
    super._onRender(context, options);
  }

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    // Add stronghold-specific context data
    context.isStronghold = true;

    return context;
  }
}