using System.Web.Mvc;
using RestSharp;

namespace Senparc.Weixin.MP.Sample.Controllers.WxOpen
{
    /// <summary>
    /// 调用别的API，返回结果。就是一个跳板。
    /// </summary>
    public partial class ApiProxyController : Controller
    {

        /// <summary>
        /// 从 http://api.fixer.io/latest?base=USD 返回汇率列表
        /// </summary>
        /// <returns>
        /// 返回数据示例:{	"base": "USD","date":"2017-06-06","rates": {"AUD":1.3359,"BGN":1.7373, ....	} }
        /// </returns>
        /// <remarks>
        /// 需要先 Install-Package RestSharp
        /// </remarks>
        [HttpGet]
        public ActionResult ExchangeList()
        {
            var client = new RestClient("http://api.fixer.io");
            var request = new RestRequest("latest", Method.GET);
            request.AddQueryParameter("base", "USD");

            IRestResponse response = client.Execute(request);
            var content = response.Content;

            return Content(content, "application/json");
        }


    }
}