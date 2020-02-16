<template>
    <Page>
        <ActionBar :title="Consts.APP_NAME">
            <ActionItem tap="onDelete" ios.systemIcon="9" ios.position="left"
                android.systemIcon="ic_menu_preferences"
                android.position="actionBar">
            </ActionItem>
            <ActionItem @tap="tapLogout()" ios.systemIcon="9"
                ios.position="left" android.systemIcon="ic_lock_lock"
                android.position="actionBar">
            </ActionItem>
        </ActionBar>

        <ScrollView>
            <ListView for="item in items" class="list-group"
                @itemTap="onItemTap">
                <v-template>
                    <GridLayout class="list-group-item" rows="*"
                        columns="auto, *">
                        <Image row="0" col="0" :src="item.src"
                            class="thumb img-circle" />
                        <Label row="0" col="1" :text="item.text" />
                    </GridLayout>
                </v-template>
            </ListView>
        </ScrollView>

    </Page>
</template>

<script>
    import Login from "./Login";
    import Messages from "./Messages";
    const Cache = require("tns-core-modules/ui/image-cache").Cache;
    const fromFile = require("image-source").fromFile;
    import {
        Consts
    } from "../consts.js";

    export default {
        data() {
            return {
                items: [],
                Consts: Consts,
                message: "You have successfully authenticated. This is where you build your core application functionality."
            };
        },
        mounted() {
            this.$backendService.getContacts().then(result => {
                this.items = result;
            });
        },
        methods: {
            onItemTap: function(args) {
                console.log(
                    "Navigate to messages " + args.index + " tapped",
                    this.items[args.index]
                );
                this.$navigateTo(Messages, {
                    props: {
                        id: this.items[args.index].id,
                        name: this.items[args.index].text,
                        photo: this.items[args.index].src
                    }
                });
            },

            tapLogout() {
                console.log("logout");
                this.$backendService.logout();
                this.$navigateTo(Login, {
                    clearHistory: true
                });
            }
        }
    };
</script>

<style>
</style>