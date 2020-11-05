<template>
    <div class="result-screen section">
        <button class="button-home" @click.stop="changeDrawer"><img src="../assets/home-white.svg" alt=""></button>

        <div class="result">
            <div class="result-list">
                <div class="result-list__item">
                    <div class="result-list__value">{{ percent1 }}%</div>
                    <div class="result-list__name">Препарат 1</div>
                </div>
                <div class="result-list__item">
                    <div class="result-list__value">{{ percent2 }}%</div>
                    <div class="result-list__name">Препарат 2</div>
                </div>
                <div class="result-list__item">
                    <div class="result-list__value">{{ percent3 }}%</div>
                    <div class="result-list__name">Препарат 3</div>
                </div>
            </div>
            <div class="result__title"><span>Ваш результат:</span>«Что я здесь делаю?»</div>
            <p class="result__text">Это тестовое задание, так что не будем углубляться в глубины проблем фармацевтов. </p>
            <button class="button-gray" @click.stop="onShowMain">Попробовать еще</button>
        </div>
        <div class="result-screen__img"></div>
    </div>
</template>
<script>
import { EventBus } from '@/event-bus.js';
export default {
    data: () => ({
        percent1: 0,
        percent2: 0,
        percent3: 0,
    }),
    props: {
        drawer: {
            type: Boolean,
            default: true
        }
    },
    mounted () {
        EventBus.$on('updatePercent', (data) => {      
            console.log(data);                    
            this.percent1 = data.percent1,
            this.percent2 = data.percent2,
            this.percent3 = data.percent3
        })
    },
    methods: {
        changeDrawer() {
            this.$emit("changeDrawer", !this.drawer);
        },
        onShowMain() {
            this.$emit("showMain", true); 
        },
    }
}
</script>  