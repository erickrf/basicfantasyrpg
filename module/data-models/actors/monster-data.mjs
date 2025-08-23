import { BaseActorDataModel } from "./base-actor-data.mjs";

/**
 * Monster Data Model for Basic Fantasy RPG
 * Extends BaseActorDataModel with monster-specific fields
 */
export class MonsterDataModel extends BaseActorDataModel {
  
  static defineSchema() {
    const fields = foundry.data.fields;
    const baseSchema = super.defineSchema();
    
    return {
      ...baseSchema,
      
      hitDice: new fields.SchemaField({
        size: new fields.StringField({
          required: true,
          initial: "d8",
          choices: ["d4", "d6", "d8", "d10", "d12", "d20", "d100"]
        }),
        number: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 1,
          initial: 1
        }),
        mod: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          initial: 0
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.HitDice"
        }),
        abbr: new fields.StringField({
          initial: "BASICFANTASYRPG.HitDiceAbbr"
        })
      }),
      
      morale: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 2,
          max: 12,
          initial: 7
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Morale"
        })
      }),
      
      numberAppearing: new fields.SchemaField({
        value: new fields.StringField({
          required: true,
          initial: "1d4"
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.NumberAppearing"
        })
      }),
      
      specialAbility: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 0,
          initial: 0
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.SpecialAbilityXPBonus"
        })
      }),
      
      treasureType: new fields.SchemaField({
        value: new fields.StringField({
          required: true,
          initial: "None"
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.TreasureType"
        })
      }),
      
      xp: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 0,
          initial: 0
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.ExperiencePoints"
        }),
        abbr: new fields.StringField({
          initial: "BASICFANTASYRPG.ExperiencePointsAbbr"
        })
      })
    };
  }
  
  /**
   * Prepare derived data for monsters
   * Calculates XP values based on hit dice and special abilities
   */
  prepareDerivedData() {
    super.prepareDerivedData();
    
    // Calculate base XP from hit dice if not manually set
    if (this.xp.value === 0) {
      this.xp.value = this._calculateBaseXP();
    }
  }
  
  /**
   * Calculate base XP value from hit dice using Basic Fantasy RPG rules
   * @returns {number} The calculated base XP value
   */
  _calculateBaseXP() {
    const hitDice = this.hitDice.number;
    const specialAbility = this.specialAbility.value;

    const xpLookup = [10, 25, 75, 145, 240, 360, 500, 670, 875, 1075, 1300, 1575, 1875, 2175, 2500, 2850, 3250, 3600, 4000, 4500, 5250, 6000, 6750, 7500, 8250, 9000];
    const specialAbilityLookup = [3, 12, 25, 30, 40, 45, 55, 65, 70, 75, 90, 95, 100, 110, 115, 125, 135, 145, 160, 175, 200, 225, 250, 275, 300, 325];

    let xpValue = 0;
    let xpSpecialAbilityBonus = 0;

    if (hitDice.number < 1 || (hitDice.number === 1 && hitDice.mod < 0) || hitDice.size < 'd8') {
      xpValue = xpLookup[0];
      xpSpecialAbilityBonus = specialAbilityLookup[0] * specialAbility;
    } else if (hitDice.number > 25) {
      xpValue = 9000 + (hitDice.number - 25) * 750;
      xpSpecialAbilityBonus = (325 + (hitDice.number - 25) * 25) * specialAbility;
    } else {
      xpValue = xpLookup[hitDice.number];
      xpSpecialAbilityBonus = specialAbilityLookup[hitDice.number] * specialAbility;
    }

    xpSpecialAbilityBonus = Math.max(0, xpSpecialAbilityBonus); // never return a negative special ability bonus
    return xpValue + xpSpecialAbilityBonus;
  }
  
  /**
   * Migrate data from older versions
   * @param {object} source - The source data to migrate
   * @returns {object} The migrated data
   */
  static migrateData(source) {
    // Handle any data structure changes for existing monsters
    // For now, just return the source data as-is
    return source;
  }
}