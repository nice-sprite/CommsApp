<template>
    <Frame>
        <Page height="70%">
            <ActionBar title="Add Commission" />
            <StackLayout height="100%">
                <ScrollView height="80%">
                    <RadDataForm
                        ref="form"
                        :source="commissionData"
                        :metadata="commissionDataMetadata"
                    ></RadDataForm>
                </ScrollView>

                <Button text="Add" @tap="() => addCommission($modal)"></Button>
            </StackLayout>
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
            commissionData: {
                title: "",
                description: "",
                cost: 0,
                finished: false,
                for_who: "",
            },
            commissionDataMetadata: {
                propertyAnnotations: [
                    {
                        name: "title",
                        index: 0,
                        validators: [
                            {
                                name: "NonEmpty",
                                params: { errorMessage: "Required" },
                            },
                            {
                                name: "MaximumLength",
                                params: {
                                    length: 32,
                                    errorMessage:
                                        "must be less than 32 characters",
                                },
                            },
                        ],
                    },
                    {
                        name: "cost",
                        displayName: "Expected Payment",
                        index: 1,
                        validators: [
                            {
                                name: "NonEmpty",
                                params: { errorMessage: "required" },
                            },
                            {
                                name: "RangeValidator",
                                params: {
                                    minimum: 1,
                                    errorMessage:
                                        "Don't work for free!(enter number > 1)",
                                },
                            },
                        ],
                    },
                    {
                        name: "for_who",
                        displayName: "Contact Info",
                        index: 2,
                        validators: [{ name: "NonEmpty" }],
                    },
                    {
                        name: "description",
                        displayName: "Description",
                        index: 3,
                        validators: [],
                    },
                    {
                        name: "finished",
                        displayName: "Finished",
                        index: 4,
                        validators: [{ name: "NonEmpty" }],
                    },
                ],
            },
        };
    },

    methods: {
        addCommission($modal) {
            //  validate form data
            const form = this.$refs.form;
            form.commitAll();
            form.validateAll().then((validatedSuccessfully) => {
                if (validatedSuccessfully) {
                    // everything validated successfully so, we can make the new commission
                    let commission = {};
                    [
                        "title",
                        "description",
                        "cost",
                        "finished",
                        "for_who",
                    ].forEach((propName) => {
                        console.log(
                            propName,
                            typeof form.getPropertyByName(propName)
                                .valueCandidate
                        );
                        // console.log(typeof false)
                        if (propName == "finished") {
                            let test =
                                "" +
                                form.getPropertyByName(propName).valueCandidate;
                            if (test == "true") test = true;
                            else test = false;
                            console.log(
                                "FINISHED",
                                test,
                                typeof Boolean(test).valueOf(),
                                Boolean(test).valueOf()
                            );
                        }

                        commission[propName] = form.getPropertyByName(
                            propName
                        ).valueCandidate;
                    });

                    if (this.onAddPressed) {
                        let test =
                            "" +
                            form.getPropertyByName('finished').valueCandidate;
                        if (test == "true") test = true;
                        else test = false;
                        commission.finished = test;
                        this.onAddPressed(
                            commission.title,
                            commission.description,
                            commission.cost,
                            commission.for_who,
                            commission.finished
                        );
                    }
                    $modal.close();
                } else {
                    alert({
                        title: "Invalid Inputs",
                        message: "Make sure you filled out all required fields",
                        okButtonText: "Ok",
                    });
                }
            });
        },
    },
};
</script>

<style>
</style>

