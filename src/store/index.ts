import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    // Исходный массив объектов
    items: [
      { id: 1, parentId: null, name: "Text", checked: true },
      { id: 2, parentId: null, name: "Text", checked: true },
      { id: 3, parentId: 1, name: "Text", checked: true },
      { id: 4, parentId: 1, name: "Text", checked: true },
      { id: 5, parentId: 2, name: "Text", checked: true },
      { id: 6, parentId: 2, name: "Text", checked: true },
      { id: 7, parentId: 2, name: "Text", checked: true },
      { id: 8, parentId: 3, name: "Text", checked: true },
      { id: 9, parentId: 4, name: "Text", checked: true },
      { id: 10, parentId: 5, name: "Text", checked: true },
      { id: 11, parentId: 5, name: "Text", checked: true },
      { id: 12, parentId: 5, name: "Text", checked: true },
      { id: 13, parentId: 6, name: "Text", checked: true },
      { id: 14, parentId: 7, name: "Text", checked: false },
      { id: 15, parentId: 8, name: "Text", checked: true },
      { id: 16, parentId: 8, name: "Text", checked: true },
      { id: 17, parentId: 9, name: "Text", checked: true },
    ],

  },

  mutations: {

    CHANGE_ITEM: (state, id) => {

      // Находим элемент в массиве с таким Id
      const item = state.items.find(item => item.id==id);
      // Меняем состояние
      if (item) item.checked = !item.checked;

    },

  },
  actions: {

    changeItem({ commit }, id: number) {
      commit('CHANGE_ITEM', id);
    }

  },
  getters: {

    children: state => (id: number) => {
      return state.items.filter(item => item.parentId==id);
    }

  },
  modules: {
  }
})
