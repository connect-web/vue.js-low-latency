<template>
  <div class="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
    <div class="flex-grow overflow-hidden h-full flex flex-col">
      <!-- Header Component -->
      <Header active="leaderboards" />
      <LeaderboardToplist></LeaderboardToplist>

      <!-- Main Content Area -->

    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import LeaderboardToplist from "@/components/leaderboards/LeaderboardToplist.vue";
import PlayerTable from "@/components/leaderboards/Players/PlayerTable.vue";
export default {
  name: 'Dashboard',
  components: {
    PlayerTable,
    Header,
    LeaderboardToplist
  },
  data() {
    return {
      skillToplist: [],
      minigameToplist: [],
    };
  },
  created() {
    // Fetch data and populate skillToplist and minigameToplist here
  },
};
</script>

<style scoped>

</style>
