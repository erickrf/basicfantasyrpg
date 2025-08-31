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
            initial: 10,
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.AbilityStr",
          }),
          bonus: new fields.NumberField({
            integer: true,
            initial: 0,
          }),
        }),
        int: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 3,
            max: 18,
            initial: 10,
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.AbilityInt",
          }),
          bonus: new fields.NumberField({
            integer: true,
            initial: 0,
          }),
        }),
        wis: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 3,
            max: 18,
            initial: 10,
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.AbilityWis",
          }),
          bonus: new fields.NumberField({
            integer: true,
            initial: 0,
          }),
        }),
        dex: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 3,
            max: 18,
            initial: 10,
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.AbilityDex",
          }),
          bonus: new fields.NumberField({
            integer: true,
            initial: 0,
          }),
        }),
        con: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 3,
            max: 18,
            initial: 10,
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.AbilityCon",
          }),
          bonus: new fields.NumberField({
            integer: true,
            initial: 0,
          }),
        }),
        cha: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 3,
            max: 18,
            initial: 10,
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.AbilityCha",
          }),
          bonus: new fields.NumberField({
            integer: true,
            initial: 0,
          }),
        }),
      }),

      age: new fields.SchemaField({
        value: new fields.StringField({
          initial: "",
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Age",
        }),
      }),

      class: new fields.SchemaField({
        value: new fields.StringField({
          initial: "",
          blank: true,
          choices: CONFIG.BASICFANTASYRPG.characterClasses,
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Class",
        }),
      }),

      race: new fields.SchemaField({
        value: new fields.StringField({
          initial: "",
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Race",
        }),
      }),

      sex: new fields.SchemaField({
        value: new fields.StringField({
          initial: "",
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Sex",
        }),
      }),

      level: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 1,
          initial: 1,
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Level",
        }),
      }),

      manualMode: new fields.BooleanField({
        required: true,
        initial: false,
      }),

      money: new fields.SchemaField({
        pp: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 0,
            initial: 0,
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.Platinum",
          }),
        }),
        gp: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 0,
            initial: 0,
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.Gold",
          }),
        }),
        ep: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 0,
            initial: 0,
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.Electrum",
          }),
        }),
        sp: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 0,
            initial: 0,
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.Silver",
          }),
        }),
        cp: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 0,
            initial: 0,
          }),
          label: new fields.StringField({
            initial: "BASICFANTASYRPG.Copper",
          }),
        }),
      }),

      spellsPerLevel: new fields.SchemaField({
        value: new fields.ObjectField({
          initial: {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
          },
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.SpellsPerLevel",
        }),
      }),

      xp: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 0,
          initial: 0,
        }),
        next: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 0,
          initial: 2000,
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.ExperiencePoints",
        }),
        abbr: new fields.StringField({
          initial: "BASICFANTASYRPG.ExperiencePointsAbbr",
        }),
      }),
    };
  }

  /**
   * Prepare derived data for characters
   * Calculates ability bonuses and other derived values
   */
  prepareDerivedData() {
    // Calculate ability bonuses
    for (let [, ability] of Object.entries(this.abilities)) {
      ability.bonus = this._calculateAbilityBonus(ability.value);
    }

    // Skip automated calculations if manual mode is enabled
    if (this.manualMode) return;

    // Calculate next level XP based on class and current level
    this.xp.next = this._calculateNextLevelXP();

    // Calculate saving throws based on class and level
    this._calculateSavingThrows();

    // Calculate attack bonus based on class and level
    this.attackBonus.value = this._calculateAttackBonus();

    // The parent class does generic derivations like adding bonus AB
    super.prepareDerivedData();
  }

  /**
   * Get the character's class, defaulting to fighter if not set
   * @returns {string} The character class
   */
  _getCharacterClass() {
    return this.class.value || "fighter";
  }

  /**
   * Get the character's current level, defaulting to 1
   * @returns {number} The current level
   */
  _getCurrentLevel() {
    return this.level.value || 1;
  }

  /**
   * Get the 0-based level index for use with progression arrays
   * @returns {number} The level index (level - 1, minimum 0)
   */
  _getLevelIndex() {
    return Math.max(0, this._getCurrentLevel() - 1);
  }

  /**
   * Calculate ability score modifiers using Basic Fantasy RPG rules
   * @param {number} abilityScore - The ability score value
   * @returns {number} The ability modifier
   */
  _calculateAbilityBonus(abilityScore) {
    switch (abilityScore) {
      case 3:
        return -3;
      case 4:
      case 5:
        return -2;
      case 6:
      case 7:
      case 8:
        return -1;
      case 13:
      case 14:
      case 15:
        return 1;
      case 16:
      case 17:
        return 2;
      case 18:
        return 3;
      default:
        return 0;
    }
  }

  /**
   * Calculate the XP required for the next level based on class and current level
   * @returns {number} The XP required for the next level
   */
  _calculateNextLevelXP() {
    const characterClass = this._getCharacterClass();
    const currentLevel = this._getCurrentLevel();

    // Get the progression table for this class
    const progressionTable = CONFIG.BASICFANTASYRPG?.xpProgression?.[characterClass];

    // Get XP for next level (current level index in 0-based array)
    const nextLevelIndex = currentLevel; // Level 2 is at index 1, etc.
    if (nextLevelIndex >= progressionTable.length) {
      // Beyond max level in table, return last value
      return progressionTable[progressionTable.length - 1];
    }

    return progressionTable[nextLevelIndex] || 2000;
  }

  /**
   * Calculate saving throws based on class and current level
   */
  _calculateSavingThrows() {
    const characterClass = this._getCharacterClass();
    const levelIndex = this._getLevelIndex();

    // Get the saves progression table for this class
    const savesTable = CONFIG.BASICFANTASYRPG.savesProgression[characterClass];

    // Iterate through each save type and set the value
    for (let [saveType, saveData] of Object.entries(this.saves)) {
      const progressionArray = savesTable[saveType];
      if (progressionArray) {
        const saveIndex = Math.min(levelIndex, progressionArray.length - 1);
        saveData.value = progressionArray[saveIndex];
      }
    }
  }

  /**
   * Calculate attack bonus based on class and current level
   * @returns {number} The calculated attack bonus
   */
  _calculateAttackBonus() {
    const characterClass = this._getCharacterClass();
    const levelIndex = this._getLevelIndex();

    // Get the attack bonus progression table for this class
    const attackBonusTable = CONFIG.BASICFANTASYRPG.attackBonusProgression[characterClass];

    if (attackBonusTable) {
      const attackIndex = Math.min(levelIndex, attackBonusTable.length - 1);
      return attackBonusTable[attackIndex];
    }

    // Fallback to 1 if class not found in progression table
    return 1;
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
