<template>

            <thead class="text-l w-full shadow  text-gray-800 uppercase dark:text-gray-200">
            <tr class="w-full" >
                <th scope="col" class="px-6  border-left-round py-3 bg-gray-200  dark:bg-gray-600">
                    Name
                </th>
                <th scope="col" class="px-6  py-3 bg-gray-200  dark:bg-gray-600">
                    Description
                </th>
                <th scope="col" class="px-6  py-3 bg-gray-200  dark:bg-gray-600">
                    Date
                </th>
                <th scope="col" class="px-6 border-right-round py-3 bg-gray-200  dark:bg-gray-600">
                    Action
                </th>
            </tr>
            </thead>

</template>


<style scoped>
.border-right-round{
    border-radius:  0 5px 0 0 ;
}
.border-left-round{
    border-radius:  5px 0 0 0 ;
}
</style>
<script>
export default {
    name: "SkillTableHeaderComponent"
}
</script>
