import { BaseItemDataModel } from "./base-item-data.mjs";
import { BASICFANTASYRPG } from "../../helpers/config.mjs";

/**
 * Spell Data Model for Basic Fantasy RPG
 * Represents spells with spell-specific properties
 */
export class SpellDataModel extends BaseItemDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    const baseSchema = super.defineSchema();

    return {
      ...baseSchema,
      
      class: new fields.SchemaField({
        value: new fields.StringField({
          initial: "",
          choices: Object.keys(BASICFANTASYRPG.spellcasterClasses),
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Class",
        }),
      }),

      duration: new fields.SchemaField({
        value: new fields.StringField({
          initial: "",
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Duration",
        }),
      }),

      prepared: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 0,
          initial: 0,
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Prepared",
        }),
      }),

      range: new fields.SchemaField({
        value: new fields.StringField({
          initial: "",
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Range",
        }),
      }),

      spellLevel: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 1,
          max: 6,
          initial: 1,
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.SpellLevel",
        }),
      }),
    };
  }
}