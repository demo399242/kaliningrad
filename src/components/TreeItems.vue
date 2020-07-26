<template lang="pug">
div.item

  //- сам элемент
  div(v-if="!!item")

    input(
      :id="'chb'+item.id"
      type="checkbox"
      :checked="item.checked"
      @change="changeItem(item.id)"
    ) 
    span Object {{ item }}

  //- его потомки
  div(v-for="(child,i) in itemChildren")
    tree-items(
      :item="child"
      :last="i==itemChildren.length-1"
      @check-parent="checkMe"
    )
    
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component';
import { byId, Item } from '../store/helper';

// Входящие свойства 
// - item  - объект для отрисовки
// - checkParent - метод на родителе, для проверки состояния родительского чекбокса  
// - last - флажок, что данный элемент я вляется последним в списке
const props = Vue.extend({
  props: [ 'item', 'checkParent', 'last' ]
})

@Component
export default class TreeItems extends props {

  // Список потомков (VUEX-геттер)
  itemChildren: Item[] = this.$store.getters['children']( this.item ? this.item.id : null );

  // Событие "пользователь кликнул по чекбоксу"
  // - меняем состояние у текущего элемента (VUEX метод)
  // - проверяем состояние чекбокса методом checkMe()
  changeItem (id: number) {
    this.$store.dispatch('changeItem', id);
    this.checkMe();
  }

  // Проверка состояния чекбоксов-потомков 
  // - по результатам проверки ставим корректный input.indeterminate
  // - а также посылаем сигнал в родительскую компоненту
  // ( 
  //   mountingFlag - это флаг первичной отрисовки, 
  //   если true, то этом случае, чтобы минимизировать сигналы родителю,
  //   шлем сигнал родителю только если текущий элемент последний в списке 
  // )
  checkMe (mountingFlag?: boolean) {
    if (!this.item) return;
    console.log(`check-me, id: ${this.item.id}`);
    byId(this.item.id).indeterminate =
      this.item.checked && 
      this.itemChildren.map(c => byId(c.id)).some(e => !e.checked || e.indeterminate);
    if (mountingFlag && !this.last) return
    this.$emit('check-parent', mountingFlag);
  }

  // При монтировании компонента посылаем сигнал родителю о проверке
  // (нужно чтобы первоначальное состояние отрисовалось корректно)
  // Cигнал шлем только если у текущего элемента нет потомков (itemChildren.length==0) 
  // и он является последним в списке (last=1) 
  mounted() {
    if (!this.item || this.itemChildren.length>0 || !this.last) return
    this.$emit('check-parent', true); // mountingFlag = true, первая отрисовка
  }

}
</script>

<style scoped>
.item {
  padding: 5px 0px 0px 25px;
}

</style>

