<template>
	<nav class="fixed w-full p-6 bg-transparent">
		<div class="flex items-center justify-between">
			<!-- Header logo -->
			<div>
				<nuxtLink to="/" class="flex items-center text-2xl font-semibold text-gray-900">
					<img class="w-8 h-auto mr-4" src="/logo_hust.png" alt="logo">
					HUST
				</nuxtLink>
			</div>
			<!-- Navbar -->
			<div class="md:block">
				<ul class="flex space-x-8 font-sans">
					<li><a href="#" class="active border-b-2 border-blue-500 pb-1">Home</a></li>
					<li><a href="#" class="">Services</a></li>
					<li><NuxtLink to="/student-list">Information</NuxtLink></li>
					<li><a href="#" class="">FAQ</a></li>
					<li><a href="#" class="">Contact</a></li>
				</ul>
			</div>
			<div v-if="signed_on" class="md:block w-48">
				<ul class="flex space-x-2">
					<li><NuxtLink to="/logout"
							class="cta border-blue-500 border hover:bg-slate-50 px-3 py-2 rounded text-blue font-semibold"
							>
							Sign Out
					</NuxtLink></li>
				</ul>
			</div>
			<div v-else class="md:block w-48">
				<ul class="flex space-x-2">
					<li><nuxtLink to="/login"
						class="cta border-blue-500 border hover:bg-slate-50 px-3 py-2 rounded text-blue font-semibold"
						>
						Sign In
					</nuxtLink></li>
					<li><NuxtLink to="#" class="cta bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded text-white font-semibold">Sign Up</nuxtLink>
					</li>
				</ul>
			</div>
		</div>
	</nav>
	<div>
		<slot />
	</div>
</template>
<script setup>
let access_token = useCookie('access_token', {
	default: () => {},
	watch: true
})
let refresh_token = useCookie('refresh_token', {
	default: () => {},
	watch: true
})

let signed_on = false;

if (access_token.value) {
	signed_on = true
}


const config = useRuntimeConfig()
const AUTH_SERVER = `${config.public.AUTH_SERVER}/login`
const handle_login_with_iam = () => {
	navigateTo({
		path: AUTH_SERVER, 
		query: {
			response_type: config.OAUTH_RESPONSE_TYPE,
			client_id: config.CLIENT_ID,
			redirect_uri: window.location.host
		}
	}, {
		external: true
	})	
}
</script>