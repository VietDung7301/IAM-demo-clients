<template>
	<iframe src="https://www.w3schools.com" title="W3Schools Free Online Web Tutorials"></iframe>
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

const params = useRoute().query
console.log('code', params.code)
if (params.code) {
    const { data, error } = await useAsyncData(
		'access_token', 
		() => $fetch(config.public.TOKEN_ENDPOINT, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${config.public.CLIENT_SECRET}`
			},
			method: 'POST',
			body: new URLSearchParams ({
				code: params.code,
				client_id: config.public.CLIENT_ID,
				redirect_uri: config.public.REDIRECT_URI,
				grant_type: 'authorization_code',
				user_id: '123'
			})
		})
	)
	if (error.value) {
		console.log('lay token error roi', error)
	} else {
		access_token.value = data.value.access_token;
		refresh_token.value = data.value.refresh_token;
	}
}
</script>