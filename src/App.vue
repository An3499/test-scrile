<template>
  <v-app>
    <v-main data-app>
      <v-container>
        <v-layout justify-center>
          <v-flex class="container__title">
            <v-btn class="container_title__btn" @click="toggleModal"
              >Зарегистрироваться</v-btn
            >
          </v-flex>
        </v-layout>
      </v-container>

      <v-container v-if="isShowModal" class="container_modal">
        <v-layout
          :class="$vuetify.breakpoint.xs && 'fullscreen'"
          class="modal-body"
        >
          <v-flex>
            <!-- Закрыть -->
            <template>
              <v-btn color="primary" icon text @click="toggleModal">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-subheader class="form__title">Title form</v-subheader>
              <v-form
                class="container_modal__form"
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <!-- Имя -->
                <v-text-field
                  v-model="firstName"
                  label="First Name *"
                  autofocus
                  filled
                  required
                  :rules="nameRules"
                />

                <!-- Фамилия -->
                <v-text-field
                  v-model="lastName"
                  label="Last Name *"
                  filled
                  required
                  :rules="nameRules"
                />

                <!-- E-mail -->
                <v-text-field
                  :rules="emailRules"
                  v-model="mail"
                  label="user@gmail.com *"
                  filled
                  required
                />

                <!-- Выбор продукта -->
                <v-row align="center">
                  <v-col cols="6">
                    <v-subheader> Product type *</v-subheader>
                  </v-col>

                  <v-col cols="6">
                    <v-select
                      :rules="[(v) => !!v || 'Item is required']"
                      required
                      dense
                      solo
                      v-model="select"
                      :items="items"
                      label="Select product type"
                    >
                      <template v-slot:item="{ item, on }">
                        <v-list-item v-on="on">
                          <v-list-item-title
                            v-text="item.title"
                          ></v-list-item-title>
                        </v-list-item>
                      </template>
                      <template v-slot:selection="{ item, on }">
                        <v-subheader v-on="on"> {{ item.title }} </v-subheader>
                      </template>
                    </v-select>
                  </v-col>
                </v-row>
                <v-col>
                  <v-row cols="12" align="center" justify="space-between">
                    <v-subheader>Additinal feature for $100</v-subheader>
                    <v-switch value="100" v-model="switch1" inset></v-switch>
                  </v-row>
                  <v-row cols="12" align="center" justify="space-between">
                    <v-subheader>Additinal feature for $200</v-subheader>
                    <v-switch value="200" v-model="switch2" inset></v-switch>
                  </v-row>
                </v-col>

                <!-- Комментарий -->
                <v-textarea
                  v-model="comment"
                  auto-grow
                  outlined
                  rows="2"
                  filled
                  label="Type your comment"
                ></v-textarea>

                <!-- Итого -->
                <v-row row-12 align="center" justify="end">
                  <v-subheader> Итого: {{ calcTotalPrice() }}</v-subheader>
                </v-row>

                <!-- Сохранить -->
                <v-container>
                  <v-layout>
                    <v-flex class="container_btn_send">
                      <v-btn
                        type="submit"
                        @click="btnSend"
                        class="btn_send"
                        color="#2196F3"
                      >
                        Send form
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.form__title {
  font-size: 20px;
  color: black !important;
}

.fullscreen {
  width: 100%;
  height: 100%;
  max-width: 100% !important;
  max-height: 100%;
}

.container__title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  color: tomato;
}

.container_title__btn {
  background-color: rgb(31, 221, 31) !important;
  width: 300px;
  height: 100px !important;
  color: tomato;
}

.container_modal {
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  padding: 0;
  margin: 0;
  height: 100%;
  background: rgba(0, 0, 0, 0.22);
}

.modal-body {
  max-width: 50%;
  background: rgb(255, 255, 255);
}

.container_modal__form {
  padding: 10px;
}

.container_btn_send {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn_send {
  color: white !important;
}

.select-product {
  display: flex;
  justify-content: center;
  align-items: end;
}
</style>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  components: {},

  data: () => ({
    isShowModal: false,
    select: 0,
    items: [
      { title: "Product $50", value: 50 },
      { title: "Product $100", value: 100 },
      { title: "Product $300", value: 300 },
    ],
    switch1: 0,
    switch2: 0,

    valid: "",
    firstName: "",
    lastName: "",
    mail: "",
    comment: "",
    nameRules: [(v: string) => !!v || "Name is required"],
    emailRules: [
      (v: string) => !!v || "E-mail is required",
      (v: string) =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "E-mail must be valid",
    ],
  }),
  methods: {
    toggleModal(event: MouseEvent) {
      event.stopImmediatePropagation();
      event.preventDefault();
      this.isShowModal = !this.isShowModal;
      return true;
    },
    calcTotalPrice(): number {
      return Number(this.select) + Number(this.switch1) + Number(this.switch2);
    },

    btnSend(event: MouseEvent): void {
      if (!this.$refs.form.validate()) {
        event.preventDefault();
      }
    },
  },
});
</script>
