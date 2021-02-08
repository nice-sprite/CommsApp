<template>
    <Frame>
        <Page height="70%">
            <ActionBar title="Add Commission" />
            <GridLayout rows="auto, auto, auto" , columns="1*, 1*">
                <Label
                    row="0"
                    col="0"
                    colSpan="3"
                    text="Enter Commission Details"
                    style="
                        text-align: center;
                        font-size: 12pt;
                        padding: 3em;
                        margin-top: 5em;
                    "
                ></Label>
                <ScrollView height="60%" row="1" col="0" colSpan="3" width="100%">
                    <StackLayout >
                        <TextField v-model="title" hint="Title"></TextField>
                        <TextField
                            v-model="for_who"
                            hint="Commissioner Contact Info/Notes"
                        ></TextField>
                        <TextField v-model="cost" keyboardType="number" hint="Payment due"></TextField>
                        <TextView
                            v-model="description"
                            hint="Description"
                            style="border: 1px solid #00beff"
                        ></TextView>
                    </StackLayout>
                </ScrollView>
                <Button
                    row="2"
                    col="0"
                    @tap="() => addCommission($modal)"
                    text="Okay"
                />
                <Button row="2" col="1" @tap="$modal.close" text="Cancel" />
            </GridLayout>
        </Page>
    </Frame>
</template>

<script>
export default {
    name: "AddCommissionModal",
    props: [
        // "title",
        // "description",
        // "cost",
        // "finished",
        // "for_who",
        "onAddPressed",
    ],

    data() {
        return {
            title: '',
            description: '',
            cost: 0,
            finished: false,
            for_who: '',
        }
    },

    methods: {
        addCommission($modal) {
            if (this.onAddPressed) {
                
                this.onAddPressed(this.title, this.description, this.cost, this.for_who, this.finished);
            }
            $modal.close();
        },
    },
};
</script>

<style>
</style>

