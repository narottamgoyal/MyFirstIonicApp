using Google.Apis.Auth.OAuth2;

namespace FcmMessageService.Services
{
    public class GoogleTokenService
    {
        public string GenerateAccessToken()
        {
            // Path to your service account JSON file
            string serviceAccountFile = @".\\firebase-adminsdk.json";

            // Define the required scopes for the API
            string[] scopes = { "https://www.googleapis.com/auth/firebase.messaging" };

            // Load the service account credentials
            GoogleCredential credential;
            using (var stream = new FileStream(serviceAccountFile, FileMode.Open, FileAccess.Read))
            {
                credential = GoogleCredential.FromStream(stream).CreateScoped(scopes);
            }

            // Request an access token
            var accessToken = credential.UnderlyingCredential.GetAccessTokenForRequestAsync().Result;

            return accessToken;
        }

    }
}
