# Discourse ReplyGif Plugin

This Plugins allows for easily browsing and selecting Reaction GIFs from the amazing replygif.net library in the composer.

## Details

Adds a new button in the composer window:

![Button screenshot](https://raw.github.com/ligthyear/discourse-plugin-replygif/master/docs/button.png)

Once clicked brings up a modal dialogue allowing one to browse the ReplyGIF.net library (through their API) by reaction and tags (first field and second field) and select gifs to be added to the composer.


In default mode, click once to load the animation and on the then showing button to add it to the Editor. You can also switch into Autoplay-mode via the toggle on the top right to make it load all listed GIF's animations and then select it to be added by clicking once.

![Normal Modal](https://raw.github.com/ligthyear/discourse-plugin-replygif/master/docs/modal.png)

![Selected](https://raw.github.com/ligthyear/discourse-plugin-replygif/master/docs/select.png)


## Installation

Just three simple steps. From your main discourse do:

    cd plugins
    git clone https://github.com/ligthyear/discourse-plugin-replygif.git   # clone the repo here
    cd ..
    RAILS_ENV=production rake assets:precompile

Then restart your discourse and refresh your browser.

Enjoy.

## Changelog:

 * 2014-04-21:
   - initial version

## TODO

(in order of importance)

 * The select-button sometimes moves around because of the column layout.

### other Limitations:

 (none)

Found a bug? Please report it on github!

## Authors:
Benjamin Kampmann <me @ create-build-execute . com>

## License (BSD):
Copyright (c) 2014, Benjamin Kampmann
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
