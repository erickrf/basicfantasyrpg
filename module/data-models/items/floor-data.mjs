import { ValuableItemDataModel } from "./valuable-item-data.mjs";

/**
 * Floor Data Model for Basic Fantasy RPG
 * Represents floors/roofing for stronghold construction
 */
export class FloorDataModel extends ValuableItemDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    const baseSchema = super.defineSchema();

    return {
      ...baseSchema,
      
      area: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          min: 0,
          initial: 0,
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Area",
        }),
      }),

      height: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          min: 0,
          initial: 10,
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Height",
        }),
      }),

      material: new fields.SchemaField({
        value: new fields.StringField({
          initial: "floor",
          choices: ["floor", "roofThatch", "roofWood", "roofSlate"],
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Material",
        }),
      }),
    };
  }
}