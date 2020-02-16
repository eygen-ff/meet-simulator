<template>
    <GridLayout columns="*" rows="auto, auto, auto, auto" width="100%" row="1"
        backgroundColor="lightgray">
        <template v-for="(item, index) in cases">
            <Button :text="item" :row="index" @tap="onTapCase(index)" />
        </template>
        <!-- Button text="Button" @tap="onButtonTap" / -->
    </GridLayout>

</template>

<script>
    export default {
        props: ["cases"],
        data() {
            return {};
        },
        methods: {
            onButtonTap() {
                this.$emit('select');
            },

            onTapCase(index) {
                //console.log("emit select", index);
                this.$emit("select", index);
            }
        }
    };
</script>

<style>
</style>