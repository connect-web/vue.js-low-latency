<template>
  <div v-if="Object.keys(itemsToDisplay).length" id="playerStatsContainer" class="sm:p-4 p-2">
    <div class="card-grid">
      <div v-for="(amount, item) in sortedItems" :key="item" class="card-item">
        <div class="icon-container">
          <!-- Tooltip Container -->
          <div class="tooltip-container">
            <img :src="getIconImage(item)" :alt="`${item} Icon`" class="img-icon" />
            <!-- Tooltip with Item Name -->
            <div class="tooltip">{{ item }}</div>
          </div>
        </div>
        <p class="value">{{ formatAmount(amount) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {viewLargeNumbers, viewTruncatedLargeNumbers} from '@/utils/numberFilters.js';

export default {
  name: 'PlayerStatsCard',
  props: {
    type: {
      type: String,
      default: 'Skills' // Either "Skills" or "Minigames"
    },
    skills: {
      type: Object,
      default: null
    },
    minigames: {
      type: Object,
      default: null
    }
  },
  computed: {
    itemsToDisplay() {
      return this.type === 'Skills' ? this.skills : this.minigames || {};
    },
    sortedItems() {
      return Object.fromEntries(
          Object.entries(this.itemsToDisplay).sort((a, b) => b[1] - a[1])
      );
    }
  },
  methods: {
    formatAmount(amount) {
      return viewTruncatedLargeNumbers(amount);
    },
    sanitizeFileName(input) {
      return input.replace(/[^a-zA-Z\s]/g, '').replaceAll(' ', '_');
    },
    getIconImage(item) {
      const folder = this.type === 'Skills' ? 'skill_icons' : 'minigame_icons';
      const fileName = this.sanitizeFileName(item.toLowerCase());
      return `/img/${folder}/${fileName}.png`;
    }
  }
};
</script>

<style scoped>
#playerStatsContainer {
  text-align: center;
}

.card-grid {
  display: grid;
  gap: 6px;
  justify-content: center;
  align-items: center;
  /* Responsive grid columns based on number of items */
  grid-template-columns: repeat(auto-fit, minmax(40px, 2fr)); /* Minimum width for icons */
}

.card-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}

.icon-container {
  width: 100%;
  padding-top: 100%; /* Aspect ratio trick for flexible square layout */
  position: relative;
}

.img-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain; /* Scales icon while maintaining aspect ratio */
}

.value {
  font-size: 1.5rem;
  color: #ffd220;
  margin-top: 2px;
}


/* Tooltip styling */
.tooltip {
  visibility: hidden; /* Hidden by default */
  background-color: #333; /* Dark background */
  color: #fff; /* White text */
  text-align: center;
  padding: 5px;
  border-radius: 4px;
  position: absolute;
  bottom: 100%; /* Position above the image */
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.2s;
}

/* Tooltip arrow */
.tooltip::after {
  content: "";
  position: absolute;
  top: 100%; /* Position below the tooltip */
  left: 50%;
  transform: translateX(-50%);
  border-width: 5px;
  border-style: solid;
  border-color: #333 transparent transparent transparent; /* Arrow pointing down */
}

/* Show tooltip on hover */
.tooltip-container:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

</style>
