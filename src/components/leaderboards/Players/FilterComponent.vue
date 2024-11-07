<template>
  <div class="filters-container">
    <div
        v-for="filter in filters"
        :key="filter.label"
        class="filter-column"
    >
      <div class="filter-header">{{ filter.label }}</div>
      <div class="filter-dropdown">
        <div class="filter-row" v-for="input in filter.inputs" :key="input.id">
          <label :for="input.id">{{ input.placeholder }}:</label>
          <input
              v-model="displayValues[input.id]"
              :id="input.id"
              :placeholder="input.placeholder"
              :min="input.min"
              :max="input.max"
              @input="updateFilterValue(input.id, $event.target.value)"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { viewLargeNumbers, parseLargeNumber } from '@/utils/numberFilters.js';

export default {
  name: "FilterComponent",
  data() {
    return {
      filterValues: {
        "combat-min": 0,
        "combat-max": 126,
        "total-level-min": 0,
        "total-level-max": 2500,
        "total-exp-min": 0,
        "total-exp-max": 10000000000,
        "unique-skills-min": 0,
        "unique-skills-max": 25,
        "unique-activities-min": 0,
        "unique-activities-max": 500,
        "unique-skills-gains-min": 0,
        "unique-skills-gains-max": 25,
        "unique-activities-gains-min": 0,
        "unique-activities-gains-max": 500,


      },
      displayValues: {}, // Stores formatted values for display
      filters: [
        {
          label: "Combat Filter",
          inputs: [
            { id: "combat-min", placeholder: "min", min: 0, max: 126 },
            { id: "combat-max", placeholder: "max", min: 0, max: 126 },
          ],
        },
        {
          label: "Total Level Filter",
          inputs: [
            { id: "total-level-min", placeholder: "min", min: 0, max: 2500 },
            { id: "total-level-max", placeholder: "max", min: 0, max: 2500 },
          ],
        },
        {
          label: "Total Experience Filter",
          inputs: [
            { id: "total-exp-min", placeholder: "min", min: 0, max: 10000000000 },
            { id: "total-exp-max", placeholder: "max", min: 0, max: 10000000000 },
          ],
        },
        {
          label: "Unique Skills",
          inputs: [
            { id: "unique-skills-min", placeholder: "min", min: 0, max: 25 },
            { id: "unique-skills-max", placeholder: "max", min: 0, max: 25 },
          ],
        },
        {
          label: "Unique Activities",
          inputs: [
            { id: "unique-activities-min", placeholder: "min", min: 0, max: 500 },
            { id: "unique-activities-max", placeholder: "max", min: 0, max: 500 },
          ],
        },
          {
          label: "Unique Skill gains",
          inputs: [
            { id: "unique-skills-gains-min", placeholder: "min", min: 0, max: 25 },
            { id: "unique-skills-gains-max", placeholder: "max", min: 0, max: 25 },
          ],
        },
        {
          label: "Unique Activity gains",
          inputs: [
            { id: "unique-activities-gains-min", placeholder: "min", min: 0, max: 500 },
            { id: "unique-activities-gains-max", placeholder: "max", min: 0, max: 500 },
          ],
        },



      ],
    };
  },
  created() {
    // Initialize display values with formatted numbers
    this.filters.forEach(filter =>
        filter.inputs.forEach(input => {
          this.displayValues[input.id] = viewLargeNumbers(this.filterValues[input.id]);
        })
    );
  },
  methods: {
    updateFilterValue(id, value) {
      // Update display and parsed values
      const parsedValue = parseLargeNumber(value);
      this.displayValues[id] = viewLargeNumbers(parsedValue);
      this.filterValues[id] = parsedValue;
      this.$emit("updateFilters", this.filterValues); // Emit updated filter values
    }
  },
};
</script>

<style scoped>
.filters-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.filter-column {
  position: relative;
  cursor: pointer;
  margin: 0 15px;
}

.filter-header {
  font-size: 1.5rem;
  padding: 0.5em;
  background-color: rgba(47, 47, 47, 0.9);
  color: white;
  text-align: center;
  border-radius: 8px;
}

.filter-dropdown {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: rgba(47, 47, 47, 0.9);
  padding: 1em;
  border: 1px solid #cccccc;
  border-radius: 8px;
  min-width: 200px;
  z-index: 10;
}

.filter-column:hover .filter-dropdown {
  display: block;
}


.filter-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.filter-row label {
  font-size: 1rem;
  flex: 0 0 30%; /* Adjusts label width */
  text-align: right;
}

.filter-row input {
  font-size: 1rem;
  flex: 1;
  padding: 0.5em;
  border: 1px solid #cccccc;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.3);
}


</style>
