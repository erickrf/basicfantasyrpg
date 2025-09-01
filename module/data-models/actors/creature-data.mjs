import { BaseActorDataModel } from "./base-actor-data.mjs";

/**
 * Creature Data Model for Basic Fantasy RPG
 * Extends BaseActorDataModel with combat-related fields (armor class, attack bonus, initiative, saves)
 * This serves as the base class for characters and monsters
 * @abstract
 */
export class CreatureDataModel extends BaseActorDataModel {
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

      attackBonus: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          initial: 1,
        }),
        extra: new fields.NumberField({
          required: false,
          nullable: true,
          integer: true,
          initial: 0,
        }),
        total: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          initial: 1,
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.AttackBonus",
        }),
        abbr: new fields.StringField({
          initial: "BASICFANTASYRPG.AttackBonusAbbr",
        }),
      }),

      initBonus: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          initial: 0,
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.InitiativeBonus",
        }),
      }),

      saves: new fields.SchemaField({
        death: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 2,
            max: 20,
            initial: 13,
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.SaveDeath",
          }),
        }),
        wands: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 2,
            max: 20,
            initial: 14,
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.SaveWands",
          }),
        }),
        paralysis: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 2,
            max: 20,
            initial: 15,
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.SaveParalysis",
          }),
        }),
        breath: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 2,
            max: 20,
            initial: 16,
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.SaveBreath",
          }),
        }),
        spells: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 2,
            max: 20,
            initial: 18,
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.SaveSpells",
          }),
        }),
      }),
    };
  }

  /**
   * Prepare derived data for creature fields
   * This method should be called by subclasses in their prepareDerivedData method
   */
  prepareDerivedData() {
    // Call parent method to handle base actor fields
    super.prepareDerivedData();

    // Calculate total attack bonus (base + extra)
    this.attackBonus.total = this.attackBonus.value + (this.attackBonus.extra || 0);
  }
}