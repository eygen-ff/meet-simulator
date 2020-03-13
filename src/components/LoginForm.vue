<template>
    <form>
    <v-text-field 
      v-if="formCase == 2"
      v-model="name"
      :error-messages="errors.name"
      :counter="maxLength.name"
      label="Name"
      required
    ></v-text-field>
    <v-text-field
      v-if="[1,2,3].includes(formCase)"
      v-model="email"
      :counter="maxLength.email"
      :error-messages="errors.email"
      label="E-mail"
      required
    ></v-text-field>
    <v-text-field
      v-if="[1,2].includes(formCase)"
      v-model="password"
      type="password"
      :counter="maxLength.password"
      :error-messages="errors.password"
      label="Password"
      required
    ></v-text-field>

    <v-row>
      <v-col>
        <v-btn v-if="formCase == 1" @click="onClickLogin" color="primary">Войти</v-btn>
        <v-btn v-if="formCase == 2" @click="onClickRegiser" color="primary">Зарегистрировать</v-btn>
        <v-btn v-if="formCase == 3" @click="onClickRestore" color="primary">Прислать ссылку</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn :disabled="formCase == 1" @click="formCase = 1" class="mr-4" text small>Вход</v-btn>
        <v-btn :disabled="formCase == 2" @click="formCase = 2" class="mr-4" text small>Регистрация</v-btn>
        <v-btn :disabled="formCase == 3" @click="formCase = 3" class="" text small>Восстановление пароля</v-btn>
      </v-col>
    </v-row>
  
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
      formCase: 1, // 1 - логин, 2 - регистрация, 3 - восстановление
      name: '',
      email: '',
      password: '',
      errors: {
        name: '',
        email: '',
        password: '',
      },
      maxLength: {
        name: 50,
        email: 50,
        password: 50
      }
    }
  },
  async mounted() {
    this.email = this.storedEmail;
  },
  methods: {

    validate() {

      const validateEmail = () => {
        if (this.email.length === 0) {
          this.errors.email = 'Требуется ввести значение';
          return false;
        }
        if (this.email.length > this.maxLength.email) {
          this.errors.email = 'Слишком длинный email';
          return false;
        }
        if (this.email.indexOf('@') === -1 || this.email.indexOf('.') === -1) {
          this.errors.email = 'Невалидный email';
          return false;
        }
        return true;
      }

      const validatePassword = () => {
        if (this.password.length === 0) {
          this.errors.password = 'Требуется ввести значение';
          return false;
        }
        if (this.email.length > this.maxLength.password) {
          this.errors.email = 'Слишком длинный пароль';
          return false;
        }
        return true;
      }

      const validateName = () => {
        if (this.name.length === 0) {
          this.name.password = 'Требуется ввести значение';
          return false;
        }
        if (this.email.length > this.maxLength.name) {
          this.errors.email = 'Слишком длинное имя';
          return false;
        }
        return true;
      }

      this.errors.name = '';
      this.errors.email = '';
      this.errors.password = '';
      
      if (this.formCase === 1) {
        let complexResult = validateEmail();
        complexResult &= validatePassword();
        return complexResult;

      } else if (this.formCase === 2) {
        let complexResult = validateEmail();
        complexResult &= validatePassword();
        complexResult &= validateName();
        return complexResult;

      } else if (this.formCase === 3) {
        return validateEmail();
      }
    },
    onClickLogin() {
      if (!this.validate()) {
        return false;
      }
      this.$emit('login', {
        email: this.email,
        password: this.password
      });
    },
    onClickRegiser() {
      if (!this.validate()) {
        return false;
      }
      this.$emit('register', {
        email: this.email,
        name: this.name,
        password: this.password
      });
    },
    onClickRestore() {
      if (!this.validate()) {
        return false;
      }
      this.$emit('restore', {
        email: this.email
      });
    },
    toogleFlag() {
      this.flagRegister = !this.flagRegister;
    }
  },
}

</script>