<script setup lang="ts">
const { login } = useAuth();
const loginFormSchema = [
  {
    $formkit: "text",
    name: "email",
    label: "Email",
    validation: "required|email",
  },
  {
    $formkit: "password",
    name: "password",
    label: "Password",
    validation: "required",
  },
];
const redirect = (useRoute().query as { redirect: string }).redirect || "/";
async function onLogin(credentials: any, node: any) {
  try {
    await login(credentials);
    navigateTo(redirect);
  } catch (error) {
    const message = (error as Error).message.replace(/\d+ (.*) .*/, "$1");
    node.setErrors([message]);
  }
}
</script>

<template>
  <FormKit
    type="form"
    :classes="{ form: 'space-y-6' }"
    :submit-attrs="{ classes: { input: 'w-full' } }"
    submit-label="Login"
    @submit="onLogin"
  >
    <FormKitSchema :schema="loginFormSchema" />
  </FormKit>
</template>
