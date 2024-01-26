<template>
    <div>
    </div>
</template>
    
<script setup>
const config = useRuntimeConfig()
let access_token = useCookie('access_token', {
	default: () => {},
	watch: true
})
let refresh_token = useCookie('refresh_token', {
	default: () => {},
	watch: true
})

if (!access_token.value) {
    navigateTo('/login')
}

const { data, error } = await useAsyncData(
    'resource', 
    () => $fetch(config.public.RESOURCE_ENDPOINT, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${access_token.value}`
        },
        method: 'POST',
        body: new URLSearchParams ({
            method: 'GET',
            url: 'http://localhost:8006/getResource',
            content_type: 'application/json; charset=utf-8'
        })
    })
)
if (error.value) {
    console.log('resource error roi', error)
} else {
    console.log('resource lay duoc: ', data.value)
}
</script>