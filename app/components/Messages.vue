<template>
    <Page>
        <ActionBar style="backgroundColor: #075E54; color: #ffffff;"
            ios:horizontalAlignment="left" android:horizontalAlignment="left">
            <NavigationButton text="<-" android.systemIcon="ic_menu_back"
                @tap="toMainPage">
            </NavigationButton>
            <GridLayout columns="50,auto,70" rows="*" width="100%"
                verticalAlignment="center" alignItems="center"
                justifyItems="center" ios:horizontalAlignment="left"
                android:horizontalAlignment="left">
                <Image col="0" row="0" :src="photoSrc"
                    class="thumb img-circle" height="40" width="40" />
                <Label :text="opponentName" col="1" row="0" alignSelf="center"
                    width="60%" fontSize="18" height="20" />
                <Label text="online" width="30" col="2" row="0" height="12"
                    fontSize="10" />
            </GridLayout>
        </ActionBar>


        <GridLayout columns="*" rows="*, 260">
            <ListView for="message in messages" row="0"
                style="height:100%; padding: 10px; background-color: #e6f7ff;"
                separatorColor="transparent">
                <v-template>
                    <GridLayout :columns="message.isOwner ? '20, *' : '*, 20'"
                        rows="auto">
                        <MessageItem :message="message"
                            @open-photo="openPhoto" />
                    </GridLayout>
                </v-template>
            </ListView>

            <Cases :cases="cases" @select="onTapCase" />

        </GridLayout>
    </Page>
</template>

<script>
    import Home from "./Home";
    import Photo from "./Photo";
    const Cache = require("tns-core-modules/ui/image-cache").Cache;
    import MessageItem from "./MessageItem";
    import Cases from "./Cases";

    export default {
        components: {
            Home,
            Photo,
            MessageItem,
            Cases
        },
        props: ["id", "photo", "name"],
        data() {
            return {
                selectedListPickerIndex: 0,
                opponentName: "",
                photoSrc: "~/images/logo-call.png",
                messages: [],
                cases: []
            };
        },
        mounted() {
            console.log("message mounted", this.id, this.photo, this.name);
            if (this.photo) {
                this.photoSrc = this.photo;
            }
            this.opponentName = this.name;
            this.$backendService.getMessages(this.id).then(result => {
                this.messages = result;
            });
            this.$backendService.getCurrentStatus(this.id).then(result => {
                this.cases = result.responseCases.map(item => item
                    .text);
            });
        },
        methods: {
            toMainPage() {
                this.$navigateTo(Home);
            },

            onTapCase(index) {
                this.$backendService.selectCase(this.cases[index]);
            },

            openPhoto(item) {
                this.$navigateTo(Photo, {
                    props: {
                        src: item.src
                    }
                });
            }
        }
    };
</script>

<style>
    .answer-btn {
        background-color: #262323;
        color: #ffffff;
        font-size: 18px;
        text-transform: none;
    }

    .far {
        font-family: "Font Awesome 5 Free", "fa-regular-400";
    }

    .message-w {
        padding: 30px;
        margin: 5px 8px;
        box-shadow: 2px 2px 5px 1px #666;
        border-bottom: 1px solid #cccccc;
        background-color: #c3ffc3;
    }

    .message-r {
        padding: 30px;
        margin: 5px 8px;
        box-shadow: 2px 2px 5px 1px #666;
        border-bottom: 1px solid #cccccc;
        background-color: #ffffff;
    }
</style>