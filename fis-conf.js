fis.config.merge({
    roadmap : {
        path : [
            {
                reg : /^\/css\/.+-aio\.css$/i,
                release : "/static/news/myslides$&"
            },
            {
                reg : /^\/css\/.+\.(eot|woff|ttf)$/i,
                release : "/static/news/myslides$&"
            },
            {
                reg : /^\/vendor\/.+\.js$/i,
                release : "/static/news/myslides$&"
            },
            {
                reg : /^\/(cover-loading.*|main.*|js\/rocket-ppt)\.js$/i,
                release : "/static/news/myslides$&"
            },
            {
                reg : /^\/img\/.+\.(png|gif|jpg|jpeg)$/i,
                release : "/static/news/myslides$&"
            },
            {
                reg : /(\w+)\.html$/i,
                release : '/template/myslides/$1.html'
            }
        ]
    }
});

fis.config.merge({
    settings : {
        optimizer : {
            'uglify-js' : {
                output : {
                    /* inline js，单行过长，可能导致smarty解析失败，所以设置最大行大小 */
                    max_line_len : 500
                }
            }

            , 'clean-css' : {
                keepBreaks : true
            }
        }
    }
});

fis.config.del('modules.optimizer.html');

