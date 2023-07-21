<template>
  <div>
    <v-img height="40%" src="../assets/hobbit-background.jpg">
      <div class="center-box">
        <!-- <v-card class="mx-auto">
        <v-card-title>Welcome to my Time tracker Page</v-card-title>
        <v-list-item-content>
        <div class="text-overline mb-4">
          Are you an existing user?
        </div>
        <v-list-item-title class="text-h5 mb-1">
          Login
        </v-list-item-title>
        <v-card-actions>
          <v-btn>
            Login
          </v-btn>
        </v-card-actions>
      </v-list-item-content>
      <v-list-item-content>
        <div class="text-overline mb-4">
          Are you a new user?
        </div>
        <v-list-item-title class="text-h5 mb-1">
          Create a new account
        </v-list-item-title>
        <v-card-actions>
          <v-btn>
            Register
          </v-btn>
        </v-card-actions>
      </v-list-item-content>

      </v-card> -->

        <v-card max-width="400" class="mx-auto main-container">
          <v-card-title class="text-color">Time tracker website</v-card-title>
          <v-container>
            <v-row dense>
              <v-col cols="12">
                <v-card class="sub-container">
                  <v-card-title class="text-h5 text-color" >
                    Exsisting user?
                  </v-card-title>

                  <v-card-subtitle class="text-color">Login in to your account to continue</v-card-subtitle>

                  <v-card-actions>
                    <v-btn outlined class="action-btn"> Login </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

              <v-col cols="12">
                <v-card class="sub-container">
                  <v-card-title class="text-h5 text-color">
                    New user?
                  </v-card-title>

                  <v-card-subtitle class="text-color" >Create a new account to begin</v-card-subtitle>

                  <v-card-actions>
                    <v-btn class="action-btn"> Register </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

            </v-row>
          </v-container>
        </v-card>
      </div>
    </v-img>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

</script>

<style lang="scss">
.main-container {
  background-color: $primary-background-light;
}

.sub-container {
  background-color: $secondary-background-light;
}

.text-color{
  color: $text-color-light;
}

.action-btn {
  color:  $highlight-color-one-light;
}

.center-box {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 20%;
}
</style>
