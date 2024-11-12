<template>
  <div class="flex-grow flex overflow-x-hidden flex-col h-full">
    <slot name="filter-title">
      <h1 class="text-3xl text-gray-900 dark:text-white">Filters</h1>
    </slot>

    <div class="filter-container">
      <FilterComponent
          :filters="[
          { label: 'Combat Filter', minId: 'combat-min', maxId: 'combat-max', min: 0, max: 126 },
          { label: 'Total Level Filter', minId: 'level-min', maxId: 'level-max', min: 0, max: 2500 },
          { label: 'Total Experience Filter', minId: 'exp-min', maxId: 'exp-max', min: 0, max: 10000000000 },
          { label: 'Unique Skills', minId: 'unique-skills-min', maxId: 'unique-skills-max', min: 0, max: 25 },
          { label: 'Unique Skill gains', minId: 'unique-skills-gains-min', maxId: 'unique-skills-gains-max', min: 0, max: 25 },

          { label: 'Unique Activities', minId: 'unique-activities-min', maxId: 'unique-activities-max', min: 0, max: 500 },
          { label: 'Unique Activity gains', minId: 'unique-activities-gains-min', maxId: 'unique-activities-gains-max', min: 0, max: 500 },

        ]"
          @update-filters="applyFilters"
      />
    </div>
    <hr class="my-8">

    <SortBy @sort-by="applySort" :type="type" :activities="activities"/> <!-- New SortByComponent -->
    <hr class="my-8">
    <slot name="title">
      <div class="navigation-return">
        <button @click="$emit('go-back', type)" class="nav-buttons">Back</button>
      </div>
    </slot>

    <PlayerTable :rows="filteredAndSortedRows"/>
  </div>
</template>

<script>
import FilterComponent from '@/components/leaderboards/Players/FilterComponent.vue';
import magicPlayers from '@/components/leaderboards/data/magic-players.json';
import PlayerTable from "@/components/leaderboards/Players/PlayerTable.vue";
import SortBy from '@/components/leaderboards/Players/SortBy.vue'

export default {
  name: 'PlayersComponent',
  components: {
    PlayerTable,
    FilterComponent,
    SortBy
  },
  props: {
    rows: {
      type: Array,
      default: () => [],
    },
    activities: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'Skills',
    },
    ml: {
      type: Boolean,
      default: false,
    },

  },
  data() {
    return {
      filters: {},
      sortField: '',
      sortOrder: 'asc'
    };
  },
  computed: {
    filteredAndSortedRows() {
      // Step 1: Apply filters to rows

      const getFilterValue = (key, defaultValue) =>
          this.filters[key] !== null && this.filters[key] !== undefined ? this.filters[key] : defaultValue;

      let filtered = this.rows.filter(row => {

        let skill_count = Object.keys(row.SkillLevels).length;
        if (row.SkillLevels.hasOwnProperty("Overall")) {
          skill_count -= 1;
        }
        let skill_gain_count = Object.keys(row.SkillGains).length;
        if (row.SkillLevels.hasOwnProperty("Overall")) {
          skill_gain_count -= 1;
        }
        const activity_count = Object.keys(row.Minigames).length;
        const activity_gain_count = Object.keys(row.MinigameGains).length;

        return (
            (skill_count >= getFilterValue("unique-skills-min", 0)) &&
            (skill_count <= getFilterValue("unique-skills-max", 25)) &&
            (skill_gain_count >= getFilterValue("unique-skills-gains-min", 0)) &&
            (skill_gain_count <= getFilterValue("unique-skills-gains-max", 25)) &&

            (activity_count >= getFilterValue("unique-activities-min", 0)) &&
            (activity_count <= getFilterValue("unique-activities-max", 500)) &&
            (activity_gain_count >= getFilterValue("unique-activities-gains-min", 0)) &&
            (activity_gain_count <= getFilterValue("unique-activities-gains-max", 500)) &&

            (row.CombatLevel >= getFilterValue("combat-min", 0)) &&
            (row.CombatLevel <= getFilterValue("combat-max", 126)) &&
            (row.TotalLevel >= getFilterValue("total-level-min", 0)) &&
            (row.TotalLevel <= getFilterValue("total-level-max", 2500)) &&
            (row.TotalExperience >= getFilterValue("total-exp-min", 0)) &&
            (row.TotalExperience <= getFilterValue("total-exp-max", 10000000000))
        );
      });

      // Step 2: Apply sorting to the filtered data
      if (this.sortField) {
        const modifier = this.sortOrder === 'asc' ? 1 : -1;
        filtered = filtered.sort((a, b) => {
          const aValue = this.sortField.includes('.')
              ? this.getNestedValue(a, this.sortField)
              : a[this.sortField];
          const bValue = this.sortField.includes('.')
              ? this.getNestedValue(b, this.sortField)
              : b[this.sortField];
          return (aValue - bValue) * modifier;
        });
      }
      return filtered;
    }
  },
  methods: {
    // Method to update filters
    applyFilters(newFilters) {
      this.filters = {...this.filters, ...newFilters};
    },
    // Method to update sorting
    applySort({field, subField, order}) {
      this.sortField = subField ? `${field}.${subField}` : field;
      this.sortOrder = order;
    },
    // Helper method to retrieve nested properties
    getNestedValue(obj, path) {
      return path.split('.').reduce((value, key) => (value ? value[key] : 0), obj);
    }
  }
};
</script>

<style scoped>
@import '@/assets/leaderboard/navigation.css';

.filter-container {
  padding-top: 1em;
  padding-bottom: 1em;
}


</style>
