<template>
  <div class="min-h-screen flex flex-col bg-transparent text-jogo-light pb-24 md:pb-0">
    <LayoutNavbar />
    <div class="flex-1 flex flex-col">
      <slot />
    </div>
    <LayoutTheFooter />
  </div>
</template>