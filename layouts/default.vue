<template>
  <div id="default-layout" class="min-h-screen flex flex-col">
    <main class="flex-grow container py-3">
      <slot />
    </main>
    <footer class="bg-neutral-200 text-neutral-700 py-1.5">
      <div class="container flex justify-end items-center gap-3">
        <LayoutVersion class="text-sm" />
        <ClientOnly>
          <LayoutHeartbeat />
        </ClientOnly>
      </div>
    </footer>
  </div>
</template>
