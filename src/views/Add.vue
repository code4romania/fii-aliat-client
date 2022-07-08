<template>
  <div>
    <div class="mx-auto bg-white max-w-screen-2xl">
      <div class="p-4 lg:p-8">
        <Nav />

        <Heading :level="1">
          <span v-if="!isStorySent && counter">
            Îți mulțumim! De acum suntem
            <div class="text-purple-400 mt-2">{{ counter }} aliați</div>
          </span>
          <span v-if="!isStorySent && !counter"
            >Trimite un mesaj de susținere</span
          >
          <span v-if="isStorySent">Mulțumim</span>
        </Heading>

        <p v-if="!isStorySent" class="max-w-4xl mb-10 text-lg font-light">
          Cuvintele îi poveștile vindecă și dau putere. Îți mulțumim că ni te-ai
          alăturat printr-un simplu click. Orice mesaj ne ajută și să mergem mai
          departe la bine și la rău, împreună. Transmite un mesaj de încurajare
          și de solidaritate către comunitatea LGBTQIA+ anonim sau semnat pentru
          a le da curaj.
        </p>
        <div v-if="isStorySent" class="max-w-xl mb-10">
          <div class="mb-8 text-6xl font-thin">Ai trimis povestea.</div>
          <div class="text-lg font-thin">
            <div class="mb-4">
              Povestea ta a fost trimisă către echipa noastră.
            </div>
            <div class="mb-4">
              Te vom contacta în scurt timp pentru a ne asigura că toate datele
              pe care le-am primit sunt corecte.
            </div>
            <div class="mb-4">
              Te anunțăm că este posibil ca povestea pe care ai scris-o să
              sufere mici modificări la editare, fără să îi fie alterat în vreun
              fel sensul. Din acest motiv, te rugăm să ne permiți câteva zile
              până la publicarea ei. Pentru orice clarificări, ne poți contacta
              la
              <a href="mailto:vietipierdute@code4.ro" class="underline"
                >vietipierdute@code4.ro</a
              >
            </div>
          </div>
          <ul class="mt-12 mb-8">
            <li>
              <a
                @click="reset"
                class="inline-block py-3 mb-2 text-2xl font-light cursor-pointer lg:text-xl xl:text-2xl"
              >
                <span class="underline">Adaugă altă poveste</span>
              </a>
            </li>
            <li>
              <router-link
                to="/povesti"
                class="inline-block py-3 mb-2 text-2xl font-light lg:text-xl xl:text-2xl"
              >
                <span class="underline">Descoperă toate poveștile</span>
              </router-link>
            </li>
          </ul>
        </div>
        <form
          v-else
          ref="form"
          @submit="checkForm"
          class="max-w-4xl pr-4 mb-32 md:px-0"
        >
          <InputGroup>
            <Input
              placeholder="prenume sau initiala"
              name="name"
              :error="this.errors.name"
              v-model="story.name"
              class="col-span-2"
            />
          </InputGroup>
          <InputGroup>
            <Input
              type="number"
              min="1"
              max="110"
              step="1"
              name="age"
              placeholder="vârstă"
              :error="this.errors.age"
              v-model="story.age"
              class="col-span-2"
            />
          </InputGroup>

          <InputGroup>
            <Input
              name="occupation"
              placeholder="profesie"
              :error="this.errors.occupation"
              v-model="story.occupation"
              class="col-span-2"
            />
          </InputGroup>

          <Textarea
            placeholder="mesajul meu de susținere este...."
            name="content"
            type="textarea"
            v-model="story.content"
            :error="errors.content"
          />

          <InputGroup fullWidth class="mt-8">
            <Checkbox
              name="terms"
              v-model="story.agreeTerms"
              :error="errors.agreeTerms"
              >Sunt de acord cu
              <router-link to="/termeni-si-conditii" class="underline"
                >termenii și condițiile</router-link
              >
              de utilizare ale platformei Fii Aliat.</Checkbox
            >
          </InputGroup>
          <div
            class="flex flex-col gap-4 mt-12 md:flex-row md:justify-between md:items-center"
          >
            <reCaptcha
              v-if="showRecaptcha"
              :siteKey="recaptchSiteKey"
              size="normal"
              theme="dark"
              locale="ro"
              ref="reCaptcha"
              v-model="story.reCaptcha"
              @verify="reCaptchaVerified"
              @expire="recaptchaExpired"
              @fail="recaptchaFailed"
              class="mb-8 md:mb-0"
            ></reCaptcha>
            <div class="flex flex-col">
              <div
                v-if="Object.keys(errors).length !== 0"
                class="text-center text-red-400 lg:text-right"
              >
                Te rugăm corectează erorile și retrimite.
              </div>
              <button
                type="submit"
                class="inline-block py-3 text-2xl font-light underline lg:text-2xl xl:text-3xl"
              >
                <Spinner v-if="isLoading" />
                <div v-else>Trimite</div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import reCaptcha from '@/api/reCaptcha';

import { validate } from '@/lib/validate';
import { storySchema } from '@/lib/schema';

import allCounties from '@/data/counties.json';
import allCities from '@/data/cities.json';

import Nav from '@/components/Nav';
import Heading from '@/components/Heading';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import Select from '@/components/Select';
import InputGroup from '@/components/InputGroup';
import Checkbox from '@/components/Checkbox';
import Spinner from '@/components/Spinner';

export default {
  components: {
    Nav,
    InputGroup,
    Heading,
    Input,
    Textarea,
    Select,
    Checkbox,
    reCaptcha,
    Spinner,
  },
  data: () => ({
    errors: {},
    story: {
      name: null,
      victimLastName: null,
      age: null,
      occupation: null,
      city: 0,
      county: 0,
      content: null,
      authorFirstName: null,
      authorLastName: null,
      authorEmail: null,
      agreeTerms: false,
      agreeTerms2: false,
      recaptcha: null,
    },
    allCounties,
    allCities,
    currentCities: [],
    showRecaptcha: true,
    isStorySent: false,
    isLoading: false,
  }),
  computed: {
    recaptchSiteKey() {
      return process.env.VUE_APP_SITE_KEY_RECAPTCHA;
    },
    counter() {
      return this.$route.query?.counter;
    },
  },
  // mounted() {
  //   document.body.classList.remove("bg-white", "text-black");
  //   document.body.classList.add("bg-black", "text-white");
  // },
  methods: {
    checkForm: function (e) {
      e.preventDefault();

      const validationSchema = this.story.hasLastNamePrivate
        ? storySchema.filter((schema) => schema.key !== 'victimLastName')
        : storySchema;
      const { errors, isValid } = validate(this.story, validationSchema);

      this.errors = errors;

      // console.log(this.errors)
      // console.log(this.story);

      if (isValid) {
        this.isLoading = true;

        api
          .postStory(this.story)
          .then((response) => {
            // debugger;

            this.isLoading = false;
            this.isStorySent = true;
          })
          .catch((error) => {
            if (error.response) {
              this.isLoading = false;
              this.errors = error.response.data.data.errors;
            }
          });
      }
    },
    reset() {
      this.isStorySent = false;
      this.isLoading = false;
      this.story = {};
    },
    loadCities(county) {
      this.currentCities = [];
      this.story.city = 0;

      allCities.forEach((city) => {
        if (city.county === county) {
          this.currentCities.push(city);
        }
      });
    },
    reCaptchaVerified(response) {
      this.story.recaptcha = response;
    },
    recaptchaExpired() {
      this.$refs.reCaptcha.reset();
    },
    recaptchaFailed(err) {
      console.log('captch failed', err);
    },
  },
};
</script>
