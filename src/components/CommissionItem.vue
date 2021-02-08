<template>
    <GridLayout
        class="list-item-container"
        :class="{ 'finished-item': finished }"
        columns="5*,2*, 1*"
        rows="*"
        @longPress="showMenu"
    >
        <StackLayout row="0" col="0">
            <Label
                :textWrap="true"
                class="list-item-title vcenter-text"
                :class="{ 'finished-item': finished }"
                :text="title"
            ></Label>
            <Label
                :textWrap="true"
                class="list-item-description vcenter-text"
                :class="{ 'finished-item': finished }"
                :text="description"
            ></Label>
        </StackLayout>

        <StackLayout row="0" col="1">
            <Label
                class="list-item-cost"
                :text="`$${cost.toFixed(2)}`"
                :class="{ 'finished-item': finished }"
            ></Label>
            <Label
                class="list-item-person"
                :class="{ 'finished-item': finished }"
                :text="for_who"
            ></Label>
            <Label
                class="list-item-person"
                :class="{ 'finished-item': finished }"
                :text="`${date_added.toISOString()}`"
            ></Label>
            <Label
                class="list-item-person"
                :class="{ 'finished-item': finished }"
                :text="finished"
            ></Label>
        </StackLayout>
    </GridLayout>
</template>

<script>
export default {
    name: "CommissionItem",

    data() {},

    props: [
        "title",
        "description",
        "cost",
        "finished",
        "for_who",
        "date_added",
    ],

    methods: {
        onFinishedCommission() {
            this.finished = !this.finished;
            console.log('comm is now ', this.finished)
        },

        showMenu(args) {
            // args.object, args.view, args.eventName
            console.log("showMenu called");

            const Detail = {
                template: `
                    <Frame>
                      <Page height="50%">
                        <ActionBar title="Mark as Finished?"/>
                        <GridLayout rows="auto, auto", columns="1*, 1*">
                            <Label  row="0" col="0" colSpan="3"text="comm will be marked as finished" style="text-align: center; font-size: 12pt; padding: 3em;  margin-top: 5em;"></Label>
                            <Button row="1" col="0"  @tap="() => {onOk(); $modal.close()}" text="Okay" />
                            <Button row="1" col="1"  @tap="$modal.close" text="Cancel" />
                        </GridLayout>
                      </Page>
                    </Frame>
                `,
                methods: {
                    onOk: () => {
                        // console.log(arguments[0]);
                        this.finished = !this.finished;
                        this.$emit("update:finished", this.finished);
                    }
                },
            };
            this.$showModal(Detail);
            
        },
    },
};
</script>

<style lang="scss">
.list-item-container {
    color: rgb(197, 197, 197);
    background-color: rgb(31, 31, 31);

    .list-item-description {
        font-size: 12pt;

        margin: 0;
    }

    .list-item-title {
        font-weight: bold;
        font-size: 14pt;
        margin: 0;
        text-transform: capitalize;
    }

    // .list-item-button {
    //     margin: 0;
    //     border-radius: 5em;
    //     color: black;
    //     background-color: rgb(81, 255, 81);
    // }

    .list-item-cost {
        font-size: 11pt;
        color: powderblue;
        margin-bottom: 0;
        padding-bottom: 0;
    }

    .list-item-person {
        font-size: 11pt;
        color: rgba(127, 255, 212, 0.753);
        font-weight: 300;
        margin-top: 0;

        padding-top: 0;
    }
}

.finished-item {
    text-decoration: line-through;
    text-transform: lowercase;
    // background-color: black;
    opacity: 0.45;
}

.vcenter-text {
    align-self: center;
}
</style>