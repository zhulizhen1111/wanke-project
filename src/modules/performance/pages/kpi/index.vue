<template>
    <div class='pm-kpi'>
        <div class='kpi-top'>
            <DatePicker
                type='month'
                size='large'
                placeholder
                style='width: 270px'
                v-model='date'
                @on-change='getData'
                format='yyyy-MM'
                :clearable='false'
            ></DatePicker>
        </div>
        <div class='kpi-bottom'>
            <div class='wk-info'>
                <div
                    v-for='(item1,index1) in statffInfo'
                    :key='index1'
                    @click='detailKpi(item1)'
                    v-if='item1.positionId=="1"'
                >
                    <div class='wk-w'>
                        <img
                            class='wk-img'
                            :src='item1.headPortrait?`http://api.sagacloud.cn/dp-auxiliary/image-service/common/file_get?systemId=dataPlatform&key=${item1.headPortrait}`:`/static/img/noimg.png`'
                            alt='人员图片'
                        >
                    </div>
                    <p>绩效得分：{{item1.performanceScore.toFixed(0) }}</p>
                    <p class='wk-name'>{{item1.staffName}}</p>
                </div>
            </div>
            <div class='wk-info'>
                <div
                    v-for='(item1,index1) in statffInfo'
                    :key='index1'
                    @click='detailKpi(item1)'
                    v-if='item1.positionId=="2"'
                >
                    <div class='wk-w'>
                        <img
                            class='wk-img'
                            :src='item1.headPortrait?`http://api.sagacloud.cn/dp-auxiliary/image-service/common/file_get?systemId=dataPlatform&key=${item1.headPortrait}`:`/static/img/noimg.png`'
                            alt='人员图片'
                        >
                    </div>
                    <p>绩效得分：{{item1.performanceScore.toFixed(0) }}</p>
                    <p class='wk-name'>{{item1.staffName}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { formatTime } from '@/tools/formatTime.js'
export default {
    mixins: [],

    props: {},

    data() {
        return {
            statffInfo: [],
            date:
                new Date().getFullYear() +
                '-' +
                (new Date().getMonth() > 10 ? new Date().getMonth() : 0 + new Date().getMonth()),
            time: ''
        }
    },

    computed: {},

    mounted() {
        this.getData()
    },

    methods: {
        getData() {
            this.time = formatTime(new Date(this.date).toLocaleDateString())
            axios
                .get(`/info-mng-backend/achievements/query?projectId=${this.$store.state.projectId}&date=${this.time}`)
                .then(res => {
                    console.log(res)
                    if (res.data.result == 'success') {
                        this.statffInfo = res.data.data
                    }
                })
        },
        detailKpi(item1) {
            console.log(item1.positionId)
            if (item1.positionId == '1') {
                this.$router.push({
                    path: '/performance/competent',
                    query: { staffId: item1.staffId, time: this.time }
                })
            } else {
                this.$router.push({
                    path: '/performance/technician',
                    query: { staffId: item1.staffId, time: this.time }
                })
            }
        }
    }
}
</script>

<style scoped lang="less" >
.pm-kpi {
    padding: 20px;
    background: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    .kpi-top {
        margin-bottom: 20px;
    }
    .kpi-bottom {
        min-height: 900px;
        .wk-info {
            display: flex;
            padding: 20px;
            flex-wrap: wrap;
            > div {
                display: inline-block;
                margin: 20px;
                opacity: 1;
                background: rgba(255, 255, 255, 1);
                box-shadow: 0px 1px 5px 0px rgba(59, 66, 84, 0.12);
                .wk-w {
                     width: 140px;
                     height: 140px;
                    line-height: 0;
                    .wk-img {
                        width: 100%;
                        height: 100%;
                    }
                }
                > p {
                    line-height: 30px;
                    text-align: center;
                    color: #3b4254;
                }
                .wk-name {
                    color: rgba(140, 148, 169, 1);
                }
            }
        }
    }
}
</style>
