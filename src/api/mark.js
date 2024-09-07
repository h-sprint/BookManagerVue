import request from '@/utils/request'

// 获取收藏数量
export function getCount() {
    return request({
        url: '/mark/getCount',
        method: 'get'
    })
}

// 查询所有收藏信息
export function queryMarks() {
    return request({
        url: '/mark/queryMarks',
        method: 'get'
    })
}

// 分页查询收藏信息
export function queryMarksByPage(params) {
    return request({
        url: '/mark/queryMarksByPage',
        method: 'get',
        params
    })
}

// 添加收藏信息
export function addmark(data) {
    return request({
        url: '/mark/addMark',
        method: 'post',
        data
    })
}

// 删除收藏信息
export function deleteMark(data) {
    return request({
        url: '/mark/deleteMark',
        method: 'delete',
        data
    })
}

//  删除一些收藏信息
export function deleteMarks(data) {
    return request({
        url: '/mark/deleteMarks',
        method: 'delete',
        data
    })
}

//  更新收藏信息
export function updateMark(data) {
    return request({
        url: '/mark/updateMark',
        method: 'put',
        data
    })
}

// 收藏
export function markBook(userid, bookid) {
    return request({
        url: '/mark/markBook',
        method: 'post',
        params: {
            userid,
            bookid
        }
    })
}

// 取消收藏
export function returnBook(borrowid, bookid) {
    return request({
        url: '/mark/returnBook',
        method: 'post',
        params: {
            borrowid,
            bookid
        }
    })
}
