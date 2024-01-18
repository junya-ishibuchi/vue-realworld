<script lang="ts" setup>
// TODO: need tests
// TODO: breaking down components
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";

const router = useRouter();

const schema = toTypedSchema(
  z.object({
    user: z.object({
      username: z.string().min(1),
      email: z.string().min(1).email(),
      password: z.string().min(1),
    }),
  }),
);

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: schema,
});

const [username] = defineField("user.username");
const [email] = defineField("user.email");
const [password] = defineField("user.password");

const onSubmit = handleSubmit(async (values) => {
  const { data } = await axios.post("http://localhost/api/users", values);
  Cookies.set("token", data.user.token, { secure: true, sameSite: "strict" });
  await router.push("/");
});
</script>

<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <a href="/login">Have an account?</a>
          </p>

          <ul v-if="errors" class="error-messages">
            <li v-if="errors['user.username']">
              {{ errors["user.username"] }}
            </li>
            <li v-if="errors['user.email']">{{ errors["user.email"] }}</li>
            <li v-if="errors['user.password']">
              {{ errors["user.password"] }}
            </li>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                v-model="username"
                class="form-control form-control-lg"
                placeholder="Username"
                type="text"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="email"
                class="form-control form-control-lg"
                placeholder="Email"
                type="text"
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
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
