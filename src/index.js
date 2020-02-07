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
                this.comments = comments.data;
            }));
    },
    beforeUpdate () {
        for(let p in this.posts){
            let post = this.posts[p];
            post.comments = [];
            post.users = [];

            for (let c in this.comments){
                let comment = this.comments[c];

                if(comment.postId === post.id){
                    post.comments.push(comment);
                }
            }

            for (let u in this.users){
                let user = this.users[u];
                if(user.id === post.userId){
                    post.users.push(user);
                }
            }
        }
    },
    computed: {
        filteredList() {
            return this.posts.filter(post => {
                return post.title.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    }
});