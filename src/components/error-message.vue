<template>
    <div class="error-wrapper" v-if="Boolean(messages.length)">
        <div v-bind:key="message.id" v-for="message in messages">
            <div class="error-message p-2 mb-2">
                <div>{{message.header}}</div>
                <p class="size-description">{{message.description}}</p>
                <div class="text-center">
                    <b-button size="sm" @click="buttonClose(message.id)" variant="outline-secondary">Close</b-button>
                </div>
            </div>
        </div>
        
    </div>
</template>

    <script>
        export default {
            name: "error-message",
            computed: {
                messages () {
                    return this.$store.state.errorMessageStore.messages
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
            width: 200px;
            
            .error-message {
                color: #616161;
                border: 1px solid rgb(221, 212, 212);
                border-radius: 3px;
                background: rgba(250, 93, 93, 0.25);

                .size-description {
                    font-size: 0.8rem
                }
            }
        }
    </style>