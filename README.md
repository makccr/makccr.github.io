# My Website

This repository is my personal website. For the most part, the goal was to make a simple portfolio, as well as a home for some downloads that I have available from my site. There are a few interesting features of my site, which are listed below.

#### Dark Mode
I'm using Apple's solution for dark mode on this site, which involves using a media query to have your website's theme follow the system wide theming. Not a ton of browsers support this functionality yet, it basically just works in Safari & Firefox on OSX, and will work in Safari on iOS 13 when that's released later this year; but hey, it's my personal website, if I can't play around with it here, where can I?

If you're interested, I've set up the media query in a somewhat interesting way: The *end result* is that my website lives in dark mode on any platform that doesn't support switching between themes. But as soon as you move over to a supported OS and/or browser, it will follow the system wide settings.
This is accomplished by designing the website in dark mode first, and then using the media query to create a light mode. So I started by setting up the CSS to be the dark theme and then used ```@media (prefers-color-scheme: light){}```, to create the light theme.

----
#### YouTube Series

Also if you're interested I have a set of videos where I go over the building of my website in detail, available below:

[![Let's Code: Web Design Playlist Link](http://i3.ytimg.com/vi/eonmkZtYB7g/maxresdefault.jpg)](https://www.youtube.com/playlist?list=PLIYVhRocqRoT6yvieIyNehUz6VnB6hXhF)
