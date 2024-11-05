<template>
  <div class="filters-container">
    <div class="filters">
      <div
          v-for="filter in filters"
          :key="filter.label"
          class="filter-column"
      >
        <div class="filter-item">
          <label :class="filter.className">{{ filter.label }}</label>
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


  background: #0d7eff;
}

.filters {
  display: flex;
  flex-direction: row; /* Ensures filters are stacked horizontally */
  gap: 20px; /* Space between each filter column */
  flex-wrap: wrap; /* Allows wrapping on smaller screens */
  width: 100%;
  max-width: 1200px; /* Optional max-width */
}

.filter-column {
  flex: 1;
  min-width: 250px; /* Adjust to control minimum column width */
  background-color: rgba(47, 47, 47, 0.5);
  padding: 1em;
  border: 1px solid #cccccc;
  display: flex;
  flex-direction: column;
  align-items: center;
}




.filter-item label{
  font-size: 2rem;
}


.filter-row {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.filter-row label {
  font-size: 2rem;
  flex: 0 0 25%; /* Takes up 25% of the row's width */
  text-align: right;
  padding-right: 8px; /* Adds a little space between label and input */
}

.filter-row input {
  font-size: 1.5rem;
  flex: 1; /* Takes up the remaining 75% */
  width: 100%; /* Ensures input fills the remaining space */
  padding: 0.5em;
  border: 1px solid #cccccc;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.3); /* Optional: Adjust based on theme */
}




</style>
