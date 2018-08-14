/**
 * Created by wanganyu on 2018/3/14.
 */
// 引入编写好的api
const api = require('./api');
// 引入文件模块
const fs = require('fs');
// 引入处理路径的模块
const path = require('path');
// 引入处理post数据的模块

const bodyParser = require('body-parser')
// 引入Express
const express = require('express');
const app = express();

const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(session({
    resave: true, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'love'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(api);

// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件

app.use(express.static(path.resolve(__dirname, '../dist')))
// app.use(function (req, res, next) {
//     console.log('-----')
//     next()
//     console.log(req)
    // if (!req.session.user) {
    //     if(req.url=="/login"){
    //         next();//如果请求的地址是登录则通过，进行下一个请求
    //     }else
    //     {
    //         res.redirect('/login');
    //     }
    //     console.log('用户未登录')
    //     res.redirect('/login')
    // } else if (req.session.user) {
    //     next();
    // }
// });

// app.get('/', function(req, res) {
//     console.log('-----')
//     if (!req.session.user) {
//         console.log('用户未登录')
//         res.redirect('/login')
//     }
// })

// 因为是单页应用 所有请求都走/dist/index.html
app.get('*', function(req, res) {
    // console.log('-----')
    const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
    // if (req.session.hasOwnProperty('user') && !req.session.user) {
    //     console.log('用户未登录')
    //     return req.redirect('/login')
    // }
    res.send(html)
})



// 监听8088端口
app.listen(3000);
console.log('success listen…………');