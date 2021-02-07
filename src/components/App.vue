<template>
    <Page class="page-dark">
        <ActionBar title="Commission Tracker" class="action-bar-dark" />
        <StackLayout class="ma-0 pa-0">
            <ScrollView
                height="90%"
                orientation="vertical"
                width="100%"
                class="ma-0 pa-0"
            >
                <ListView for="comm in commissions" class="ma-0 pa-0">
                    <v-template>
                        <CommissionItem
                            class=""
                            :title="comm.title"
                            :description="comm.description"
                            :cost="comm.cost"
                            :finished.sync="comm.finished"
                            :for_who="comm.for_who"
                            :date_added="comm.date_added"
                        ></CommissionItem>
                    </v-template>
                </ListView>
            </ScrollView>
            <StackLayout orientation="horizontal" width="100%">
                <Label
                    class="money-display"
                    :text="'$' +totalPotential.toFixed(2)"
                ></Label>
                <Label
                    class="money-display"
                    :text="'$' + totalEarned.toFixed(2)"
                ></Label>
            </StackLayout>
            <Button
                id="shitButton"
                text="Add Commission"
                @tap="addCommissionDialog"
            ></Button>
        </StackLayout>
    </Page>
</template>

<script>
import CommissionItem from "./CommissionItem.vue";
import AddCommissionModal from "./AddCommissionModal";
import {
    LoadCommissionsFromFile,
    AppendCommissionToFile,
    ResetCommissionFile,
    WriteTestData,
} from "../custom/FileHelper";
let { CommissionClass } = require("../custom/CommissionClass");

export default {
    components: {
        CommissionItem: CommissionItem,
    },
    data() {
        return {
            count: 0,
            commissions: [],
        };
    },

    computed: {
        totalPotential: function () {
            return this.commissions
                .map((e) => e.cost)
                .reduce((acc, curr) => acc + curr, 0);
        },
        totalEarned: function() {
            return this.commissions
                .filter(e => e.finished)
                .map((e) => e.cost)
                .reduce((acc, curr) => acc + curr, 0);
        }
    },

    async mounted() {
        // await AppendCommissionToFile(new CommissionClass("My Title", "", 100, "asdasd", false, new Date(), undefined))
        // await WriteTestData();
        // this.commissions.concat(await LoadCommissionsFromFile())
        WriteTestData().then(() => {
            LoadCommissionsFromFile().then((comms) => {
                this.commissions = [].concat(comms);
            });
        });

        // await ResetCommissionFile();
    },

    methods: {
        onTap() {
            console.log("I get pressed oh yea");
            this.count++;
        },

        addCommissionDialog() {
            console.log("add commission dialog should show... .");
            this.$showModal(AddCommissionModal, {
                props: { onAddPressed: this.addCommission },
            });
        },

        addCommission(title, description, cost, for_who, finished) {
            console.log(title, description, cost, for_who, finished);
            this.totalPotential += Number(cost);
            this.commissions.push({
                title: title,
                description: description,
                cost: Number(cost),
                for_who: for_who,
                finished: finished,
                date_added: new Date(),
            });
        },
    },
};
</script>

<style scoped lang="scss">
.action-bar-dark {
    background: #1f1f1f;
    color: aqua;
}

.page-dark {
    background: black;
}

.money-display {
    color: aqua;
    text-align: center;
    width: 50%;
}
Button {
    background-color: #313131;
    color: aqua;
}

.ma-0 {
    margin: 0 !important;
}

.pa-0 {
    padding: 0 !important;
}
</style>
