<script setup lang="ts">
definePageMeta({ title: "Logout" });

// Logout automatically
const { logout } = useAuth();
onMounted(async () => {
  await logout();
  navigateTo("/");
});
</script>

<template>
  <div id="logout">Logout in progress...</div>
</template>
