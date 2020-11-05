<template>
    <div class="main section">
        <div class="main__aside">
            <ul class="aside-btns">
              <li class="aside-btns__item">
                <button class="aside-btns__btn" @click.stop="changeDrawer"><img src="../assets/home.svg" alt=""></button>
              </li>
              <li class="aside-btns__item">
                <button class="aside-btns__btn" @click.stop="decide('rewind')"><img src="../assets/reload.svg" alt=""></button>
              </li>
            </ul>
            <div class="parameters">
              <div class="parameters__title">Параметри:</div>
              <div class="parameters__row">
                <div class="parameters__item">
                    <img src="../assets/happy.svg" alt="">
                    <span>{{ preparation1 }}</span>
                </div>
                <div class="parameters__item">
                    <img src="../assets/happy-1.svg" alt="">
                    <span>{{ preparation2 }}</span>
                </div>
                <div class="parameters__item">
                    <img src="../assets/heart.svg" alt="">
                    <span>{{ preparation3 }}</span>
                </div>
              </div>
            </div>
            <div class="count">
                <div class="count__title">Осталось в очереди:</div>
                <div class="count__value"><span>{{ countCard - currentCard }}</span> / {{ countCard }}</div>                
            </div>
        </div>
        <div class="main__cont">
            <Tinder ref="tinder"  key-name="id" :queue.sync="queue" @submit="onSubmit">
                <template slot-scope="scope">
                  <div :id="`card-${scope.data.id}`" class="card-item">
                      <div
                      class="card-item__img"
                      :style="`background-image:url(${scope.data.photo})`"
                      />
                      <div class="card-item__cont">
                        <p class="card-item__title">{{ scope.data.name }}, {{ scope.data.year }}</p>
                        <p  class="card-item__desc">{{ scope.data.desc }}</p>
                      </div>
                    </div>
                </template>
                <div class="like-pointer" slot="like">Препарат 3</div>
                <div class="nope-pointer" slot="nope">Препарат 1</div>
                <div class="super-pointer" slot="super">Препарат 2</div>
            </Tinder>
            <div class="btns">
                <button class="button button-pink" @click="decide('nope')">Препарат 1</button>
                <button class="button button-blue" @click="decide('super')">Препарат 2</button>
                <button class="button button-yellow" @click="decide('like')">Препарат 3</button>
            </div>
        </div>

    </div>
</template>

<script>
import Tinder from "vue-tinder";
import { EventBus } from '@/event-bus.js';

export default {
  name: "Main",
  props: {
    drawer: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    preparation1: 0,   
    preparation2: 0,   
    preparation3: 0,
    percent1: 0,
    percent2: 0,
    percent3: 0,
    countCard: null,
    currentCard: 1,
    history: [],
    queue: [
      { 
        id: 1,
        photo: require('@/assets/card-1.jpg'),
        name: "Марія",
        year: "19 років",
        desc: "Бабуся приймає брендовий препарат від болю в суглобах, він допомагає, але занадто дорогий. У Вас є якісний аналог з нижчою ціною? Якщо ні — давайте бренд.",
      },
      {
        id: 2,
        photo: require('@/assets/card-2.jpg'),
        name: "Степан",
        year: "61 рік",
        desc: "Спросоння відсунув гарячий чайник рукою та обпікся. У Вас всі ліки від опіків такі дорогі? Можна хороший препарат недорого?",
      },
      {
        id: 3,
        photo: require('@/assets/card-3.jpg'),
        name: "Любов",
        year: "58 років",
        desc: "Лікар призначив препарат від артеріальної гіпертензії, а бренд дорого коштує. Тому мені потрібен аналог з хорошою ефективністю та приємною ціною.",
      },
      {
        id: 4,
        photo: require('@/assets/card-4.jpg'),
        name: "Олександр",
        year: "20 років",
        desc: "Порекомендуйте ефективний препарат від болю в горлі за розумну ціну.",
      },
      {
        id: 5,
        photo: require('@/assets/card-5.jpg'),
        name: "Ірина",
        year: "19 років",
        desc: "У мене часто невралгії, лікар призначив вітаміни групи В. Мені потрібен якісний аналог за прийнятною ціною.",
      }
    ]
  }),
  components: { Tinder },
 
  created () {
    this.countCard = this.queue.length;
    this.history = this.queue.slice(0);
  },
  methods: {
    changeDrawer() {
      this.$emit("changeDrawer", !this.drawer);
    },
    decide (choice) {
      this.$refs.tinder.decide(choice)
    },
    onSubmit (choice) {
      this.currentCard += 1;      
      switch (choice.type) {
        case 'rewind': 
          this.preparation1 = 0; 
          this.preparation2 = 0;   
          this.preparation3 = 0;
          this.currentCard = 1;
          this.queue = this.history;
          this.$refs.tinder.rewind([this.history]);
          break;
        case 'nope': 
          this.preparation1 += 1;  
          this.percent1 = Math.round((this.preparation1 / this.countCard) * 100);         
          break;
        case 'like': 
          this.preparation2 += 1;
          this.percent2 = Math.round((this.preparation2 / this.countCard) * 100);
          break;
        case 'super': 
          this.preparation3 += 1;
          this.percent3 = Math.round((this.preparation3 / this.countCard) * 100);
          break;
      }
      if (this.queue.length === 0) {
        this.$emit("showResult", true);      
      }
      EventBus.$emit('updatePercent', {
        percent1: this.percent1,
        percent2: this.percent2,
        percent3: this.percent3,
      });      
    }
  }
}
</script>