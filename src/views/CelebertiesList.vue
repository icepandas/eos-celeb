<template>
  <div v-if="showTimer" class="timer">
    {{$t('will_open_before')}}{{time}}{{$t('will_open_after')}}
  </div>
  <div v-else>
    <div class="container global-info">
      <nav class="level" v-if="globalInfo">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">{{$t('info_pot')}}</p>
            <p class="title">{{ (globalInfo.pool / 10000).toFixed(4) }} EOS</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">{{$t('info_count_down')}}</p>
            <p class="title">{{ globalCountdown }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">{{$t('info_last_buyer')}}</p>
            <p class="title" :title="globalInfo.last">{{ truncate(globalInfo.last) }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <b-field :label="$t('info_order_by')">
            <b-select rounded v-model="orderBy">
              <option value="desc">{{$t('info_order_by_desc')}}</option>
              <option value="asc">{{$t('info_order_by_asc')}}</option>
            </b-select>
          </b-field>
        </div>
        <div class="level-item has-text-centered">
          <b-field :label="$t('info_filter')">
            <b-select rounded v-model="filter">
              <option value="none">{{$t('info_filter_none')}}</option>
              <option value="buy" :disabled="account === null">{{$t('info_filter_buy')}}</option>
              <option value="not-buy" :disabled="account === null">{{$t('info_filter_not_buy')}}</option>
            </b-select>
          </b-field>
        </div>
      </nav>
    </div>
    <div class="celeb-list">
      <b-loading :is-full-page="false" :active.sync="dataIsLoading" :can-cancel="false"></b-loading>
      <div class="columns is-multiline">
        <div class="column is-3" v-for="priceInfo in orderList(filterList(celebPriceList))" :key="priceInfo.id" v-if="celebBaseList[priceInfo.id]">
          <div class="celeb-card">
            <div class="celeb-image">
              <img :src="`http://test.cdn.hackx.org/heros/${celebBaseList[priceInfo.id].id}.jpg`">
            </div>
            <div class="celeb-name"><p class="title">{{celebBaseList[priceInfo.id].name}}</p></div>
            <div class="celeb-holder">
              <p class="holder">{{$t('card_owner')}}: {{priceInfo.owner}}</p>
              <b-message type="is-info" size="is-small" class="slogan" v-if="priceInfo.slogan">
                {{priceInfo.slogan}}
              </b-message>
            </div>
            <div class="celeb-price"><p class="is-size-4 has-text-info">{{ (priceInfo.price * 1.35 / 10000).toFixed(4) }} EOS</p></div>
            <button class="button is-rounded is-light buy-button" v-if="account === null" disabled>{{$t('card_buy_after_login')}}</button>
            <button class="button is-rounded is-light buy-button" v-if="account !== null && priceInfo.owner != account.name" @click="buy(priceInfo)">{{$t('card_buy')}}</button>
            <button class="button is-rounded is-primary buy-button" v-if="account !== null && priceInfo.owner == account.name" @click="edit(priceInfo)">{{$t('card_edit_slogan')}}</button>
          </div>
        </div>
      </div>
      <b-modal :active.sync="isBuyDialogActive" has-modal-card>
        <buy-modal :priceInfo="currentBuy"></buy-modal>
      </b-modal>
      <b-modal :active.sync="isEditSloganDialogActive" has-modal-card>
        <edit-slogan-modal :priceInfo="currentBuy"></edit-slogan-modal>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import BuyModal from "@/components/BuyModal";
import EditSloganModal from "@/components/EditSloganModal";
import orderBy from "lodash.orderby";
import moment from "moment";
import * as util from "../blockchain/util";

export default {
  name: "celeberties-list",
  components: {
    BuyModal,
    EditSloganModal
  },
  computed: {
    ...mapState([
      "celebBaseList",
      "celebPriceList",
      "dataIsLoading",
      "globalInfo"
    ]),
    ...mapGetters(["account"])
  },
  data: () => ({
    isBuyDialogActive: false,
    isEditSloganDialogActive: false,
    currentBuy: null,
    globalCountdown: "00:00:00",
    orderBy: "desc",
    filter: "none",
    showTimer: false,
    time: "0:00:00"
  }),
  created: function() {
    setInterval(() => {
      let deadLine = new Date(1542715200000);
      let current = new Date().getTime();
      let left = deadLine - current;
      // if (left <= 0) {
      //   this.time = "00:00:00";
      //   this.showTimer = false;
      //   window.location.reload();
      //   return;
      // }
      let duration = moment.duration(left);
      let seconds = duration.seconds() || 0;
      let minutes = duration.minutes() || 0;
      let hours = duration.hours() || 0;

      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      this.time = `${hours}:${minutes}:${seconds}`;
    }, 1000);
    if (this.$route.params.account) {
      console.log("Referrer: %s", this.$route.params.account);
      localStorage.setItem("eos_celeb_referrer", this.$route.params.account);
    }

    this.countdownUpdater = setInterval(() => {
      if (this.globalInfo != null) {
        const currentTimestamp = ~~(Date.now() / 1000);
        if (currentTimestamp >= this.globalInfo.ed) {
          this.globalCountdown = this.$t("info_count_down_end");
        } else {
          let remaining = this.globalInfo.ed - currentTimestamp;
          this.globalCountdown = util.formatCountdown(remaining);
        }
      }
    }, 1000);
  },
  destroyed: function() {
    if (this.countdownUpdater) {
      clearInterval(this.countdownUpdater);
    }
  },
  methods: {
    buy(priceInfo) {
      this.currentBuy = priceInfo;
      this.isBuyDialogActive = true;
    },
    edit(priceInfo) {
      this.currentBuy = priceInfo;
      this.isEditSloganDialogActive = true;
    },
    orderList(list) {
      if (this.orderBy === "asc") {
        return orderBy(list, ["price", "id"], ["asc", "asc"]);
      } else if (this.orderBy === "desc") {
        return orderBy(list, ["price", "id"], ["desc", "asc"]);
      } else {
        return list;
      }
    },
    filterList(list) {
      if (this.filter === "buy") {
        return list.filter(
          item => this.account !== null && item.owner === this.account.name
        );
      } else if (this.filter === "not-buy") {
        return list.filter(
          item => this.account !== null && item.owner !== this.account.name
        );
      } else {
        return list;
      }
    },
    truncate(str) {
      try {
        if (str.length > 10) {
          return str.substr(0, 10) + "...";
        } else {
          return str;
        }
      } catch (e) {
        return str;
      }
    }
  }
};
</script>

<style scoped>
.celeb-list {
  min-height: 500px;
}
.timer {
  margin: 200px auto;
  overflow: hidden;
  font-size: 40px;
  height: 300px;
  text-align: center;
}
.celeb-list .column {
  margin: 0.5rem 0;
}

.celeb-card {
  border-radius: 10px;
  background: #fff;
  text-align: center;
  padding: 2rem;
  margin: 0 0.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03), 0 10px 15px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.2s ease-out;
  position: relative;
  height: 100%;
}

.celeb-card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.09), 0 15px 30px rgba(0, 0, 0, 0.09);
}

.celeb-card .celeb-image img {
  border: 0;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1rem;
}

.celeb-card .celeb-name {
  margin: 0.5rem 0;
}

.celeb-card .celeb-holder {
  margin: 1rem 0;
}

.celeb-card .celeb-price {
  margin: 0.5rem 0;
}

.celeb-card .slogan {
  margin: 0.5rem 0;
}

.celeb-card .buy-button {
  min-width: 150px;
  margin: 1rem 0 0 0;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
</style>
