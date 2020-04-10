// vue.config.js
module.exports = {
    // 选项...
    devServer: {
        proxy: {
            // '/oauth': {
            //     target: 'http://localhost:9000', //API服务器的地址
            //     ws: true,  //代理websockets
            //     changeOrigin: true, // 虚拟的站点需要更管origin
            //     pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
            //         '^/oauth': '/oauth'
            //     }
            // },
            '/' : {
                target: 'http://localhost:8091',
                ws: true,
                changeOrigin: true,
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/': '/'
                }
            }
        },
    },
}