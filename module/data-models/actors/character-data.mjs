import { CreatureDataModel } from "./creature-data.mjs";
import * as CONFIG from "../../helpers/config.mjs";

/**
 * Character Data Model for Basic Fantasy RPG
 * Extends CreatureDataModel with character-specific fields and calculations
 */
export class CharacterDataModel extends CreatureDataModel {
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
          blank: true,
          choices: CONFIG.BASICFANTASYRPG.characterRaces,
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

    // compute carried weight
    this.calculateCarriedWeight();

    // Skip automated calculations if manual mode is enabled
    if (this.manualMode) return;

    // Calculate next level XP based on class and current level
    this.xp.next = this._calculateNextLevelXP();

    // Calculate saving throws based on class and level
    this._calculateSavingThrows();

    // Calculate attack bonus based on class and level
    this.attackBonus.value = this._calculateAttackBonus();

    // Calculate base armor class from armor and dexterity
    this.armorClass.value = this._calculateBaseArmorClass();

    this.calculateEncumbrance();
    this.move.value = this.calculateMovement();

    // The parent class does generic derivations like adding bonus AB
    super.prepareDerivedData();
  }

  /**
   * Calculate the total carried item weight
   */
  calculateCarriedWeight() {
    const items = this.parent.items?.contents;

    // Define an object to store carried weight.
    let carriedWeight = {
      value: 0,
      _addWeight(moreWeight, quantity) {
        if (!quantity || quantity === "" || Number.isNaN(quantity) || quantity < 0) {
          return; // check we have a valid quantity, and do nothing if we do not
        }

        if (!Number.isNaN(parseFloat(moreWeight))) {
          this.value += parseFloat(moreWeight) * quantity;
        } else if (moreWeight === "*" && quantity > 0) {
          // "*" signals item that weigh 1 pound per 20 units
          this.value += Math.floor(quantity / 20);
        }
      },
    };

    // Iterate through items, allocating to containers
    for (const item of items) {

      // Append to gear.
      if (item.type === "item") {
        carriedWeight._addWeight(item.system.weight.value, item.system.quantity.value);
      } else if (["weapon", "armor"].includes(item.type)) {
        // Weapons and armor are always quantity 1
        carriedWeight._addWeight(item.system.weight.value, 1);
      }
    }

    // Iterate through money, add to carried weight
    if (this.money) {
      let numCoins = Number(this.money.gp.value);
      numCoins += this.money.pp.value;
      numCoins += this.money.ep.value;
      numCoins += this.money.sp.value;
      numCoins += this.money.cp.value;
      carriedWeight._addWeight("*", numCoins);
    }

    this.carriedWeight = Math.floor(carriedWeight.value);
  }

  /**
   *  Calculate movement speed
   */
  calculateMovement() {

    if (this.encumbrance === "impossible") {
      return 0;
    }

    const armors = this.parent?.itemTypes?.armor || [];
    let heaviestType = CONFIG.BASICFANTASYRPG.armorTypes.clothing;

    for (const armor of armors) {
      const armorType = armor.system.armorType.value;
      if (armorType === "metal") {
        heaviestType = CONFIG.BASICFANTASYRPG.armorTypes.metal;
        break;
      } else if (armorType === "leather") {
        heaviestType = CONFIG.BASICFANTASYRPG.armorTypes.leather;
      }
    }

    if (heaviestType === CONFIG.BASICFANTASYRPG.armorTypes.metal) {
      if (this.encumbrance === "light"){
        return 20;
      } else {
        return 10;
      }
    } else if (heaviestType === CONFIG.BASICFANTASYRPG.armorTypes.leather) {
      if (this.encumbrance === "light") {
        return 30;
      } else {
        return 20;
      }
    } else {
      if (this.encumbrance === "light") {
        return 40;
      } else {
        return 30;
      }
    }
  }

  calculateEncumbrance() {
    const carriedWeight = this.carriedWeight;
    const race = this.getCharacterRace() ?? "human";

    const strBonus = this.abilities.str.bonus;
    const thresholds = CONFIG.BASICFANTASYRPG.encumbranceThresholds[race][strBonus];

    if (carriedWeight <= thresholds.lightLoad) {
      this.encumbrance = "light";
    } else if (carriedWeight <= thresholds.heavyLoad) {
      this.encumbrance = "heavy";
    } else {
      this.encumbrance = "impossible";
    }
  }

  /**
   * Get the character's class
   * @returns {string} The character class
   */
  getCharacterClass() {
    return this.class.value || null;
  }

  /** Get the character's race
   *
   * @returns {string | null}
   */
  getCharacterRace() {
    return this.race.value || null;
  }

  /**
   * Get the character's current level, defaulting to 1
   * @returns {number} The current level
   */
  getCurrentLevel() {
    return this.level.value || 1;
  }

  /**
   * Get the 0-based level index for use with progression arrays
   * @returns {number} The level index (level - 1, minimum 0)
   */
  getLevelIndex() {
    return Math.max(0, this.getCurrentLevel() - 1);
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
    const characterClass = this.getCharacterClass();

    if (characterClass === null) {
      return 0;
    }

    const currentLevel = this.getCurrentLevel();

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
    const characterClass = this.getCharacterClass();
    const levelIndex = this.getLevelIndex();

    let savesTable;
    
    // Characters without a class use "normal man" saves
    if (characterClass === null) {
      savesTable = CONFIG.BASICFANTASYRPG.savesNormalMan;
    } else {
      savesTable = CONFIG.BASICFANTASYRPG.savesProgression[characterClass];
    }

    if (!savesTable) return;
    const displayClass = CONFIG.BASICFANTASYRPG.characterClasses[characterClass];

    // Iterate through each save type and set the value
    for (let [saveType, saveData] of Object.entries(this.saves)) {
      const saveValue = savesTable[saveType];
      saveData.breakdown = [];

      if (saveValue !== undefined) {
        if (Array.isArray(saveValue)) {
          // Class progression saves are arrays
          const saveIndex = Math.min(levelIndex, saveValue.length - 1);
          saveData.value = saveValue[saveIndex];
          saveData.breakdown.push({label: displayClass, value: saveData.value, sign: false});

        } else {
          // Normal man saves are fixed values
          saveData.value = saveValue;
          saveData.breakdown.push({label: "BASICFANTASYRPG.NormalMan", value: saveData.value, sign: false});
        }
      }
    }

    // now add racial bonus
    const race = this.getCharacterRace();
    if (Object.hasOwn(CONFIG.BASICFANTASYRPG.racialSaveBonus, race)) {
      // racial bonuses maps resistance names to a bonus
      const racialBonuses = CONFIG.BASICFANTASYRPG.racialSaveBonus[race];
      const displayRace = CONFIG.BASICFANTASYRPG.characterRaces[race];

      for (let [saveType, bonus] of Object.entries(racialBonuses)) {
        this.saves[saveType].value -= bonus;
        this.saves[saveType].breakdown.push({label: displayRace, value: bonus, sign: true});
      }
    }

  }

  /**
   * Calculate attack bonus based on class and current level
   * @returns {number} The calculated attack bonus
   */
  _calculateAttackBonus() {
    const characterClass = this.getCharacterClass();

    if (characterClass === null){
      return 0;
    }
    
    const levelIndex = this.getLevelIndex();

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
   * Find the AC granted by the current equipment
   * @private
   */
  _findEquipmentArmorClass() {
    const armors = this.parent?.itemTypes?.armor || [];

    // Find the highest armor class and best shield
    let bestArmorAC = 11;
    let bestName = "BASICFANTASYRPG.NoArmor";

    let bestShieldName = "";
    let bestShieldBonus = 0;

    for (const armor of armors) {
      const armorAC = armor.system.armorClass?.value || 0;

      if (armor.system.armorType.value === "shield" && armorAC > bestShieldBonus) {
        bestShieldName = armor.name;
        bestShieldBonus = armorAC;
      } else if (armorAC > bestArmorAC) {
        bestArmorAC = armorAC;
        bestName = armor.name;
      }
    }

    this.armorClass.breakdown.push({label: bestName, value: bestArmorAC, sign: false});
    if (bestShieldBonus !== 0){
      this.armorClass.breakdown.push({label: bestShieldName, value: bestShieldBonus, sign: true});
    }

    return bestArmorAC + bestShieldBonus;
  }

  /**
   * Calculate base armor class from armor items and dexterity bonus
   * @returns {number} The calculated base armor class
   * @private
   */
  _calculateBaseArmorClass() {
    this.armorClass.breakdown = [];

    const baseAC = this._findEquipmentArmorClass();
    const dexBonus = this.abilities.dex.bonus;

    if (dexBonus) {
      this.armorClass.breakdown.push({ label: "BASICFANTASYRPG.AbilityDex", value: dexBonus, sign: true });
    }

    return baseAC + (this.abilities.dex.bonus || 0);
  }

}
