<template>
<section class="bg-gray-50">
		<div class="flex flex-col items-center justify-center px-6 py-1 md:h-screen lg:py-0">
			<div class="w-full bg-white rounded-lg shadow md:mt-0 xl:p-0">
                <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Gender
                </th>
                <th scope="col" class="px-6 py-3">
                    Physics
                </th>
                <th scope="col" class="px-6 py-3">
                    Maths
                </th>
                <th scope="col" class="px-6 py-3">
                    English
                </th>
            </tr>
        </thead>
        <tbody>
            
            <tr v-for="(student, index) in student_list" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{student.name}}
                </th>
                <td class="px-6 py-4">
                    {{student.gender}}
                </td>
                <td class="px-6 py-4">
                    {{student.physics}}
                </td>
                <td class="px-6 py-4">
                    {{ student.maths }}
                </td>
                <td class="px-6 py-4">
                    {{ student.english }}
                </td>
            </tr>
        </tbody>
    </table>
</div>
			</div>
		</div>
	</section>
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

let student_list = []

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
    console.log('resource lay duoc: ', data.value.resource_server_response.data)
}
student_list = data.value.resource_server_response.data

</script>