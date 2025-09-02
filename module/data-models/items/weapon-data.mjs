import { ValuableItemDataModel } from "./valuable-item-data.mjs";
import { BASICFANTASYRPG } from "../../helpers/config.mjs";

/**
 * Weapon Data Model for Basic Fantasy RPG
 * Represents weapons with combat-related properties
 */
export class WeaponDataModel extends ValuableItemDataModel {
  /**
   * Migrate legacy data to current schema
   * @param {Object} source The source data to migrate
   * @returns {Object} The migrated data
   */
  static migrateData(source) {
    // Handle legacy size field
    if (typeof source.size === 'string') {
      const validSizes = Object.keys(BASICFANTASYRPG.weaponSizes);
      source.size = {
        value: validSizes.includes(source.size) ? source.size : 'M',
        label: "BASICFANTASYRPG.Size"
      };
    }

    // Handle range field migration - parse existing range strings
    if (source.range) {
      let rangeValue = '';
      if (typeof source.range === 'string') {
        rangeValue = source.range;
      } else if (source.range.value) {
        rangeValue = source.range.value;
      }

      // Use regex to extract range components (e.g., "10/30/60")
      const rangeMatch = rangeValue.match(/(\d+)\/(\d+)\/(\d+)/);
      
      if (rangeMatch) {
        // Found ranged weapon pattern
        source.range = {
          value: rangeValue,
          short: parseInt(rangeMatch[1], 10),
          medium: parseInt(rangeMatch[2], 10),
          long: parseInt(rangeMatch[3], 10),
          label: "BASICFANTASYRPG.Range"
        };
      } else {
        // No ranged pattern found, ensure range has proper structure
        source.range = {
          value: rangeValue || "Melee",
          short: null,
          medium: null,
          long: null,
          label: "BASICFANTASYRPG.Range"
        };
      }
    }
    
    // Handle melee based on weapon range
    if (!source.melee && source.melee?.value !== true) {
      if (source.range && typeof source.range === 'string') {
        source.melee = source.range.toLowerCase().includes('melee');
      } else if (source.range && source.range.value) {
        source.melee = source.range.value.toLowerCase().includes('melee');
      }
    }

    return super.migrateData(source);
  }

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

      addStrength: new fields.BooleanField({
        required: true,
        initial: true,
        label: "BASICFANTASYRPG.addStrength"
      }),

      range: new fields.SchemaField({
        value: new fields.StringField({
          required: true,
          initial: "Melee",
        }),
        short: new fields.NumberField({
          required: false,
          nullable: true,
          integer: true,
          initial: null,
        }),
        medium: new fields.NumberField({
          required: false,
          nullable: true,
          integer: true,
          initial: null,
        }),
        long: new fields.NumberField({
          required: false,
          nullable: true,
          integer: true,
          initial: null,
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Range",
        }),
      }),

      size: new fields.SchemaField({
        value: new fields.StringField({
          required: true,
          initial: "M",
          choices: Object.keys(BASICFANTASYRPG.weaponSizes),
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Size",
        }),
      }),

      melee: new fields.SchemaField({
        value: new fields.BooleanField({
          required: true,
          initial: false,
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Melee",
        }),
      }),

      isRanged: new fields.BooleanField({
        required: true,
        initial: false,
      }),
    };
  }

  /**
   * Prepare derived data for weapons
   */
  prepareDerivedData() {
    // Calculate addStrength based on weapon name
    const weaponName = this.parent?.name?.toLowerCase() || '';
    this.addStrength = !weaponName.includes('bow');

    const rangeValue = this.range?.value?.toLowerCase() || '';
    if (rangeValue.includes('melee')){
      this.melee.value = true;
    }

    // Set isRanged based on whether the weapon has all three range components
    this.isRanged = (
      this.range?.short != null && 
      this.range?.medium != null && 
      this.range?.long != null &&
      this.range.short > 0 &&
      this.range.medium > 0 &&
      this.range.long > 0
    );

    // Call parent prepareDerivedData if it exists
    super.prepareDerivedData();
  }
}