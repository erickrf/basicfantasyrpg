/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
 export const preloadHandlebarsTemplates = async function() {
  const loadTemplates = foundry.applications.handlebars.loadTemplates;

  return loadTemplates([

    // Actor partials.
    'systems/basicfantasyrpg/templates/actor/parts/combat.hbs',
    'systems/basicfantasyrpg/templates/actor/parts/description.hbs',
    'systems/basicfantasyrpg/templates/actor/parts/items.hbs',
    'systems/basicfantasyrpg/templates/actor/parts/spells.hbs',
    'systems/basicfantasyrpg/templates/actor/parts/features.hbs',
    'systems/basicfantasyrpg/templates/actor/parts/floors.hbs',
    'systems/basicfantasyrpg/templates/item/parts/sheet.hbs',
    'systems/basicfantasyrpg/templates/item/parts/description.hbs',
  ]);
};
