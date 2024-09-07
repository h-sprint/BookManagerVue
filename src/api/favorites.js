import request from '@/utils/request'

// 分页查询收藏夹
export function queryMarksByPage(params) {
    return request({
        url: '/mark/queryMarksByPage',
        method: 'get',
        params
    })
}

// 添加收藏图书
export function addBorrow(data) {
    return request({
        url: '/borrow/addBorrow',
        method: 'post',
        data
    })
}

// 取消收藏
export function deleteMark(data) {
    return request({
        url: '/mark/deleteMark',
        method: 'delete',
        data
    })
}
