# README.md

This README file documents the issues faced during the development of the typing simulator application and the attempted solutions.

## Backend Issues and Solutions

### Issue: CORS Error and 503 Error

**Description:**
When making HTTP requests from the Angular frontend to the Spring Boot backend, a CORS (Cross-Origin Resource Sharing) error was encountered. The error message stated, "No 'Access-Control-Allow-Origin' header is present on the requested resource." Additionally, a 503 error was received, indicating that the backend service was unavailable.

**Attempted Solutions:**
1. Whole Application CORS Configuration:
   - Implemented a global CORS configuration in the Spring Boot application to allow cross-origin requests from the frontend.
   - Added the necessary CORS configuration using the `@CrossOrigin` annotation or by implementing a `WebMvcConfigurer` bean.
   - Ensured that the CORS configuration allowed the specific origin (frontend URL) and the required HTTP methods and headers.

2. Controller and Method-level CORS Configuration:
   - Applied the `@CrossOrigin` annotation at the controller level and individual method levels to enable CORS for specific endpoints.
   - Verified that the `@CrossOrigin` annotation was correctly configured with the appropriate origin, methods, and headers.

3. Port and URL Verification:
   - Double-checked the ports used by the frontend and backend applications to ensure they were correctly configured.
   - Verified that the frontend was making requests to the correct backend URL and port.
   - Ensured that the backend server was running and accessible at the specified URL and port.

4. Build and Deployment:
   - Built and deployed both the frontend and backend applications to ensure they were properly packaged and deployed.
   - Verified that the deployed applications were running without any build or deployment errors.

Despite attempting these solutions, the CORS error and 503 error persisted, indicating that the backend service was still not accessible from the frontend.

**Further Investigation:**
To further investigate the issue, the following steps were taken:

1. Network Monitoring:
   - Used network monitoring tools and browser developer tools to inspect the network requests and responses between the frontend and backend.
   - Observed that the requests were being sent from the frontend, but no response was received from the backend.

2. Testing with API Tools:
   - Used Postman to send requests directly to the backend endpoints.
   - Found that the backend endpoints did not provide any response when tested independently of the frontend.

The lack of response from the backend, both in network monitoring and API testing, suggests that the issue lies within the backend service itself. However, there is a small chance that the issue could be related to the Railway project or some Railway settings.