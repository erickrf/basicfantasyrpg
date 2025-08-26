import { ValuableItemDataModel } from "./valuable-item-data.mjs";
import { BASICFANTASYRPG } from "../../helpers/config.mjs";

/**
 * Floor Data Model for Basic Fantasy RPG
 * Represents floors/roofing for stronghold construction
 */
export class FloorDataModel extends ValuableItemDataModel {
  /**
   * Migrate legacy data to current schema
   * @param {Object} source The source data to migrate
   * @returns {Object} The migrated data
   */
  static migrateData(source) {
    // Handle legacy material field
    if (typeof source.material === 'string') {
      const validMaterials = Object.keys(BASICFANTASYRPG.floorMaterials);
      source.material = {
        value: validMaterials.includes(source.material) ? source.material : 'floor',
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
          choices: Object.keys(BASICFANTASYRPG.floorMaterials),
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Material",
        }),
      }),
    };
  }
}