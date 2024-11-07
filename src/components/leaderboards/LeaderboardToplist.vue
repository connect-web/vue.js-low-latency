<template>
  <div class="flex-grow flex overflow-x-hidden flex-col">
    <slot name="title">
      <h1 class="text-3xl">Leaderboard</h1>
    </slot>

    <hr class="my-8">

    <!-- Type Selection Buttons -->
    <slot name="leaderboard-type">
      <div class="navigation-return">
        <button
            @click="setType('Skills')"
            :class="{'nav-buttons': true, 'selected': type === 'Skills'}"
        >
          Skills
        </button>
        <button
            @click="setType('Activities')"
            :class="{'nav-buttons': true, 'selected': type === 'Activities'}"
        >
          Activities
        </button>
      </div>
    </slot>

    <hr class="my-8">


    <!-- Toplist Table Section -->
    <div class="Toplist scroll-width-thin scroll-blue">
      <table class="w-full">
        <thead>
        <tr class="">
          <th class=""><u>Player Count</u></th>
          <th class=""><u>View</u></th>
          <th class=""><u>{{ type === 'Skills' ? 'Skill Gains' : 'Activity Gains' }}</u></th>
        </tr>
        </thead>
        <tbody class="text-gray-600 dark:text-gray-100 ">
        <tr v-for="(row, index) in rows" :key="index">
          <!-- Player Count -->
          <td class="px-3 py-2">{{ row.lifetimeCount }}</td>

          <!-- View Button -->
          <td class="px-3 py-2">
            <button class="text-blue-500" @click="viewDetails(row.id, row.Activities)">View</button>
          </td>

          <!-- Skill Gains (Activities) -->
          <!-- Skill Gains (Images) -->
          <td class="px-3 py-2">
            <div class="skills-container">
              <img
                  v-for="(activity, i) in row.Activities"
                  :key="i"
                  :src="getImageUrl(this.type, activity)"
                  :alt="activity"
                  class="img-skill"
              />
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>

</template>

<script>
import skillsLeaderboard from '@/components/leaderboards/data/skills-leaderboard.json';
import LeaderboardService from '@/services/LeaderboardService.js';
import {getImageUrl} from '@/utils/imageHelper.js';

export default {
  name: 'LeaderboardToplist',
  props: {
    type: {
      type: String,
      default: 'Skills'
    }
  },
  data() {
    return {
      rows: [],
    }
  },
  watch: {
    type: {
      immediate: true,
      handler(newType) {
        this.loadLeaderboards();
      }
    }
  },


  async created() {
    await this.loadLeaderboards();
  },
  methods: {
    async loadLeaderboards() {
      // Fetch leaderboard data based on the current type
      this.rows = await LeaderboardService.fetchLeaderboard(this.type);
    },
    async setType(newType) {
      if (this.type !== newType) {
        this.$emit('update:type', newType);
        //await this.loadLeaderboards(); // Refresh leaderboard data
      }
    },
    async viewDetails(id, activities) {
      console.log(`Called viewDetails with ID: ${id} and type: ${this.type}`);
      try {
        // Fetch player data for the specific ID and current type
        const playersData = await LeaderboardService.fetchPlayers(id, this.type);

        // Emit event to pass data to the parent component or use as needed
        let type = this.type
        this.$emit('view-details', {playersData, activities, type});
      } catch (error) {
        console.error(`Error fetching players data for ${this.type}:`, error);
      }
    },
    getImageUrl(type, activity) {
      return getImageUrl(type, activity);
    },
  },

}

</script>
<style scoped>
@import '@/assets/leaderboard/navigation.css';

.scroll-width-thin {
  scrollbar-width: thin;
  scrollbar-color: #0d7eff rgba(0, 0, 0, 0.05);
}


h1 {
  font-size: 4rem;
  padding: 1rem;
}

.Toplist {
  background: rgba(0, 0, 0, 0.3);
  font-size: 2rem;
  overflow: auto;
  text-align: left;
}


table thead {
  height: 3rem;
  position: sticky;
  top: 0;
  background: #232323;
}

table thead th {
  padding-left: 1rem;
}

table tbody td {
  padding-left: 1rem;
}

.skills-container {
  display: flex;
  flex-wrap: wrap; /* Allows images to wrap to a new line */
  gap: 0.5rem; /* Space between images */

}

table td button {
  font-size: 2rem;
}

.img-skill {
  max-width: 30px;
  max-height: 30px;
  width: auto;
  height: auto;
  object-fit: contain; /* Keeps aspect ratio intact */
}


</style>
