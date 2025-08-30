/**
 * Base Actor Data Model for Basic Fantasy RPG
 * Contains shared fields from the "base" template in template.json
 * @abstract
 */
export class BaseActorDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;

    return {
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
          initial: 0
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.AttackBonus",
        }),
        abbr: new fields.StringField({
          initial: "BASICFANTASYRPG.AttackBonusAbbr",
        }),
      }),

      biography: new fields.HTMLField({
        initial: "",
      }),

      hitPoints: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 0,
          initial: 10,
        }),
        max: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 0,
          initial: 10,
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.HitPoints",
        }),
        abbr: new fields.StringField({
          initial: "BASICFANTASYRPG.HitPointsAbbr",
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

      move: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 0,
          initial: 30,
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Movement",
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
   * Prepare derived data for the base actor fields
   * This method should be called by subclasses in their prepareDerivedData method
   */
  prepareDerivedData() {}
}
