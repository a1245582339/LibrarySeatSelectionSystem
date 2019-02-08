<template>
    <div class="seat">
        <div class="line" v-for="(line, index) in seat" :key="index">
            <span class="line-index">{{index + 1}}</span>
            <div class="row" v-for="(row, _index) in line.row" :key="_index" @click="onclickSeat(row)">
                <img v-if="row.value" :src="row.value === 1 ? empty : sold" @ alt="">
            </div>
            <div style="clear: both"></div>
        </div>
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
                    title: `SEAT_ID:${row.seat_id} ${row.status === 1 ? '未签到' : '已签到'}`,
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
    padding: 10px;
    .line-index {
        float: left;
        line-height: 26px;
        color: #515a6e;
        margin-right: 50px;
    }
    .line {
        width: 100%;
        margin-top: 5px;
        .row {
            float: left;
            height: 26px;
            width: 30px;
            margin: 0 5px;
            img {
                cursor: pointer;
            }
        }
    }
}


</style>
