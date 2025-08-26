import { BaseItemDataModel } from "./base-item-data.mjs";
import { BASICFANTASYRPG } from "../../helpers/config.mjs";

/**
 * Spell Data Model for Basic Fantasy RPG
 * Represents spells with spell-specific properties
 */
export class SpellDataModel extends BaseItemDataModel {
  /**
   * Migrate legacy data to current schema
   * @param {Object} source The source data to migrate
   * @returns {Object} The migrated data
   */
  static migrateData(source) {
    // Handle legacy class field
    if (typeof source.class?.value === 'string') {
      // Normalize legacy class names by removing whitespace, hyphens and lowercasing
      const normalizedClass = source.class.value.toLowerCase().replace(/[\s-]+/g, '');

      const legacyClassMap = {
        'magicuser': 'magicUser',
        'cleric': 'cleric'
      };
      
      const mappedClass = legacyClassMap[normalizedClass] || '';
      source.class = {
        value: mappedClass,
        label: "BASICFANTASYRPG.Class"
      };
    }
    return super.migrateData(source);
  }

  static defineSchema() {
    const fields = foundry.data.fields;
    const baseSchema = super.defineSchema();

    return {
      ...baseSchema,
      
      class: new fields.SchemaField({
        value: new fields.StringField({
          initial: "magicUser",
          choices: Object.keys(BASICFANTASYRPG.spellcasterClasses),
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Class",
        }),
      }),

      duration: new fields.SchemaField({
        value: new fields.StringField({
          initial: "",
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Duration",
        }),
      }),

      prepared: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 0,
          initial: 0,
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Prepared",
        }),
      }),

      range: new fields.SchemaField({
        value: new fields.StringField({
          initial: "",
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Range",
        }),
      }),

      spellLevel: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 1,
          max: 6,
          initial: 1,
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.SpellLevel",
        }),
      }),
    };
  }
}