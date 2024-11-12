<!-- Toplist.vue -->
<template>
  <div class="Toplist scroll-width-thin scroll-blue">
    <table class="w-full">
      <thead>
      <tr class="">
        <th class="">Player Count</th>
        <th class="">View</th>
        <th class="">{{ type === 'Skills' ? 'Skill Gains' : 'Activity Gains' }}</th>
      </tr>
      </thead>
      <tbody class="text-gray-600 dark:text-gray-100 ">
      <tr v-for="(row, index) in rows" :key="index">
        <!-- Player Count -->
        <td class="px-3 py-2">{{ row.lifetimeCount }}</td>

        <!-- View Button -->
        <td class="px-3 py-2">
          <button class="text-blue-500" @click="$emit('view-details', { id: row.id, activities: row.Activities })">View</button>

        </td>

        <!-- Skill Gains (Activities) -->
        <!-- Skill Gains (Images) -->
        <td class="px-3 py-2">
          <div class="skills-container">
            <TooltipImage
                v-for="(activity, i) in row.Activities"
                :key="i"
                :tooltip-text="activity"
                :src="getImageUrl(type, activity)"
                :alt="activity"
                class="img-skill"
            />
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import TooltipImage from "@/components/leaderboards/ToolTip.vue";
import { getImageUrl } from '@/utils/imageHelper.js';

export default {
  name: 'Toplist',
  components: { TooltipImage },
  props: {
    type: {
      type: String,
      default: 'Skills'
    },
    rows: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getImageUrl(type, activity) {
      return getImageUrl(type, activity);
    },
  }
};
</script>

<style scoped>

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
  z-index: 2;
}

table thead th {
  padding-left: 1rem;
}

table tbody td {
  padding-left: 1rem;
}

.skills-container {
  display: flex !important;
  flex-wrap: wrap !important; /* Allows images to wrap to a new line */
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
