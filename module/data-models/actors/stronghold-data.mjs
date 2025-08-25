/**
 * Stronghold Data Model for Basic Fantasy RPG
 * Extends TypeDataModel directly (no base template inheritance)
 */
export class StrongholdDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;

    return {
      biography: new fields.HTMLField({
        initial: "",
      }),

      costMultiplier: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: false,
          min: 0.1,
          initial: 1,
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.CostMultiplier",
        }),
      }),

      floors: new fields.ArrayField(new fields.ObjectField()),

      followers: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 0,
          initial: 0,
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Followers",
        }),
      }),

      workers: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          min: 1,
          initial: 1,
        }),
        label: new fields.StringField({
          initial: "BASICFANTASYRPG.Workers",
        }),
      }),
    };
  }

  /**
   * Prepare derived data for strongholds
   * This matches the logic from _prepareStrongholdDerivedData in actor.mjs
   */
  prepareDerivedData() {
    if (!this.parent?.itemTypes) return;

    const floors = this.parent.itemTypes.floor || [];
    const walls = this.parent.itemTypes.wall || [];

    let totalCost = 0;
    let totalHeight = 0;

    // Calculate floor costs and heights
    floors.forEach((floor) => {
      totalHeight += floor.system.height.value;
      totalCost += floor.system.price.value;
    });

    // Add wall costs
    walls.forEach((wall) => {
      totalCost += wall.system.price.value;
    });

    // Set derived height
    this.height = {
      value: totalHeight,
      label: "BASICFANTASYRPG.Height",
    };

    // Calculate cost with height modifier and cost multiplier
    // Each 10' of height adds 10% to the costs
    this.cost = {
      value: (totalCost + totalCost * (totalHeight / 100)) * this.costMultiplier.value,
      label: "BASICFANTASYRPG.Cost",
    };

    // Calculate build time
    this.buildTime = {
      value: Math.ceil(Math.max(this.cost.value / this.workers.value, Math.sqrt(this.cost.value))),
      label: "BASICFANTASYRPG.BuildTime",
    };
  }

  /**
   * Migrate data from older versions
   * @param {object} source - The source data to migrate
   * @returns {object} The migrated data
   */
  static migrateData(source) {
    // Handle any data structure changes for existing strongholds
    // For now, just return the source data as-is
    return source;
  }
}
