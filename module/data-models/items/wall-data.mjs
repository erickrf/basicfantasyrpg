import { ValuableItemDataModel } from "./valuable-item-data.mjs";
import { BASICFANTASYRPG } from "../../helpers/config.mjs";

/**
 * Wall Data Model for Basic Fantasy RPG
 * Represents walls for stronghold construction
 */
export class WallDataModel extends ValuableItemDataModel {
  /**
   * Migrate legacy data to current schema
   * @param {Object} source The source data to migrate
   * @returns {Object} The migrated data
   */
  static migrateData(source) {
    // Handle legacy material field
    if (typeof source.material === 'string') {
      const validMaterials = Object.keys(BASICFANTASYRPG.wallMaterials);
      source.material = {
        value: validMaterials.includes(source.material) ? source.material : 'wood',
        label: "BASICFANTASYRPG.Material"
      };
    }
    return super.migrateData(source);
  }

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
          choices: Object.keys(BASICFANTASYRPG.wallMaterials),
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