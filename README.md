# ufavor-web

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/javainthinking/ufavor-web)

## Overview
This project outlines a web app named ufavor designed to aggregate favorited or saved content from multiple popular platforms into one convenient location. The web app continuously monitors and updates content, making it accessible in three formats: text, audio, and video. 

## Key Features
- Content Aggregation: Retrieves and consolidates favorited content from platforms including Douyin, TikTok, Xiaohongshu, Instagram, and X.com (formerly Twitter).
- Continuous Updates: Monitors connected platforms regularly to retrieve new favorited content and updates the user feed automatically. 
- Multimedia Support: Displays all content formats - text, audio, and video - within the web with built-in playback features.
- Unified Feed: Presents all saved content in a single organized feed with options to filter by type (text, audio, video) or platform. 
- Search and Filters: Allows keyword searches across all saved content and offers platform-specific filters to refine results. 

## User Journey
1. User Registration and Onboarding:
  - User visit the home page of ufavor, and goes through a brief introduction highlighting its purpose.
  - User signs up using email, phone number, or an existing social media account. 
2. Linking Social Media Accounts:
  - The web console prompts the user to connect their accounts from supported platforms.
  - User authenticates and grants permission for continuous access to favorited content. 
3. Content Aggregation and Continuous Updates:
  - The web console retrieves initial favorited content and automatically checks for new favorites periodically.
  - User feed is continuously updated with new content as it is saved on linked platforms. 
4. Exploring and Consuming Content:
  - Feed Browsing: User scrolls through an aggregated feed of text, audio, and video content.
  - Content Interaction: Taps to read articles, watch videos, or listen to audio directly within the web app.
  - Search and Filter: Users search content or filter by platform, type, or date saved. 
5. Content Management:
  - Users can create collections or playlists to organize their favorited content.
  - Sharing options allow content to be shared directly via social media or email. 
6. Settings and Preferences:
  - Users manage linked accounts, update frequency for content checks, and set notification preferences. 

## Platform Integration
- Douyin & TikTok:
  - API Access: Uses official APIs to access user favorites. 
  - Authentication: OAuth 2.0 for secure login and access permissions.
  - Updates: Scheduled API calls to monitor and retrieve new favorited videos. 
- Xiaohongshu:
  - Integration: Uses Xiaohongshu API to retrieve text and image content. - Updates: Periodic checks for newly saved content. 
- Instagram:
  - API Integration: Uses Instagram Graph API to access user-saved media. - Continuous Retrieval: Retrieves and updates saved posts at set intervals. 
- X.com (Twitter):
  - API Access: Uses Twitter API v2 to access liked tweets or bookmarks. - Update Frequency: Scheduled retrieval of new likes/bookmarks. 

## Privacy and Compliance Considerations
- Platform Policies: Strictly adhere to each platform's terms of service and API usage guidelines.
- User Privacy: Obtain explicit consent for data access and provide settings to manage data permissions and account connections.
- Secure Data Handling: Use secure data storage and encryption protocols to protect user information. 

## Summary
The ufavor web app simplifies content retrieval for users by offering a centralized, continuously updated feed of all their saved content from multiple social platforms. It supports different content types and provides easy-to-use browsing, search, and management features, ensuring a seamless experience for accessing favorite videos, articles, and posts from one place.