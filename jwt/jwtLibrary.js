// protected route'lar için, middleware yaz
// jwt.js diye bir dosya oluştur ve middleware'e parametre olarak bu dosyanın içindeki bir fonksiyonu ver
// fonksiyon içinde, token'ı verify et ve next() metodunu çalıştır
// invalid ise 401 ya da 403 döndür

//

// You can store both tokens, access and refresh, as cookie. But refresh token must have special path (e.g. /refresh).
// So refresh token will be sent only for request to /refresh url, not for every request like access token.
// Define where cookies are sent
// The Domain and Path attributes define the scope of a cookie: what URLs the cookies should be sent to.
//
// Domain attribute
// The Domain attribute specifies which hosts can receive a cookie. If unspecified, the attribute defaults to the same host
// that set the cookie, excluding subdomains. If Domain is specified, then subdomains are always included. Therefore,
// specifying Domain is less restrictive than omitting it. However, it can be helpful when subdomains need to share
// information about a user.
// For example, if you set Domain=mozilla.org, cookies are available on subdomains like developer.mozilla.org.
//
// Path attribute
// The Path attribute indicates a URL path that must exist in the requested URL in order to send the Cookie header.
// The %x2F ("/") character is considered a directory separator, and subdirectories match as well.
// For example, if you set Path=/docs, these request paths match:
//     /docs
//     /docs/
//     /docs/Web/
//     /docs/Web/HTTP
// But these request paths don't:
//     /
//     /docsets
//     /fr/docs

//

//   +--------+                                           +---------------+
//   |        |--(A)------- Authorization Grant --------->|               |
//   |        |                                           |               |
//   |        |<-(B)----------- Access Token -------------|               |
//   |        |               & Refresh Token             |               |
//   |        |                                           |               |
//   |        |                            +----------+   |               |
//   |        |--(C)---- Access Token ---->|          |   |               |
//   |        |                            |          |   |               |
//   |        |<-(D)- Protected Resource --| Resource |   | Authorization |
//   | Client |                            |  Server  |   |     Server    |
//   |        |--(E)---- Access Token ---->|          |   |               |
//   |        |                            |          |   |               |
//   |        |<-(F)- Invalid Token Error -|          |   |               |
//   |        |                            +----------+   |               |
//   |        |                                           |               |
//   |        |--(G)----------- Refresh Token ----------->|               |
//   |        |                                           |               |
//   |        |<-(H)----------- Access Token -------------|               |
//   +--------+           & Optional Refresh Token        +---------------+
//
//
//   (A)  The client requests an access token by authenticating with the
//        authorization server and presenting an authorization grant.
//
//   (B)  The authorization server authenticates the client and validates
//        the authorization grant, and if valid, issues an access token
//        and a refresh token.
//
//   (C)  The client makes a protected resource request to the resource
//        server by presenting the access token.
//
//   (D)  The resource server validates the access token, and if valid,
//        serves the request.
//
//   (E)  Steps (C) and (D) repeat until the access token expires.  If the
//        client knows the access token expired, it skips to step (G);
//        otherwise, it makes another protected resource request.
//
//   (F)  Since the access token is invalid, the resource server returns
//        an invalid token error.
//
//   (G)  The client requests a new access token by authenticating with
//        the authorization server and presenting the refresh token.  The
//        client authentication requirements are based on the client type
//        and on the authorization server policies.
//
//   (H)  The authorization server authenticates the client and validates
//        the refresh token, and if valid, issues a new access token (and,
//        optionally, a new refresh token).


// https://www.npmjs.com/package/jsonwebtoken

// https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-token-claims

const fs = require('fs')

const payload = {
  'sub': '1234567890',
  'name': 'John Doe',
  'admin': false,
  'iat': 1516239022
}

const jwtLibrary = require('jsonwebtoken')

const privateKey = fs.readFileSync('./privateKey.pem', 'utf-8')
let signedJwt = jwtLibrary.sign(payload, privateKey, { algorithm: 'RS256' })
console.log(signedJwt)

const publicKey = fs.readFileSync('./publicKey.pem', 'utf-8')
jwtLibrary.verify(signedJwt, publicKey, { algorithms: ['RS256'] }, (error, payload) => {
  if (error)
    throw error

  console.log(payload)
})