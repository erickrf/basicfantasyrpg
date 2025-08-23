import { BaseActorDataModel } from "./base-actor-data.mjs";

/**
 * Character Data Model for Basic Fantasy RPG
 * Extends BaseActorDataModel with character-specific fields and calculations
 */
export class CharacterDataModel extends BaseActorDataModel {
  
  static defineSchema() {
    const fields = foundry.data.fields;
    const baseSchema = super.defineSchema();
    
    return {
      ...baseSchema,
      
      abilities: new fields.SchemaField({
        str: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 3,
            max: 18,
            initial: 10
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.AbilityStr"
          }),
          bonus: new fields.NumberField({
            integer: true,
            initial: 0
          })
        }),
        int: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 3,
            max: 18,
            initial: 10
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.AbilityInt"
          }),
          bonus: new fields.NumberField({
            integer: true,
            initial: 0
          })
        }),
        wis: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 3,
            max: 18,
            initial: 10
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.AbilityWis"
          }),
          bonus: new fields.NumberField({
            integer: true,
            initial: 0
          })
        }),
        dex: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 3,
            max: 18,
            initial: 10
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.AbilityDex"
          }),
          bonus: new fields.NumberField({
            integer: true,
            initial: 0
          })
        }),
        con: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 3,
            max: 18,
            initial: 10
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.AbilityCon"
          }),
          bonus: new fields.NumberField({
            integer: true,
            initial: 0
          })
        }),
        cha: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 3,
            max: 18,
            initial: 10
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.AbilityCha"
          }),
          bonus: new fields.NumberField({
            integer: true,
            initial: 0
          })
        })
      }),
      
      age: new fields.SchemaField({
        value: new fields.StringField({
          initial: ""
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Age"
        })
      }),
      
      class: new fields.SchemaField({
        value: new fields.StringField({
          initial: ""
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Class"
        })
      }),
      
      race: new fields.SchemaField({
        value: new fields.StringField({
          initial: ""
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Race"
        })
      }),
      
      sex: new fields.SchemaField({
        value: new fields.StringField({
          initial: ""
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Sex"
        })
      }),
      
      level: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 1,
          initial: 1
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Level"
        })
      }),
      
      money: new fields.SchemaField({
        pp: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 0,
            initial: 0
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.Platinum"
          })
        }),
        gp: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 0,
            initial: 0
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.Gold"
          })
        }),
        ep: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 0,
            initial: 0
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.Electrum"
          })
        }),
        sp: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 0,
            initial: 0
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.Silver"
          })
        }),
        cp: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 0,
            initial: 0
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.Copper"
          })
        })
      }),
      
      spellsPerLevel: new fields.SchemaField({
        value: new fields.ObjectField({
          initial: {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0
          }
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.SpellsPerLevel"
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
        next: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 0,
          initial: 2000
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
   * Prepare derived data for characters
   * Calculates ability bonuses and other derived values
   */
  prepareDerivedData() {
    super.prepareDerivedData();
    
    // Calculate ability bonuses
    for (let [, ability] of Object.entries(this.abilities)) {
      ability.bonus = this._calculateAbilityBonus(ability.value);
    }
  }
  
  /**
   * Calculate ability score modifiers using Basic Fantasy RPG rules
   * @param {number} abilityScore - The ability score value
   * @returns {number} The ability modifier
   */
  _calculateAbilityBonus(abilityScore) {
    switch (abilityScore) {
      case 3: return -3;
      case 4:
      case 5: return -2;
      case 6:
      case 7:
      case 8: return -1;
      case 13:
      case 14:
      case 15: return 1;
      case 16:
      case 17: return 2;
      case 18: return 3;
      default: return 0;
    }
  }
  
  /**
   * Migrate data from older versions
   * @param {object} source - The source data to migrate
   * @returns {object} The migrated data
   */
  static migrateData(source) {
    // Handle any data structure changes for existing characters
    // For now, just return the source data as-is
    return source;
  }
}