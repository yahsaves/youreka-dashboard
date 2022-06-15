# Project Entry
This project enters at "src/index.tsx", from there it will call "src/App.tsx" and break off into smaller components as the logic permits

# Folder Breakdown
  Assets - Contains static files such as images
  Components - Contains high reusable react modules that express very little opinion of their own
  Containers - Large containing portions of the app, these often deal with page layout or have strong opinions and only work well for a specific purpose
  Services - Code used to handle 3rd party API requests/endpoints
  Utils - Generic helper functions

# Project Structure (as in who calls what)
  - NavBar
  - Page 
    - Dashboard Module
      - Overlay Module