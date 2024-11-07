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
          { label: 'Total Experience Filter', minId: 'exp-min', maxId: 'exp-max', min: 0, max: 10000000000 }
        ]"
          @update-filters="applyFilters"
      />
    </div>
    <hr class="my-8">

    <SortBy @sort-by="applySort" :type="type" :activities="activities" /> <!-- New SortByComponent -->
    <hr class="my-8">
    <slot name="title">
      <div class="navigation-return">
        <button @click="$emit('go-back', type)" class="nav-buttons">Back</button>
      </div>
    </slot>

    <PlayerTable :rows="filteredRows"></PlayerTable>
  </div>
</template>

<script>
import FilterComponent from '@/components/leaderboards/Players/FilterComponent.vue';
import magicPlayers from '@/components/leaderboards/data/magic-players.json';
import PlayerTable from "@/components/leaderboards/Players/PlayerTable.vue";
import SortBy from '@/components/leaderboards/Players/SortBy.vue'
export default {
  name: 'LeaderboardSearch',
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

  },
  data() {
    return {
      filters: {},
      filteredRows: this.rows,
      sortField: '',
      sortOrder: 'desc',
    };
  },

  watch: {
    playersData(newData) {
      // Update filteredRows if playersData changes
      this.filteredRows = newData;
    }
  },
  methods: {
    applyFilters(newFilters) {
      this.filters = { ...this.filters, ...newFilters }; // Merge new filters with existing defaults
      console.log(this.filters)
      this.filteredRows = this.rows.filter(row => {
        //console.log(row)
        //console.log(this.filters["exp-max"])

        return (
            (row.CombatLevel >= (this.filters["combat-min"] || 0)) &&
            (row.CombatLevel <= (this.filters["combat-max"] || 126)) &&
            (row.TotalLevel >= (this.filters["total-level-min"] || 0)) &&
            (row.TotalLevel <= (this.filters["total-level-max"] || 2500)) &&
            (row.TotalExperience >= (this.filters["total-exp-min"] || 0)) &&
            (row.TotalExperience <= (this.filters["total-exp-max"] || 10000000000))
        );
      });
    },
    applySort({ field, subField, order }) {
      const modifier = order === 'asc' ? 1 : -1;
      this.filteredRows = [...this.filteredRows].sort((a, b) => {
        const aValue = subField ? (a[field]?.[subField] || 0) : a[field];
        const bValue = subField ? (b[field]?.[subField] || 0) : b[field];
        return (aValue - bValue) * modifier;
      });
    }

  },
};
</script>

<style scoped>
@import '@/assets/leaderboard/navigation.css';

.filter-container{
  padding-top:1em;
  padding-bottom: 1em;
}



</style>
