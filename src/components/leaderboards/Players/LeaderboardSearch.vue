<template>
  <div class="flex-grow flex overflow-x-hidden flex-col h-full">
    <div class="bg-white dark:bg-gray-900 overflow-y-auto h-1/5 px-7 pt-4 pb-4">

      <!-- Title Section -->
      <div>
        <slot name="title">
          <h1 class="text-3xl text-gray-900 dark:text-white">Filters</h1>
        </slot>
      </div>



      <!-- Filter Section -->
      <FilterComponent
          :filters="[
          { label: 'Combat Filter', minId: 'combat-min', maxId: 'combat-max', min: 0, max: 126 },
          { label: 'Total Level Filter', minId: 'level-min', maxId: 'level-max', min: 0, max: 2500 },
          { label: 'Total Experience Filter', minId: 'exp-min', maxId: 'exp-max', min: 0, max: 10000000000 }
        ]"
          @update-filters="applyFilters"
      />
    </div>
  <p>test</p>

  </div>

</template>

<script>
import FilterComponent from '@/components/leaderboards/Players/SearchFilter.vue';
import magicPlayers from '@/components/leaderboards/data/magic-players.json';
import PlayerTable from "@/components/leaderboards/Players/PlayerTable.vue";
export default {
  name: 'LeaderboardSearch',
  components: {
    PlayerTable,
    FilterComponent,
  },
  props: {
    rows: {
      type: Array,
      default: () => magicPlayers.data
    }
  },
  data() {
    return {
      filters: {},
      filteredRows: this.rows,
    };
  },
  methods: {
    applyFilters(newFilters) {
      this.filters = newFilters;
      this.filteredRows = this.rows.filter(row => {
        return (
            row.combatLevel >= this.filters["combat-min"] &&
            row.combatLevel <= this.filters["combat-max"] &&
            row.totalLevel >= this.filters["level-min"] &&
            row.totalLevel <= this.filters["level-max"] &&
            row.totalExperience >= this.filters["exp-min"] &&
            row.totalExperience <= this.filters["exp-max"]
        );
      });
    },
  },
};
</script>

<style scoped>
.Toplist {
  /* Additional styling for the leaderboard table section */
}
.leaderboard-header{
  margin-top:2rem;
}

</style>
