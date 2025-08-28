/**
 * Settings to apply to the module, including common house rules and supplements.
 */


export function registerSystemSettings() {
  game.settings.register('basicfantasyrpg', 'mySettingName', {
    name: 'My Setting',
    hint: 'A description of the registered setting and its behavior.',
    scope: 'world',     // "world" = sync to db, "client" = local storage
    config: true,       // false if you dont want it to show in module config
    type: Number,       // You want the primitive class, e.g. Number, not the name of the class as a string
    default: 0,
    onChange: value => { // value is the new value of the setting
      console.log(value)
    },
    requiresReload: true, // true if you want to prompt the user to reload
    /** Creates a select dropdown */
    choices: {
      1: "Option Label 1",
      2: "Option Label 2",
      3: "Option Label 3"
    },
    /** Number settings can have a range slider, with an optional step property */
    range: {
      min: 0,
      step: 2,
      max: 10
    },
    /** "audio", "image", "video", "imagevideo", "folder", "font", "graphics", "text", or "any" */
    filePicker: "any"
  });
}
