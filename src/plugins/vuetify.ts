import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

const vuetify = new Vuetify({});
window.$vuetify = vuetify.framework;
export default vuetify;
