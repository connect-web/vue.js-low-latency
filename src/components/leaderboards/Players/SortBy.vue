<template>
  <div class="sort-container">
    <label class="sort-label" for="sort-select">Sort By:</label>
    <select id="sort-select" v-model="selectedOption" @change="applySort">
      <option value="">Select</option>
      <option v-for="option in sortingOptions" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <button class="nav-buttons" @click="toggleOrder">{{ sortOrder === 'asc' ? 'Ascending' : 'Descending' }}</button>
  </div>
</template>


<script>
export default {
  props: {
    type: {
      type: String,
      default: 'Skills'
    },
    activities: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    sortingOptions() {
      if (this.type === 'Skills') {
        return [
          ...this.activities.map(activity => ({ label: `Skills: ${activity}`, value: `Skills.${activity}` })),
          ...this.activities.map(activity => ({ label: `Skill Gains: ${activity}`, value: `SkillGains.${activity}` }))
        ];
      } else {
        return [
          ...this.activities.map(activity => ({ label: `Activity: ${activity}`, value: `Minigames.${activity}` })),
          ...this.activities.map(activity => ({ label: `Activity Gains: ${activity}`, value: `MinigameGains.${activity}` }))
        ];
      }
    }
  },


  data() {
    return {
      selectedOption: '',
      sortOrder: 'desc', // Default to ascending order
    };
  },
  mounted() {
    // Set the default selected option to the last item in sortingOptions
    if (this.sortingOptions.length > 0) {
      this.selectedOption = this.sortingOptions[this.sortingOptions.length - 1].value;
      this.applySort(); // Optionally, apply sort immediately with the last option
    }
  },
  methods: {
    applySort() {
      const [mainKey, subKey] = this.selectedOption.split('.'); // Split the selected option by '.' to get nested keys
      this.$emit('sort-by', { field: mainKey, subField: subKey, order: this.sortOrder });
    },
    toggleOrder() {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      this.applySort(); // Re-apply sort with the updated order
    },
  }

};
</script>

<style scoped>
@import '@/assets/leaderboard/navigation.css';


.sort-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 1200px;
  padding: 0.5rem 1rem; /* Add padding around container */
  text-align: center;
  margin:auto;
}

.sort-label {
  font-size: 1.5rem; /* Increase font size */
  min-width: 200px; /* Ensure minimum width to prevent "squished" appearance */

}

#sort-select {
  padding: 0.3rem 1rem; /* Add padding for readability */
  font-size: 1rem; /* Match font size to label */
  border-radius: 4px;
}

.nav-buttons {
  padding: 0.5rem 1rem; /* Ensure consistent padding with other elements */
  font-size: 1rem;
  border-radius: 4px;
}


</style>
