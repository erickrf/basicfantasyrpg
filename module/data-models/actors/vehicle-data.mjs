import { BaseActorDataModel } from "./base-actor-data.mjs";

/**
 * Vehicle Data Model for Basic Fantasy RPG
 * Extends BaseActorDataModel with vehicle-specific fields and calculations
 */
export class VehicleDataModel extends BaseActorDataModel {
  
  static defineSchema() {
    const fields = foundry.data.fields;
    
    // Vehicle doesn't use the base template, so we define its own schema
    return {
      armorClass: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 0,
          initial: 11
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.ArmorClass"
        }),
        abbr: new fields.StringField({
          initial: "BASICFANTASYRPG.ArmorClassAbbr"
        })
      }),
      
      biography: new fields.HTMLField({
        initial: ""
      }),
      
      cargo: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 0,
          initial: 0
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Cargo"
        })
      }),
      
      hardness: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 0,
          initial: 6
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Hardness"
        })
      }),
      
      hitPoints: new fields.SchemaField({
        aft: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 0,
            initial: 16
          }),
          max: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 0,
            initial: 16
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.SideAft"
          })
        }),
        forward: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 0,
            initial: 16
          }),
          max: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 0,
            initial: 16
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.SideForward"
          })
        }),
        port: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 0,
            initial: 16
          }),
          max: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 0,
            initial: 16
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.SidePort"
          })
        }),
        starboard: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 0,
            initial: 16
          }),
          max: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 0,
            initial: 16
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.SideStarboard"
          })
        }),
        // These are computed fields set in prepareDerivedData
        value: new fields.NumberField({
          integer: true,
          initial: 0
        }),
        max: new fields.NumberField({
          integer: true,
          initial: 0
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.HitPoints"
        }),
        abbr: new fields.StringField({
          initial: "BASICFANTASYRPG.HitPointsAbbr"
        })
      }),
      
      length: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 0,
          initial: 35
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Length"
        })
      }),
      
      maneuverability: new fields.SchemaField({
        value: new fields.StringField({
          required: true,
          initial: "15'"
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Maneuverability"
        })
      }),
      
      move: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 0,
          initial: 20
        }),
        // This is computed in prepareDerivedData based on damage
        current: new fields.NumberField({
          integer: true,
          initial: 20
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Movement"
        })
      }),
      
      width: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 0,
          initial: 8
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Width"
        })
      })
    };
  }
  
  /**
   * Prepare derived data for vehicles
   * Calculates total HP and current movement based on damage
   */
  prepareDerivedData() {
    super.prepareDerivedData();
    
    // Calculate totals for HP value and HP max
    this.hitPoints.value = 0;
    this.hitPoints.max = 0;
    
    for (let [key, side] of Object.entries(this.hitPoints)) {
      if (['forward', 'aft', 'port', 'starboard'].includes(key)) {
        this.hitPoints.value += side.value;
        this.hitPoints.max += side.max;
      }
    }
    
    // Check if any 1 or 2 sides are reduced to 0 HP and adjust movement
    let sidesAtZeroHP = 0;
    for (let [key, side] of Object.entries(this.hitPoints)) {
      if (['forward', 'aft', 'port', 'starboard'].includes(key) && side.value === 0 && side.max !== 0) {
        ++sidesAtZeroHP;
      }
    }
    
    if (sidesAtZeroHP === 1) {
      this.move.current = Math.floor(this.move.value / 2);
    } else if (sidesAtZeroHP > 1) {
      this.move.current = 0;
    } else {
      this.move.current = this.move.value;
    }
  }
  
  /**
   * Migrate data from older versions
   * @param {object} source - The source data to migrate
   * @returns {object} The migrated data
   */
  static migrateData(source) {
    // Handle any data structure changes for existing vehicles
    // For now, just return the source data as-is
    return source;
  }
}