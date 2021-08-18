<template>
  <v-app>
    <v-main data-app>
      <v-container>
        <v-layout justify-center>
          <v-flex>
            <v-btn @click="toggleModal"> Зарегистрироваться</v-btn>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container v-if="isShowModal" class="container_modal">
        <v-layout class="modal-body">
          <v-flex>
            <!-- Закрыть -->
            <template>
              <v-btn color="primary" icon text @click="toggleModal">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-subheader>Title form</v-subheader>
              <v-form class="container_modal__form">
                <!-- Имя -->
                <v-text-field label="First Name *" autofocus filled />

                <!-- Фамилия -->
                <v-text-field label="Last Name *" autofocus filled />

                <!-- E-mail -->
                <v-text-field label="user@gmail.com *" autofocus filled />

                <!-- Выбор продукта -->
                <v-row align="center">
                  <v-col cols="6">
                    <v-subheader> Product type * </v-subheader>
                  </v-col>

                  <v-col cols="6">
                    <v-select
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
                  outlined
                  auto-grow
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
                      <v-btn class="btn_send" color="#2196F3">
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
.container_modal {
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100vw;
  padding: 0;
  margin: 0;
  height: 100vh;
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
  }),
  methods: {
    toggleModal(event: MouseEvent) {
      event.stopImmediatePropagation();
      event.preventDefault();
      this.isShowModal = !this.isShowModal;
      return true;
    },
    calcTotalPrice(): number {
      console.log(this.select);
      return Number(this.select) + Number(this.switch1) + Number(this.switch2);
    },
  },
});
</script>
