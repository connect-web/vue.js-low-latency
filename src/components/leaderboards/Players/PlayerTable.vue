<template>
  <div class="table-scroll-container">
    <table class="" id="players-table">
      <thead>
      <tr class="text-gray-400">
        <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Username</th>
        <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Combat Level</th>
        <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Total Level</th>
        <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Total Experience</th>
        <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Skill Levels</th>
        <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Minigames</th>
        <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Skill Gains (Daily)</th>
        <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Minigame Gains (Daily)</th>
      </tr>
      </thead>
      <tbody class="text-gray-600 dark:text-gray-100">
      <tr v-for="(player, index) in displayedPlayers" :key="index">
        <td class="px-3 py-2">{{ player.Username }}</td>
        <td class="px-3 py-2">{{ player.CombatLevel }}</td>
        <td class="px-3 py-2">{{ player.TotalLevel }}</td>
        <td class="px-3 py-2">{{ formatAmount(player.TotalExperience) }}</td>

        <!-- Skill Levels Column using PlayerStatsCard -->
        <td class="px-3 py-2">
          <PlayerStatsCard :type="'Skills'" :skills="player.SkillLevels" />
        </td>

        <!-- Minigames Column using PlayerStatsCard -->
        <td class="px-3 py-2">
          <PlayerStatsCard :type="'Minigames'" :minigames="player.Minigames" />
        </td>

        <!-- Skill Gains Column using PlayerStatsCard -->
        <td class="px-3 py-2">
          <PlayerStatsCard :type="'Skills'" :skills="player.SkillGains" />
        </td>

        <!-- Minigame Gains Column using PlayerStatsCard -->
        <td class="px-3 py-2">
          <PlayerStatsCard :type="'Minigames'" :minigames="player.MinigameGains" />
        </td>
      </tr>
      </tbody>
    </table>

    <div class="flex w-full items-center mb-7 player-nav-buttons">
      <div class="ml-auto sm:inline-flex hidden items-center page-navigation-container">
        <span class="mr-3 pagination-top">Page {{ currentPage }} of {{ totalPages }}</span>
        <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="pagination-left inline-flex mr-2 items-center h-8 w-8 justify-center rounded-md  border border-gray-200 dark:border-gray-800 leading-none py-0"
        >
          <svg class="w-4" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="pagination-right inline-flex items-center h-8 w-8 justify-center rounded-md  border border-gray-200 dark:border-gray-800 leading-none py-0"
        >
          <svg class="w-4" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import PlayerStatsCard from '@/components/leaderboards/Players/PlayerStatsCard.vue';
import {viewLargeNumbers, viewTruncatedLargeNumbers} from "@/utils/numberFilters.js";

export default {
  name: 'PlayerTable',
  components: { PlayerStatsCard },
  props: {
    rows: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.rows.length / this.itemsPerPage);
    },
    displayedPlayers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.rows.slice(start, end); // Use rows prop instead of hardcoded data
    }
  },
  methods: {
    formatAmount(amount) {
      return viewTruncatedLargeNumbers(amount);
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    }
  }
};
</script>

<style scoped>

.table-scroll-container{
  overflow-y: auto; /* Enable vertical scrolling */
  width: 100%; /* Full-width container */
  height: 100%;
}

#players-table {
  width: 100%; /* Full table width */
  border-collapse: collapse; /* Collapse table borders */
  font-size: 1.5rem;
  overflow: auto;
}

#players-table th:nth-child(-n+4), /* First four columns */
#players-table td:nth-child(-n+4) {
  width: 5%; /* Each of the first 4 columns takes up 5% */
}

#players-table th:nth-child(n+5), /* Remaining columns */
#players-table td:nth-child(n+5) {
  width: 20%; /* Remaining columns take up the rest */
}

#players-table th {
  position: sticky;
  top:0;
  color: white;
  padding-top: 1rem;
  z-index: 2;
  background: #232323;
}

#players-table td {
  border-bottom: 1px solid white;
}

.page-navigation-container{
  background-color: black;
  padding:0.75rem;
  border: 1px solid #0d7eff;
  border-radius: .75rem;

}


.pagination-left,
.pagination-right {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.3);
  color: #0d7eff;
}

.pagination-left[disabled],
.pagination-right[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}

.player-nav-buttons{
  font-size: 2rem;
  color: #0d7eff;
  bottom: 0;
  right: 2rem;
  position: fixed;
  z-index: 2;
}

</style>
