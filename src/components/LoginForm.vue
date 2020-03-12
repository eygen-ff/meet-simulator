<template>
    <form>
    <v-text-field 
      v-if="flagRegister"
      v-model="name"
      :error-messages="errors.name"
      :counter="50"
      label="Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      :counter="50"
      :error-messages="errors.email"
      label="E-mail"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      :counter="50"
      :error-messages="errors.password"
      label="Password"
      required
    ></v-text-field>
    
    <v-btn v-if="flagRegister" class="mr-4 primary" @click="onClickRegiser">Зарегистрировать</v-btn>
    <v-btn v-if="flagRegister" @click="toogleFlag">Вход</v-btn>
    <v-btn v-if="!flagRegister" class="mr-4 primary" @click="onClickLogin">Войти</v-btn>
    <v-btn v-if="!flagRegister" @click="toogleFlag">Регистрация</v-btn>
  </form>
</template>


<script>

export default {
  props: {
    storedEmail: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      flagRegister: false,
      name: '',
      email: '',
      password: '',
      errors: {
        name: '',
        email: '',
        password: '',
      }
    }
  },
  async mounted() {
    this.email = this.storedEmail;
  },
  methods: {
    onClickRegiser() {
      this.$emit('register', {
        email: this.email,
        name: this.name,
        password: this.password
      });
    },
    onClickLogin() {
      this.$emit('login', {
        email: this.email,
        password: this.password
      });
    },
    toogleFlag() {
      this.flagRegister = !this.flagRegister;
    }
  },
}

</script>