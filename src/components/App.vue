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
                <ListView for="(comm, index) in commissions" class="ma-0 pa-0">
                    <v-template>
                        <CommissionItem
                            class=""
                            :title="comm.title"
                            :description="comm.description"
                            :cost="comm.cost"
                            :finished.sync="comm.finished"
                            :for_who="comm.for_who"
                            :date_added="comm.date_added"
                            :index="index"
                            @itemDeleted="deleteCommissionItem"
                            @update:finished="updateFinished(index, ...arguments)"
                        ></CommissionItem>
                    </v-template>
                </ListView>
            </ScrollView>
            <StackLayout orientation="horizontal" width="100%">
                <Label
                    class="money-display"
                    :text="'potential earnings: $' + totalPotential.toFixed(2)"
                    color="lightgreen"
                    style="border-width: 1px; border-color: lightgreen"
                ></Label>
                <Label
                    class="money-display"
                    :text="'current earnings: $' + totalEarned.toFixed(2)"
                    color="skyblue"
                    style="border-width: 1px; border-color: skyblue"
                ></Label>
            </StackLayout>
            <Button
                text="Add Commission"
                @tap="addCommissionDialog"
                style="margin-left: 25%; margin-right: 25%"
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
    DeleteCommissionInFile,
    UpdateCommissionInFile
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
        totalEarned: function () {
            return this.commissions
                .filter((e) => e.finished)
                .map((e) => e.cost)
                .reduce((acc, curr) => acc + curr, 0);
        },
    },

    async mounted() {
        // for testing
        // WriteTestData().then(() => {
        //     LoadCommissionsFromFile().then((comms) => {
        //         this.commissions = [].concat(comms);
        //     });
        // });
        // await ResetCommissionFile();
        LoadCommissionsFromFile().then((comms) => {
            this.commissions = [].concat(comms);
        });
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

        async addCommission(title, description, cost, for_who, finished) {
            console.log(title, description, cost, for_who, finished);
            let comm = new CommissionClass(
                title,
                description,
                Number(cost),
                for_who,
                finished,
                new Date()
            );
            this.commissions.push(comm);
            await AppendCommissionToFile(comm);
        },

        // takes the index of the commission item to remove
        async deleteCommissionItem(index) {
            DeleteCommissionInFile(this.commissions[index].commission_id);
            this.commissions.splice(index, 1);
        },

        async updateFinished(index, event) {
            // console.log("updating comm index ", index, typeof index, `event ${event}`)
            await UpdateCommissionInFile(this.commissions[index].commission_id, {
                finished: event,
            });
        },
    },
};
</script>

<style scoped lang="scss">
.action-bar-dark {
    background: rgb(29, 29, 29);
    color: lightblue;
}

.page-dark {
    background: rgb(29, 29, 29);
}

.money-display {
    color: aqua;
    text-align: center;
    width: 50%;
}
Button {
    background-color: #313131;
    color: lightblue;
}

.ma-0 {
    margin: 0 !important;
}

.pa-0 {
    padding: 0 !important;
}
</style>
