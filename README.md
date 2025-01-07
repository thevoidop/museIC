# MuseIC

## Description

This project is a fully functional and responsive web-based music player. Users can play, pause, skip, shuffle, and repeat songs, as well as adjust volume levels. The app features a dynamic image list of album covers that updates as the current track changes.

Live Demo: [click here](https://themuseic.netlify.app)

## Features

-   Play/Pause functionality
-   Next/Previous track navigation
-   Shuffle and Repeat modes
-   Volume control with mute option
-   Progress bar for track navigation
-   Display of song title, artist, and album information
-   Dynamic album cover list with active track highlighting

## File Structure

-   `index.html`: The main HTML file for the web application
-   `style.css`: Styles for the web application
-   `script.js`: JavaScript file containing the main logic for the music player
-   `songs/`: Folder containing the audio files
-   `images/`: Folder containing album cover images
-   `icons/`: Folder containing control icons (play, pause, volume, etc.)

## How to Use

1. Place your audio files in the `songs/` directory.
2. Add corresponding cover images to the `images/` directory.
3. Modify the `songList` array in the `script.js` file to include your songs and images.

Example:

```javascript
const songList = [
    {
        title: "Astroscape Motivation",
        artist: "DayNightMorning",
        album: "Motivated",
        src: "songs/song1.mp3",
        cover: "images/cover1.jpg",
    },
    // Add more songs here
];
```

## Controls

-   **Play/Pause Button**: Toggles between playing and pausing the current track.
-   **Next Button**: Plays the next track in the list or a random track in shuffle mode.
-   **Previous Button**: Plays the previous track in the list or a random track in shuffle mode.
-   **Shuffle Button**: Toggles shuffle mode.
-   **Repeat Button**: Toggles repeat mode.
-   **Volume Bar**: Adjusts the volume level.
-   **Progress Bar**: Allows seeking to a specific point in the track.

## Events and Functions

-   `updateTrack()`: Updates the audio source and track information.
-   `formatTime(seconds)`: Formats time in `MM:SS` format.
-   `imageList()`: Dynamically generates and updates the list of album cover images.
-   `updateActiveImage(index)`: Highlights the currently playing track's album cover.
-   `scrollActiveImageIntoView()`: Ensures the active image is visible within the list.
-   `updateVolumeIcon()`: Updates the volume icon based on the current volume level.

## How to Run

1. Open `index.html` in a web browser.
2. Use the controls to interact with the music player.

## Dependencies

-   No external libraries or frameworks are required.

## Future Improvements

-   Add playlist management functionality.
-   Include support for lyrics display.
-   Enhance the UI with animations and transitions.

## License

This project is licensed under the MIT License. Feel free to modify and distribute.
