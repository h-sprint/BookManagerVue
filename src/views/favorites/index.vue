<template>
  <div class="app-container">
    <!-- 顶部功能 -->
    <div class="filter-container" style="margin-bottom: 15px">
      <el-form :model="queryParam" ref="queryForm" :inline="true" label-width="68px">
        <el-form-item>
          <el-input v-model="queryParam.bookname" placeholder="图书名" style="width: 200px;" class="filter-item" clearable @keyup.enter.native="handleFilter" />
        </el-form-item>
        <el-form-item>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            搜索
          </el-button>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-refresh" @click="handleShowAll">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--数据表格-->
    <el-table
        ref="multipleTable"
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column label="序号" min-width="50" align="center">
        <template slot-scope="scope">
          {{queryParam.limit * (queryParam.page - 1) + (scope.$index + 1)}}
        </template>
      </el-table-column>
      <el-table-column
          prop="bookName"
          label="图书名"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="marktimestr"
          label="收藏时间">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          :width="'180px'">
        <template slot-scope="scope">
          <el-button @click="handleDelete(scope.row, scope.$index)" type="danger" size="small">取消收藏</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页条-->
    <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryParam.page"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="queryParam.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="recordTotal"
        style="margin-top: 15px">
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import permission from '@/directive/permission/index.js' // 权限判断指令
import waves from '@/directive/waves' // waves directive
import { queryMarksByPage, deleteMark } from '@/api/favorites'

export default {
  name: 'Bookinfo',
  directives: { waves, permission },
  // 创建后
  created() {
    // 从服务器获取数据表格第一页的信息
    queryMarksByPage(this.queryParam).then(res => {
      console.log('首页数据获取成功',res)
      this.tableData = res.data
      this.recordTotal = res.count
    })
  },
  methods: {
    // 分页大小改变监听
    handleSizeChange(curSize) {
      const params = this.queryParam
      params.limit = curSize
      queryMarksByPage(params).then(res => {
            console.log('分页数据获取成功',res)
            this.tableData = res.data
            this.recordTotal = res.count
      })
    },

    // 点击分页监听方法
    handleCurrentChange(curPage) {
      const params = this.queryParam
      params.page = curPage
      queryMarksByPage(params).then(res => {
            console.log('分页数据获取成功',res)
            this.tableData = res.data
            this.recordTotal = res.count
      })
    },

    // 搜索
    handleFilter() {
      this.queryParam.page = 1
      queryMarksByPage(this.queryParam).then(res => {
        if(res.code === 0) {
          this.tableData = res.data
          this.recordTotal = res.count
        }
      })
    },

    // 重置
    handleShowAll() {
      this.queryParam.page = 1
      this.queryParam.username = null
      this.queryParam.bookname = null
      queryMarksByPage(this.queryParam).then(res => {
        if(res.code === 0) {
          this.tableData = res.data
          this.recordTotal = res.count
        }
      })
    },

    // 删除记录
    handleDelete(row, index) {
      this.$confirm('确定要取消收藏吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMark(row).then(res => {
          if(res === 1) {
            this.$message.success('删除记录成功')
            this.tableData.splice(index, 1)
            // 如果删完了，获取上一页
            if(this.tableData.length === 0) {
              this.queryParam.page = this.queryParam.page - 1
              this.handleCurrentChange(this.queryParam.page)
            }
          }
        })
      })
    },
  },
  data() {
    return {
      // 表格数据
      tableData: [],
      // 记录总数
      recordTotal: 0,
      // 查询参数
      queryParam: {
        page: 1,
        limit: 10,
        userid: null,
        username: null,
        bookname: null,
      }
    }
  },
  computed: {
    // 获得user信息
    ...mapGetters(['id','name','roles'])
  },
  watch: {
    'queryParam.userid': {
      immediate: true,
      handler() {
        console.log("我被触发了")
        if (this.roleIsAdmin) {
          this.queryParam.userid = null
        } else {
          this.queryParam.userid = this.id
        }
      }
    }
  }
}

</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 200px;
    display: block;
  }
</style>
