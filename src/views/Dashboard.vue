<template>

  <div class="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex flex-col overflow-hidden text-sm">
    <!-- Header component, it stays at the top -->
    <Header active="dashboard" />


    <!-- Main content area, fills the rest of the screen -->
    <div class="flex-grow overflow-hidden flex flex-col">
      <div class="sm:p-7 p-4 flex-grow overflow-y-auto">
        <!-- Card list section -->
        <div class="card-list grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <GlobalStatsCard title="Users tracked" icon="zmdi-my-location" :value="formattedUsersTracked" color="blue" />
          <GlobalStatsCard title="Users banned" icon="zmdi-block" :value="formattedUsersBanned" color="blue" />
          <GlobalStatsCard title="Total banned Experience" icon="zmdi-chart" :value="formattedTotalBannedExperience" color="blue" />
          <GlobalStatsCard title="Last updated" icon="zmdi-time" :value="formatTimeSinceUpdate" color="blue" />
        </div>
        <!-- Banned Tracking Experience Section -->
        <hr class="my-8">

        <div class="sm:p-7 p-4 flex-grow overflow-y-auto">
          <h1>Sum of experience per skill from the tracked banned users.</h1>
        </div>

        <hr class="my-8">
        <ScoreTrackerContainer type="Skills" :skills="stats.Skills" />


        <hr class="my-8">

        <div class="sm:p-7 p-4 flex-grow overflow-y-auto">
          <h1>Sum of score per activity from the tracked banned users.</h1>
        </div>

        <hr class="my-8">

        <ScoreTrackerContainer type="Minigames" :minigames="stats.Minigames" />


      </div>

    </div>
  </div>


</template>

<script>
import Header from '../components/Header.vue'
import GlobalStatsCard from '../components/profile/globalStatsCards.vue'
import ApiService from '../services/GlobalStats.js'
import ScoreTrackerContainer from '../components/profile/ScoreTrackerContainer.vue';

import { viewLargeNumbers } from '../utils/numberFilters.js'
import { formatTimeSince } from '../utils/timeFilters.js'

export default {
  name: 'Dashboard',
  components: {
    Header,
    GlobalStatsCard,
    ScoreTrackerContainer
  },
  data() {
    return {
      stats: {
        SuspiciousUsers: 0,
        Bans: 0,
        TotalExperience: 0,
        Last_updated: 'N/A',
        Skills: {},
        Minigames: {}
      }
    };
  },
  computed: {
    formattedUsersTracked() {
      return viewLargeNumbers(this.stats.SuspiciousUsers);
    },
    formattedUsersBanned() {
      return viewLargeNumbers(this.stats.Bans);
    },
    formattedTotalBannedExperience() {
      return viewLargeNumbers(this.stats.TotalExperience);
    }
    ,
    formatTimeSinceUpdate() {
      return formatTimeSince(this.stats.Last_updated);
    }

  },
  async created() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css';


    document.head.appendChild(link);

    // Fetch global stats when the component is created
    try {
      this.stats = await ApiService.getGlobalStats(); // Assuming getGlobalStats returns an object with these properties
      console.log(this.stats);
    } catch (error) {
      console.error("Error fetching global stats:", error);
    }
  }
};

</script>

<style scoped>
/* Adjust the height and flex behavior of the layout */
.bg-gray-100 {
  height: 100vh; /* Full viewport height */
}

.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Responsive grid */
  gap: 1rem; /* Gap between cards */
  padding-bottom: 1em;
}


h1{
  font-size: 2em;
}

</style>
