import { BaseItemDataModel } from "./base-item-data.mjs";
import { BASICFANTASYRPG } from "../../helpers/config.mjs";

/**
 * Valuable Item Data Model for Basic Fantasy RPG
 * Extends BaseItemDataModel with valuable template fields from template.json
 */
export class ValuableItemDataModel extends BaseItemDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    const baseSchema = super.defineSchema();

    return {
      ...baseSchema,
      
      price: new fields.SchemaField({
        amount: new fields.NumberField({
          required: true,
          nullable: false,
          min: 0,
          initial: 0,
        }),
        currency: new fields.StringField({
          required: true,
          initial: "gp",
          choices: Object.keys(BASICFANTASYRPG.money),
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Price",
        }),
      }),

      weight: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          min: 0,
          initial: 1,
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Weight",
        }),
      }),
    };
  }
}