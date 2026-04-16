package com.submanager.subscriptionmanager.security;

import com.submanager.subscriptionmanager.Repository.UserRepository;
import com.submanager.subscriptionmanager.entity.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        // 1. Get user info from Google
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        // 2. Check if user already exists in our DB
        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    // 3. If not, create a new user
                    User newUser = User.builder()
                            .name(name)
                            .email(email)
                            .username(email)     // Use email as username for OAuth users
                            .password("")         // No password needed for OAuth users
                            .role("USER")
                            .createdAt(LocalDateTime.now())
                            .build();
                    return userRepository.save(newUser);
                });

        // 4. Generate JWT token
        String token = jwtService.generateToken(user);
        String username = user.getUsername();

        // 5. Redirect to React frontend with token
        String redirectUrl = "http://localhost/oauth2/redirect?token=" + token + "&username=" + username;
        response.sendRedirect(redirectUrl);
    }
}
