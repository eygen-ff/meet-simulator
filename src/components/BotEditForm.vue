<template>
  <form>
    <v-text-field 
      v-model="form.name"
      :error-messages="errors.name"
      :counter="maxLength.name"
      label="Name"
      required
    ></v-text-field>
    <v-text-field 
      v-model="form.photo"
      :error-messages="errors.photo"
      label="Photo URL"
      required
    ></v-text-field>
    <v-combobox
      v-model="form.gender"
      label="Gender"
      :items="['Female','Male']"
      required  
    ></v-combobox>
    
    <v-row>
      <v-col>
        <v-btn class="primary" @click="onSubmit">{{ this.inputForm ? 'Update' : 'Create'}}</v-btn>
      </v-col>
    </v-row>
  
  </form>    
</template>

<script>
export default {
    props: {
        inputForm: {
            type: Object,
            default: () => {return null;}
        }
    },
    data() {
        return {
            form: {
                id: this.inputForm ? this.inputForm.id : null,
                name: this.inputForm ? this.inputForm.name : '',
                photo: this.inputForm ? this.inputForm.photoUrl : '',
                gender: this.inputForm ? this.inputForm.gender : ''
            },
            errors: {
                name: '',
                photo: ''
            },
            maxLength: {
                name: 50
            }
        }
    },
    methods: {
      onSubmit() {
        this.$emit('submit', this.form);
      }
    }
}
</script>