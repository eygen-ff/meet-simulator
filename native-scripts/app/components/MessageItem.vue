<template>
    <WrapLayout :col="message.isOwner ? 1 : 0" orientation="horizontal"
        borderRadius="5" :class="message.isOwner ? 'message-w' : 'message-r'"
        borderWidth="0" borderColor="#ffffff;">
        <Label :text="message.text" textWrap="true" width="65%" />
        <Image v-if="message.img" height="100" :src="message.img"
            @tap="openPhoto" />
        <Label :text="message.time" width="18%" verticalAlignment="center"
            fontSize="12" />
        <Image v-if="message.delivered === null" class="logo"
            src="~/images/tick-1.png" width="10"></Image>
        <Image v-if="message.delivered === false" class="logo"
            src="~/images/tick-2.png" width="13"></Image>
        <Image v-if="message.delivered === true" class="logo"
            src="~/images/tick-3.png" width="14"></Image>
    </WrapLayout>
</template>

<script>
    export default {
        props: ["message"],
        data() {
            return {};
        },
        methods: {
            openPhoto() {
                this.$emit('open-photo', {
                    src: this.message.img
                });
            }
        }
    };
</script>

<style>
</style>