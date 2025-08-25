import { ValuableItemDataModel } from "./valuable-item-data.mjs";

/**
 * Item Data Model for Basic Fantasy RPG
 * Represents the basic "item" type with valuable template + quantity
 */
export class ItemDataModel extends ValuableItemDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    const baseSchema = super.defineSchema();

    return {
      ...baseSchema,
      
      quantity: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 0,
          initial: 1,
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Quantity",
        }),
      }),
    };
  }
}