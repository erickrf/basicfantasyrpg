import { BaseItemDataModel } from "./base-item-data.mjs";
import { BASICFANTASYRPG } from "../../helpers/config.mjs";

/**
 * Valuable Item Data Model for Basic Fantasy RPG
 * Extends BaseItemDataModel with valuable template fields from template.json
 */
export class ValuableItemDataModel extends BaseItemDataModel {
  /**
   * Migrate legacy data to current schema
   * @param {Object} source The source data to migrate
   * @returns {Object} The migrated data
   */
  static migrateData(source) {
    source = super.migrateData(source);

    // Handle legacy price field migration
    if (typeof source.price === 'string') {
      const priceMatch = source.price.match(/^(\d+(?:\.\d+)?)\s*([a-z]{2})$/i);
      if (priceMatch) {
        const [, amount, currency] = priceMatch;
        const validCurrencies = Object.keys(BASICFANTASYRPG.money);
        const currencyLower = currency.toLowerCase();
        
        source.price = {
          amount: parseFloat(amount),
          currency: validCurrencies.includes(currencyLower) ? currencyLower : "gp",
          label: "BASICFANTASYRPG.Price"
        };
      } else {
        // Fallback for unparseable prices
        source.price = {
          amount: 0,
          currency: "gp", 
          label: "BASICFANTASYRPG.Price"
        };
      }
    }
  }

  static defineSchema() {
    const fields = foundry.data.fields;
    const baseSchema = super.defineSchema();

    return {
      ...baseSchema,
      
      price: new fields.SchemaField({
        amount: new fields.NumberField({
          required: true,
          nullable: false,
          min: 0,
          initial: 0,
        }),
        currency: new fields.StringField({
          required: true,
          initial: "gp",
          choices: Object.keys(BASICFANTASYRPG.money),
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Price",
        }),
      }),

      weight: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          min: 0,
          initial: 1,
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Weight",
        }),
      }),
    };
  }
}