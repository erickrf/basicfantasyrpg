/**
 * Base Item Data Model for Basic Fantasy RPG
 * Contains shared fields from the "base" template in template.json
 * @abstract
 */
export class BaseItemDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;

    return {
      description: new fields.HTMLField({
        initial: "",
      }),
    };
  }

  /**
   * Prepare derived data for the base item fields
   * This method should be called by subclasses in their prepareDerivedData method
   */
  prepareDerivedData() {}
}