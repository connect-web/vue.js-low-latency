<template>
  <div class="header-link h-16 flex w-full border-b border-gray-200 dark:border-gray-800 px-10 p-3">
    <div class="flex h-full text-white-600 dark:text-white-400 sticky top-0">
      <!-- Profile Link -->
      <img src="/favicon.ico" alt="Logo" class="logo" />
      <a
          href="/dashboard"
          :class="[
          'h-full border-b-2 inline-flex items-center mr-8',
          active === 'dashboard' ? 'text-blue-500 border-blue-500  no-pointer' : 'text-white-600 dark:text-white-400 cursor-pointer border-transparent'
        ]"
      >
        Dashboard
      </a>

      <!-- Search Link -->
      <a
          href="/leaderboards"
          :class="[
          'h-full border-b-2 inline-flex items-center mr-8',
          active === 'leaderboards' ? 'text-blue-500 border-blue-500  no-pointer' : 'text-white-600 dark:text-white-400 cursor-pointer border-transparent'
        ]"
      >
        Leaderboards
      </a>

      <!-- Machine Learning Link -->
      <a
          href="/ml-leaderboards"
          :class="[
          'h-full border-b-2 inline-flex items-center mr-8',
          active === 'ml-leaderboards' ? 'text-blue-500 border-blue-500  no-pointer' : 'text-white-600 dark:text-white-400 cursor-pointer border-transparent'
        ]"
      >
        ML Leaderboards
      </a>
    </div>
    <div class="ml-auto flex items-center space-x-7">
      <button class="flex items-center">
        <span class="ml-2 Username">letmein</span>
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Header',
  props: {
    active: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.logo{
  height: 40px;
  width: 40px;
  padding: 0.25rem;
  margin-right:2rem;
}

.header-link {
  font-size: 2em;
}

.Username {
  color: white;
  font-weight: bold;
  font-size: 2em;
}

/* Remove pointer for the active link */
.no-pointer {
  cursor: default;
}
</style>
