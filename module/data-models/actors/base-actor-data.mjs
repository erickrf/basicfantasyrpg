/**
 * Base Actor Data Model for Basic Fantasy RPG
 * Contains shared fields from the "base" template in template.json
 * @abstract
 */
export class BaseActorDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;

    return {
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

    };
  }

  /**
   * Prepare derived data for the base actor fields
   * This method should be called by subclasses in their prepareDerivedData method
   */
  prepareDerivedData() {
  }
}
