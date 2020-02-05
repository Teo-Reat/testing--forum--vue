import './style.css';
import Vue from 'vue';
import axios from 'axios'

Vue.config.devtools = true;

new Vue({
    el: '#app',
    data() {
        return {
            posts: [],
            users: {},
            comments: {},
            search: '',
        };
    },
    mounted() {
        axios.all([
            axios.get('https://jsonplaceholder.typicode.com/posts'),
            axios.get('https://jsonplaceholder.typicode.com/users'),
            axios.get('https://jsonplaceholder.typicode.com/comments?postId=1')
        ])
            .then(axios.spread((posts, users, comments) => {
                this.posts = posts.data;
                this.users = users.data;
                this.comments = comments;
            }));
    },
    methods: {
        transformArr() {
            let newPosts = [];
            for (let i = 0; i < this.posts.length; i++) {
                newPosts.push(Object.entries(this.posts[i]));
            }
            console.log(newPosts);
        },
        mapArr() {
            let newArray = this.posts.map(title => title.title);
            console.log(newArray);
        }
    //     filterByTitle() {
    //         return this.posts.filter(item => item.title.indexOf(this.search) !== -1)
    //     },
    },
    // beforeMount() {
    //     fetch('https://jsonplaceholder.typicode.com/posts')
    //         .then(response => response.json())
    //         .then(json => {
    //             this.todos = json;
    //         })
    // },
    computed: {

    }
});