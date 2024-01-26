<template>
</template>
  
<script setup>
import { jwtDecode } from "jwt-decode";

const config = useRuntimeConfig()

const access_token = useCookie('access_token', {
	default: () => {},
	watch: true
})
const refresh_token = useCookie('refresh_token', {
	default: () => {},
	watch: true
})

console.log('access_token', access_token.value)

const decoded = jwtDecode(access_token.value)



const { data, error } = await useAsyncData(
    'logout', 
    () => $fetch(config.public.LOGOUT_ENDPOINT, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${access_token.value}`
        },
        method: 'POST',
        body: new URLSearchParams ({
            user_id: decoded.sub,
            client_id: decoded.client_id
        })
    }))

    if (error.value) {
        console.log('logout error', error.value)
    } else {
        access_token.value = null;
        refresh_token.value = null;
    }


navigateTo('/')

</script>
