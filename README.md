# makc.co

This is the entire directory for my personal website. I am a freelance motion graphics designer & web developer. I recently redesigned my website from the ground up to be responsive, and to include an intuitive dark mode, as well as a few other special features that I care about.

#### Dark Mode

I'm using Apple's solution for dark mode on this site, which involves using a media query to have your website's theme follow the system wide theming. Not a ton of browsers support this functionality yet, it basically just works in Safari & Firefox on OSX, and will work in Safari on iOS 13 when that's released later this year; but hey, it's my personal website, if I can't play around with it here, where can I?

If you're interested, I've set up the media query in a somewhat interesting way: The *end result* is that my website lives in dark mode on any platform that doesn't support switching between themes. But as soon as you move over to a supported OS and/or browser, it will follow the system wide settings. 
This is accomplished by designing the website in dark mode first, and then using the media query to create a light mode. So I started by setting up the CSS to be the dark themeand then used ```@media (prefers-color-scheme: light){}```, to create the light theme.

---- 

There's not a ton left to say really, feel free to check it out and fork if you feel like it.
