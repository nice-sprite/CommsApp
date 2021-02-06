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
                            :finished="comm.finished"
                            :for_who="comm.for_who"
                            :date_added="comm.date_added"
                        ></CommissionItem>
                    </v-template>
                </ListView>
            </ScrollView>
            <StackLayout orientation="horizontal" width="100%">
                <Label
                    class="money-display"
                    :text="
                        
                        totalPotential.toFixed(2)
                    "
                ></Label>
                <Label
                    class="money-display"
                    :text="
                        
                        commissions
                            .filter(item => item.finished)
                            .map((item) => item.cost)
                            .reduce((accum, current) => accum + current, 0)
                            .toFixed(2)
                    "
                    :key="totalPotential"
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
import { LoadCommissionsFromFile, AppendCommissionToFile } from './FileHelper'
let {CommissionClass} = require( './CommissionClass.js');
console.log("COMMISSION", CommissionClass)
export default {
    components: {
        CommissionItem: CommissionItem,
    },
    data() {
        return {
            count: 0,
            commissions: [
                {
                    title: "My Title",
                    description: "I want marge simpson commission uwu",
                    cost: Number(1000),
                    for_who: "Mystic#9217",
                    finished: false,
                    date_added: new Date(),
                },
            ],
            totalPotential: 0,
            totalEarned: 0,
        };
    },

    async created() {
        await AppendCommissionToFile(new CommissionClass("My Title", "", 100, "asdasd", false, new Date))
        return console.log(await LoadCommissionsFromFile());
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
            this.commissions[this.commissions.length] = {
                title: title,
                description: description,
                cost: Number(cost),
                for_who: for_who,
                finished: finished,
                date_added: new Date(),
            };
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
