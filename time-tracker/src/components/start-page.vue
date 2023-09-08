<template>
  <div>
    <v-img height="40%" src="../assets/hobbit-background.jpg">
      <div class="center-box">
        <v-card max-width="400" class="mx-auto main-container">
          <v-card-title class="text-color">Time tracker website</v-card-title>
          <v-container v-if="currentUser !== null">
            <v-row dense>
              <v-col cols="12">
                <v-card class="sub-container">
                  <v-card-title class="text-h5 text-color"
                    >Welcome {{ currentUser?.username }}</v-card-title
                  >
                  <v-card-subtitle class="text-color">
                    Start or conntinue your tracker
                  </v-card-subtitle>
                  <v-card-actions>
                    <v-btn
                      outlined
                      class="action-btn"
                      @click="createDate"
                      v-if="!create"
                      >Create</v-btn
                    >
                    <v-btn outlined class="action-btn" @click="doLogout"
                      >Logout</v-btn
                    >
                  </v-card-actions>
                </v-card>
                <v-card class="sub-container mt-2">
                  <v-card-title class="text-h5 text-color">
                    Current streak
                  </v-card-title>
                  <div v-if="startDate != ''">empty</div>
                  <div>not empty? {{ startDate }}</div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <v-container v-if="currentUser === null">
            <v-row dense>
              <v-col cols="12">
                <v-card class="sub-container">
                  <v-card-title class="text-h5 text-color">
                    Exsisting user?
                  </v-card-title>

                  <v-card-subtitle class="text-color"
                    >Login in to your account to continue</v-card-subtitle
                  >

                  <v-card-actions>
                    <v-btn
                      outlined
                      class="action-btn"
                      @click="loginDialog = true"
                    >
                      Login
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

              <v-col cols="12">
                <v-card class="sub-container">
                  <v-card-title class="text-h5 text-color">
                    New user?
                  </v-card-title>

                  <v-card-subtitle class="text-color"
                    >Create a new account to begin</v-card-subtitle
                  >

                  <v-card-actions>
                    <v-btn class="action-btn" @click="registerDialog = true">
                      Register
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-dialog persistent v-model="loginDialog">
          <login-page @doLogin="doLogin">
            <template v-slot:credentials>
              <v-text-field label="Email" v-model="email"></v-text-field>
              <v-text-field label="Password" v-model="password"></v-text-field>
            </template>
            <template v-slot:actions>
              <v-btn @click="doLogin">Sign in</v-btn>
              <v-btn @click="loginDialog = false">Close</v-btn>
            </template>
          </login-page>
        </v-dialog>
        <v-dialog persistent v-model="registerDialog">
          <register-page>
            <template v-slot:credentials>
              <v-text-field label="Username" v-model="username"></v-text-field>
              <v-text-field label="Email" v-model="email"></v-text-field>
              <v-text-field label="Password" v-model="password"></v-text-field>
            </template>
            <template v-slot:actions>
              <v-btn @click="doCreateAccount">Create account</v-btn>
              <v-btn @click="registerDialog = false">Close</v-btn>
            </template>
          </register-page>
        </v-dialog>
      </div>
    </v-img>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import PocketBase from "pocketbase";
import LoginPage from "@/components/auth/login-page.vue";
import RegisterPage from "@/components/auth/register-page.vue";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

let pb: PocketBase | null = null;
let userObj: any = null;
const id: ref<string> = ref("");
const currentUser = ref();
const username = ref("");
const email = ref("");
const password = ref("");
const fullName = ref("");
const startDate = ref("");

const create = ref(false);
const loginDialog = ref(false);
const registerDialog = ref(false);

dayjs.extend(utc);

onMounted(async () => {
  pb = new PocketBase("http://127.0.0.1:8090");

  pb?.authStore.onChange(() => {
    currentUser.value = pb?.authStore.model;
  }, true);
});

// Check if current user has a start date
const checkDate = async () => {
  const record = await pb?.collection("Start_Date").getOne(id.value);

  record?.items.forEach((element: any) => {
    if (element.connected_user === userObj.record.id) {
      create.value = true;
      console.log("element", element);
      let time = dayjs(element.date).utc();
      console.log("Correct time?", time);
      let format = time.format("YYYY-MM-DD HH:mm:ss");
      startDate.value = format;
    }
  });
};

// Creates a date for the user
const createDate = async () => {
  if (create.value === false) {
    if (userObj) {
      let iso = dayjs().toISOString();

      try {
        const data = {
          date: iso,
          connected_user: userObj.record.id,
        };

        const record = await pb?.collection("Start_Date").create(data);
        console.log("record", record);
        id.value = record?.id;
        console.log("record", record?.date);
        startDate.value = record?.date;

        // startDate.value = record
      } catch (error: any) {
        console.log("error", error);
      }
    }
  }
};

const doLogout = () => {
  pb?.authStore.clear();
  currentUser.value = null;
  create.value = false;
};

const doLogin = async () => {
  try {
    const authData = await pb
      ?.collection("users")
      .authWithPassword(email.value, password.value);

    userObj = authData;
    username.value = "";
    password.value = "";
    email.value = "";
    loginDialog.value = false;
    registerDialog.value = false;
    console.log(currentUser.value);
    checkDate();
  } catch (error: any) {
    alert(error.message);
    console.log("ss", error);
  }
};

const doCreateAccount = async () => {
  try {
    const data = {
      username: username.value,
      email: email.value,
      emailVisibility: true,
      password: password.value,
      passwordConfirm: password.value,
      name: fullName.value,
    };

    const record = await pb?.collection("users").create(data);

    await doLogin();
  } catch (error: any) {
    alert(error.message);
  }
};

//
</script>
<style lang="scss">
.main-container {
  background-color: $primary-background-light;
}

.sub-container {
  background-color: $secondary-background-light;
}

.text-color {
  color: $text-color-light;
}

.action-btn {
  color: $highlight-color-one-light;
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
