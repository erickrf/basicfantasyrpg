import { BaseActorSheet } from "./base-actor-sheet.mjs";

/**
 * Vehicle Sheet for Basic Fantasy RPG
 * Extends BaseActorSheet with vehicle-specific functionality
 * @extends {BaseActorSheet}
 */
export class VehicleSheet extends BaseActorSheet {
  static DEFAULT_OPTIONS = {
    ...BaseActorSheet.DEFAULT_OPTIONS,
    classes: [...BaseActorSheet.DEFAULT_OPTIONS.classes, "vehicle"],
    window: {
      ...BaseActorSheet.DEFAULT_OPTIONS.window,
      title: "Vehicle",
    },
  };

  static TABS = {
    primary: {
      tabs: [{ id: "combat" }, { id: "description" }],
      labelPrefix: "BASICFANTASYRPG.Tab",
      initial: "combat",
    },
  };

  static PARTS = {
    main: {
      template: "systems/basicfantasyrpg/templates/actor/vehicle.hbs",
    },
    tabs: {
      // Foundry-provided generic template
      template: "templates/generic/tab-navigation.hbs",
    },
    combat: {
      template: "systems/basicfantasyrpg/templates/actor/parts/vehicle-combat.hbs",
    },
    description: {
      template: "systems/basicfantasyrpg/templates/actor/parts/description.hbs",
    },
    items: {
      template: "systems/basicfantasyrpg/templates/actor/parts/items-list.hbs"
    }
  };

  /** @override */
  _onRender(context, options) {
    super._onRender(context, options);

    // Add vehicle-specific rendering logic if needed
    console.log("Vehicle Sheet rendered for:", context.name);
  }

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    context.tabs = this._prepareTabs("primary");

    return context;
  }

  _configureRenderOptions(options) {
    super._configureRenderOptions(options);

    options.parts = ["main", "tabs", "combat", "description"];
  }
}
