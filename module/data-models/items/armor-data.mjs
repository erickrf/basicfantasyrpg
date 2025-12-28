import { ValuableItemDataModel } from "./valuable-item-data.mjs";
import { BASICFANTASYRPG } from "../../helpers/config.mjs";

/**
 * Armor Data Model for Basic Fantasy RPG
 * Represents armor with armor class properties
 */
export class ArmorDataModel extends ValuableItemDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    const baseSchema = super.defineSchema();

    return {
      ...baseSchema,
      
      armorClass: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 0,
          initial: 11,
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.ArmorClass",
        }),
        abbr: new fields.StringField({
          initial: "BASICFANTASYRPG.ArmorClassAbbr",
        }),
      }),

      armorType: new fields.SchemaField({
        value: new fields.StringField({
          initial: "",
          blank: true,
          choices: CONFIG.BASICFANTASYRPG.armorTypes
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.ArmorType",
        })
      })
    };
  }
}