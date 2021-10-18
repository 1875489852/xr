<template>
  <div class="center">
    <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="bookName" prop="bookName">
        <el-input v-model="ruleForm.bookName" readOnly></el-input>
      </el-form-item>
      <el-form-item label="systemName" prop="systemName">
        <el-input v-model="ruleForm.systemName" readOnly></el-input>
      </el-form-item>
      <el-form-item label="detailName" prop="detailName">
        <el-input v-model="ruleForm.detailName"></el-input>
      </el-form-item>
      <el-form-item label="desc" prop="desc">
        <el-input v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确认增加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        bookName: '',
        systemName: '',
        detailName:'',
        desc:''
      },
      rules: {
        detailName: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        desc:[
          { required: true, message: '描述不能为空', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8087/addSystem',this.ruleForm).then(function(resp){
            _this.$alert('添加成功！', '消息', {
              confirmButtonText: '确定',
              callback: action => {
                _this.$router.push('/System/' + _this.ruleForm.systemName+'?systemName='+_this.ruleForm.systemName+'&bookName='+_this.ruleForm.bookName)
              }
            })
          })
        } else {
          return false;
        }
      });
    }
  },
  created() {
    this.ruleForm.bookName = this.$route.query.bookName
    this.ruleForm.systemName = this.$route.query.systemName
  }
}
</script>

<style scoped>
.center{
  display: flex;
  align-items: center;        /* 垂直居中 */
  justify-content: center;    /* 水平居中 */
}
</style>
