var debug = true;
var app = angular.module("sgxkxxApp",["AjaxProxy",'ui.select2']);

//控制器
app.controller("sgxkxxController",["$scope","ajaxProxy","$interval",function(scope,ajaxProxy,interval){
    // 默认值
    var ajxxInfo = {
		
    };
    // 当前状态 time未填写，pencil正填写，ok已填写
    var status = {
        xmxx:'ok',
        zxmxx:'pencil',
        bdxx:'time',
    };
    scope.status = status;


    if(debug){
        ajxxInfo = {
			  C_XMJL			: "张哥",
			  N_JSJGD			: "200", 
			  C_XMJL_AQSCXKZH	: "80298成都市DDHK", 
			  C_AQGCS			: "李四", 
			  C_AQGCS_AQSCNLKHH : "9098成都市DDDDK", 
			  C_AQGCS_BGDH		: "已停机", 
			  C_AQGCS_SFZH		: "89280303889928937", 
			  C_AQGCS_YDDH		: "133333333333", 
			  C_XCDBXM			: "老表", 
			  C_XCDBDH			: "779878798", 
			  C_JBR_LXDH		: "729378974",
			  C_BZ				: "1112333" 
				  }
        
        scope.ajxxInfo=ajxxInfo;
    }

    // 下一步
    scope.f_next = function(){
		//禁用提交按钮
		scope.next=true;
        var jsonInfo = angular.toJson(scope.ajxxInfo);
        console.log(jsonInfo);
        ajaxProxy.addParm(1,jsonInfo);
        ajaxProxy.invokeProc("APPUSER.JW2017_XMBJ.PK_SGXK_CU_AJXX").then(function(resp){
            console.log(resp);
			if(resp.status == 200 && resp.data.PN_RET*1 == 0){
				layer.alert("保存成功"+resp.data.PC_MSG,{icon:1},
							function(){
										location.href="/cdjwztyypt/sgxk/sgxksb_ajxx.jsp";
										});
			}else{
				layer.alert("保存失败"+resp.data.PC_MSG,{icon:7});
			}
        });
    }
}]);


//加载施工许可信息
var initSgxkxx = function () {
  // return;
  var ap = new AjaxProxy();
  ap.addParm(1, $scope.spjlid);
  ap.invokeProc("APPUSER2017.JW2017_SJGL_SGXKXXGL.PK_BLSP_SGXKSP_SGXKXXDATA", false);

  //页面显示数据
  var sgxkxx = {
      C_DBXS: ap.getString("P_SGXKXX_RESULT", 1, "C_DBXS"),
      C_DBGS_MC: ap.getString("P_SGXKXX_RESULT", 1, "C_DBGS_MC"),
      N_DBJE_JF: ap.getString("P_SGXKXX_RESULT", 1, "N_DBJE_JF"),
      N_DBJE_YF: ap.getString("P_SGXKXX_RESULT", 1, "N_DBJE_YF"),
      C_DBKSSJ: ap.getString("P_SGXKXX_RESULT", 1, "C_DBKSSJ"),
      N_BLK: ap.getString("P_SGXKXX_RESULT", 1, "N_BLK"),
      N_AQWMSGF: ap.getString("P_SGXKXX_RESULT", 1, "N_AQWMSGF"),
      N_ZHSBJE: ap.getString("P_SGXKXX_RESULT", 1, "N_ZHSBJE"),
      N_ZHSBRS: ap.getString("P_SGXKXX_RESULT", 1, "N_ZHSBRS"),
      C_BHBH: ap.getString("P_SGXKXX_RESULT", 1, "C_BHBH"),
      C_DBXS_YF: ap.getString("P_SGXKXX_RESULT", 1, "C_DBXS_YF"),
      C_BHBH_YF: ap.getString("P_SGXKXX_RESULT", 1, "C_BHBH_YF"),
      C_DBGS_MC_YF: ap.getString("P_SGXKXX_RESULT", 1, "C_DBGS_MC_YF"),
      C_DBKSSJ_YF: ap.getString("P_SGXKXX_RESULT", 1, "C_DBKSSJ_YF")
  };
  $("#C_DBXS").val(sgxkxx.C_DBXS).trigger('change');
  $("#C_DBXS_YF").val(sgxkxx.C_DBXS_YF).trigger('change');
  $scope.sgxkxxInfo = sgxkxx;

}