<template>
  <div class="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
    <div class="flex-grow overflow-hidden h-full flex flex-col">
      <!-- Header Component -->
      <Header active="leaderboards" />

      <!-- Conditionally Render Components -->
      <LeaderboardToplist v-if="!showSearch" :type="type" @view-details="handleViewDetails" @update:type="updateType" />
      <LeaderboardSearch v-else :rows="rows" :activities="activities" :type="type" @go-back="handleGoBack" />
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import LeaderboardToplist from "@/components/leaderboards/LeaderboardToplist.vue";
import PlayerTable from "@/components/leaderboards/Players/PlayerTable.vue";
import LeaderboardSearch from "@/components/leaderboards/Players/LeaderboardSearch.vue";
export default {
  name: 'Leaderboards',
  components: {
    LeaderboardSearch,
    PlayerTable,
    Header,
    LeaderboardToplist
  },
  data() {
    return {
      showSearch:false,
      type: 'Skills',
      skillToplist: [],
      minigameToplist: [],
    };
  },
  created() {
    // Fetch data and populate skillToplist and minigameToplist here
  },
  methods: {
    async handleViewDetails({ playersData, activities, type }) {
      // Set rows and show LeaderboardSearch
      this.rows = playersData;
      this.activities = activities
      this.showSearch = true;
      this.type = type;
    },
    handleGoBack(type) {
      console.log(type);
      // Toggle back to show LeaderboardToplist and hide LeaderboardSearch
      this.showSearch = false;
      this.type = type;
    },
    updateType(newType) {
      this.type = newType; // Update the type in the parent component
    }
  }
};
</script>

<style scoped>

</style>
