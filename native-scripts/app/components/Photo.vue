<template>
    <Page>
        <FlexboxLayout flexDirection="row" backgroundColor="#000">
            <Image v-if="src" :src="src" />
            <Label v-else text="Image not loaded" />
        </FlexboxLayout>
    </Page>
</template>

<script>
    import Messages from "./Messages";
    export default {
        props: ["src"],
        data() {
            return {};
        },
        methods: {
            toMessages() {
                this.$navigateTo(Messages);
            }
        }
    };
</script>

<style>
</style>