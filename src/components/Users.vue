<template>
<div>
 <h1>关于我</h1>
       <ul>
           <li v-for="user in users" :key='user.index'>
               {{user}}
           </li>
       </ul>
</div>
   
</template>

<script>
export default {
    name: 'Users',
    data() {
        return {
            users: ["hello","lamda","learn","learn","learn","learn","learn","learn","learn","learn","learn","learn"]
        }
    },

}
</script>

<style>

li{
    color:salmon;
}

h1{
    color:skyblue
}

</style>