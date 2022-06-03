import { createRouter, createWebHistory } from "vue-router";
import OperadorasAtivas from "../views/OperadorasAtivas.vue";
import DetalhesOperadora from "../views/DetalhesOperadora.vue";
import CadastrarOperadora from "../views/CadastrarOperadora.vue";
import EditarOperadora from "../views/EditarOperadora.vue";

const routes = [
  {
    path: "/",
    name: "Operadoras",
    component: OperadorasAtivas,
  },
  {
    path: "/detalhes/:id",
    name: "detalhes",
    component: DetalhesOperadora,
  },
  {
    path: "/cadastrar",
    name: "cadastrar",
    component: CadastrarOperadora,
  },
  {
    path: "/editar/:id",
    name: "editar",
    component: EditarOperadora,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
