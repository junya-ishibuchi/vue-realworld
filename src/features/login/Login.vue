<script lang="ts" setup>
import { useRouter } from "vue-router";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { useForm } from "vee-validate";
import axios from "axios";
import Cookies from "js-cookie";
import { ref } from "vue";

const router = useRouter();

const schema = toTypedSchema(
  z.object({
    user: z.object({
      email: z.string().min(1).email(),
      password: z.string().min(1),
    }),
  }),
);

const { handleSubmit, defineField } = useForm({
  validationSchema: schema,
});

const [email] = defineField("user.email");
const [password] = defineField("user.password");
const error = ref("");

// TODO: separate the business logic
const onSubmit = handleSubmit(async (values) => {
  // TODO: hardcode URL
  try {
    const { status, data } = await axios.post(
      "http://localhost/api/users/login",
      values,
    );
    Cookies.set("token", data.user.token, {
      secure: true,
      sameSite: "strict",
    });
    await router.push("/");
  } catch (e) {
    error.value =
      e.response.status < 500
        ? "email or password is invalid"
        : "An error has occurred. Please try it again.";
  }
});
</script>

<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'register' }">
              Need an account?
            </router-link>
          </p>

          <ul v-if="error" class="error-messages">
            <li>{{ error }}</li>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                v-model="email"
                class="form-control form-control-lg"
                placeholder="Email"
                type="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="password"
                class="form-control form-control-lg"
                placeholder="Password"
                type="password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
