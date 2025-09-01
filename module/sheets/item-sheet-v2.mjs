const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ItemSheetV2 } = foundry.applications.sheets;

/**
 * Item Sheet v2 for Basic Fantasy RPG
 * Extends ItemSheetV2 with Basic Fantasy RPG-specific functionality
 * @extends {ItemSheetV2}
 */
export class BasicFantasyRPGItemSheetV2 extends HandlebarsApplicationMixin(ItemSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["basicfantasyrpg", "sheet", "item", "themed", "theme-light"],
    position: {
      width: 540,
      height: 480,
    },
    window: {
      resizable: true,
    },
    form: {
      handler: BasicFantasyRPGItemSheetV2.#onSubmitDocumentForm,
      submitOnChange: true,
    },
    actions: {
      editImage: BasicFantasyRPGItemSheetV2.#onEditImage,
    },
  };

  static PARTS = {
    main: {
      template: "systems/basicfantasyrpg/templates/item/parts/sheet.hbs",
    },
    description: {
      // Foundry-provided generic template
      template: "systems/basicfantasyrpg/templates/item/parts/description.hbs",
    },
    armor: {
      template: "systems/basicfantasyrpg/templates/item/armor.hbs",
    },
    feature: {
      template: "systems/basicfantasyrpg/templates/item/feature.hbs",
    },
    floor: {
      template: "systems/basicfantasyrpg/templates/item/floor.hbs",
    },
    item: {
      template: "systems/basicfantasyrpg/templates/item/item.hbs",
    },
    spell: {
      template: "systems/basicfantasyrpg/templates/item/spell.hbs",
    },
    wall: {
      template: "systems/basicfantasyrpg/templates/item/wall.hbs",
    },
    weapon: {
      template: "systems/basicfantasyrpg/templates/item/weapon.hbs",
    },
  };

  _configureRenderOptions(options) {
    super._configureRenderOptions(options);

    options.parts = ["main", "description"];
  }

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const TextEditor = foundry.applications.ux.TextEditor.implementation;

    // Add the item's basic data to the context
    context.item = this.document;
    context.system = this.document.system;
    context.name = this.document.name;
    context.data = context.system;
    context.flags = this.document.flags;

    // Add configuration data for dropdowns
    context.weaponSizes = CONFIG.BASICFANTASYRPG.weaponSizes;
    context.moneyAbbr = CONFIG.BASICFANTASYRPG.moneyAbbr;
    context.floorMaterials = CONFIG.BASICFANTASYRPG.floorMaterials;
    context.wallMaterials = CONFIG.BASICFANTASYRPG.wallMaterials;
    context.spellcasterClasses = CONFIG.BASICFANTASYRPG.spellcasterClasses;

    // Enrich description for editor
    context.enrichedDescription = await TextEditor.enrichHTML(this.document.system.description, { async: true });

    // Retrieve the roll data for TinyMCE editors
    context.rollData = {};
    let actor = this.document?.parent ?? null;
    if (actor) {
      context.rollData = actor.getRollData();
    }

    return context;
  }

  /**
   * Handle form submission for the item sheet
   * @param {SubmitEvent} event The form submission event
   * @param {HTMLFormElement} form The submitted form
   * @param {FormDataExtended} formData The form data
   * @returns {Promise<void>}
   */
  static async #onSubmitDocumentForm(event, form, formData) {
    if (!this.isEditable) return;
    const updates = foundry.utils.expandObject(formData.object);
    return this.document.update(updates);
  }

  /**
   * Handle editing the item's image
   * @param {Event} event The click event
   * @param {HTMLElement} target The clicked element
   * @returns {Promise<void>}
   */
  static async #onEditImage(event, target) {
    if (!this.isEditable) return;
    const item = this.document;
    const FilePicker = foundry.applications.apps.FilePicker.implementation;

    new FilePicker({
      type: "image",
      current: item.img,
      callback: (path) => {
        item.update({ img: path });
      },
    }).render(true);
  }

  /** @override */
  _onRender(context, options) {
    super._onRender(context, options);

    // Add any item-specific rendering logic
    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Additional event handling could go here if needed
    // Roll handlers, click handlers, etc. would be implemented as actions
    // or through the standard v2 event system
  }
}
