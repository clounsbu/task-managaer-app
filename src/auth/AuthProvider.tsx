import { Auth0Provider } from "@auth0/auth0-react";

interface Props{
    children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
    return (
      <Auth0Provider
        domain="dev-zta7jffpd7cjja7c.us.auth0.com"
        clientId="lA5XaJ6rvRuZbSwatHTXGLIiApvV6Gkk"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        {children}
      </Auth0Provider>
    );
}