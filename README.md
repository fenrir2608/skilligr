# skilligr

## Environment Configuration

1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables to the `.env` file:

```
PORT = 3000
DBHOST = "localhost"
DBUSER = "root"
DBPWD = ""
DBDB = "skilligr_test"
TOKEN_KEY = "secret"
EMAIL_USER = "youremail@example.com"
EMAIL_PASS = "generatethisfrommyappsingoogle"
CLOUDINARY_API_KEY = "1234567890"
CLOUDINARY_CLOUD_NAME = "xyz"
CLOUDINARY_SECRET_KEY = "abc"
```

## API Endpoints

### Authentication
- `POST /login`: Logs in a user.
- `POST /signup`: Creates a new user.
- `GET /logout`: Logs out the current user.
- `POST /reset`: Sends a password reset email to the user.
- `PUT /reset`: Updates the user's password.

### Protected Routes (admin only)
- `PUT /admin/activate`: Activates a user.
- `GET /admin`: Retrieves user information.
- `PUT /admin`: Updates user information.
- `DELETE /admin`: Removes a user.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
