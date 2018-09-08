<template>
<div>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h2>Login to Globomantics</h2>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs12 sm6 offset-sm3>
        <v-text-field
          label="E-mail"
          v-model="email"
          v-bind:rules="emailRules"
          required>
        </v-text-field>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <v-text-field
          label="Password"
          v-model="password"
          v-bind:rules="passwordRules"
          v-bind:type="'password'"
          required>
        </v-text-field>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <v-btn v-on:click="cancel">Cancel</v-btn>
        <v-btn color="primary" v-on:click="login">Login</v-btn>
        <v-btn v-on:click="showProfile">Create Account</v-btn>
      </v-flex>
    </v-layout>
    <v-snackbar
      :timeout="6000"
      :top="true"
      v-model="showAlert"
    >
      {{ loginError }}
      <v-btn flat color="pink" v-on:click="showAlert = false">Close</v-btn>
    </v-snackbar>
  </v-container>

  <v-dialog v-model="profileDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6>
                <v-text-field label="First name" v-model="user.first" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Last name" v-model="user.last" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email" v-model="user.email" hint="This is also your login username" persistent-hint required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" v-model="user.password" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Verify Password" v-model="user.verfiyPassword" type="password"
                  hint="When changing your password, please enter twice" persistent-hint
                  :rules="[
                    () => user.password == user.verfiyPassword || 'Passwords entered do not match'
                  ]"
                  required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="profileDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="saveProfile">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      profileDialog: false,
      user: {
        first: '',
        last: '',
        email: '',
        password: '',
        verfiyPassword: '',
        isActive: true
      },

      showAlert: false,
      message: "",
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      password: "",
      passwordRules: [v => !!v || "Password is required"]
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    loginError() {
      return this.$store.getters.loginError;
    }
  },
  methods: {
    login: function() {
      const vm = this;
      const payload = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("logInUser", payload).then(() => {
        if (vm.isLoggedIn) {
          this.$router.push({ path: "/" });
        } else {
          vm.showAlert = true;
        }
      });
    },
    cancel: function() {
      console.log("The user does not want to login!");
    },
    showProfile: function () {
      this.profileDialog = true
    },
    saveProfile: function () {
      let vm = this
      this.$store.dispatch('createUserProfile', this.user).then(() => {
        vm.password = vm.verfiyPassword = ''
      })
      this.profileDialog = false
    }
  }
};
</script>

<style>
</style>
