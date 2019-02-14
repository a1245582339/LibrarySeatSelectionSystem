<template>
    <div v-if="seat.length" class="seat">
        <div class="line" v-for="(line, index) in seat" :key="index">
            <span class="line-index">{{index + 1}}</span>
            <horizontal-add v-if="index === 0" style="position: absolute;left: 20px; transform: translateY(-12px)" :index="0" @addLine="addLine" />
            <vertital-add style="transform: translateX(50px)" v-if="index === 0" @addRow="addRow" :index="0" />
            <div class="row" v-for="(row, _index) in line.row" :key="_index" @click="onclickSeat(row)">
                <span v-if="index === 0" class="row-index">{{_index + 1}}</span>
                <vertital-add style="transform: translateX(22px)" v-if="index === 0" @addRow="addRow" :index="_index + 1" />
                <img :src="row.value ? empty : disabled" alt="">
                <horizontal-del v-if="_index + 1 === line.row.length" @delLine="delLine" :index="index" />
                <vertital-del :style="_index + 1 === line.row.length ? 'top: 30px' : ''" v-if="index + 1 === seat.length" @delRow="delRow" :index="_index" />
            </div>
            <div style="clear: both"></div>
            
            <horizontal-add style="position: absolute;left: 20px; transform: translateY(-9px)" :index="index + 1" @addLine="addLine" />
        </div>
    </div>
    <div class="nodata" v-else>
        <p>暂无数据</p>
    </div>
</template>
<script>
import { timestampToTime } from '@/utils/time'
import { updateOrder } from '@/api/order'
import horizontalAdd from './add/horizontal'
import vertitalAdd from './add/vertical'
import horizontalDel from './del/horizontal'
import vertitalDel from './del/vertical'
export default {
    props: {
        seat: {
            type: Array,
            default: []
        }
    },
    components: {
        horizontalAdd,
        vertitalAdd,
        horizontalDel,
        vertitalDel
    },
    data() {
        return {
            empty: require('@/assets/images/empty_seat.png'),
            disabled: require('@/assets/images/disabled_seat.png'),
        }
    },
    methods: {
        onclickSeat(row) {
            row.value ? row.value = 0 : row.value = 1
        },
        addLine(index) {
            const row = this.seat[0].row.map(item => {
                return {
                    value: 1
                }
            })
            this.seat.splice(index, 0, {row})
        },
        addRow(index) {
            for (let item of this.seat) {
                item.row.splice(index, 0, {value: 1})
            }
        },
        delLine(index) {
            if (this.seat.length === 1) {
                this.$Message.warning('最少保留一行座位！');
                return false
            }
            this.seat.splice(index, 1)
        },
        delRow(index) {
            if (this.seat[0].row.length === 1) {
                this.$Message.warning('最少保留一列座位！');
                return false
            }
            for (let item of this.seat) {
                item.row.splice(index, 1)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.seat {
    border: 1px solid #dddddd;
    border-radius: 5px;
    padding: 80px 50px;
    width: 90%;
    position: relative;
    overflow-x: auto;
    .line-index {
        float: left;
        width: 15px;
        line-height: 26px;
        color: #515a6e;
        margin-right: 50px;
    }
    .line {
        margin-top: 5px;
        position: relative;
        white-space:nowrap;
        .row {
            display: inline-block;
            height: 26px;
            width: 30px;
            margin: 0 5px;
            .row-index {
                position: absolute;
                top: -60px;
                text-align: center;
                width: 30px;
            }
            img {
                cursor: pointer;
            }
        }
    }
}
.nodata {
    background-image: url(../../assets/images/nodata.png);
    background-size: contain;
    background-repeat: no-repeat;
    margin-top: 50px;
    margin-left: 200px;
    height: 300px;
    width: 300px;
    position: relative;
    p {
        position: absolute;
        width: 100%;
        bottom: 20px;
        text-align: center;
        font-size: 16px;
        color: #7c7c7c;
    }
}


</style>
