import { CreatureDataModel } from "./creature-data.mjs";


/**
 * Monster Data Model for Basic Fantasy RPG
 * Extends CreatureDataModel with monster-specific fields
 */
export class MonsterDataModel extends CreatureDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    const baseSchema = super.defineSchema();

    return {
      ...baseSchema,

      hitDice: new fields.SchemaField({
        size: new fields.StringField({
          required: true,
          initial: "d8",
          choices: ["d4", "d6", "d8", "d10", "d12", "d20", "d100"],
        }),
        number: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 1,
          initial: 1,
        }),
        mod: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          initial: 0,
        }),
        effective: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 0,
          initial: 0,
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.HitDice",
        }),
        abbr: new fields.StringField({
          initial: "BASICFANTASYRPG.HitDiceAbbr",
        }),
      }),

      morale: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 2,
          max: 12,
          initial: 7,
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Morale",
        }),
      }),

      numberAppearing: new fields.SchemaField({
        value: new fields.StringField({
          required: true,
          initial: "1d4",
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.NumberAppearing",
        }),
      }),

      specialAbility: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 0,
          initial: 0,
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.SpecialAbilityXPBonus",
        }),
      }),

      treasureType: new fields.SchemaField({
        value: new fields.StringField({
          required: true,
          initial: "None",
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.TreasureType",
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
   * Prepare derived data for monsters
   * Calculates XP values based on hit dice and special abilities
   */
  prepareDerivedData() {
    super.prepareDerivedData();

    // Calculate effective hit dice for saves
    this.hitDice.effective = this._calculateEffectiveHitDice();


    // Calculate base XP from hit dice if not manually set
    if (this.xp.value === 0) {
      this.xp.value = this._calculateBaseXP();
    }

    // a given value above 1 should override automatic calculation
    if (this.attackBonus.value <= 1) {
      this.attackBonus.value = this.hitDice.effective;
    }

    // Calculate monster saves based on hit dice
    this._setMonsterSaves();
  }

  /**
   * Calculate effective hit dice for save calculations
   * @returns {number} The effective hit dice value
   */
  _calculateEffectiveHitDice() {
    const hitDice = this.hitDice;
    const dieSize = parseInt(hitDice.size.substring(1)); // Extract number from "d8"
    
    // If die size is less than d8, effective is 0
    if (dieSize < 8) {
      return 0;
    }
    
    // If effective hit dice is less than 1 (like 1d8-2), effective is 0
    if (hitDice.number === 1 && hitDice.mod < 0) {
      return 0;
    }
    
    // If less than 1 full hit die, effective is 0
    if (hitDice.number < 1) {
      return 0;
    }
    
    // Otherwise, return the number of dice (ignoring modifier)
    return hitDice.number;
  }

  /**
   * Calculate base XP value from hit dice using Basic Fantasy RPG rules
   * @returns {number} The calculated base XP value
   */
  _calculateBaseXP() {
    const hitDice = this.hitDice.number;
    const specialAbility = this.specialAbility.value;

    const xpLookup = [
      10, 25, 75, 145, 240, 360, 500, 670, 875, 1075, 1300, 1575, 1875, 2175, 2500, 2850, 3250, 3600, 4000, 4500, 5250,
      6000, 6750, 7500, 8250, 9000,
    ];
    const specialAbilityLookup = [
      3, 12, 25, 30, 40, 45, 55, 65, 70, 75, 90, 95, 100, 110, 115, 125, 135, 145, 160, 175, 200, 225, 250, 275, 300,
      325,
    ];

    let xpValue = 0;
    let xpSpecialAbilityBonus = 0;

    if (this.hitDice.effective === 0) {
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
   * Set monster saves based on hit dice
   * Uses normal man saves for < 1d8 HD, otherwise uses fighter saves
   */
  _setMonsterSaves() {
    const calculatedSaves = this._calculateMonsterSaves();
    
    // Update save values
    this.saves.death.value = calculatedSaves.death;
    this.saves.wands.value = calculatedSaves.wands;
    this.saves.paralysis.value = calculatedSaves.paralysis;
    this.saves.breath.value = calculatedSaves.breath;
    this.saves.spells.value = calculatedSaves.spells;
  }

  /**
   * Calculate monster saves based on hit dice
   * @returns {object} Object containing save values for each save type
   */
  _calculateMonsterSaves() {
    if (this.hitDice.effective === 0) {
      return CONFIG.BASICFANTASYRPG.savesNormalMan;
    } else {
      return this._getFighterSaves();
    }
  }

  /**
   * Get fighter saves for the monster's hit dice level
   * @returns {object} Object containing fighter save values
   */
  _getFighterSaves() {
    const fighterLevel = Math.min(Math.max(this.hitDice.effective, 1), 20); // Clamp between 1-20
    const fighterSaves = {};
    
    for (const saveType in CONFIG.BASICFANTASYRPG.savesProgression.fighter) {
      const progression = CONFIG.BASICFANTASYRPG.savesProgression.fighter[saveType];
      fighterSaves[saveType] = progression[fighterLevel - 1]; // Array is 0-indexed
    }
    
    return fighterSaves;
  }

  /**
   * Migrate data from older versions
   * @param {object} source - The source data to migrate
   * @returns {object} The migrated data
   */
  static migrateData(source) {
    return super.migrateData(source);
  }
}
