export default defineNuxtPlugin(() => {
  const route = useRoute();
  watch(
    () => route.meta.title,
    (title) => useHead({ title }),
    { immediate: true },
  );
  useHead({
    titleTemplate: `%s | nuxt3-prisma-graphql`,
    meta: [
      {
        hid: "description",
        name: "description",
        content: "Dream DX with Nuxt 3, Prisma and Pothos GraphQL.",
      },
    ],
  });
});
