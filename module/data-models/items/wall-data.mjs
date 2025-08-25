import { ValuableItemDataModel } from "./valuable-item-data.mjs";

/**
 * Wall Data Model for Basic Fantasy RPG
 * Represents walls for stronghold construction
 */
export class WallDataModel extends ValuableItemDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    const baseSchema = super.defineSchema();

    return {
      ...baseSchema,
      
      floor: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 0,
          initial: 0,
        }),
        label: new fields.StringField({
          initial: "TYPES.Item.floor",
        }),
      }),

      hardness: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 0,
          initial: 6,
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Hardness",
        }),
      }),

      material: new fields.SchemaField({
        value: new fields.StringField({
          initial: "wood",
          choices: ["wood", "brick", "stoneSoft", "stoneHard"],
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Material",
        }),
      }),

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

      thickness: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 0,
          initial: 1,
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Thickness",
        }),
      }),
    };
  }
}