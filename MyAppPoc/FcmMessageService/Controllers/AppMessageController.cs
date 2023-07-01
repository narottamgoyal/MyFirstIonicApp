using FcmMessageService.Services;
using Microsoft.AspNetCore.Mvc;

namespace FcmMessageService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AppMessageController : ControllerBase
    {
        private readonly ILogger<AppMessageController> _logger;
        GoogleTokenService googleTokenService = new GoogleTokenService();
        public AppMessageController(ILogger<AppMessageController> logger)
        {
            _logger = logger;
        }

        [HttpGet("send")]
        public void Send()
        {
        }

        [HttpGet("accessToken")]
        public string GetAccessToken()
        {
            return googleTokenService.GenerateAccessToken();
        }
    }
}