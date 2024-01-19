<script lang="ts" setup>
import { useFieldArray, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { useRouter } from "vue-router";
import { ref } from "vue";
import axios from "axios";
import Cookies from "js-cookie";

const router = useRouter();

const schema = toTypedSchema(
  z.object({
    article: z.object({
      title: z.string().min(1).max(255),
      description: z.string().min(1).max(255),
      body: z.string().min(1).max(100000),
      tagList: z.array(z.string()).nullable(),
    }),
  }),
);

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: schema,
});

const [title] = defineField("article.title");
const [description] = defineField("article.description");
const [body] = defineField("article.body");
const {
  remove: removeTag,
  push: pushTag,
  fields: tagList,
} = useFieldArray("article.tagList");

const inputTag = ref("");
const addTag = () => {
  pushTag(inputTag.value);
  inputTag.value = "";
};

// TODO: separate the business logic
const onSubmit = handleSubmit(async (values) => {
  //TODO: hard code
  await axios.post("http://localhost/api/articles", values, {
    headers: { Authorization: `Token ${Cookies.get("token")}` },
  });
  await router.push("/");
});
</script>

<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ul v-if="errors" class="error-messages">
            <li v-if="errors['article.title']">
              {{ errors["article.title"] }}
            </li>
            <li v-if="errors['article.description']">
              {{ errors["article.description"] }}
            </li>
            <li v-if="errors['article.body']">
              {{ errors["article.body"] }}
            </li>
            <li v-if="errors['article.tagList']">
              {{ errors["article.tagList"] }}
            </li>
          </ul>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="title"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  type="text"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="description"
                  class="form-control"
                  placeholder="What's this article about?"
                  type="text"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="body"
                  class="form-control"
                  placeholder="Write your article (in markdown)"
                  rows="8"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="inputTag"
                  class="form-control"
                  placeholder="Enter tags"
                  type="text"
                  @keyup.enter.stop="addTag"
                />
                <div class="tag-list">
                  <span v-for="tag in tagList" class="tag-default tag-pill">
                    <i class="ion-close-round" @click="removeTag(tag)"></i>
                    {{ tag.value }}
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="onSubmit"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
