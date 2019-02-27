<template>
    <div v-if="seat.length" class="seat">
        <div class="line" v-for="(line, index) in seat" :key="index">
            <span class="line-index">{{index + 1}}</span>
            <div class="row" v-for="(row, _index) in line.row" :key="_index" @click="onclickSeat(row)">
                <span v-if="index === 0" class="row-index">{{_index + 1}}</span>
                <img v-if="row.value" :src="row.value === 1 ? empty : sold" @ alt="">
            </div>
            <div style="clear: both"></div>
        </div>
    </div>
    <div class="nodata" v-else>
        <p>暂无数据</p>
    </div>
</template>
<script>
import { timestampToTime } from '@/utils/time'
import { updateOrder } from '@/api/order'
export default {
    props: {
        seat: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            empty: require('@/assets/images/empty_seat.png'),
            sold: require('@/assets/images/sold_seat.png')
        }
    },
    methods: {
        onclickSeat(row) {
            if (row.value === 1) {
                this.$Message.info({
                    content: `SEAT_ID:${row.seat_id} 空座位`,
                    duration: 10,
                    closable: true
                });
            } else if (row.value === 2) {
                this.$Modal.confirm({
                    okText: '强制签退',
                    title: `SEAT_ID:${row.seat_id}`,
                    content: `<p>占用时间: ${timestampToTime(row.start_time)}-${timestampToTime(row.end_time)}</p>`,
                    onOk: async () => {
                        await updateOrder({id: row.order_id}, {end_time: Date.now()})
                        this.$emit('refresh')
                    },
                    onCancel: () => {
                    }
                });
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.seat {
    border: 1px solid #dddddd;
    border-radius: 5px;
    padding: 50px;
    width: 90%;
    position: relative;
    overflow-x: auto;
    .line-index {
        float: left;
        line-height: 26px;
        color: #515a6e;
        margin-right: 50px;
        width: 15px;
    }
    .line {
        width: 100%;
        margin-top: 5px;
        white-space:nowrap;
        .row {
            display: inline-block;
            height: 26px;
            width: 30px;
            margin: 0 5px;
            .row-index {
                position: absolute;
                top: 20px;
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
