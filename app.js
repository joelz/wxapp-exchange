//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.updatedExchange();
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  updatedExchange: function () {
      var that = this;
      wx.request({
          url: that.globalData.fixerApi,
          data: {},
          method: 'GET',
          success: function (res) {
              //如何解析yahoo api传回来的xml？？
              // success
              if (res.statusCode == 200) {

                  //补充一个USD做基准利率
                  res.data.rates.USD = 1.0000;

                  that.globalData.currencyList = res.data.rates;
                  that.globalData.exchangeLastUpdated = res.data.date;
              }
              console.log(res);

              
          },
          fail: function () {
              // fail
          },
          complete: function () {
              // complete
          }
      })
  },
  xmlToJson: function(xml) {
      var obj = {};
      if (xml.nodeType == 1) {                
          if (xml.attributes.length > 0) {
              obj["@attributes"] = {};
              for (var j = 0; j < xml.attributes.length; j++) {
                  var attribute = xml.attributes.item(j);
                  obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
              }
          }
      } else if (xml.nodeType == 3) { 
          obj = xml.nodeValue;
      }            
      if (xml.hasChildNodes()) {
          for (var i = 0; i < xml.childNodes.length; i++) {
              var item = xml.childNodes.item(i);
              var nodeName = item.nodeName;
              if (typeof (obj[nodeName]) == "undefined") {
                  obj[nodeName] = xmlToJson(item);
              } else {
                  if (typeof (obj[nodeName].push) == "undefined") {
                      var old = obj[nodeName];
                      obj[nodeName] = [];
                      obj[nodeName].push(old);
                  }
                  obj[nodeName].push(xmlToJson(item));
              }
          }
      }
      return obj;
  },
  globalData:{
      userInfo: null,
      currencyList: {},
      exchangeLastUpdated:"",
      yahooApi: "http://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20yahoo.finance.xchange%20where%20pair%20in%20%28%22USDEUR%22,%20%22USDJPY%22,%20%22USDBGN%22,%20%22USDCZK%22,%20%22USDDKK%22,%20%22USDGBP%22,%20%22USDHUF%22,%20%22USDLTL%22,%20%22USDLVL%22,%20%22USDPLN%22,%20%22USDRON%22,%20%22USDSEK%22,%20%22USDCHF%22,%20%22USDNOK%22,%20%22USDHRK%22,%20%22USDRUB%22,%20%22USDTRY%22,%20%22USDAUD%22,%20%22USDBRL%22,%20%22USDCAD%22,%20%22USDCNY%22,%20%22USDHKD%22,%20%22USDIDR%22,%20%22USDILS%22,%20%22USDINR%22,%20%22USDKRW%22,%20%22USDMXN%22,%20%22USDMYR%22,%20%22USDNZD%22,%20%22USDPHP%22,%20%22USDSGD%22,%20%22USDTHB%22,%20%22USDZAR%22,%20%22USDISK%22,%20%22USDTWD%22%29&env=store://datatables.org/alltableswithkeys",
      fixerApi: "http://api.fixer.io/latest?base=USD"
  }
})