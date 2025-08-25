import { ValuableItemDataModel } from "./valuable-item-data.mjs";

/**
 * Weapon Data Model for Basic Fantasy RPG
 * Represents weapons with combat-related properties
 */
export class WeaponDataModel extends ValuableItemDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    const baseSchema = super.defineSchema();

    return {
      ...baseSchema,
      
      bonusAb: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          initial: 0,
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.BonusAttackBonus",
        }),
      }),

      damage: new fields.SchemaField({
        value: new fields.StringField({
          required: true,
          initial: "1d6",
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Damage",
        }),
        abbr: new fields.StringField({
          initial: "BASICFANTASYRPG.DamageAbbr",
        }),
      }),

      range: new fields.SchemaField({
        value: new fields.StringField({
          required: true,
          initial: "Melee",
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Range",
        }),
      }),

      size: new fields.SchemaField({
        value: new fields.StringField({
          required: true,
          initial: "M",
          choices: ["S", "M", "L"],
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Size",
        }),
      }),
    };
  }
}