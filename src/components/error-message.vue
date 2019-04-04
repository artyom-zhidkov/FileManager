<template>
    <div class="error-wrapper" v-if="isShow">
        <div v-bind:key="index" v-for="(message, index) in messages">
            <b-alert :show="isShow" variant="danger" class="pr-4 position-relative">
                <p class="p-2 m-0">{{message.header}}</p>
                <p class="p-2 m-0">{{message.index}}</p>
                <p class="p-2 m-0">{{message.description}}</p>
                <b-link @click="buttonClose(message.index)" class="position-absolute cross" >
                    <span>
                        <i class="fas fa-times"></i>
                    </span>
                </b-link>
            </b-alert>
        </div>
    </div>
</template>

    <script>
        export default {
            name: "error-message",
            computed: {
                messages() {
                    return this.$store.state.errorMessageStore.messages
                },
                isShow () {
                    return Boolean(this.$store.state.errorMessageStore.messages.length);
                }
            },
            methods: {
                buttonClose(id) {
                    this.$store.dispatch('errorMessageStore/delleteMessage', id);
                }
            }
        }
    </script>

    <style scoped lang="scss">
        .error-wrapper  {
            width: 250px;

            .cross {
                color: rgb(150, 145, 146);
                top: 5px;
                right: 10px;
            }
            .cross:hover {
                color: rgb(95, 95, 95);
            }

            .size-description {
                font-size: 0.8rem
            }
        }
    </style>