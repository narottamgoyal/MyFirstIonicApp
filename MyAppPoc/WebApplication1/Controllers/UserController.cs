using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        [Authorize]
        [HttpGet("userInfo")]
        public IActionResult GetData2()
        {
            ClaimsPrincipal claimsPrincipal = Request.HttpContext.User;

            string id = claimsPrincipal.FindFirstValue("user_id");
            string email = claimsPrincipal.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress");
            string username = claimsPrincipal.FindFirstValue("name");

            bool.TryParse(claimsPrincipal.FindFirstValue("email_verified"), out bool emailVerified);
            var user = new { id, email, username, emailVerified };
            return Ok(user);
        }
    }
}
