/**
 * Siege Engine Data Model for Basic Fantasy RPG
 * Extends TypeDataModel directly (no base template inheritance)
 */
export class SiegeEngineDataModel extends foundry.abstract.TypeDataModel {
  
  static defineSchema() {
    const fields = foundry.data.fields;
    
    return {
      attackBonus: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          initial: 0
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.AttackBonus"
        }),
        abbr: new fields.StringField({
          initial: "BASICFANTASYRPG.AttackBonusAbbr"
        })
      }),
      
      biography: new fields.HTMLField({
        initial: ""
      }),
      
      cost: new fields.SchemaField({
        value: new fields.StringField({
          initial: ""
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Cost"
        })
      }),
      
      damage: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          initial: 0
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Damage"
        })
      }),
      
      rangeBonus: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          initial: 0
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.RangeBonus"
        })
      }),
      
      rangeShort: new fields.SchemaField({
        value: new fields.StringField({
          initial: ""
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.RangeShort"
        })
      }),
      
      rangeMedium: new fields.SchemaField({
        value: new fields.StringField({
          initial: ""
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.RangeMedium"
        })
      }),
      
      rangeLong: new fields.SchemaField({
        value: new fields.StringField({
          initial: ""
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.RangeLong"
        })
      }),
      
      rateOfFire: new fields.SchemaField({
        value: new fields.StringField({
          initial: ""
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.RateOfFire"
        })
      }),
      
      targetAC: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 0,
          initial: 20
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.TargetAC"
        })
      })
    };
  }
  
  /**
   * Prepare derived data for siege engines
   * No complex calculations needed - siege engines are straightforward
   */
  prepareDerivedData() {
    // Siege engines don't need complex derived data calculations
    // All their data is static or user-input
  }
  
  /**
   * Migrate data from older versions
   * @param {object} source - The source data to migrate
   * @returns {object} The migrated data
   */
  static migrateData(source) {
    // Handle any data structure changes for existing siege engines
    // For now, just return the source data as-is
    return source;
  }
}