<template>
  <div v-if="Object.keys(itemsToDisplay).length" id="scoreTrackerContainer" class="sm:p-7 p-4">
    <div class="card-list" :style="gridStyle">
      <div v-for="(amount, item) in sortedItems" :key="item" :class="cardSizeClass" class="card-item-score">
        <div class="card lb">
          <div class="icon-container">
            <img :src="getIconImage(item)" :alt="`Icon`" class="img-icon" />
          </div>
          <div class="title">{{ item }}</div>
          <div class="value">{{ formatAmount(amount) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { viewLargeNumbers } from '@/utils/numberFilters.js';

export default {
  name: 'ScoreTrackerContainer',
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
    // Determine which set of items to display based on the props
    itemsToDisplay() {
      return this.type === 'Skills' && this.skills
          ? this.skills
          : this.type === 'Minigames' && this.minigames
              ? this.minigames
              : {};
    },
    sortedItems() {
      return Object.fromEntries(
          Object.entries(this.itemsToDisplay).sort((a, b) => b[1] - a[1])
      );
    },
    cardSizeClass() {
      return this.type === 'Minigames' ? 'large-card' : 'small-card';
    },
    gridStyle() {
      // Set different minimum width for skills and minigames
      const minWidth = this.type === 'Minigames' ? '200px' : '200px';
      return {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}, 1fr))`,
        gap: '16px'
      };
    }

  },
  methods: {
    formatAmount(amount) {
      return viewLargeNumbers(amount);
    },
    filterFileName(input){
      let output = input.replace(/[^a-zA-Z\s]/g, '');
      output = output.replaceAll(' ', '_')
      return output
    },
    getIconImage(item) {
      // Choose the image path based on the type
      var iconFolder;
      let item_name = item.toLowerCase();

      if (this.type === 'Skills'){
        iconFolder = 'skill_icons';
      }else{
        iconFolder = 'minigame_icons';
        item_name = this.filterFileName(item_name)

      }

      return `/img/${iconFolder}/${item_name}.png`;
    }
  }
};
</script>

<style scoped>
#scoreTrackerContainer {
  text-align: center;
}

.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 16px;
}

/* CSS Variables for Variable Sizing */
.card-item-score {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  width: var(--card-width);
  height: var(--card-height);
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
}

.icon-container {
  height: var(--icon-size);
  display: flex;
  align-items: center;
  justify-content: center;
}

.img-icon {
  width: 100%;
  height: 100%;
  object-fit: fill;
}

.title {
  font-size: var(--title-size);
  font-weight: bold;
  margin-top: 0.4rem;
  margin-bottom: 0.8rem;
}

.value {
  font-size: var(--value-size);
  color: #ffd220;
}

/* Small Card (Skills) */
.small-card {
  --card-width: 200px;
  --card-height: 120px;
  --icon-size: 35px;
  --title-size: 1.5rem;
  --value-size: 2rem;
}

/* Large Card (Minigames) */
.large-card {
  --card-width: 200px;
  --card-height: 150px;
  --icon-size: 50px;
  --title-size: 1.2rem;
  --value-size: 2rem;
}

</style>
