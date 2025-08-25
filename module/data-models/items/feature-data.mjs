import { BaseItemDataModel } from "./base-item-data.mjs";

/**
 * Feature Data Model for Basic Fantasy RPG
 * Represents special abilities or features with roll mechanics
 */
export class FeatureDataModel extends BaseItemDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    const baseSchema = super.defineSchema();

    return {
      ...baseSchema,
      
      formula: new fields.SchemaField({
        value: new fields.StringField({
          initial: "d100",
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Formula",
        }),
      }),

      rollUnder: new fields.SchemaField({
        value: new fields.BooleanField({
          initial: true,
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.RollUnder",
        }),
      }),

      targetNumber: new fields.SchemaField({
        value: new fields.StringField({
          initial: "",
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.TargetNumber",
        }),
      }),
    };
  }
}